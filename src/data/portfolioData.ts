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
    title: "Strategia Marketingowa - Dealz Polska",
    description: "Koordynacja otwarć nowych sklepów, materiały marketingowe, analiza ankiet klienckich. Wsparcie przy 15+ otwarciach sklepów.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Strategia", "Digital", "Wzrost"]
  }
];

export const projectCategories = [
  { id: "all", label: "Wszystkie" },
  { id: "grafiki-canva", label: "Grafiki Canva" },
  { id: "marketing", label: "Marketing" },
  { id: "social-media", label: "Social Media" },
  { id: "strony-wordpress", label: "Strony WordPress" }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Jak skutecznie budować zaangażowanie na Instagramie w 2024",
    excerpt: "Poznaj sprawdzone strategie zwiększania engagement rate na Instagramie. Od algorytmów po reels - wszystko co musisz wiedzieć.",
    content: `Instagram w 2024 roku to platforma, która ciągle ewoluuje. Aby skutecznie budować zaangażowanie, musisz rozumieć, jak działa algorytm i jakie treści preferują użytkownicy.

Kluczem do sukcesu jest regularna publikacja wartościowych treści, wykorzystanie Reels oraz aktywna interakcja z obserwatorami. Pamiętaj, że algorytm premiuje konta, które generują dużo interakcji w krótkim czasie po publikacji.

Warto również inwestować w Stories i wykorzystywać wszystkie dostępne funkcje interaktywne, takie jak ankiety, quizy czy naklejki z pytaniami.`,
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
    content: `W erze cyfrowej ochrona danych osobowych to nie tylko wymóg prawny, ale również kwestia budowania zaufania z klientami.

RODO nakłada na firmy szereg obowiązków związanych z przetwarzaniem danych osobowych. Jako marketer musisz zadbać o odpowiednie zgody, bezpieczne przechowywanie danych i jasną politykę prywatności.

Pamiętaj o regularnych audytach bezpieczeństwa i szkoleniach dla zespołu. Transparentność w komunikacji z klientami o tym, jak wykorzystujesz ich dane, buduje długoterminowe zaufanie.`,
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
    content: `Sztuczna inteligencja zmienia sposób, w jaki tworzymy i dystrybuujemy treści marketingowe. Narzędzia takie jak ChatGPT czy Midjourney oferują niesamowite możliwości.

AI może pomóc w generowaniu pomysłów na treści, tworzeniu pierwszych wersji tekstów, analizie danych klientów czy automatyzacji kampanii reklamowych.

Jednak pamiętaj, że AI to narzędzie, nie zastępstwo dla kreatywności. Najlepsze wyniki osiągniesz, łącząc możliwości sztucznej inteligencji z ludzką intuicją i doświadczeniem.`,
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
    content: `Witaj w pierwszej lekcji kursu Facebook Ads! Nauczysz się tutaj podstaw tworzenia skutecznych kampanii reklamowych.

Zaczniemy od konfiguracji konta reklamowego i menedżera reklam. Poznasz strukturę kampanii (kampania → zestaw reklam → reklama) i dowiesz się, jak określać cele reklamowe.

W kolejnych lekcjach przejdziemy do bardziej zaawansowanych tematów, takich jak targetowanie, optymalizacja budżetu i tworzenie kreacji reklamowych.`,
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
    title: "Wirtualny Asystent",
    description: "Profesjonalne wsparcie w codziennych zadaniach biznesowych",
    icon: "headphones",
    features: [
      "Odpowiadanie na maile i wiadomości klientów",
      "Obsługa telefonów i planowanie spotkań",
      "Administrowanie fanpage na Facebooku i Instagramie",
      "Zarządzanie kalendarzem i terminami",
      "Przygotowywanie dokumentów i prezentacji"
    ]
  },
  {
    id: "2",
    title: "Grafiki w Canva + Szkolenia",
    description: "Tworzenie profesjonalnych materiałów wizualnych",
    icon: "palette",
    features: [
      "Projektowanie postów na social media",
      "Tworzenie grafik reklamowych i banerów",
      "Przygotowywanie prezentacji i infografik",
      "Projektowanie materiałów drukowanych (ulotki, wizytówki)",
      "Szkolenia z Canva - nauczę Cię samodzielnie tworzyć profesjonalne grafiki"
    ]
  },
  {
    id: "3",
    title: "Szkolenia z Reklam Facebook i Instagram",
    description: "Kompleksowe szkolenia z zakresu płatnych kampanii",
    icon: "target",
    features: [
      "Tworzenie skutecznych kampanii reklamowych",
      "Targetowanie i optymalizacja budżetu",
      "Analiza wyników i raportowanie",
      "Tworzenie kreacji reklamowych",
      "Strategie remarketingowe"
    ]
  },
  {
    id: "4",
    title: "Tworzenie Stron WordPress",
    description: "Profesjonalne strony internetowe",
    icon: "globe",
    features: [
      "Projektowanie i wdrażanie stron WordPress",
      "Responsywne layouty dostosowane do urządzeń mobilnych",
      "Optymalizacja SEO i szybkości ładowania",
      "Integracja z social media i narzędziami marketingowymi",
      "Szkolenie z obsługi panelu WordPress"
    ]
  },
  {
    id: "5",
    title: "Teksty na Social Media",
    description: "Angażujący content dla Twojej marki",
    icon: "pen-tool",
    features: [
      "Pisanie postów na Facebook i Instagram",
      "Tworzenie strategii contentowej",
      "Copywriting reklamowy",
      "Planowanie kalendarza publikacji",
      "Analiza zaangażowania i optymalizacja treści"
    ]
  }
];

export const blogCategories = [
  { id: "all", label: "Wszystkie", slug: "all" },
  { id: "social-media", label: "Social Media", slug: "social-media" },
  { id: "bezpieczenstwo", label: "Bezpieczeństwo", slug: "bezpieczenstwo" },
  { id: "ai", label: "Sztuczna Inteligencja AI", slug: "ai" },
  { id: "darmowe-kursy", label: "Darmowe Kursy", slug: "darmowe-kursy" }
];
