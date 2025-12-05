export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'social-media' | 'bezpieczenstwo' | 'ai' | 'darmowe-kursy';
  categoryLabel: string;
  image: string;
  date: string;
  readTime: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Strona WordPress dla Ambasady Kreatywności",
    description: "Kompleksowa strona internetowa dla kawiarni i przestrzeni kreatywnej. Responsywny design, integracja z social media, kalendarz wydarzeń.",
    category: "Strony WordPress",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["WordPress", "Responsive", "UX/UI"]
  },
  {
    id: "2",
    title: "Grafiki Social Media - Candy Doctors",
    description: "Seria grafik promocyjnych dla duetu DJ-skiego. Spójny styl wizualny, przyciągające uwagę posty na Facebook i Instagram.",
    category: "Grafiki Canva",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    tags: ["Canva", "Social Media", "Branding"]
  },
  {
    id: "3",
    title: "Kampania Facebook Ads - The X Festival",
    description: "Kampania reklamowa dla festiwalu muzycznego. Targetowanie, optymalizacja budżetu, kreacje reklamowe. ROI 250%.",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    tags: ["Facebook Ads", "Marketing", "ROI"]
  },
  {
    id: "4",
    title: "Kompleksowa Strategia Marketingowa",
    description: "Pełna strategia digital dla startupu technologicznego. Wzrost organicznych zasięgów o 300% w 6 miesięcy.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Strategia", "Digital", "Wzrost"]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Jak skutecznie budować zaangażowanie na Instagramie w 2024",
    excerpt: "Poznaj sprawdzone strategie zwiększania engagement rate na Instagramie. Od algorytmów po reels - wszystko co musisz wiedzieć.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    category: "social-media",
    categoryLabel: "Social Media",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    date: "2024-12-01",
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Bezpieczeństwo danych w marketingu cyfrowym - kompletny przewodnik",
    excerpt: "Jak chronić dane klientów i być zgodnym z RODO? Praktyczne wskazówki dla marketerów i właścicieli firm.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.

Praesent euismod, nisl eget ultricies lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    category: "bezpieczenstwo",
    categoryLabel: "Bezpieczeństwo",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    date: "2024-11-28",
    readTime: "8 min"
  },
  {
    id: "3",
    title: "AI w marketingu - jak wykorzystać sztuczną inteligencję w swojej strategii",
    excerpt: "ChatGPT, Midjourney, automatyzacja - poznaj narzędzia AI, które zrewolucjonizują Twój marketing.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada leo, vel efficitur urna volutpat id.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`,
    category: "ai",
    categoryLabel: "Sztuczna Inteligencja AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    date: "2024-11-25",
    readTime: "6 min"
  },
  {
    id: "4",
    title: "Darmowy kurs: Facebook Ads od podstaw - Lekcja 1",
    excerpt: "Rozpocznij swoją przygodę z reklamami na Facebooku. Pierwszy moduł naszego darmowego kursu krok po kroku.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna.

Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.`,
    category: "darmowe-kursy",
    categoryLabel: "Darmowe Kursy",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    date: "2024-11-20",
    readTime: "10 min"
  }
];

export const services: Service[] = [
  {
    id: "1",
    title: "Strony WordPress",
    description: "Tworzę profesjonalne strony internetowe na WordPress. Od prostych wizytówek po rozbudowane sklepy e-commerce.",
    icon: "globe",
    features: ["Responsywny design", "SEO optimization", "Integracja z social media", "Panel administracyjny"]
  },
  {
    id: "2",
    title: "Grafiki Canva",
    description: "Projektuję atrakcyjne grafiki do social media, prezentacje i materiały marketingowe w Canva.",
    icon: "palette",
    features: ["Posty social media", "Prezentacje", "Infografiki", "Materiały drukowane"]
  },
  {
    id: "3",
    title: "Social Media Management",
    description: "Kompleksowa obsługa profili w mediach społecznościowych. Strategia, content, analityka.",
    icon: "share2",
    features: ["Strategia contentowa", "Publikacje", "Community management", "Raportowanie"]
  },
  {
    id: "4",
    title: "Kampanie reklamowe",
    description: "Prowadzę skuteczne kampanie reklamowe na Facebooku, Instagramie i Google Ads.",
    icon: "target",
    features: ["Facebook Ads", "Google Ads", "Remarketing", "Optymalizacja ROI"]
  }
];

export const blogCategories = [
  { id: "all", label: "Wszystkie", slug: "all" },
  { id: "social-media", label: "Social Media", slug: "social-media" },
  { id: "bezpieczenstwo", label: "Bezpieczeństwo", slug: "bezpieczenstwo" },
  { id: "ai", label: "Sztuczna Inteligencja AI", slug: "ai" },
  { id: "darmowe-kursy", label: "Darmowe Kursy", slug: "darmowe-kursy" }
];