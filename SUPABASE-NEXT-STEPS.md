# 🎉 Supabase Setup - Następne Kroki

Setup bazy danych zakończony pomyślnie! ✅

## 📋 Co zostało utworzone:

- ✅ Tabela `user_roles` z rolami użytkowników
- ✅ Tabele: `site_settings`, `blog_posts`, `projects`, `services`, `experiences`, `pages`
- ✅ Storage bucket `media` dla zdjęć i mediów
- ✅ Row Level Security (RLS) na wszystkich tabelach
- ✅ Polityki dostępu dla bezpieczeństwa
- ✅ Indeksy dla szybszych zapytań
- ✅ Triggery do auto-update timestamps

---

## 🔐 KROK 1: Dodaj pierwszego admina

### 1.1 Znajdź swoje User ID

W Supabase Dashboard:
1. Przejdź do **Authentication → Users**
2. Znajdź swoje konto (email)
3. Skopiuj **ID** (UUID)

LUB uruchom w SQL Editor:

```sql
-- Pokaż wszystkich użytkowników
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC;
```

### 1.2 Dodaj rolę admin

Skopiuj UUID z poprzedniego kroku i uruchom:

```sql
-- Zamień 'TWOJE-UUID-TUTAJ' na swoje prawdziwe UUID
INSERT INTO public.user_roles (user_id, role)
VALUES ('TWOJE-UUID-TUTAJ', 'admin');
```

**Przykład:**
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('474afcb1-4b7a-488f-b1e8-5da67de9cb83', 'admin');
```

### 1.3 Zweryfikuj

```sql
-- Sprawdź czy admin został dodany
SELECT
  ur.id,
  ur.user_id,
  ur.role,
  au.email,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users au ON au.id = ur.user_id;
```

Powinieneś zobaczyć swoje konto z rolą `admin`.

---

## 🔌 KROK 2: Połącz z Next.js

### 2.1 Znajdź klucze API

W Supabase Dashboard:
1. Kliknij **Settings** (ikonka koła zębatego)
2. Wybierz **API**
3. Skopiuj:
   - **Project URL**
   - **anon/public key**

### 2.2 Zaktualizuj `.env.local`

W projekcie Next.js utwórz/edytuj plik `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj-anon-key-tutaj
```

**WAŻNE:** Dodaj `.env.local` do `.gitignore` jeśli jeszcze nie jest!

### 2.3 Zainstaluj Supabase Client

```bash
npm install @supabase/supabase-js
# lub
yarn add @supabase/supabase-js
```

### 2.4 Utwórz Supabase client

Utwórz plik `lib/supabase.ts` (lub `lib/supabase.js`):

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2.5 Test połączenia

Utwórz plik `pages/api/test-db.ts` (lub `app/api/test-db/route.ts` dla App Router):

**Pages Router:**
```typescript
// pages/api/test-db.ts
import { supabase } from '../../lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Test query - pobierz ustawienia
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(5)

    if (error) throw error

    res.status(200).json({
      success: true,
      message: 'Połączenie z Supabase działa!',
      data
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
```

**App Router:**
```typescript
// app/api/test-db/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(5)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Połączenie z Supabase działa!',
      data
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
```

### 2.6 Przetestuj

Uruchom serwer dev:
```bash
npm run dev
```

Odwiedź: http://localhost:3000/api/test-db

Powinieneś zobaczyć:
```json
{
  "success": true,
  "message": "Połączenie z Supabase działa!",
  "data": []
}
```

---

## 📝 KROK 3: Dodaj przykładowe dane (opcjonalne)

### 3.1 Ustawienia strony

```sql
-- Logo i meta
INSERT INTO public.site_settings (key, value) VALUES
('site_title', '"Moje Portfolio"'::jsonb),
('site_description', '"Portfolio web developera"'::jsonb),
('logo_url', '"/logo.png"'::jsonb);

-- Social media
INSERT INTO public.site_settings (key, value) VALUES
('social_media', '{
  "github": "https://github.com/twoj-username",
  "linkedin": "https://linkedin.com/in/twoj-username",
  "twitter": "https://twitter.com/twoj-username"
}'::jsonb);

-- Menu
INSERT INTO public.site_settings (key, value) VALUES
('main_menu', '[
  {"label": "Home", "href": "/"},
  {"label": "O mnie", "href": "/about"},
  {"label": "Projekty", "href": "/projects"},
  {"label": "Blog", "href": "/blog"},
  {"label": "Kontakt", "href": "/contact"}
]'::jsonb);
```

### 3.2 Przykładowy projekt

```sql
INSERT INTO public.projects (title, description, category, image, tags) VALUES
(
  'Moja Pierwsza Aplikacja',
  'Opis projektu - co robi, jakie technologie użyto, czego się nauczyłeś.',
  'Web Development',
  '/projects/app1.jpg',
  ARRAY['Next.js', 'TypeScript', 'Supabase']
);
```

### 3.3 Przykładowa usługa

```sql
INSERT INTO public.services (title, description, icon, sort_order) VALUES
(
  'Tworzenie stron www',
  'Profesjonalne strony internetowe z wykorzystaniem najnowszych technologii.',
  'code',
  1
);
```

### 3.4 Przykładowe doświadczenie

```sql
INSERT INTO public.experiences (role, company, period, description, sort_order) VALUES
(
  'Full Stack Developer',
  'Nazwa Firmy',
  '2023 - obecnie',
  'Opis obowiązków i osiągnięć w tej roli.',
  1
);
```

### 3.5 Przykładowy post na blogu

```sql
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  status,
  published_at
) VALUES (
  'Mój pierwszy post',
  'moj-pierwszy-post',
  'Krótki opis posta który pojawi się na liście.',
  '# Mój pierwszy post\n\nPełna treść posta w markdown...',
  'Tutorial',
  ARRAY['Next.js', 'Tutorial'],
  'published',
  NOW()
);
```

---

## 🔒 KROK 4: Bezpieczeństwo (opcjonalne, ale zalecane)

### 4.1 Sprawdź RLS policies

```sql
-- Pokaż wszystkie polityki
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### 4.2 Test polityk RLS

Zaloguj się jako zwykły użytkownik (nie admin) i spróbuj:

```sql
-- To powinno działać (SELECT jest publiczny)
SELECT * FROM public.projects;

-- To NIE powinno działać (UPDATE tylko dla adminów)
UPDATE public.projects SET title = 'Nowy tytuł' WHERE id = 'jakies-uuid';
```

---

## 🎨 KROK 5: Upload mediów

### 5.1 Test uploadu w SQL Editor

```sql
-- Sprawdź bucket
SELECT * FROM storage.buckets WHERE id = 'media';

-- Sprawdź polityki storage
SELECT * FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage';
```

### 5.2 Upload przez Next.js

```typescript
import { supabase } from '@/lib/supabase'

async function uploadFile(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('media')
    .upload(filePath, file)

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Pobierz publiczny URL
  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath)

  return publicUrl
}
```

---

## 📊 KROK 6: Monitoring (opcjonalne)

### 6.1 Sprawdź logi w Supabase

Dashboard → **Logs** → **Database**

### 6.2 Sprawdź metryki

Dashboard → **Database** → **Roles & Metrics**

---

## ✅ Checklist

- [ ] Dodałem pierwszego admina
- [ ] Zweryfikowałem że admin istnieje w bazie
- [ ] Skonfigurowałem `.env.local` z kluczami Supabase
- [ ] Zainstalowałem `@supabase/supabase-js`
- [ ] Utworzyłem Supabase client (`lib/supabase.ts`)
- [ ] Przetestowałem połączenie przez API route
- [ ] (Opcjonalnie) Dodałem przykładowe dane
- [ ] (Opcjonalnie) Przetestowałem polityki RLS
- [ ] (Opcjonalnie) Przetestowałem upload do storage

---

## 🐛 Rozwiązywanie problemów

### Błąd: "Invalid API key"
✅ Sprawdź czy klucze w `.env.local` są poprawne
✅ Zrestartuj serwer dev po zmianie `.env.local`

### Błąd: "Row Level Security policy violation"
✅ Sprawdź czy użytkownik jest zalogowany
✅ Sprawdź polityki RLS dla danej tabeli
✅ Upewnij się że użytkownik ma odpowiednią rolę

### Nie mogę uploadować do storage
✅ Sprawdź czy bucket 'media' istnieje
✅ Sprawdź polityki storage
✅ Upewnij się że użytkownik jest zalogowany (`authenticated`)

### Tabele są puste
✅ To normalne po pierwszym setupie
✅ Dodaj dane ręcznie (SQL) lub przez admin panel

---

## 📚 Przydatne linki

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)

---

**Powodzenia! 🚀**

Jeśli masz pytania, sprawdź dokumentację lub skontaktuj się z supportem Supabase.
