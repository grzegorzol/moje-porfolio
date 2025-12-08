"""
Moduł do wykrywania i usuwania duplikatów plików audio
"""
import os
import hashlib
from pathlib import Path
from collections import defaultdict
from typing import List, Dict, Tuple
from mutagen import File as MutagenFile
from mutagen.easyid3 import EasyID3
from mutagen.mp3 import MP3
from tqdm import tqdm
from tabulate import tabulate
import click

class DuplicateRemover:
    """Klasa do wykrywania i usuwania duplikatów"""

    SUPPORTED_FORMATS = {'.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg'}

    def __init__(self, music_dir: str):
        self.music_dir = Path(music_dir)
        self.files = []

    def scan_files(self) -> List[Path]:
        """Skanuje katalog w poszukiwaniu plików audio"""
        click.echo("🔍 Skanowanie plików...")
        files = []

        for ext in self.SUPPORTED_FORMATS:
            files.extend(self.music_dir.rglob(f'*{ext}'))

        self.files = sorted(files)
        click.echo(f"📁 Znaleziono {len(self.files)} plików audio")
        return self.files

    def get_file_metadata(self, filepath: Path) -> Dict:
        """Pobiera metadane z pliku audio"""
        try:
            audio = MutagenFile(filepath, easy=True)
            if audio is None:
                return None

            # Próba pobrania podstawowych tagów
            artist = audio.get('artist', [''])[0] if audio.get('artist') else ''
            title = audio.get('title', [''])[0] if audio.get('title') else ''
            album = audio.get('album', [''])[0] if audio.get('album') else ''

            # Jeśli brak tagów, użyj nazwy pliku
            if not title:
                title = filepath.stem

            return {
                'path': filepath,
                'filename': filepath.name,
                'artist': artist.lower().strip(),
                'title': title.lower().strip(),
                'album': album.lower().strip(),
                'size': filepath.stat().st_size,
                'bitrate': getattr(audio.info, 'bitrate', 0) if hasattr(audio, 'info') else 0
            }
        except Exception as e:
            click.echo(f"⚠️  Błąd odczytu {filepath.name}: {e}", err=True)
            return None

    def find_duplicates_by_filename(self) -> Dict[str, List[Path]]:
        """Wykrywa duplikaty na podstawie nazwy pliku"""
        duplicates = defaultdict(list)

        for file in tqdm(self.files, desc="Analiza plików", unit="plik"):
            # Normalizuj nazwę: lowercase, bez rozszerzenia
            normalized_name = file.stem.lower()
            duplicates[normalized_name].append(file)

        # Zachowaj tylko te, które mają duplikaty
        return {k: v for k, v in duplicates.items() if len(v) > 1}

    def find_duplicates_by_metadata(self) -> Dict[str, List[Dict]]:
        """Wykrywa duplikaty na podstawie metadanych (artysta + tytuł)"""
        duplicates = defaultdict(list)

        for file in tqdm(self.files, desc="Analiza metadanych", unit="plik"):
            metadata = self.get_file_metadata(file)
            if not metadata:
                continue

            # Klucz: artysta + tytuł (znormalizowane)
            key = f"{metadata['artist']}||{metadata['title']}"

            # Pomijaj puste klucze
            if key.strip('|'):
                duplicates[key].append(metadata)

        # Zachowaj tylko te, które mają duplikaty
        return {k: v for k, v in duplicates.items() if len(v) > 1}

    def find_duplicates_by_hash(self) -> Dict[str, List[Path]]:
        """Wykrywa identyczne pliki na podstawie hasha MD5"""
        duplicates = defaultdict(list)

        for file in tqdm(self.files, desc="Obliczanie hashy", unit="plik"):
            file_hash = self._calculate_hash(file)
            if file_hash:
                duplicates[file_hash].append(file)

        return {k: v for k, v in duplicates.items() if len(v) > 1}

    def _calculate_hash(self, filepath: Path, chunk_size: int = 8192) -> str:
        """Oblicza hash MD5 pliku"""
        try:
            md5 = hashlib.md5()
            with open(filepath, 'rb') as f:
                while chunk := f.read(chunk_size):
                    md5.update(chunk)
            return md5.hexdigest()
        except Exception as e:
            click.echo(f"⚠️  Błąd hasha {filepath.name}: {e}", err=True)
            return None

    def find_duplicates(self, method: str = 'metadata') -> Dict:
        """
        Główna metoda wykrywania duplikatów

        Args:
            method: 'filename', 'metadata', 'hash', lub 'fingerprint'
        """
        if not self.files:
            self.scan_files()

        if method == 'filename':
            return self.find_duplicates_by_filename()
        elif method == 'metadata':
            return self.find_duplicates_by_metadata()
        elif method == 'hash':
            return self.find_duplicates_by_hash()
        elif method == 'fingerprint':
            # TODO: Implementacja audio fingerprinting
            click.echo("⚠️  Audio fingerprinting będzie dostępny w następnej wersji")
            return self.find_duplicates_by_metadata()
        else:
            raise ValueError(f"Nieznana metoda: {method}")

    def display_duplicates(self, duplicates: Dict):
        """Wyświetla znalezione duplikaty w czytelnej formie"""
        total_duplicates = sum(len(v) - 1 for v in duplicates.values())
        total_size = 0

        click.echo(f"\n📊 Statystyki duplikatów:")
        click.echo(f"   Grup duplikatów: {len(duplicates)}")
        click.echo(f"   Plików do usunięcia: {total_duplicates}")

        for i, (key, items) in enumerate(duplicates.items(), 1):
            click.echo(f"\n{'─' * 80}")
            click.echo(f"Grupa {i}/{len(duplicates)}: {key[:60]}...")
            click.echo(f"{'─' * 80}")

            # Przygotuj dane do tabeli
            table_data = []
            for idx, item in enumerate(items):
                if isinstance(item, dict):  # metadata method
                    path = item['path']
                    size_mb = item['size'] / (1024 * 1024)
                    bitrate = item['bitrate'] // 1000 if item['bitrate'] else 0
                    table_data.append([
                        idx + 1,
                        path.name,
                        f"{size_mb:.2f} MB",
                        f"{bitrate} kbps",
                        str(path.parent)[-40:]
                    ])
                    if idx > 0:  # Nie licząc pierwszego (oryginalnego)
                        total_size += item['size']
                else:  # filename method
                    size_mb = item.stat().st_size / (1024 * 1024)
                    table_data.append([
                        idx + 1,
                        item.name,
                        f"{size_mb:.2f} MB",
                        "N/A",
                        str(item.parent)[-40:]
                    ])
                    if idx > 0:
                        total_size += item.stat().st_size

            headers = ["#", "Nazwa pliku", "Rozmiar", "Bitrate", "Katalog"]
            click.echo(tabulate(table_data, headers=headers, tablefmt="simple"))

        # Podsumowanie
        click.echo(f"\n{'═' * 80}")
        click.echo(f"💾 Można zwolnić ~{total_size / (1024 * 1024):.2f} MB")
        click.echo(f"{'═' * 80}")

    def remove_duplicates_auto(self, duplicates: Dict, keep_strategy: str = 'highest_quality') -> int:
        """
        Automatycznie usuwa duplikaty

        Args:
            keep_strategy: 'highest_quality', 'newest', 'first'
        """
        removed_count = 0

        for key, items in tqdm(duplicates.items(), desc="Usuwanie duplikatów", unit="grupa"):
            if len(items) < 2:
                continue

            # Sortuj według strategii
            if keep_strategy == 'highest_quality':
                items_sorted = sorted(
                    items,
                    key=lambda x: (x.get('bitrate', 0) if isinstance(x, dict) else 0),
                    reverse=True
                )
            elif keep_strategy == 'newest':
                items_sorted = sorted(
                    items,
                    key=lambda x: (x['path'] if isinstance(x, dict) else x).stat().st_mtime,
                    reverse=True
                )
            else:  # first
                items_sorted = items

            # Zachowaj pierwszy, usuń resztę
            to_remove = items_sorted[1:]

            for item in to_remove:
                filepath = item['path'] if isinstance(item, dict) else item
                try:
                    filepath.unlink()
                    removed_count += 1
                    click.echo(f"🗑️  Usunięto: {filepath.name}")
                except Exception as e:
                    click.echo(f"❌ Błąd usuwania {filepath.name}: {e}", err=True)

        return removed_count

    def remove_duplicates_interactive(self, duplicates: Dict) -> int:
        """Interaktywne usuwanie duplikatów z wyborem użytkownika"""
        removed_count = 0

        for i, (key, items) in enumerate(duplicates.items(), 1):
            click.echo(f"\n{'─' * 80}")
            click.echo(f"Grupa {i}/{len(duplicates)}: {key[:60]}")
            click.echo(f"{'─' * 80}")

            # Wyświetl opcje
            for idx, item in enumerate(items):
                path = item['path'] if isinstance(item, dict) else item
                size = item['size'] if isinstance(item, dict) else path.stat().st_size
                bitrate = item.get('bitrate', 0) // 1000 if isinstance(item, dict) else 0

                click.echo(f"  [{idx + 1}] {path.name}")
                click.echo(f"      Rozmiar: {size / (1024 * 1024):.2f} MB, Bitrate: {bitrate} kbps")
                click.echo(f"      Ścieżka: {path}")

            # Pytaj użytkownika
            click.echo(f"\nWybierz pliki do USUNIĘCIA (np. 2,3) lub 'skip' aby pominąć:")
            choice = click.prompt("Wybór", default="skip")

            if choice.lower() == 'skip':
                continue

            # Parsuj wybór
            try:
                indices = [int(x.strip()) - 1 for x in choice.split(',')]
                for idx in indices:
                    if 0 <= idx < len(items):
                        filepath = items[idx]['path'] if isinstance(items[idx], dict) else items[idx]
                        filepath.unlink()
                        removed_count += 1
                        click.echo(f"✅ Usunięto: {filepath.name}")
            except Exception as e:
                click.echo(f"❌ Błąd: {e}", err=True)

        return removed_count
