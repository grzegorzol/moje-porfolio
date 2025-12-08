"""
Moduł do zarządzania playlistami
"""
import os
from pathlib import Path
from typing import Dict, List
from collections import defaultdict
from mutagen import File as MutagenFile
from tqdm import tqdm
import click
import xml.etree.ElementTree as ET
from xml.dom import minidom

class PlaylistManager:
    """Klasa do tworzenia i eksportowania playlist"""

    def __init__(self, music_dir: str):
        self.music_dir = Path(music_dir)
        self.files = []
        self.playlists = {}

    def scan_files(self) -> List[Path]:
        """Skanuje pliki audio"""
        click.echo("🔍 Skanowanie plików...")
        files = []
        for ext in ['.mp3', '.wav', '.flac', '.m4a']:
            files.extend(self.music_dir.rglob(f'*{ext}'))
        self.files = sorted(files)
        click.echo(f"📁 Znaleziono {len(self.files)} plików")
        return self.files

    def get_file_metadata(self, filepath: Path) -> Dict:
        """Pobiera metadane z pliku"""
        try:
            audio = MutagenFile(filepath, easy=True)
            if not audio:
                return {}

            return {
                'path': filepath,
                'artist': audio.get('artist', [''])[0],
                'title': audio.get('title', [''])[0],
                'album': audio.get('album', [''])[0],
                'genre': audio.get('genre', [''])[0],
            }
        except:
            return {'path': filepath}

    def create_genre_playlists(self) -> Dict[str, List[Path]]:
        """Tworzy playlisty na podstawie gatunków"""
        if not self.files:
            self.scan_files()

        genre_playlists = defaultdict(list)

        click.echo("🎸 Grupowanie według gatunków...")
        for filepath in tqdm(self.files, desc="Analiza", unit="plik"):
            metadata = self.get_file_metadata(filepath)
            genre = metadata.get('genre', 'Unknown').strip()

            if genre:
                # Normalizuj nazwę gatunku
                genre_normalized = genre.lower().replace(' ', '_')
                genre_playlists[genre_normalized].append(filepath)

        self.playlists = dict(genre_playlists)
        return self.playlists

    def create_artist_playlists(self, min_tracks: int = 3) -> Dict[str, List[Path]]:
        """Tworzy playlisty na podstawie artystów (tylko ci z >min_tracks utworów)"""
        if not self.files:
            self.scan_files()

        artist_playlists = defaultdict(list)

        click.echo("👥 Grupowanie według artystów...")
        for filepath in tqdm(self.files, desc="Analiza", unit="plik"):
            metadata = self.get_file_metadata(filepath)
            artist = metadata.get('artist', 'Unknown').strip()

            if artist:
                artist_playlists[artist].append(filepath)

        # Filtruj artystów z mniejszą liczbą utworów
        filtered = {k: v for k, v in artist_playlists.items() if len(v) >= min_tracks}

        self.playlists = filtered
        return self.playlists

    def create_album_playlists(self) -> Dict[str, List[Path]]:
        """Tworzy playlisty na podstawie albumów"""
        if not self.files:
            self.scan_files()

        album_playlists = defaultdict(list)

        click.echo("💿 Grupowanie według albumów...")
        for filepath in tqdm(self.files, desc="Analiza", unit="plik"):
            metadata = self.get_file_metadata(filepath)
            album = metadata.get('album', 'Unknown').strip()

            if album:
                album_playlists[album].append(filepath)

        self.playlists = dict(album_playlists)
        return self.playlists

    def export_m3u(self, output_dir: Path):
        """Eksportuje playlisty do formatu M3U"""
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        click.echo(f"💾 Eksport do M3U: {output_dir}")

        for playlist_name, files in tqdm(self.playlists.items(), desc="Eksport", unit="playlist"):
            # Sanitize playlist name
            safe_name = "".join(c for c in playlist_name if c.isalnum() or c in (' ', '-', '_'))
            playlist_path = output_dir / f"{safe_name}.m3u"

            with open(playlist_path, 'w', encoding='utf-8') as f:
                f.write("#EXTM3U\n")
                for filepath in files:
                    # Pobierz metadane dla EXTINF
                    metadata = self.get_file_metadata(filepath)
                    artist = metadata.get('artist', 'Unknown')
                    title = metadata.get('title', filepath.stem)

                    f.write(f"#EXTINF:-1,{artist} - {title}\n")
                    f.write(f"{filepath.absolute()}\n")

            click.echo(f"✓ {safe_name}.m3u ({len(files)} utworów)")

    def export_rekordbox_xml(self, output_dir: Path):
        """Eksportuje playlisty do formatu XML Rekordbox"""
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        click.echo(f"💾 Eksport do Rekordbox XML: {output_dir}")

        # Główny element DJ_PLAYLISTS
        root = ET.Element('DJ_PLAYLISTS', Version='1.0.0')
        product = ET.SubElement(root, 'PRODUCT', Name='rekordbox', Version='6.0.0', Company='Pioneer DJ')

        # Collection - wszystkie utwory
        collection = ET.SubElement(root, 'COLLECTION', Entries=str(len(self.files)))

        track_id = 0
        track_map = {}  # filepath -> track_id

        for filepath in self.files:
            track_id += 1
            track_map[filepath] = track_id

            metadata = self.get_file_metadata(filepath)

            track = ET.SubElement(collection, 'TRACK',
                TrackID=str(track_id),
                Name=metadata.get('title', filepath.stem),
                Artist=metadata.get('artist', ''),
                Album=metadata.get('album', ''),
                Genre=metadata.get('genre', ''),
                Kind='MP3 File',
                Size=str(filepath.stat().st_size),
                Location=f"file://localhost{filepath.absolute()}"
            )

        # Playlists
        playlists_node = ET.SubElement(root, 'PLAYLISTS')

        for playlist_name, files in self.playlists.items():
            safe_name = "".join(c for c in playlist_name if c.isalnum() or c in (' ', '-', '_'))

            node = ET.SubElement(playlists_node, 'NODE',
                Type='1',
                Name=safe_name,
                Entries=str(len(files)),
                KeyType='0'
            )

            for filepath in files:
                if filepath in track_map:
                    ET.SubElement(node, 'TRACK', Key=str(track_map[filepath]))

        # Zapisz do pliku
        xml_path = output_dir / 'rekordbox_playlists.xml'
        xml_str = minidom.parseString(ET.tostring(root)).toprettyxml(indent="  ")

        with open(xml_path, 'w', encoding='utf-8') as f:
            f.write(xml_str)

        click.echo(f"✓ rekordbox_playlists.xml ({len(self.playlists)} playlist)")

    def export_playlists(self, output_dir: str, format: str = 'm3u'):
        """
        Eksportuje playlisty

        Args:
            output_dir: Katalog wyjściowy
            format: 'm3u' lub 'rekordbox-xml'
        """
        if not self.playlists:
            click.echo("⚠️  Brak playlist do eksportu. Najpierw utwórz playlisty.")
            return

        output_path = Path(output_dir)

        if format == 'm3u':
            self.export_m3u(output_path)
        elif format == 'rekordbox-xml':
            self.export_rekordbox_xml(output_path)
        else:
            click.echo(f"❌ Nieznany format: {format}")

    def display_playlists_stats(self):
        """Wyświetla statystyki playlist"""
        if not self.playlists:
            click.echo("Brak playlist")
            return

        click.echo(f"\n📊 Statystyki playlist:")
        click.echo(f"   Liczba playlist: {len(self.playlists)}")

        total_tracks = sum(len(tracks) for tracks in self.playlists.values())
        click.echo(f"   Łączna liczba utworów: {total_tracks}")

        click.echo(f"\n📋 Playlisty:")
        for name, tracks in sorted(self.playlists.items(), key=lambda x: len(x[1]), reverse=True):
            click.echo(f"   • {name}: {len(tracks)} utworów")
