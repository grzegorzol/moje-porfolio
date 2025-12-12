-- ============================================
-- CZYSZCZENIE BAZY DANYCH (OPCJONALNE)
-- ============================================
-- UWAGA: Ten skrypt USUWA wszystkie dane!
-- Używaj TYLKO jeśli chcesz zacząć od nowa

-- Usuń wszystkie polityki RLS
DROP POLICY IF EXISTS "Anyone can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update any roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Public roles are viewable by everyone" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_select_own" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_insert_own" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_update_own" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles_delete_own" ON public.user_roles;

DROP POLICY IF EXISTS "Anyone can view settings" ON public.site_settings;
DROP POLICY IF EXISTS "Only admins can modify settings" ON public.site_settings;

DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.blog_posts;

DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;

DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

DROP POLICY IF EXISTS "Experiences are viewable by everyone" ON public.experiences;
DROP POLICY IF EXISTS "Admins can manage experiences" ON public.experiences;

DROP POLICY IF EXISTS "Published pages are viewable by everyone" ON public.pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update own media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;

-- Usuń tabele (CASCADE usuwa też zależności)
DROP TABLE IF EXISTS public.user_role_members CASCADE;
DROP TABLE IF EXISTS public.pages CASCADE;
DROP TABLE IF EXISTS public.experiences CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Usuń funkcje
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;

-- Usuń storage bucket (opcjonalne - odkomentuj jeśli chcesz)
-- DELETE FROM storage.buckets WHERE id = 'media';

SELECT 'Database cleaned successfully!' as status;
