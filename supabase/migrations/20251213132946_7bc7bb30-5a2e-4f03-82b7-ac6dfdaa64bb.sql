-- Create projects table for portfolio
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  category TEXT,
  category_en TEXT,
  image TEXT,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  status page_status DEFAULT 'draft',
  author_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS policies for projects
CREATE POLICY "Admins can manage projects"
ON public.projects
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view published projects"
ON public.projects
FOR SELECT
USING (status = 'published'::page_status);

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial site_settings for header, footer, hero if not exists
INSERT INTO public.site_settings (key, value)
VALUES 
  ('header', '{"logo": "GO", "navLinks": [{"href": "/", "label": "Start"}, {"href": "/o-mnie", "label": "O mnie"}, {"href": "/projekty", "label": "Projekty"}, {"href": "/dla-klienta", "label": "Usługi"}, {"href": "/blog", "label": "Blog"}], "ctaButton": {"href": "/kontakt", "label": "Kontakt"}}'::jsonb),
  ('footer', '{"copyright": "Grzegorz Olszowik", "footerLinks": [{"href": "/polityka-prywatnosci", "label": "Polityka prywatności"}], "socialLinks": [{"icon": "Linkedin", "href": "https://linkedin.com", "label": "LinkedIn"}, {"icon": "Github", "href": "https://github.com", "label": "GitHub"}]}'::jsonb),
  ('hero', '{"title": "Tworzę rozwiązania", "subtitle": "IT które działają", "description": "Jestem fullstack developerem z pasją do tworzenia nowoczesnych aplikacji webowych.", "ctaButtons": [{"href": "/projekty", "label": "Zobacz projekty", "variant": "primary"}, {"href": "/kontakt", "label": "Kontakt", "variant": "secondary"}]}'::jsonb)
ON CONFLICT (key) DO NOTHING;