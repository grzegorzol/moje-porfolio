import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pl" | "en";

interface Translations {
  [key: string]: {
    pl: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.home": { pl: "Home", en: "Home" },
  "nav.about": { pl: "O mnie", en: "About" },
  "nav.portfolio": { pl: "Portfolio", en: "Portfolio" },
  "nav.services": { pl: "Dla klienta", en: "Services" },
  "nav.blog": { pl: "Blog", en: "Blog" },
  "nav.contact": { pl: "Kontakt", en: "Contact" },
  
  // Hero Section
  "hero.title": { pl: "Tworzę cyfrowe doświadczenia", en: "I create digital experiences" },
  "hero.subtitle": { pl: "Frontend Developer & UI/UX Designer", en: "Frontend Developer & UI/UX Designer" },
  "hero.cta": { pl: "Zobacz projekty", en: "View projects" },
  "hero.contact": { pl: "Skontaktuj się", en: "Get in touch" },
  
  // About
  "about.title": { pl: "O mnie", en: "About me" },
  "about.description": { pl: "Jestem pasjonatem technologii z wieloletnim doświadczeniem", en: "I'm a technology enthusiast with years of experience" },
  
  // Services
  "services.title": { pl: "Usługi", en: "Services" },
  "services.webdev": { pl: "Tworzenie stron", en: "Web Development" },
  "services.design": { pl: "Projektowanie UI/UX", en: "UI/UX Design" },
  "services.consulting": { pl: "Konsulting", en: "Consulting" },
  
  // Contact
  "contact.title": { pl: "Kontakt", en: "Contact" },
  "contact.name": { pl: "Imię", en: "Name" },
  "contact.email": { pl: "Email", en: "Email" },
  "contact.message": { pl: "Wiadomość", en: "Message" },
  "contact.send": { pl: "Wyślij", en: "Send" },
  
  // Footer
  "footer.rights": { pl: "Wszelkie prawa zastrzeżone", en: "All rights reserved" },
  "footer.privacy": { pl: "Polityka prywatności", en: "Privacy Policy" },
  
  // Cookie Banner
  "cookie.title": { pl: "Używamy ciasteczek", en: "We use cookies" },
  "cookie.description": { pl: "Ta strona używa plików cookie, aby zapewnić najlepsze doświadczenia. Kontynuując przeglądanie, zgadzasz się na ich użycie.", en: "This website uses cookies to ensure the best experience. By continuing to browse, you agree to their use." },
  "cookie.accept": { pl: "Akceptuję", en: "Accept" },
  "cookie.decline": { pl: "Odrzuć", en: "Decline" },
  "cookie.settings": { pl: "Ustawienia", en: "Settings" },
  "cookie.necessary": { pl: "Niezbędne", en: "Necessary" },
  "cookie.analytics": { pl: "Analityczne", en: "Analytics" },
  "cookie.marketing": { pl: "Marketingowe", en: "Marketing" },
  "cookie.save": { pl: "Zapisz preferencje", en: "Save preferences" },
  
  // Common
  "common.learnMore": { pl: "Dowiedz się więcej", en: "Learn more" },
  "common.readMore": { pl: "Czytaj więcej", en: "Read more" },
  "common.viewAll": { pl: "Zobacz wszystkie", en: "View all" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return (saved as Language) || "pl";
    }
    return "pl";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
