"""
Moduł do aktualizacji metadanych z zewnętrznych baz danych
"""
import os
import time
from pathlib import Path
from typing import Dict, List, Optional
from mutagen import File as MutagenFile
from mutagen.id3 import ID3, APIC, TIT2, TPE1, TALB, TDRC, TCON
from mutagen.mp3 import MP3
import musicbrainzngs
import discogs_client
import requests
from tqdm import tqdm
import click

class MetadataUpdater:
    """Klasa do aktualizacji metadanych z MusicBrainz, Discogs, etc."""

    def __init__(self, music_dir: str):
        self.music_dir = Path(music_dir)
        self.files = []

        # Konfiguracja MusicBrainz
        musicbrainzngs.set_useragent(
            "RekordboxFixer",
            "1.0",
            "https://github.com/yourrepo/rekordbox-fixer"
        )

        # Discogs - wymaga tokenu (opcjonalnie)
        self.discogs = None
        discogs_token = os.getenv('DISCOGS_TOKEN')
        if discogs_token:
            self.discogs = discogs_client.Client('RekordboxFixer/1.0', user_token=discogs_token)

    def scan_files(self) -> List[Path]:
        """Skanuje pliki audio"""
        click.echo("🔍 Skanowanie plików...")
        files = []
        for ext in ['.mp3', '.wav', '.flac', '.m4a']:
            files.extend(self.music_dir.rglob(f'*{ext}'))
        self.files = sorted(files)
        click.echo(f"📁 Znaleziono {len(self.files)} plików")
        return self.files

    def get_current_metadata(self, filepath: Path) -> Dict:
        """Pobiera obecne metadane z pliku"""
        try:
            audio = MutagenFile(filepath, easy=True)
            if not audio:
                return {}

            return {
                'artist': audio.get('artist', [''])[0],
                'title': audio.get('title', [''])[0],
                'album': audio.get('album', [''])[0],
                'date': audio.get('date', [''])[0],
                'genre': audio.get('genre', [''])[0],
            }
        except Exception as e:
            click.echo(f"⚠️  Błąd odczytu {filepath.name}: {e}", err=True)
            return {}

    def search_musicbrainz(self, artist: str, title: str) -> Optional[Dict]:
        """Wyszukuje metadane w MusicBrainz"""
        try:
            # Wyszukaj nagranie
            result = musicbrainzngs.search_recordings(
                artist=artist,
                recording=title,
                limit=1
            )

            if result['recording-list']:
                recording = result['recording-list'][0]

                metadata = {
                    'title': recording.get('title', ''),
                    'artist': recording.get('artist-credit-phrase', artist),
                    'source': 'musicbrainz'
                }

                # Pobierz dodatkowe info o wydaniu (album, data, okładka)
                if 'release-list' in recording and recording['release-list']:
                    release = recording['release-list'][0]
                    metadata['album'] = release.get('title', '')
                    metadata['date'] = release.get('date', '')

                    # Pobierz ID wydania dla okładki
                    release_id = release.get('id')
                    if release_id:
                        metadata['cover_url'] = f"https://coverartarchive.org/release/{release_id}/front"

                return metadata

            return None

        except musicbrainzngs.WebServiceError as e:
            click.echo(f"⚠️  MusicBrainz error: {e}", err=True)
            return None
        except Exception as e:
            click.echo(f"⚠️  Błąd wyszukiwania: {e}", err=True)
            return None

    def search_discogs(self, artist: str, title: str) -> Optional[Dict]:
        """Wyszukuje metadane w Discogs"""
        if not self.discogs:
            return None

        try:
            results = self.discogs.search(f"{artist} {title}", type='release')

            if results:
                release = results[0]

                metadata = {
                    'title': release.title,
                    'artist': ', '.join([a.name for a in release.artists]) if hasattr(release, 'artists') else artist,
                    'album': release.title,
                    'date': str(release.year) if hasattr(release, 'year') else '',
                    'genre': ', '.join(release.genres) if hasattr(release, 'genres') else '',
                    'source': 'discogs'
                }

                # Okładka
                if hasattr(release, 'images') and release.images:
                    metadata['cover_url'] = release.images[0]['uri']

                return metadata

            return None

        except Exception as e:
            click.echo(f"⚠️  Discogs error: {e}", err=True)
            return None

    def download_cover(self, url: str, filepath: Path) -> Optional[bytes]:
        """Pobiera okładkę albumu"""
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.content
        except Exception as e:
            click.echo(f"⚠️  Błąd pobierania okładki: {e}", err=True)
            return None

    def update_file_metadata(self, filepath: Path, metadata: Dict, fetch_cover: bool = True) -> bool:
        """Aktualizuje metadane w pliku"""
        try:
            audio = MP3(filepath, ID3=ID3)

            # Dodaj ID3 tag jeśli nie istnieje
            try:
                audio.add_tags()
            except:
                pass

            # Aktualizuj podstawowe tagi
            if metadata.get('title'):
                audio['TIT2'] = TIT2(encoding=3, text=metadata['title'])
            if metadata.get('artist'):
                audio['TPE1'] = TPE1(encoding=3, text=metadata['artist'])
            if metadata.get('album'):
                audio['TALB'] = TALB(encoding=3, text=metadata['album'])
            if metadata.get('date'):
                audio['TDRC'] = TDRC(encoding=3, text=metadata['date'])
            if metadata.get('genre'):
                audio['TCON'] = TCON(encoding=3, text=metadata['genre'])

            # Dodaj okładkę
            if fetch_cover and metadata.get('cover_url'):
                cover_data = self.download_cover(metadata['cover_url'], filepath)
                if cover_data:
                    audio['APIC'] = APIC(
                        encoding=3,
                        mime='image/jpeg',
                        type=3,  # Cover (front)
                        desc='Cover',
                        data=cover_data
                    )

            audio.save()
            return True

        except Exception as e:
            click.echo(f"❌ Błąd zapisu {filepath.name}: {e}", err=True)
            return False

    def update_all(self, source: str = 'all', fetch_covers: bool = True, overwrite: bool = False) -> Dict:
        """
        Aktualizuje wszystkie pliki

        Args:
            source: 'musicbrainz', 'discogs', lub 'all'
            fetch_covers: Czy pobierać okładki
            overwrite: Czy nadpisywać istniejące tagi
        """
        if not self.files:
            self.scan_files()

        stats = {'updated': 0, 'skipped': 0, 'errors': 0}

        for filepath in tqdm(self.files, desc="Aktualizacja metadanych", unit="plik"):
            current = self.get_current_metadata(filepath)

            # Pomiń jeśli ma pełne metadane i nie nadpisujemy
            if not overwrite and current.get('artist') and current.get('title') and current.get('album'):
                stats['skipped'] += 1
                continue

            artist = current.get('artist') or filepath.stem.split('-')[0].strip()
            title = current.get('title') or filepath.stem

            # Wyszukaj w bazach
            new_metadata = None

            if source in ['musicbrainz', 'all']:
                new_metadata = self.search_musicbrainz(artist, title)
                if new_metadata:
                    click.echo(f"✓ MusicBrainz: {filepath.name}")

            if not new_metadata and source in ['discogs', 'all']:
                new_metadata = self.search_discogs(artist, title)
                if new_metadata:
                    click.echo(f"✓ Discogs: {filepath.name}")

            # Aktualizuj plik
            if new_metadata:
                if self.update_file_metadata(filepath, new_metadata, fetch_covers):
                    stats['updated'] += 1
                else:
                    stats['errors'] += 1
            else:
                stats['skipped'] += 1

            # Rate limiting
            time.sleep(1)  # 1 sekunda między requestami

        return stats
