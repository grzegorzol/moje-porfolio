export interface LocalizedText {
  pl: string;
  en: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  image: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  category: 'social-media' | 'bezpieczenstwo' | 'ai' | 'darmowe-kursy';
  categoryLabel: LocalizedText;
  image: string;
  date: string;
  readTime: LocalizedText;
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
    title: {
      pl: "Strona WordPress dla Ambasady Kreatywności",
      en: "WordPress Website for Creativity Embassy"
    },
    description: {
      pl: "Kompleksowa strona internetowa dla kawiarni i przestrzeni kreatywnej. Responsywny design, integracja z social media, kalendarz wydarzeń.",
      en: "Comprehensive website for a café and creative space. Responsive design, social media integration, event calendar."
    },
    category: {
      pl: "Strony WordPress",
      en: "WordPress Sites"
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["WordPress", "Responsive", "UX/UI"]
  },
  {
    id: "2",
    title: {
      pl: "Grafiki Social Media - Candy Doctors",
      en: "Social Media Graphics - Candy Doctors"
    },
    description: {
      pl: "Seria grafik promocyjnych dla duetu DJ-skiego. Spójny styl wizualny, przyciągające uwagę posty na Facebook i Instagram.",
      en: "Series of promotional graphics for a DJ duo. Consistent visual style, eye-catching posts for Facebook and Instagram."
    },
    category: {
      pl: "Grafiki Canva",
      en: "Canva Graphics"
    },
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    tags: ["Canva", "Social Media", "Branding"]
  },
  {
    id: "3",
    title: {
      pl: "Kampania Facebook Ads - The X Festival",
      en: "Facebook Ads Campaign - The X Festival"
    },
    description: {
      pl: "Kampania reklamowa dla festiwalu muzycznego. Targetowanie, optymalizacja budżetu, kreacje reklamowe. ROI 250%.",
      en: "Advertising campaign for a music festival. Targeting, budget optimization, ad creatives. 250% ROI."
    },
    category: {
      pl: "Social Media",
      en: "Social Media"
    },
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    tags: ["Facebook Ads", "Marketing", "ROI"]
  },
  {
    id: "4",
    title: {
      pl: "Strategia Marketingowa - Dealz Polska",
      en: "Marketing Strategy - Dealz Poland"
    },
    description: {
      pl: "Koordynacja otwarć nowych sklepów, materiały marketingowe, analiza ankiet klienckich. Wsparcie przy 15+ otwarciach sklepów.",
      en: "Coordination of new store openings, marketing materials, customer survey analysis. Support for 15+ store openings."
    },
    category: {
      pl: "Marketing",
      en: "Marketing"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Strategia", "Digital", "Wzrost"]
  }
];

export const projectCategories = [
  { id: "all", label: { pl: "Wszystkie", en: "All" } },
  { id: "grafiki-canva", label: { pl: "Grafiki Canva", en: "Canva Graphics" } },
  { id: "marketing", label: { pl: "Marketing", en: "Marketing" } },
  { id: "social-media", label: { pl: "Social Media", en: "Social Media" } },
  { id: "strony-wordpress", label: { pl: "Strony WordPress", en: "WordPress Sites" } }
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: {
      pl: "Jak skutecznie budować zaangażowanie na Instagramie w 2024",
      en: "How to Effectively Build Engagement on Instagram in 2024"
    },
    excerpt: {
      pl: "Poznaj sprawdzone strategie zwiększania engagement rate na Instagramie. Od algorytmów po reels - wszystko co musisz wiedzieć.",
      en: "Learn proven strategies to increase engagement rate on Instagram. From algorithms to reels - everything you need to know."
    },
    content: {
      pl: `Instagram w 2024 roku to platforma, która ciągle ewoluuje. Aby skutecznie budować zaangażowanie, musisz rozumieć, jak działa algorytm i jakie treści preferują użytkownicy.

Kluczem do sukcesu jest regularna publikacja wartościowych treści, wykorzystanie Reels oraz aktywna interakcja z obserwatorami. Pamiętaj, że algorytm premiuje konta, które generują dużo interakcji w krótkim czasie po publikacji.

Warto również inwestować w Stories i wykorzystywać wszystkie dostępne funkcje interaktywne, takie jak ankiety, quizy czy naklejki z pytaniami.`,
      en: `Instagram in 2024 is a platform that is constantly evolving. To effectively build engagement, you need to understand how the algorithm works and what content users prefer.

The key to success is regular publication of valuable content, using Reels, and active interaction with followers. Remember that the algorithm rewards accounts that generate a lot of interactions shortly after publication.

It's also worth investing in Stories and using all available interactive features, such as polls, quizzes, and question stickers.`
    },
    category: "social-media",
    categoryLabel: {
      pl: "Social Media",
      en: "Social Media"
    },
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    date: "2024-12-01",
    readTime: {
      pl: "5 min",
      en: "5 min"
    }
  },
  {
    id: "2",
    title: {
      pl: "Bezpieczeństwo danych w marketingu cyfrowym - kompletny przewodnik",
      en: "Data Security in Digital Marketing - Complete Guide"
    },
    excerpt: {
      pl: "Jak chronić dane klientów i być zgodnym z RODO? Praktyczne wskazówki dla marketerów i właścicieli firm.",
      en: "How to protect customer data and comply with GDPR? Practical tips for marketers and business owners."
    },
    content: {
      pl: `W erze cyfrowej ochrona danych osobowych to nie tylko wymóg prawny, ale również kwestia budowania zaufania z klientami.

RODO nakłada na firmy szereg obowiązków związanych z przetwarzaniem danych osobowych. Jako marketer musisz zadbać o odpowiednie zgody, bezpieczne przechowywanie danych i jasną politykę prywatności.

Pamiętaj o regularnych audytach bezpieczeństwa i szkoleniach dla zespołu. Transparentność w komunikacji z klientami o tym, jak wykorzystujesz ich dane, buduje długoterminowe zaufanie.`,
      en: `In the digital era, personal data protection is not only a legal requirement, but also a matter of building trust with customers.

GDPR imposes a number of obligations on companies related to personal data processing. As a marketer, you need to ensure proper consents, secure data storage, and a clear privacy policy.

Remember about regular security audits and team training. Transparency in communication with customers about how you use their data builds long-term trust.`
    },
    category: "bezpieczenstwo",
    categoryLabel: {
      pl: "Bezpieczeństwo",
      en: "Security"
    },
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    date: "2024-11-28",
    readTime: {
      pl: "8 min",
      en: "8 min"
    }
  },
  {
    id: "3",
    title: {
      pl: "AI w marketingu - jak wykorzystać sztuczną inteligencję w swojej strategii",
      en: "AI in Marketing - How to Use Artificial Intelligence in Your Strategy"
    },
    excerpt: {
      pl: "ChatGPT, Midjourney, automatyzacja - poznaj narzędzia AI, które zrewolucjonizują Twój marketing.",
      en: "ChatGPT, Midjourney, automation - discover AI tools that will revolutionize your marketing."
    },
    content: {
      pl: `Sztuczna inteligencja zmienia sposób, w jaki tworzymy i dystrybuujemy treści marketingowe. Narzędzia takie jak ChatGPT czy Midjourney oferują niesamowite możliwości.

AI może pomóc w generowaniu pomysłów na treści, tworzeniu pierwszych wersji tekstów, analizie danych klientów czy automatyzacji kampanii reklamowych.

Jednak pamiętaj, że AI to narzędzie, nie zastępstwo dla kreatywności. Najlepsze wyniki osiągniesz, łącząc możliwości sztucznej inteligencji z ludzką intuicją i doświadczeniem.`,
      en: `Artificial intelligence is changing the way we create and distribute marketing content. Tools like ChatGPT and Midjourney offer amazing possibilities.

AI can help with generating content ideas, creating first drafts of texts, analyzing customer data, or automating advertising campaigns.

However, remember that AI is a tool, not a replacement for creativity. You will achieve the best results by combining the capabilities of artificial intelligence with human intuition and experience.`
    },
    category: "ai",
    categoryLabel: {
      pl: "Sztuczna Inteligencja AI",
      en: "Artificial Intelligence AI"
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    date: "2024-11-25",
    readTime: {
      pl: "6 min",
      en: "6 min"
    }
  },
  {
    id: "4",
    title: {
      pl: "Darmowy kurs: Facebook Ads od podstaw - Lekcja 1",
      en: "Free Course: Facebook Ads from Scratch - Lesson 1"
    },
    excerpt: {
      pl: "Rozpocznij swoją przygodę z reklamami na Facebooku. Pierwszy moduł naszego darmowego kursu krok po kroku.",
      en: "Start your adventure with Facebook ads. The first module of our free step-by-step course."
    },
    content: {
      pl: `Witaj w pierwszej lekcji kursu Facebook Ads! Nauczysz się tutaj podstaw tworzenia skutecznych kampanii reklamowych.

Zaczniemy od konfiguracji konta reklamowego i menedżera reklam. Poznasz strukturę kampanii (kampania → zestaw reklam → reklama) i dowiesz się, jak określać cele reklamowe.

W kolejnych lekcjach przejdziemy do bardziej zaawansowanych tematów, takich jak targetowanie, optymalizacja budżetu i tworzenie kreacji reklamowych.`,
      en: `Welcome to the first lesson of the Facebook Ads course! Here you will learn the basics of creating effective advertising campaigns.

We will start with setting up your ad account and Ads Manager. You will learn the campaign structure (campaign → ad set → ad) and how to define advertising objectives.

In the following lessons, we will move on to more advanced topics, such as targeting, budget optimization, and creating ad creatives.`
    },
    category: "darmowe-kursy",
    categoryLabel: {
      pl: "Darmowe Kursy",
      en: "Free Courses"
    },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    date: "2024-11-20",
    readTime: {
      pl: "10 min",
      en: "10 min"
    }
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
  { id: "all", label: { pl: "Wszystkie", en: "All" }, slug: "all" },
  { id: "social-media", label: { pl: "Social Media", en: "Social Media" }, slug: "social-media" },
  { id: "bezpieczenstwo", label: { pl: "Bezpieczeństwo", en: "Security" }, slug: "bezpieczenstwo" },
  { id: "ai", label: { pl: "Sztuczna Inteligencja AI", en: "Artificial Intelligence AI" }, slug: "ai" },
  { id: "darmowe-kursy", label: { pl: "Darmowe Kursy", en: "Free Courses" }, slug: "darmowe-kursy" }
];

// Helper function to get localized text
export function getLocalizedText(text: LocalizedText, language: 'pl' | 'en'): string {
  return text[language];
}
