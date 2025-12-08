#!/bin/bash
# Skrypt do pobrania i instalacji Rekordbox Library Fixer

echo "🎵 Rekordbox Library Fixer - Instalator"
echo "======================================="
echo ""

# Sprawdź Git
if ! command -v git &> /dev/null; then
    echo "❌ Git nie jest zainstalowany!"
    echo "Zainstaluj Git: https://git-scm.com/downloads"
    exit 1
fi

# Sprawdź Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 nie jest zainstalowany!"
    echo "Zainstaluj Python: https://www.python.org/downloads/"
    exit 1
fi

echo "✅ Git i Python są zainstalowane"
echo ""

# Utwórz katalog tymczasowy
TEMP_DIR=$(mktemp -d)
echo "📁 Pobieram kod do: $TEMP_DIR"

# Clone repo
cd "$TEMP_DIR"
git clone https://github.com/grzegorzol/moje-porfolio.git
cd moje-porfolio
git checkout claude/remove-music-duplicates-01PHcVXBxg2Yg7cRc7HVUaey

# Skopiuj tylko folder rekordbox-fixer
TARGET_DIR="$HOME/rekordbox-fixer"
echo "📦 Kopiuję pliki do: $TARGET_DIR"
cp -r rekordbox-fixer "$HOME/"

# Przejdź do katalogu docelowego
cd "$TARGET_DIR"

# Zainstaluj zależności
echo ""
echo "📥 Instaluję zależności..."
pip3 install -r requirements.txt

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Instalacja zakończona!"
echo ""
echo "🚀 Narzędzie znajduje się w: $TARGET_DIR"
echo ""
echo "Uruchom:"
echo "  cd $TARGET_DIR"
echo "  python3 rekordbox_fixer.py --help"
echo ""
echo "Dokumentacja: cat README.md"
echo "Szybki start: cat QUICKSTART.md"
