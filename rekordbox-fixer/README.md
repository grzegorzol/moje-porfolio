# 🎵 Rekordbox Library Fixer

Kompletne narzędzie CLI do porządkowania biblioteki muzycznej Rekordbox 6/7.

## ✨ Funkcje

### 1. 🗑️ Usuwanie Duplikatów
- Wykrywanie duplikatów na podstawie:
  - Nazwy pliku
  - Metadanych (artysta + tytuł)
  - Audio fingerprinting (opcjonalnie)
- Tryb dry-run (podgląd bez usuwania)
- Tryb interaktywny (wybór plików do usunięcia)
- Automatyczne usuwanie z inteligentną strategią

### 2. 🏷️ Aktualizacja Metadanych
- Pobieranie tagów ID3 z:
  - MusicBrainz
  - Discogs
  - FreeDB (poprzez MusicBrainz)
- Automatyczne pobieranie okładek albumów
- Zachowanie istniejących danych (opcjonalne nadpisywanie)

### 3. 🎸 Kategoryzacja Gatunków
- Automatyczna kategoryzacja z:
  - Spotify API
  - Beatport (planowane)
  - Discogs
- Analiza BPM jako fallback
- Normalizacja do standardowych kategorii

### 4. 📝 Zarządzanie Playlistami
- Automatyczne tworzenie playlist według:
  - Gatunków
  - Artystów
  - Albumów
- Eksport do formatów:
  - M3U/M3U8
  - Rekordbox XML

## 📦 Instalacja

### Wymagania
- Python 3.8+
- Rekordbox 6 lub 7

### Instalacja zależności

```bash
cd rekordbox-fixer
pip install -r requirements.txt
```

### Opcjonalne: API Keys

Dla pełnej funkcjonalności, ustaw zmienne środowiskowe:

```bash
# Discogs
export DISCOGS_TOKEN="your_discogs_token"

# Spotify
export SPOTIFY_CLIENT_ID="your_spotify_client_id"
export SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
```

#### Jak uzyskać tokeny:

**Discogs:**
1. Załóż konto na https://www.discogs.com
2. Przejdź do Settings → Developers
3. Wygeneruj nowy Personal Access Token

**Spotify:**
1. Załóż konto na https://developer.spotify.com
2. Utwórz nową aplikację w Dashboard
3. Skopiuj Client ID i Client Secret

## 🚀 Użycie

### Pomoc

```bash
python rekordbox_fixer.py --help
```

### 1. Usuwanie Duplikatów

```bash
# Podgląd (dry-run)
python rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki --dry-run

# Automatyczne usuwanie (najwyższa jakość)
python rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki

# Tryb interaktywny
python rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki --interactive

# Inna metoda wykrywania
python rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki --method filename
```

**Metody wykrywania:**
- `metadata` (domyślna) - artysta + tytuł z tagów
- `filename` - nazwa pliku
- `hash` - identyczny hash MD5 (najbardziej pewne)

### 2. Aktualizacja Metadanych

```bash
# Ze wszystkich źródeł (MusicBrainz + Discogs)
python rekordbox_fixer.py update-metadata /ścieżka/do/muzyki --source all --fetch-covers

# Tylko MusicBrainz
python rekordbox_fixer.py update-metadata /ścieżka/do/muzyki --source musicbrainz

# Nadpisz istniejące tagi
python rekordbox_fixer.py update-metadata /ścieżka/do/muzyki --overwrite
```

### 3. Kategoryzacja Gatunków

```bash
# Ze wszystkich źródeł
python rekordbox_fixer.py categorize-genres /ścieżka/do/muzyki --source all

# Tylko Spotify
python rekordbox_fixer.py categorize-genres /ścieżka/do/muzyki --source spotify

# Z niższym progiem pewności (więcej wyników, mniejsza dokładność)
python rekordbox_fixer.py categorize-genres /ścieżka/do/muzyki --confidence 0.5
```

### 4. Tworzenie Playlist

```bash
# Playlisty według gatunków
python rekordbox_fixer.py create-playlists /ścieżka/do/muzyki --by-genre

# Eksport do Rekordbox XML
python rekordbox_fixer.py create-playlists /ścieżka/do/muzyki --by-genre --export-format rekordbox-xml

# Własny katalog wyjściowy
python rekordbox_fixer.py create-playlists /ścieżka/do/muzyki --by-genre --output-dir ./moje-playlisty
```

### 5. Pełny Proces (wszystkie kroki)

```bash
# Automatyczny pełny proces
python rekordbox_fixer.py full-process /ścieżka/do/muzyki --all-steps

# Z interaktywnymi krokami
python rekordbox_fixer.py full-process /ścieżka/do/muzyki
```

## 📊 Przykładowy Workflow

```bash
# Krok 1: Usuń duplikaty (podgląd)
python rekordbox_fixer.py remove-duplicates ~/Music/DJ --dry-run

# Krok 2: Usuń duplikaty (na pewno)
python rekordbox_fixer.py remove-duplicates ~/Music/DJ

# Krok 3: Zaktualizuj metadane
python rekordbox_fixer.py update-metadata ~/Music/DJ --source all --fetch-covers

# Krok 4: Kategoryzuj gatunki
python rekordbox_fixer.py categorize-genres ~/Music/DJ --source spotify

# Krok 5: Utwórz playlisty
python rekordbox_fixer.py create-playlists ~/Music/DJ --by-genre --export-format m3u
```

## 🔧 Struktura Projektu

```
rekordbox-fixer/
├── rekordbox_fixer.py          # Główny plik CLI
├── requirements.txt            # Zależności
├── README.md                   # Dokumentacja
├── modules/
│   ├── duplicate_remover.py    # Moduł usuwania duplikatów
│   ├── metadata_updater.py     # Moduł metadanych
│   ├── genre_categorizer.py    # Moduł kategoryzacji
│   └── playlist_manager.py     # Moduł playlist
├── exports/                    # Wygenerowane pliki
│   └── playlists/             # Eksportowane playlisty
└── tests/                      # Testy (TODO)
```

## ⚠️ Ważne Uwagi

1. **Backup!** - Zawsze rób kopię zapasową biblioteki przed usuwaniem duplikatów
2. **Rate Limiting** - API mają limity zapytań (1 zapytanie/sekundę dla MusicBrainz)
3. **Prywatność** - Wszystko działa lokalnie, żadne dane nie są wysyłane poza API metadanych
4. **Rekordbox XML** - Po wygenerowaniu XML, zaimportuj go przez Rekordbox → File → Import Collection

## 🛠️ Rozwój

### Planowane funkcje:
- [ ] Audio fingerprinting (Chromaprint/AcoustID)
- [ ] Beatport API integration
- [ ] Obsługa bazy SQLite Rekordbox (bezpośredni dostęp)
- [ ] GUI (Electron/PyQt)
- [ ] Analiza duplikatów audio (podobne utwory, różne wersje)
- [ ] Batch processing z wielowątkowością

## 📝 Licencja

MIT License - możesz używać tego narzędzia dowolnie.

## 🤝 Wsparcie

Jeśli napotkasz problemy:
1. Sprawdź czy masz najnowsze wersje bibliotek
2. Upewnij się że pliki audio nie są uszkodzone
3. Sprawdź uprawnienia do plików
4. Dla problemów z API - zweryfikuj tokeny

## 💡 Tips & Tricks

### Najlepsze praktyki:

1. **Zacznij od dry-run** - zawsze najpierw sprawdź co zostanie usunięte
2. **Testuj na małym zbiorze** - przed przetworzeniem całej biblioteki
3. **Używaj interaktywnego trybu** - dla ważnych plików
4. **Regularnie rób backup** - przed każdą większą operacją

### Optymalizacja:

- Dla dużych bibliotek (>10k plików) rozważ przetwarzanie w mniejszych częściach
- API keys znacznie przyspieszają pobieranie metadanych
- Cache'owanie wyników (TODO) przyspieszy powtórne przetwarzanie

---

Stworzono z ❤️ dla społeczności DJ i producentów muzycznych
