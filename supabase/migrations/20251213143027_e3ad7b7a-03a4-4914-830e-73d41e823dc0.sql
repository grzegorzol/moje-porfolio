-- Create invitation codes table for admin registration
CREATE TABLE public.invitation_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  role app_role NOT NULL DEFAULT 'admin',
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.invitation_codes ENABLE ROW LEVEL SECURITY;

-- Only admins can manage invitation codes
CREATE POLICY "Admins can manage invitation codes"
ON public.invitation_codes
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can check if a code is valid (for registration)
CREATE POLICY "Anyone can validate codes"
ON public.invitation_codes
FOR SELECT
USING (
  used_at IS NULL 
  AND (expires_at IS NULL OR expires_at > now())
  AND (max_uses IS NULL OR current_uses < max_uses)
);

-- Create function to use invitation code
CREATE OR REPLACE FUNCTION public.use_invitation_code(p_code TEXT, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code_record RECORD;
BEGIN
  -- Find valid code
  SELECT * INTO v_code_record
  FROM public.invitation_codes
  WHERE code = p_code
    AND used_at IS NULL
    AND (expires_at IS NULL OR expires_at > now())
    AND (max_uses IS NULL OR current_uses < max_uses)
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Mark code as used
  UPDATE public.invitation_codes
  SET used_by = p_user_id,
      used_at = now(),
      current_uses = current_uses + 1
  WHERE id = v_code_record.id;

  -- Assign role to user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (p_user_id, v_code_record.role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN TRUE;
END;
$$;