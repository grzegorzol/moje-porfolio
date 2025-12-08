# 📥 Instalacja Rekordbox Library Fixer

## Wymagania systemowe

- **Python 3.8+** (sprawdź: `python3 --version`)
- **pip** (menedżer pakietów Python)
- **Git** (opcjonalnie, do pobrania z GitHub)

---

## 🚀 Metoda 1: Automatyczna instalacja (Zalecana)

### Na Linux/macOS:

```bash
# Pobierz i uruchom skrypt instalacyjny
curl -sSL https://raw.githubusercontent.com/grzegorzol/moje-porfolio/claude/remove-music-duplicates-01PHcVXBxg2Yg7cRc7HVUaey/rekordbox-fixer/install.sh | bash
```

LUB jeśli masz już sklonowane repo:

```bash
cd /path/to/moje-porfolio/rekordbox-fixer
./install.sh
```

### Na Windows:

1. Otwórz PowerShell jako Administrator
2. Uruchom:

```powershell
# Pobierz instalator
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/grzegorzol/moje-porfolio/claude/remove-music-duplicates-01PHcVXBxg2Yg7cRc7HVUaey/rekordbox-fixer/install.sh" -OutFile "$env:TEMP\install.sh"

# Uruchom (wymaga Git Bash lub WSL)
bash $env:TEMP\install.sh
```

---

## 🔧 Metoda 2: Ręczna instalacja

### Krok 1: Pobierz kod

**Opcja A: Przez Git**
```bash
# Sklonuj repozytorium
git clone https://github.com/grzegorzol/moje-porfolio.git
cd moje-porfolio

# Przejdź do brancha z narzędziem
git checkout claude/remove-music-duplicates-01PHcVXBxg2Yg7cRc7HVUaey
cd rekordbox-fixer
```

**Opcja B: Pobierz ZIP**
1. Idź do: https://github.com/grzegorzol/moje-porfolio
2. Kliknij "Code" → "Download ZIP"
3. Rozpakuj i znajdź folder `rekordbox-fixer`

**Opcja C: Jeśli masz lokalnie**
```bash
# Jeśli folder już istnieje
cd /home/user/moje-porfolio/rekordbox-fixer
```

### Krok 2: Zainstaluj Python (jeśli nie masz)

**Windows:**
1. Pobierz z https://www.python.org/downloads/
2. Podczas instalacji zaznacz "Add Python to PATH"
3. Sprawdź: `python --version`

**macOS:**
```bash
# Przez Homebrew
brew install python3
```

**Linux (Debian/Ubuntu):**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

**Linux (Fedora/RHEL):**
```bash
sudo dnf install python3 python3-pip
```

### Krok 3: Zainstaluj zależności

```bash
# W folderze rekordbox-fixer
cd rekordbox-fixer

# Instalacja zależności
pip3 install -r requirements.txt

# LUB jeśli pip3 nie działa:
python3 -m pip install -r requirements.txt
```

### Krok 4: Sprawdź instalację

```bash
python3 rekordbox_fixer.py --version
python3 rekordbox_fixer.py --help
```

Jeśli widzisz pomoc CLI - **instalacja udana!** ✅

---

## 🔑 Krok 5: Konfiguracja API Keys (Opcjonalnie)

Dla pełnej funkcjonalności (metadane + gatunki):

```bash
# Skopiuj przykładowy plik konfiguracji
cp .env.example .env

# Edytuj plik .env
nano .env  # lub vim, lub notepad
```

Dodaj swoje klucze API:

### Spotify (do kategoryzacji gatunków):
1. Idź do: https://developer.spotify.com/dashboard
2. Zaloguj się / Utwórz konto
3. Kliknij "Create an App"
4. Skopiuj **Client ID** i **Client Secret**
5. Dodaj do `.env`:
   ```
   SPOTIFY_CLIENT_ID=twój_client_id_tutaj
   SPOTIFY_CLIENT_SECRET=twój_client_secret_tutaj
   ```

### Discogs (do metadanych):
1. Załóż konto: https://www.discogs.com
2. Idź do: Settings → Developers
3. Kliknij "Generate new token"
4. Skopiuj token
5. Dodaj do `.env`:
   ```
   DISCOGS_TOKEN=twój_token_tutaj
   ```

**Uwaga:** API keys są opcjonalne. Bez nich narzędzie nadal działa, ale:
- Bez Spotify: kategoryzacja gatunków tylko przez BPM
- Bez Discogs: metadane tylko z MusicBrainz

---

## ✅ Weryfikacja instalacji

Sprawdź czy wszystko działa:

```bash
# 1. Sprawdź wersję
python3 rekordbox_fixer.py --version

# 2. Sprawdź pomoc
python3 rekordbox_fixer.py --help

# 3. Sprawdź czy moduły działają
python3 -c "import mutagen, musicbrainzngs, spotipy; print('✅ Wszystkie moduły zainstalowane!')"
```

---

## 🎯 Pierwsze uruchomienie

### Test na małym folderze:

```bash
# Utwórz folder testowy
mkdir ~/music_test
# Skopiuj kilka plików MP3 do ~/music_test

# Uruchom w trybie dry-run (bezpieczny test)
python3 rekordbox_fixer.py remove-duplicates ~/music_test --dry-run
```

### Pełny proces:

```bash
# Zastąp /ścieżka/do/muzyki swoją rzeczywistą ścieżką
python3 rekordbox_fixer.py full-process /ścieżka/do/muzyki --all-steps
```

---

## ❓ Rozwiązywanie problemów

### Problem: "python3: command not found"

**Rozwiązanie:**
```bash
# Spróbuj bez "3"
python --version

# Jeśli to działa, użyj "python" zamiast "python3"
python rekordbox_fixer.py --help
```

### Problem: "pip3: command not found"

**Rozwiązanie:**
```bash
# Spróbuj:
python3 -m pip install -r requirements.txt

# LUB
python -m pip install -r requirements.txt
```

### Problem: "Permission denied"

**Linux/macOS:**
```bash
# Dodaj uprawnienia
chmod +x rekordbox_fixer.py
chmod +x rbfixer.sh

# LUB uruchom z sudo (tylko dla instalacji pip)
sudo pip3 install -r requirements.txt
```

**Windows:**
```powershell
# Uruchom PowerShell jako Administrator
```

### Problem: Błędy instalacji pakietów

**Spróbuj zaktualizować pip:**
```bash
pip3 install --upgrade pip
pip3 install -r requirements.txt
```

### Problem: "ModuleNotFoundError: No module named 'mutagen'"

**Rozwiązanie:**
```bash
# Zainstaluj ponownie zależności
pip3 install --force-reinstall -r requirements.txt
```

---

## 🌐 Wsparcie dla różnych systemów

### Windows 10/11
- ✅ Python 3.8+ z python.org
- ✅ PowerShell / CMD / Git Bash
- ✅ WSL2 (Ubuntu)

### macOS 10.15+
- ✅ Python 3.8+ (system lub Homebrew)
- ✅ Terminal.app / iTerm2

### Linux
- ✅ Ubuntu 20.04+
- ✅ Debian 10+
- ✅ Fedora 34+
- ✅ Arch Linux

---

## 📂 Struktura po instalacji

```
~/rekordbox-fixer/          # LUB twoja lokalizacja
├── rekordbox_fixer.py      # Główny skrypt
├── rbfixer.sh              # Skrypt pomocniczy (Linux/macOS)
├── requirements.txt        # Zależności
├── README.md               # Pełna dokumentacja
├── QUICKSTART.md          # Szybki start
├── INSTALL.md             # Ten plik
├── .env.example           # Przykład konfiguracji
├── .env                   # Twoja konfiguracja (stwórz ręcznie)
├── modules/               # Moduły Python
└── exports/               # Wygenerowane pliki (po użyciu)
```

---

## 🚀 Gotowy do użycia?

Przejdź do **QUICKSTART.md** dla przykładów użycia!

```bash
cat QUICKSTART.md
```

LUB sprawdź pełną dokumentację:

```bash
cat README.md
```

---

## 💡 Pro Tips

1. **Używaj virtual environment** (opcjonalnie, ale zalecane):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   pip install -r requirements.txt
   ```

2. **Dodaj alias** dla wygody:
   ```bash
   # W ~/.bashrc lub ~/.zshrc
   alias rbfixer="python3 ~/rekordbox-fixer/rekordbox_fixer.py"

   # Potem możesz używać:
   rbfixer remove-duplicates ~/Music
   ```

3. **Testuj na kopii** przed użyciem na produkcyjnej bibliotece

---

Potrzebujesz pomocy? Sprawdź README.md lub utwórz issue na GitHub! 🎵
