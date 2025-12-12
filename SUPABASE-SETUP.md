# 🗄️ Supabase Database Setup - Instrukcja

## 📋 Przegląd

Ten folder zawiera kompletny setup bazy danych Supabase dla Twojego portfolio.

## 🗃️ Pliki

- `supabase-schema-check.sql` - Sprawdzenie obecnego stanu bazy
- `supabase-schema-setup.sql` - **GŁÓWNY SKRYPT SETUP** (idempotentny)
- `supabase-schema-clean.sql` - Czyszczenie bazy (UWAGA: usuwa dane!)

## 🚀 Szybki Start

### Opcja 1: Bezpieczne uruchomienie (ZALECANE)

1. **Sprawdź obecny stan:**
   - Otwórz Supabase Dashboard → SQL Editor
   - Wklej zawartość `supabase-schema-check.sql`
   - Kliknij "Run"
   - Sprawdź wyniki - zobaczysz co już istnieje

2. **Uruchom główny setup:**
   - Otwórz `supabase-schema-setup.sql`
   - Skopiuj CAŁĄ zawartość
   - Wklej do SQL Editor w Supabase
   - Kliknij "Run"
   - Skrypt jest idempotentny - można go uruchamiać wielokrotnie!

### Opcja 2: Start od zera (jeśli chcesz wyczyścić bazę)

⚠️ **UWAGA: To usunie wszystkie dane!**

1. **Najpierw wyczyść bazę:**
   - Otwórz `supabase-schema-clean.sql`
   - Kliknij "Run"

2. **Potem uruchom setup:**
   - Otwórz `supabase-schema-setup.sql`
   - Kliknij "Run"

## 📊 Co zawiera schema?

### Tabele:

1. **`user_roles`** - Role użytkowników (admin, moderator, user)
2. **`site_settings`** - Ustawienia strony (menu, social media, logo)
3. **`blog_posts`** - Posty na blogu
4. **`projects`** - Portfolio projektów
5. **`services`** - Oferowane usługi
6. **`experiences`** - Doświadczenie zawodowe
7. **`pages`** - Dynamiczne strony (About, Contact, itp.)

### Bezpieczeństwo:

- ✅ Row Level Security (RLS) włączone na wszystkich tabelach
- ✅ Polityki dostępu:
  - Publiczny odczyt dla opublikowanej zawartości
  - Tylko admini/moderatorzy mogą edytować
- ✅ Storage bucket dla mediów z odpowiednimi politykami

### Funkcjonalności:

- ✅ Automatyczne timestampy (`created_at`, `updated_at`)
- ✅ Triggery do aktualizacji `updated_at`
- ✅ Indeksy dla szybszych zapytań
- ✅ Check constraints dla validacji danych
- ✅ Foreign keys dla integralności danych

## 🔐 Pierwszy Admin

Po uruchomieniu setupu musisz dodać swojego pierwszego użytkownika jako admin:

```sql
-- Znajdź swoje user_id
SELECT id, email FROM auth.users;

-- Dodaj rolę admin (zamień UUID na swoje)
INSERT INTO public.user_roles (user_id, role)
VALUES ('TWOJ-USER-UUID-TUTAJ', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

## 🐛 Rozwiązywanie problemów

### Błąd: "relation already exists"
✅ **Rozwiązanie:** Użyj `supabase-schema-setup.sql` - jest idempotentny i obsługuje istniejące tabele.

### Błąd: "duplicate key value violates unique constraint"
✅ **Rozwiązanie:** Element już istnieje. To jest OK - skrypt pomija duplikaty.

### Tabele są puste
✅ **Rozwiązanie:** To normalne po pierwszym setupie. Dodaj dane ręcznie lub przez admin panel.

### RLS blokuje dostęp
✅ **Rozwiązanie:** Upewnij się że:
1. Użytkownik jest zalogowany (dla operacji zapisu)
2. Użytkownik ma odpowiednią rolę w `user_roles`
3. Status contentu to 'published' (dla publicznego odczytu)

## 📝 Kolejne kroki

Po uruchomieniu setupu:

1. ✅ Dodaj pierwszego admina (patrz wyżej)
2. ✅ Przetestuj połączenie z aplikacją Next.js
3. ✅ Dodaj przykładowe dane testowe
4. ✅ Skonfiguruj Environment Variables w `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=twoj-projekt-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj-anon-key
   ```

## 🔄 Aktualizacje schematu

Jeśli w przyszłości będziesz chciał dodać nowe tabele lub kolumny:

1. Edytuj `supabase-schema-setup.sql`
2. Dodaj `IF NOT EXISTS` do nowych elementów
3. Uruchom ponownie - istniejące elementy nie zostaną nadpisane

## 💡 Wskazówki

- Skrypt jest **idempotentny** - możesz go uruchamiać wielokrotnie
- Używa `DROP POLICY IF EXISTS` przed utworzeniem nowych polityk
- Wszystkie tabele mają RLS włączone dla bezpieczeństwa
- Storage bucket 'media' jest publiczny dla odczytu

## 📞 Pomoc

Jeśli masz problemy:
1. Sprawdź logi w Supabase Dashboard → Database → Logs
2. Uruchom `supabase-schema-check.sql` aby zobaczyć obecny stan
3. Sprawdź czy wszystkie polityki RLS są poprawne

---

**Powodzenia! 🚀**
