-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can manage all roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update blog_posts policies to use new function
DROP POLICY IF EXISTS "Admins can do everything with blog posts" ON public.blog_posts;
CREATE POLICY "Admins can do everything with blog posts"
ON public.blog_posts
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update media policies
DROP POLICY IF EXISTS "Admins can manage media" ON public.media;
CREATE POLICY "Admins can manage media"
ON public.media
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update pages policies
DROP POLICY IF EXISTS "Admins can do everything with pages" ON public.pages;
CREATE POLICY "Admins can do everything with pages"
ON public.pages
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Update site_settings policies
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));