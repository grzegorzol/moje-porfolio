# Dokumentacja Techniczna - Portfolio CMS

## Spis treści
1. [Opis projektu](#opis-projektu)
2. [Architektura systemu](#architektura-systemu)
3. [Stack technologiczny](#stack-technologiczny)
4. [Instalacja](#instalacja)
5. [Struktura projektu](#struktura-projektu)
6. [Baza danych](#baza-danych)
7. [Autentykacja i autoryzacja](#autentykacja-i-autoryzacja)
8. [Panel administracyjny](#panel-administracyjny)
9. [Komponenty](#komponenty)

---

## Opis projektu

Aplikacja Portfolio CMS to responsywna strona internetowa z panelem administracyjnym, umożliwiająca zarządzanie treścią, blogiem i mediami. Zbudowana w oparciu o React + TypeScript + Supabase.

### Główne funkcjonalności:
- **Strona publiczna**: Strona główna, O mnie, Usługi, Projekty, Blog, Kontakt
- **Panel admina**: Zarządzanie stronami, postami, mediami, nagłówkiem, stopką, ustawieniami
- **Edytor WYSIWYG**: TipTap do edycji treści
- **System ról**: Admin/Moderator/User z RLS

---

## Architektura systemu

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Public Pages │  │ Admin Panel  │  │   Shared Components  │  │
│  │              │  │              │  │                      │  │
│  │ - Index      │  │ - Dashboard  │  │ - Navbar             │  │
│  │ - About      │  │ - Pages      │  │ - Footer             │  │
│  │ - Services   │  │ - Posts      │  │ - Layout             │  │
│  │ - Projects   │  │ - Media      │  │ - Cards              │  │
│  │ - Blog       │  │ - Header     │  │ - RichTextEditor     │  │
│  │ - Contact    │  │ - Footer     │  │                      │  │
│  │              │  │ - Settings   │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                     HOOKS & STATE MANAGEMENT                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   useAuth    │  │  React Query │  │    Context API       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE (Backend)                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Auth       │  │   Database   │  │      Storage         │  │
│  │              │  │              │  │                      │  │
│  │ - Sign In    │  │ - pages      │  │ - media bucket       │  │
│  │ - Sign Up    │  │ - blog_posts │  │ - public files       │  │
│  │ - Sign Out   │  │ - profiles   │  │                      │  │
│  │ - Session    │  │ - user_roles │  │                      │  │
│  │              │  │ - media      │  │                      │  │
│  │              │  │ - settings   │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                    Row Level Security (RLS)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  has_role() function + per-table policies                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Diagram przepływu danych

```
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────┐
│  User   │────▶│   React     │────▶│   Supabase   │────▶│ Database │
│         │     │   App       │     │   Client     │     │          │
└─────────┘     └─────────────┘     └──────────────┘     └──────────┘
     │                │                    │                   │
     │                │                    │                   │
     │  1. Request    │  2. API Call       │  3. Query         │
     │◀───────────────│◀───────────────────│◀──────────────────│
     │  6. Response   │  5. Data           │  4. RLS Check     │
```

---

## Stack technologiczny

### Frontend
| Technologia | Wersja | Opis |
|-------------|--------|------|
| React | ^18.3.1 | Biblioteka UI |
| TypeScript | - | Typowanie statyczne |
| Vite | - | Bundler |
| Tailwind CSS | - | Stylowanie |
| shadcn/ui | - | Komponenty UI |
| Framer Motion | ^12.23.25 | Animacje |
| TipTap | ^3.13.0 | Edytor WYSIWYG |
| React Query | ^5.83.0 | State management |
| React Router | ^6.30.1 | Routing |

### Backend (Supabase)
| Funkcja | Opis |
|---------|------|
| PostgreSQL | Baza danych |
| Auth | Autentykacja użytkowników |
| Storage | Przechowywanie plików |
| RLS | Row Level Security |

---

## Instalacja

### Wymagania
- Node.js >= 18.x
- npm lub bun
- Konto Supabase (lub Lovable Cloud)

### Krok 1: Klonowanie repozytorium
```bash
git clone <repository-url>
cd <project-name>
```

### Krok 2: Instalacja zależności
```bash
npm install
# lub
bun install
```

### Krok 3: Konfiguracja Supabase

#### 3.1 Utwórz projekt Supabase
Utwórz nowy projekt na [supabase.com](https://supabase.com) lub użyj Lovable Cloud.

#### 3.2 Konfiguracja zmiennych środowiskowych
Utwórz plik `.env` w katalogu głównym:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

#### 3.3 Wykonaj migracje bazy danych
Uruchom poniższy SQL w Supabase SQL Editor:

```sql
-- 1. Enum dla ról
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.page_status AS ENUM ('draft', 'published', 'archived');

-- 2. Tabela profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabela user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 4. Tabela pages
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB DEFAULT '[]'::jsonb,
  meta_description TEXT,
  meta_keywords TEXT,
  featured_image TEXT,
  parent_id UUID REFERENCES public.pages(id),
  sort_order INTEGER DEFAULT 0,
  status page_status DEFAULT 'draft',
  author_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Tabela blog_posts
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB DEFAULT '[]'::jsonb,
  excerpt TEXT,
  featured_image TEXT,
  category TEXT,
  tags TEXT[],
  read_time INTEGER DEFAULT 5,
  status page_status DEFAULT 'draft',
  author_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Tabela media
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Tabela site_settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Funkcja has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 9. Funkcja update_updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 10. Funkcja handle_new_user (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- 11. Trigger dla nowych użytkowników
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. Triggery updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 13. Włącz RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 14. Polityki RLS dla profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- 15. Polityki RLS dla user_roles
CREATE POLICY "Users can view only their own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 16. Polityki RLS dla pages
CREATE POLICY "Anyone can view published pages" ON public.pages
  FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can do everything with pages" ON public.pages
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 17. Polityki RLS dla blog_posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can do everything with blog posts" ON public.blog_posts
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 18. Polityki RLS dla media
CREATE POLICY "Anyone can view media" ON public.media
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage media" ON public.media
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 19. Polityki RLS dla site_settings
CREATE POLICY "Anyone can view site settings" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 20. Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
```

#### 3.4 Dodaj pierwszego admina
```sql
-- Po rejestracji użytkownika, dodaj mu rolę admin:
INSERT INTO public.user_roles (user_id, role)
VALUES ('<user-uuid>', 'admin');
```

### Krok 4: Uruchomienie aplikacji
```bash
npm run dev
# lub
bun dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

---

## Struktura projektu

```
src/
├── assets/                 # Zasoby statyczne
├── components/
│   ├── admin/              # Komponenty panelu admina
│   │   ├── AdminLayout.tsx
│   │   └── RichTextEditor.tsx
│   ├── ui/                 # shadcn/ui komponenty
│   ├── BlogCard.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── NavLink.tsx
│   ├── ProjectCard.tsx
│   ├── SectionHeader.tsx
│   └── ServiceCard.tsx
├── data/
│   └── portfolioData.ts    # Dane statyczne
├── hooks/
│   ├── useAuth.tsx         # Hook autentykacji
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── integrations/
│   └── supabase/
│       ├── client.ts       # Klient Supabase (auto-gen)
│       └── types.ts        # Typy z bazy (auto-gen)
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   ├── admin/              # Strony panelu admina
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminFooter.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── AdminMedia.tsx
│   │   ├── AdminPages.tsx
│   │   ├── AdminPosts.tsx
│   │   └── AdminSettings.tsx
│   ├── About.tsx
│   ├── AdminLogin.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── Contact.tsx
│   ├── Index.tsx
│   ├── NotFound.tsx
│   ├── Projects.tsx
│   └── Services.tsx
├── App.tsx                 # Główny komponent z routingiem
├── App.css
├── index.css               # Style globalne + design tokens
├── main.tsx                # Entry point
└── vite-env.d.ts
```

---

## Baza danych

### Diagram ERD

```
┌───────────────────┐       ┌───────────────────┐
│     auth.users    │       │     profiles      │
├───────────────────┤       ├───────────────────┤
│ id (PK)           │◀──────│ id (PK, FK)       │
│ email             │       │ email             │
│ ...               │       │ full_name         │
└───────────────────┘       │ avatar_url        │
         │                  │ created_at        │
         │                  │ updated_at        │
         │                  └───────────────────┘
         │
         ▼
┌───────────────────┐       ┌───────────────────┐
│    user_roles     │       │   site_settings   │
├───────────────────┤       ├───────────────────┤
│ id (PK)           │       │ id (PK)           │
│ user_id (FK)      │       │ key (UNIQUE)      │
│ role (ENUM)       │       │ value (JSONB)     │
└───────────────────┘       │ updated_at        │
                            └───────────────────┘

┌───────────────────┐       ┌───────────────────┐
│      pages        │       │    blog_posts     │
├───────────────────┤       ├───────────────────┤
│ id (PK)           │       │ id (PK)           │
│ title             │       │ title             │
│ slug (UNIQUE)     │       │ slug (UNIQUE)     │
│ content (JSONB)   │       │ content (JSONB)   │
│ meta_description  │       │ excerpt           │
│ meta_keywords     │       │ featured_image    │
│ featured_image    │       │ category          │
│ parent_id (FK)    │───┐   │ tags (ARRAY)      │
│ sort_order        │◀──┘   │ read_time         │
│ status (ENUM)     │       │ status (ENUM)     │
│ author_id (FK)    │       │ author_id (FK)    │
│ created_at        │       │ published_at      │
│ updated_at        │       │ created_at        │
└───────────────────┘       │ updated_at        │
                            └───────────────────┘

┌───────────────────┐
│      media        │
├───────────────────┤
│ id (PK)           │
│ name              │
│ file_path         │
│ file_type         │
│ file_size         │
│ alt_text          │
│ uploaded_by (FK)  │
│ created_at        │
└───────────────────┘
```

### Typy ENUM
- **app_role**: `'admin'` | `'moderator'` | `'user'`
- **page_status**: `'draft'` | `'published'` | `'archived'`

---

## Autentykacja i autoryzacja

### Przepływ autentykacji

```
┌─────────┐     ┌─────────────┐     ┌──────────────┐
│  User   │────▶│  Login Form │────▶│  Supabase    │
│         │     │             │     │  Auth        │
└─────────┘     └─────────────┘     └──────────────┘
                                           │
                                           ▼
                                    ┌──────────────┐
                                    │  Session +   │
                                    │  JWT Token   │
                                    └──────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│  useAuth()   │                  │  RLS Policy  │                  │  has_role()  │
│  Context     │                  │  Check       │                  │  Function    │
└──────────────┘                  └──────────────┘                  └──────────────┘
```

### Hook useAuth

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName?: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}
```

### Sprawdzanie uprawnień admina
```typescript
// W komponencie
const { isAdmin, isLoading } = useAuth();

if (!isAdmin) {
  navigate('/admin/login');
}
```

---

## Panel administracyjny

### Dostępne moduły

| Moduł | Ścieżka | Funkcje |
|-------|---------|---------|
| Dashboard | `/admin` | Statystyki, nawigacja |
| Strony | `/admin/pages` | CRUD stron, WYSIWYG |
| Blog | `/admin/posts` | CRUD postów, kategorie, tagi |
| Media | `/admin/media` | Upload, przeglądanie, usuwanie |
| Nagłówek | `/admin/header` | Logo, nawigacja, CTA |
| Stopka | `/admin/footer` | Linki, social media |
| Ustawienia | `/admin/settings` | Hero section, przyciski |

### Edytor WYSIWYG (TipTap)

Funkcje edytora:
- **Formatowanie**: Bold, Italic, Strike
- **Nagłówki**: H1, H2, H3
- **Listy**: Bullet, Numbered
- **Multimedia**: Linki, Obrazy
- **Historia**: Undo, Redo

---

## Komponenty

### Publiczne

| Komponent | Opis |
|-----------|------|
| `Layout` | Wrapper z Navbar + Footer |
| `Navbar` | Nawigacja główna |
| `Footer` | Stopka strony |
| `HeroSection` | Sekcja powitalna |
| `SectionHeader` | Nagłówek sekcji |
| `BlogCard` | Karta wpisu blogowego |
| `ProjectCard` | Karta projektu |
| `ServiceCard` | Karta usługi |

### Administracyjne

| Komponent | Opis |
|-----------|------|
| `AdminLayout` | Layout panelu z sidebar |
| `RichTextEditor` | Edytor WYSIWYG TipTap |

---

## Licencja

MIT License

---

## Autor

Portfolio CMS - wygenerowane z Lovable
