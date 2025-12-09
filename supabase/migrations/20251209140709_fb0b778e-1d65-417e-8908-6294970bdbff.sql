-- Fix security issue: Restrict user_roles access
-- Users should only see their own roles, not discover who is admin

-- Drop the existing policy that allows users to view any roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a more restrictive policy - users can only see their own role
CREATE POLICY "Users can view only their own role" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Fix profiles table - ensure proper INSERT policy for new users
-- The handle_new_user trigger already inserts profiles, but we need a policy for edge cases

-- Add INSERT policy for profiles (user can only insert their own profile)
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Add DELETE policy for profiles (only admins can delete profiles)
CREATE POLICY "Admins can delete profiles" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));