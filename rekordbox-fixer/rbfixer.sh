#!/bin/bash
# Rekordbox Fixer - Skrypt startowy

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PYTHON_SCRIPT="$SCRIPT_DIR/rekordbox_fixer.py"

# Sprawdź czy Python jest zainstalowany
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 nie jest zainstalowany!"
    exit 1
fi

# Sprawdź czy zależności są zainstalowane
if ! python3 -c "import mutagen" &> /dev/null; then
    echo "⚠️  Brak zależności. Instaluję..."
    pip3 install -r "$SCRIPT_DIR/requirements.txt"
fi

# Uruchom skrypt z przekazanymi argumentami
python3 "$PYTHON_SCRIPT" "$@"
