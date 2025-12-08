"""
Moduł do kategoryzacji gatunków muzycznych
"""
import os
import time
from pathlib import Path
from typing import Dict, List, Optional
from mutagen import File as MutagenFile
from mutagen.id3 import ID3, TCON
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from tqdm import tqdm
import click

class GenreCategorizer:
    """Klasa do kategoryzacji gatunków z wykorzystaniem Spotify, Beatport, Discogs"""

    # Mapowanie gatunków do standardowych kategorii
    GENRE_MAPPING = {
        'house': ['house', 'deep house', 'tech house', 'progressive house', 'electro house'],
        'techno': ['techno', 'minimal techno', 'detroit techno'],
        'trance': ['trance', 'progressive trance', 'uplifting trance', 'psytrance'],
        'drum_and_bass': ['drum and bass', 'dnb', 'jungle', 'liquid dnb'],
        'dubstep': ['dubstep', 'brostep', 'riddim'],
        'hip_hop': ['hip hop', 'rap', 'trap', 'hip-hop'],
        'electronic': ['electronic', 'edm', 'electro'],
        'ambient': ['ambient', 'downtempo', 'chillout'],
        'rock': ['rock', 'indie rock', 'alternative rock'],
        'pop': ['pop', 'electropop', 'synth-pop'],
    }

    def __init__(self, music_dir: str):
        self.music_dir = Path(music_dir)
        self.files = []

        # Spotify API
        self.spotify = None
        spotify_id = os.getenv('SPOTIFY_CLIENT_ID')
        spotify_secret = os.getenv('SPOTIFY_CLIENT_SECRET')

        if spotify_id and spotify_secret:
            try:
                auth_manager = SpotifyClientCredentials(
                    client_id=spotify_id,
                    client_secret=spotify_secret
                )
                self.spotify = spotipy.Spotify(auth_manager=auth_manager)
            except Exception as e:
                click.echo(f"⚠️  Błąd inicjalizacji Spotify: {e}", err=True)

    def scan_files(self) -> List[Path]:
        """Skanuje pliki audio"""
        click.echo("🔍 Skanowanie plików...")
        files = []
        for ext in ['.mp3', '.wav', '.flac', '.m4a']:
            files.extend(self.music_dir.rglob(f'*{ext}'))
        self.files = sorted(files)
        click.echo(f"📁 Znaleziono {len(self.files)} plików")
        return self.files

    def get_current_genre(self, filepath: Path) -> Optional[str]:
        """Pobiera obecny gatunek z pliku"""
        try:
            audio = MutagenFile(filepath, easy=True)
            if audio and audio.get('genre'):
                return audio.get('genre')[0]
            return None
        except:
            return None

    def search_spotify_genre(self, artist: str, title: str) -> Optional[Dict]:
        """Wyszukuje gatunek w Spotify"""
        if not self.spotify:
            return None

        try:
            # Wyszukaj utwór
            query = f"artist:{artist} track:{title}"
            results = self.spotify.search(q=query, type='track', limit=1)

            if results['tracks']['items']:
                track = results['tracks']['items'][0]

                # Pobierz gatunki artysty
                artist_id = track['artists'][0]['id']
                artist_info = self.spotify.artist(artist_id)

                genres = artist_info.get('genres', [])

                if genres:
                    # Wybierz pierwszy gatunek lub zmapuj do kategorii
                    primary_genre = genres[0]
                    normalized_genre = self.normalize_genre(primary_genre)

                    return {
                        'genre': normalized_genre,
                        'raw_genres': genres,
                        'confidence': 0.8,
                        'source': 'spotify'
                    }

            return None

        except Exception as e:
            click.echo(f"⚠️  Spotify error: {e}", err=True)
            return None

    def normalize_genre(self, genre: str) -> str:
        """Normalizuje gatunek do standardowej kategorii"""
        genre_lower = genre.lower()

        for category, keywords in self.GENRE_MAPPING.items():
            for keyword in keywords:
                if keyword in genre_lower:
                    return category

        # Jeśli nie znaleziono mapowania, zwróć oryginalny
        return genre_lower.replace(' ', '_')

    def categorize_by_bpm(self, filepath: Path) -> Optional[str]:
        """Przybliżona kategoryzacja na podstawie BPM"""
        try:
            audio = MutagenFile(filepath)
            if not audio or not hasattr(audio.info, 'length'):
                return None

            # Próba pobrania BPM z tagów
            bpm = None
            if hasattr(audio, 'tags') and audio.tags:
                bpm_tag = audio.tags.get('TBPM')
                if bpm_tag:
                    bpm = int(str(bpm_tag))

            if bpm:
                # Proste mapowanie BPM -> gatunek
                if 120 <= bpm <= 130:
                    return 'house'
                elif 130 <= bpm <= 145:
                    return 'techno'
                elif 140 <= bpm <= 150:
                    return 'trance'
                elif 160 <= bpm <= 180:
                    return 'drum_and_bass'

            return None

        except:
            return None

    def update_genre_tag(self, filepath: Path, genre: str) -> bool:
        """Aktualizuje tag gatunku w pliku"""
        try:
            audio = MutagenFile(filepath, easy=True)
            if not audio:
                return False

            audio['genre'] = genre
            audio.save()
            return True

        except Exception as e:
            click.echo(f"❌ Błąd zapisu {filepath.name}: {e}", err=True)
            return False

    def categorize_all(self, source: str = 'all', min_confidence: float = 0.7) -> Dict:
        """
        Kategoryzuje wszystkie pliki

        Args:
            source: 'spotify', 'beatport', 'discogs', 'all'
            min_confidence: Minimalny poziom pewności (0.0-1.0)
        """
        if not self.files:
            self.scan_files()

        stats = {'categorized': 0, 'uncertain': 0, 'errors': 0}

        for filepath in tqdm(self.files, desc="Kategoryzacja gatunków", unit="plik"):
            try:
                # Sprawdź czy już ma gatunek
                current_genre = self.get_current_genre(filepath)

                # Pobierz metadane
                audio = MutagenFile(filepath, easy=True)
                if not audio:
                    stats['errors'] += 1
                    continue

                artist = audio.get('artist', [''])[0] or filepath.stem.split('-')[0].strip()
                title = audio.get('title', [''])[0] or filepath.stem

                # Wyszukaj gatunek
                genre_info = None

                if source in ['spotify', 'all'] and self.spotify:
                    genre_info = self.search_spotify_genre(artist, title)

                # Fallback: kategoryzacja po BPM
                if not genre_info or genre_info.get('confidence', 0) < min_confidence:
                    bpm_genre = self.categorize_by_bpm(filepath)
                    if bpm_genre:
                        genre_info = {
                            'genre': bpm_genre,
                            'confidence': 0.5,
                            'source': 'bpm_analysis'
                        }

                # Aktualizuj tag
                if genre_info and genre_info.get('confidence', 0) >= min_confidence:
                    if self.update_genre_tag(filepath, genre_info['genre']):
                        click.echo(f"✓ {filepath.name}: {genre_info['genre']} ({genre_info['source']})")
                        stats['categorized'] += 1
                    else:
                        stats['errors'] += 1
                else:
                    stats['uncertain'] += 1

                # Rate limiting dla API
                time.sleep(0.5)

            except Exception as e:
                click.echo(f"❌ Błąd {filepath.name}: {e}", err=True)
                stats['errors'] += 1

        return stats
