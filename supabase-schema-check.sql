-- ============================================
-- SPRAWDZENIE OBECNEGO STANU BAZY DANYCH
-- ============================================
-- Uruchom ten skrypt aby zobaczyć co już istnieje

-- Sprawdź istniejące tabele
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Sprawdź strukturę user_roles (jeśli istnieje)
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_roles'
ORDER BY ordinal_position;

-- Sprawdź constrainty na user_roles
SELECT conname as constraint_name, contype as constraint_type
FROM pg_constraint
WHERE conrelid = 'public.user_roles'::regclass;

-- Sprawdź RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Sprawdź storage buckets
SELECT id, name, public
FROM storage.buckets;
