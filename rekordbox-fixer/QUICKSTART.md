# 🚀 Szybki Start - Rekordbox Library Fixer

## Instalacja (raz)

```bash
# 1. Przejdź do katalogu
cd rekordbox-fixer

# 2. Zainstaluj zależności
pip3 install -r requirements.txt

# 3. (Opcjonalnie) Skonfiguruj API keys dla pełnych funkcji
cp .env.example .env
nano .env  # Edytuj i dodaj swoje klucze
```

## Użycie

### Metoda 1: Bezpośrednio przez Python

```bash
# Podstawowa składnia
python3 rekordbox_fixer.py <komenda> <ścieżka-do-muzyki> [opcje]
```

### Metoda 2: Przez skrypt pomocniczy

```bash
./rbfixer.sh <komenda> <ścieżka-do-muzyki> [opcje]
```

## 📝 Przykłady Użycia

### KROK 1: Usuń duplikaty (NAJWAŻNIEJSZE!)

**Najpierw testuj z dry-run:**
```bash
python3 rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki --dry-run
```

**Gdy jesteś pewny, usuń duplikaty:**
```bash
# Automatycznie (zachowa najwyższą jakość)
python3 rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki

# LUB interaktywnie (sam wybierasz)
python3 rekordbox_fixer.py remove-duplicates /ścieżka/do/muzyki --interactive
```

### KROK 2: Zaktualizuj metadane

```bash
# Pobierz tagi i okładki ze wszystkich źródeł
python3 rekordbox_fixer.py update-metadata /ścieżka/do/muzyki --source all --fetch-covers
```

### KROK 3: Kategoryzuj gatunki

```bash
# Z wykorzystaniem Spotify (wymaga API key)
python3 rekordbox_fixer.py categorize-genres /ścieżka/do/muzyki --source spotify

# LUB bez API (analiza BPM jako fallback)
python3 rekordbox_fixer.py categorize-genres /ścieżka/do/muzyki --source all
```

### KROK 4: Utwórz playlisty

```bash
# Playlisty według gatunków (format M3U)
python3 rekordbox_fixer.py create-playlists /ścieżka/do/muzyki --by-genre

# LUB w formacie Rekordbox XML
python3 rekordbox_fixer.py create-playlists /ścieżka/do/muzyki --by-genre --export-format rekordbox-xml
```

### BONUS: Wszystko naraz! 🎯

```bash
# Automatyczny pełny proces
python3 rekordbox_fixer.py full-process /ścieżka/do/muzyki --all-steps
```

## 🔑 API Keys (Opcjonalne, ale zalecane)

### Spotify (dla kategoryzacji gatunków)

1. Idź do: https://developer.spotify.com/dashboard
2. Utwórz aplikację
3. Skopiuj Client ID i Client Secret
4. Dodaj do `.env`:
   ```
   SPOTIFY_CLIENT_ID=twój_client_id
   SPOTIFY_CLIENT_SECRET=twój_client_secret
   ```

### Discogs (dla metadanych)

1. Załóż konto: https://www.discogs.com
2. Idź do Settings → Developers
3. Wygeneruj Personal Access Token
4. Dodaj do `.env`:
   ```
   DISCOGS_TOKEN=twój_token
   ```

## 📍 Gdzie są moje pliki muzyczne?

Typowe lokalizacje:

**Windows:**
- `C:\Users\TwojeImię\Music\DJ`
- `D:\Music`

**macOS:**
- `~/Music/DJ`
- `/Volumes/External/Music`

**Linux:**
- `~/Music`
- `/mnt/music`

## ⚡ Szybkie Polecenia

```bash
# Tylko duplikaty (suchy test)
python3 rekordbox_fixer.py remove-duplicates ~/Music/DJ --dry-run

# Usuń duplikaty + zaktualizuj metadane
python3 rekordbox_fixer.py remove-duplicates ~/Music/DJ && \
python3 rekordbox_fixer.py update-metadata ~/Music/DJ --source all --fetch-covers

# Pełny pipeline w jednej komendzie
python3 rekordbox_fixer.py full-process ~/Music/DJ --all-steps
```

## ❓ Pytania?

- Pomoc ogólna: `python3 rekordbox_fixer.py --help`
- Pomoc dla komendy: `python3 rekordbox_fixer.py <komenda> --help`
- Problemy? Sprawdź README.md

## 💡 Pro Tips

1. **Zawsze rób backup przed usuwaniem duplikatów!**
2. Zacznij od małego folderu testowego
3. Użyj `--dry-run` przed każdą destruktywną operacją
4. Pliki w Rekordbox muszą być zaimportowane ponownie po zmianach
5. Dla najlepszych wyników, skonfiguruj wszystkie API keys

---

🎵 **Gotowy do uporządkowania swojej biblioteki? Powodzenia!**
