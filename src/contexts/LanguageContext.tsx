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
  "hero.title": { pl: "Zapraszam do współpracy", en: "Let's work together" },
  "hero.subtitle": { pl: "Marketing Specialist | Event Manager | Digital Strategist", en: "Marketing Specialist | Event Manager | Digital Strategist" },
  "hero.description": { pl: "Tworzę strony internetowe, projektuję w Canva, zarządzam social media i prowadzę kampanie reklamowe", en: "I create websites, design in Canva, manage social media and run advertising campaigns" },
  "hero.cta": { pl: "Zobacz portfolio", en: "View portfolio" },
  "hero.contact": { pl: "Skontaktuj się", en: "Get in touch" },
  
  // Index page
  "index.projects.title": { pl: "Wybrane projekty", en: "Featured projects" },
  "index.projects.subtitle": { pl: "Najlepsze realizacje z mojego portfolio", en: "Best work from my portfolio" },
  "index.projects.viewAll": { pl: "Zobacz wszystkie projekty", en: "View all projects" },
  "index.blog.title": { pl: "Najnowsze na blogu", en: "Latest on the blog" },
  "index.blog.subtitle": { pl: "3 ostatnie wpisy z bloga marketingowego", en: "3 latest posts from marketing blog" },
  "index.blog.viewAll": { pl: "Zobacz wszystkie artykuły", en: "View all articles" },
  "index.cta.title": { pl: "Zrealizujmy razem Twój projekt", en: "Let's realize your project together" },
  "index.cta.description": { pl: "Szukasz partnera do realizacji kampanii marketingowej, projektu graficznego lub wydarzenia? Napisz do mnie – przygotuję propozycję dopasowaną do Twoich celów i budżetu.", en: "Looking for a partner to implement a marketing campaign, graphic project or event? Write to me – I'll prepare a proposal tailored to your goals and budget." },
  "index.cta.contact": { pl: "Napisz do mnie", en: "Contact me" },
  "index.cta.offer": { pl: "Zobacz ofertę", en: "See offer" },
  
  // Projects page
  "projects.title": { pl: "Projekty", en: "Projects" },
  "projects.subtitle": { pl: "Odkryj moje prace w różnych kategoriach", en: "Discover my work across different categories" },
  "projects.empty": { pl: "Brak projektów w tej kategorii.", en: "No projects in this category." },
  "projects.category.all": { pl: "Wszystkie", en: "All" },
  "projects.category.canva": { pl: "Grafiki Canva", en: "Canva Graphics" },
  "projects.category.marketing": { pl: "Marketing", en: "Marketing" },
  "projects.category.social": { pl: "Social Media", en: "Social Media" },
  "projects.category.wordpress": { pl: "Strony WordPress", en: "WordPress Sites" },
  
  // Blog page
  "blog.title": { pl: "Blog Marketingowy", en: "Marketing Blog" },
  "blog.subtitle": { pl: "Artykuły, porady i darmowe kursy z marketingu cyfrowego", en: "Articles, tips and free courses on digital marketing" },
  "blog.empty": { pl: "Brak artykułów w tej kategorii.", en: "No articles in this category." },
  "blog.newsletter.title": { pl: "Nie przegap nowych artykułów", en: "Don't miss new articles" },
  "blog.newsletter.subtitle": { pl: "Zapisz się do newslettera i otrzymuj najnowsze porady marketingowe prosto na skrzynkę.", en: "Subscribe to the newsletter and receive the latest marketing tips straight to your inbox." },
  "blog.newsletter.placeholder": { pl: "Twój adres e-mail", en: "Your email address" },
  "blog.newsletter.button": { pl: "Zapisz się", en: "Subscribe" },
  "blog.category.all": { pl: "Wszystkie", en: "All" },
  "blog.category.social": { pl: "Social Media", en: "Social Media" },
  "blog.category.security": { pl: "Bezpieczeństwo", en: "Security" },
  "blog.category.ai": { pl: "Sztuczna Inteligencja AI", en: "Artificial Intelligence AI" },
  "blog.category.courses": { pl: "Darmowe Kursy", en: "Free Courses" },
  
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
  "footer.about": { pl: "O mnie", en: "About" },
  "footer.projects": { pl: "Projekty", en: "Projects" },
  "footer.services": { pl: "Dla klienta", en: "Services" },
  "footer.blog": { pl: "Blog", en: "Blog" },
  "footer.contact": { pl: "Kontakt", en: "Contact" },
  "footer.privacy": { pl: "Polityka prywatności", en: "Privacy Policy" },
  "footer.rights": { pl: "Wszelkie prawa zastrzeżone", en: "All rights reserved" },
  
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
  
  // Privacy Policy
  "privacy.title": { pl: "Polityka Prywatności", en: "Privacy Policy" },
  "privacy.lastUpdate": { pl: "Ostatnia aktualizacja", en: "Last updated" },
  "privacy.intro": { pl: "Niniejsza Polityka Prywatności opisuje, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.", en: "This Privacy Policy describes how we collect, use and protect your personal data." },
  "privacy.section1.title": { pl: "1. Administrator danych", en: "1. Data Controller" },
  "privacy.section1.content": { pl: "Administratorem Twoich danych osobowych jest Grzegorz Olszowik. W razie pytań dotyczących przetwarzania danych osobowych możesz skontaktować się przez formularz kontaktowy na stronie.", en: "The controller of your personal data is Grzegorz Olszowik. If you have questions about personal data processing, you can contact us through the contact form on the website." },
  "privacy.section2.title": { pl: "2. Zbierane dane", en: "2. Data We Collect" },
  "privacy.section2.content": { pl: "Zbieramy następujące rodzaje danych: dane podane dobrowolnie w formularzach (imię, email, wiadomość), dane techniczne (adres IP, typ przeglądarki, czas wizyty), pliki cookies zgodnie z ustawieniami przeglądarki.", en: "We collect the following types of data: data voluntarily provided in forms (name, email, message), technical data (IP address, browser type, visit time), cookies according to browser settings." },
  "privacy.section3.title": { pl: "3. Cele przetwarzania", en: "3. Purpose of Processing" },
  "privacy.section3.content": { pl: "Twoje dane przetwarzamy w celu: odpowiedzi na zapytania kontaktowe, analizy ruchu na stronie, dostosowania treści do preferencji użytkowników, realizacji obowiązków prawnych.", en: "We process your data for: responding to contact inquiries, website traffic analysis, tailoring content to user preferences, fulfilling legal obligations." },
  "privacy.section4.title": { pl: "4. Pliki cookies", en: "4. Cookies" },
  "privacy.section4.content": { pl: "Strona używa plików cookies do: zapamiętania preferencji użytkownika, analizy statystyk odwiedzin (Google Analytics), funkcjonowania elementów społecznościowych. Możesz zarządzać ustawieniami cookies w swojej przeglądarce lub poprzez baner cookies na stronie.", en: "The website uses cookies for: remembering user preferences, visit statistics analysis (Google Analytics), social media functionality. You can manage cookie settings in your browser or via the cookie banner on the site." },
  "privacy.section5.title": { pl: "5. Twoje prawa", en: "5. Your Rights" },
  "privacy.section5.content": { pl: "Zgodnie z RODO przysługują Ci następujące prawa: prawo dostępu do danych, prawo do sprostowania danych, prawo do usunięcia danych, prawo do ograniczenia przetwarzania, prawo do przenoszenia danych, prawo do sprzeciwu, prawo do cofnięcia zgody.", en: "Under GDPR you have the following rights: right to access data, right to rectify data, right to delete data, right to restrict processing, right to data portability, right to object, right to withdraw consent." },
  "privacy.section6.title": { pl: "6. Bezpieczeństwo danych", en: "6. Data Security" },
  "privacy.section6.content": { pl: "Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed nieuprawnionym dostępem, utratą lub zniszczeniem.", en: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss or destruction." },
  "privacy.section7.title": { pl: "7. Kontakt", en: "7. Contact" },
  "privacy.section7.content": { pl: "W sprawach dotyczących ochrony danych osobowych możesz skontaktować się z nami poprzez formularz kontaktowy lub adres email podany na stronie.", en: "For matters related to personal data protection, you can contact us through the contact form or email address provided on the website." },
  
  // Common
  "common.learnMore": { pl: "Dowiedz się więcej", en: "Learn more" },
  "common.readMore": { pl: "Czytaj więcej", en: "Read more" },
  "common.viewAll": { pl: "Zobacz wszystkie", en: "View all" },
  "common.minRead": { pl: "min", en: "min" },
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
