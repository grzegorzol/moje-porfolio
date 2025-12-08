#!/usr/bin/env python3
"""
Rekordbox Library Fixer - Narzędzie do porządkowania biblioteki Rekordbox
"""
import click
import os
import sys
from pathlib import Path
from modules.duplicate_remover import DuplicateRemover
from modules.metadata_updater import MetadataUpdater
from modules.genre_categorizer import GenreCategorizer
from modules.playlist_manager import PlaylistManager

__version__ = "1.0.0"

@click.group()
@click.version_option(version=__version__)
def cli():
    """
    🎵 Rekordbox Library Fixer

    Narzędzie do porządkowania biblioteki Rekordbox:
    - Usuwanie duplikatów
    - Aktualizacja metadanych (tagi, okładki)
    - Kategoryzacja gatunków
    - Zarządzanie playlistami
    """
    pass

@cli.command()
@click.argument('music_dir', type=click.Path(exists=True))
@click.option('--dry-run', is_flag=True, help='Tylko pokaż duplikaty bez usuwania')
@click.option('--method', type=click.Choice(['filename', 'metadata', 'fingerprint']),
              default='metadata', help='Metoda wykrywania duplikatów')
@click.option('--interactive', is_flag=True, help='Interaktywny wybór plików do usunięcia')
def remove_duplicates(music_dir, dry_run, method, interactive):
    """
    Usuwa duplikaty z biblioteki muzycznej.

    MUSIC_DIR: Ścieżka do folderu z muzyką
    """
    click.echo(f"🔍 Skanowanie: {music_dir}")
    click.echo(f"📋 Metoda: {method}")

    remover = DuplicateRemover(music_dir)
    duplicates = remover.find_duplicates(method=method)

    if not duplicates:
        click.echo("✅ Nie znaleziono duplikatów!")
        return

    click.echo(f"\n⚠️  Znaleziono {len(duplicates)} grup duplikatów")
    remover.display_duplicates(duplicates)

    if dry_run:
        click.echo("\n🔍 Tryb dry-run - żadne pliki nie zostały usunięte")
        return

    if interactive:
        remover.remove_duplicates_interactive(duplicates)
    else:
        if click.confirm('\n❓ Czy chcesz usunąć duplikaty automatycznie?'):
            removed = remover.remove_duplicates_auto(duplicates)
            click.echo(f"\n✅ Usunięto {removed} plików")

@cli.command()
@click.argument('music_dir', type=click.Path(exists=True))
@click.option('--source', type=click.Choice(['musicbrainz', 'discogs', 'all']),
              default='all', help='Źródło metadanych')
@click.option('--fetch-covers', is_flag=True, help='Pobierz okładki albumów')
@click.option('--overwrite', is_flag=True, help='Nadpisz istniejące tagi')
def update_metadata(music_dir, source, fetch_covers, overwrite):
    """
    Aktualizuje metadane (tagi ID3) z zewnętrznych baz danych.

    MUSIC_DIR: Ścieżka do folderu z muzyką
    """
    click.echo(f"🔍 Aktualizacja metadanych z: {source}")

    updater = MetadataUpdater(music_dir)
    stats = updater.update_all(source=source, fetch_covers=fetch_covers, overwrite=overwrite)

    click.echo(f"\n✅ Zaktualizowano: {stats['updated']}")
    click.echo(f"⏭️  Pominięto: {stats['skipped']}")
    click.echo(f"❌ Błędy: {stats['errors']}")

@cli.command()
@click.argument('music_dir', type=click.Path(exists=True))
@click.option('--source', type=click.Choice(['beatport', 'spotify', 'discogs', 'all']),
              default='all', help='Źródło kategoryzacji')
@click.option('--confidence', type=float, default=0.7,
              help='Minimalny poziom pewności (0.0-1.0)')
def categorize_genres(music_dir, source, confidence):
    """
    Kategoryzuje pliki według gatunków muzycznych.

    MUSIC_DIR: Ścieżka do folderu z muzyką
    """
    click.echo(f"🎸 Kategoryzacja gatunków z: {source}")

    categorizer = GenreCategorizer(music_dir)
    stats = categorizer.categorize_all(source=source, min_confidence=confidence)

    click.echo(f"\n✅ Skategoryzowano: {stats['categorized']}")
    click.echo(f"❓ Niepewne: {stats['uncertain']}")
    click.echo(f"❌ Błędy: {stats['errors']}")

@cli.command()
@click.argument('music_dir', type=click.Path(exists=True))
@click.option('--by-genre', is_flag=True, help='Utwórz playlisty według gatunków')
@click.option('--export-format', type=click.Choice(['m3u', 'rekordbox-xml']),
              default='m3u', help='Format eksportu playlist')
@click.option('--output-dir', type=click.Path(), default='./exports/playlists',
              help='Katalog do eksportu playlist')
def create_playlists(music_dir, by_genre, export_format, output_dir):
    """
    Tworzy playlisty na podstawie metadanych.

    MUSIC_DIR: Ścieżka do folderu z muzyką
    """
    click.echo(f"📝 Tworzenie playlist...")

    manager = PlaylistManager(music_dir)

    if by_genre:
        playlists = manager.create_genre_playlists()
        click.echo(f"\n✅ Utworzono {len(playlists)} playlist według gatunków")

    # Export playlists
    os.makedirs(output_dir, exist_ok=True)
    manager.export_playlists(output_dir, format=export_format)
    click.echo(f"💾 Wyeksportowano do: {output_dir}")

@cli.command()
@click.argument('music_dir', type=click.Path(exists=True))
@click.option('--all-steps', is_flag=True, help='Wykonaj wszystkie kroki automatycznie')
def full_process(music_dir, all_steps):
    """
    Pełny proces porządkowania biblioteki (wszystkie kroki).

    MUSIC_DIR: Ścieżka do folderu z muzyką
    """
    click.echo("🚀 Rozpoczynam pełny proces porządkowania...\n")

    # Step 1: Remove duplicates
    click.echo("=" * 60)
    click.echo("KROK 1/4: Usuwanie duplikatów")
    click.echo("=" * 60)
    ctx = click.get_current_context()
    ctx.invoke(remove_duplicates, music_dir=music_dir, dry_run=False,
               method='metadata', interactive=not all_steps)

    # Step 2: Update metadata
    click.echo("\n" + "=" * 60)
    click.echo("KROK 2/4: Aktualizacja metadanych")
    click.echo("=" * 60)
    ctx.invoke(update_metadata, music_dir=music_dir, source='all',
               fetch_covers=True, overwrite=False)

    # Step 3: Categorize genres
    click.echo("\n" + "=" * 60)
    click.echo("KROK 3/4: Kategoryzacja gatunków")
    click.echo("=" * 60)
    ctx.invoke(categorize_genres, music_dir=music_dir, source='all', confidence=0.7)

    # Step 4: Create playlists
    click.echo("\n" + "=" * 60)
    click.echo("KROK 4/4: Tworzenie playlist")
    click.echo("=" * 60)
    ctx.invoke(create_playlists, music_dir=music_dir, by_genre=True,
               export_format='m3u', output_dir='./exports/playlists')

    click.echo("\n" + "=" * 60)
    click.echo("✅ Proces zakończony!")
    click.echo("=" * 60)

if __name__ == '__main__':
    cli()
