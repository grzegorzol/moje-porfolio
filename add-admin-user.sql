-- ============================================
-- DODAJ PIERWSZEGO ADMINA
-- ============================================
-- Instrukcja:
-- 1. Uruchom pierwszą komendę aby zobaczyć swoje user_id
-- 2. Skopiuj UUID swojego konta
-- 3. Zamień 'TWOJE-UUID-TUTAJ' w drugiej komendzie
-- 4. Uruchom drugą komendę
-- 5. Uruchom trzecią komendę aby zweryfikować

-- ============================================
-- KROK 1: Znajdź swoje User ID
-- ============================================
SELECT
  id as user_uuid,
  email,
  created_at,
  confirmed_at
FROM auth.users
ORDER BY created_at DESC;

-- Skopiuj UUID z kolumny 'user_uuid' dla swojego emaila!

-- ============================================
-- KROK 2: Dodaj rolę admin
-- ============================================
-- UWAGA: Zamień 'TWOJE-UUID-TUTAJ' na prawdziwe UUID z kroku 1!
-- Przykład UUID: 474afcb1-4b7a-488f-b1e8-5da67de9cb83

INSERT INTO public.user_roles (user_id, role)
VALUES ('TWOJE-UUID-TUTAJ', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- ============================================
-- KROK 3: Zweryfikuj (uruchom po dodaniu)
-- ============================================
SELECT
  ur.id,
  ur.user_id,
  ur.role,
  au.email,
  ur.created_at,
  ur.updated_at
FROM public.user_roles ur
JOIN auth.users au ON au.id = ur.user_id
ORDER BY ur.created_at DESC;

-- Powinieneś zobaczyć swoje konto z rolą 'admin'!
