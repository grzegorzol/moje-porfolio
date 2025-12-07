-- Remove the legacy is_admin column from profiles table
-- This column is no longer needed since admin roles are now managed via user_roles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;