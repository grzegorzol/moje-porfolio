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
  
  // About page
  "about.greeting": { pl: "Cześć! Jestem Grzegorz Olszowik", en: "Hi! I'm Grzegorz Olszowik" },
  "about.role": { pl: "Marketing Specialist | Event Manager | Digital Strategist", en: "Marketing Specialist | Event Manager | Digital Strategist" },
  "about.intro": { pl: "Jestem specjalistą od marketingu internetowego z ponad 8-letnim doświadczeniem w branży. Moją pasją jest łączenie kreatywności z praktycznymi rozwiązaniami biznesowymi.", en: "I am an internet marketing specialist with over 8 years of experience in the industry. My passion is combining creativity with practical business solutions." },
  "about.specialization": { pl: "Moja specjalizacja", en: "My specialization" },
  "about.experience": { pl: "Doświadczenie", en: "Experience" },
  
  // About - Specializations
  "about.spec.wordpress.title": { pl: "WordPress & Strony Internetowe", en: "WordPress & Websites" },
  "about.spec.wordpress.desc": { pl: "Od 2017 roku tworzę profesjonalne strony na WordPress. Pracowałem jako Programista WordPress w Gogler Sp. z o.o., gdzie realizowałem projekty dla klientów biznesowych.", en: "Since 2017, I have been creating professional WordPress websites. I worked as a WordPress Developer at Gogler Sp. z o.o., where I implemented projects for business clients." },
  "about.spec.canva.title": { pl: "Canva & Grafika", en: "Canva & Graphics" },
  "about.spec.canva.desc": { pl: "Tworzę materiały graficzne dla social media, kampanii reklamowych i wydarzeń. Prowadzę również szkolenia z Canvy, ucząc innych jak samodzielnie tworzyć profesjonalne projekty.", en: "I create graphic materials for social media, advertising campaigns, and events. I also conduct Canva training, teaching others how to create professional designs independently." },
  "about.spec.social.title": { pl: "Social Media & Reklamy", en: "Social Media & Ads" },
  "about.spec.social.desc": { pl: "Zarządzam kampaniami na Facebooku i Instagramie, tworzę strategie contentowe i prowadzę szkolenia z Facebook Ads. Doświadczenie zdobyte m.in. w Dealz Polska i Partners Network.", en: "I manage campaigns on Facebook and Instagram, create content strategies, and conduct Facebook Ads training. Experience gained at Dealz Poland and Partners Network, among others." },
  "about.spec.events.title": { pl: "Event Management", en: "Event Management" },
  "about.spec.events.desc": { pl: "Zorganizowałem ponad 500 wydarzeń jako współwłaściciel Ambasady Kreatywności. Obecnie jako freelancer koordynuję wydarzenia DJ-skie i festiwale muzyczne.", en: "I organized over 500 events as co-owner of Creativity Embassy. Currently, as a freelancer, I coordinate DJ events and music festivals." },
  "about.spec.va.title": { pl: "Wirtualny Asystent", en: "Virtual Assistant" },
  "about.spec.va.desc": { pl: "Wspieram firmy w codziennych zadaniach: obsługa korespondencji, zarządzanie social media, koordynacja projektów, przygotowywanie raportów.", en: "I support companies in daily tasks: handling correspondence, managing social media, coordinating projects, preparing reports." },
  
  // About - Experience
  "about.exp1.title": { pl: "Asystent Działu Marketingu", en: "Marketing Department Assistant" },
  "about.exp1.company": { pl: "Dealz Polska", en: "Dealz Poland" },
  "about.exp1.desc": { pl: "Koordynacja otwarć nowych sklepów, materiały marketingowe, analiza ankiet klienckich.", en: "Coordination of new store openings, marketing materials, customer survey analysis." },
  "about.exp2.title": { pl: "Specjalista ds. Promocji - PR", en: "Promotion Specialist - PR" },
  "about.exp2.company": { pl: "Partners Network", en: "Partners Network" },
  "about.exp2.desc": { pl: "Tworzenie kampanii promocyjnych i współpraca z mediami.", en: "Creating promotional campaigns and media cooperation." },
  "about.exp3.title": { pl: "Współwłaściciel", en: "Co-owner" },
  "about.exp3.company": { pl: "Ambasada Kreatywności", en: "Creativity Embassy" },
  "about.exp3.desc": { pl: "Organizacja ponad 500 wydarzeń kulturalnych i muzycznych.", en: "Organization of over 500 cultural and music events." },
  "about.exp4.title": { pl: "Programista WordPress", en: "WordPress Developer" },
  "about.exp4.company": { pl: "Gogler Sp. z o.o", en: "Gogler Sp. z o.o" },
  "about.exp4.desc": { pl: "Tworzenie profesjonalnych stron internetowych dla klientów biznesowych.", en: "Creating professional websites for business clients." },
  "about.exp5.title": { pl: "Freelance Event Manager", en: "Freelance Event Manager" },
  "about.exp5.company": { pl: "Działalność własna", en: "Self-employed" },
  "about.exp5.desc": { pl: "Koordynacja wydarzeń DJ-skich i festiwali muzycznych.", en: "Coordination of DJ events and music festivals." },
  "about.exp5.year": { pl: "Od 2023", en: "Since 2023" },
  
  // Contact page
  "contact.title": { pl: "Kontakt", en: "Contact" },
  "contact.subtitle": { pl: "Masz pytania? Napisz do mnie!", en: "Have questions? Write to me!" },
  "contact.name": { pl: "Imię i nazwisko", en: "Full name" },
  "contact.namePlaceholder": { pl: "Jan Kowalski", en: "John Smith" },
  "contact.email": { pl: "Email", en: "Email" },
  "contact.emailPlaceholder": { pl: "jan@example.com", en: "john@example.com" },
  "contact.subject": { pl: "Temat", en: "Subject" },
  "contact.subjectPlaceholder": { pl: "Zapytanie o współpracę", en: "Collaboration inquiry" },
  "contact.message": { pl: "Wiadomość", en: "Message" },
  "contact.messagePlaceholder": { pl: "Opisz swój projekt lub zadaj pytanie...", en: "Describe your project or ask a question..." },
  "contact.send": { pl: "Wyślij wiadomość", en: "Send message" },
  "contact.required": { pl: "*", en: "*" },
  "contact.response": { pl: "Odpowiem na Twoją wiadomość tak szybko, jak to możliwe.", en: "I will respond to your message as soon as possible." },
  "contact.success.title": { pl: "Wiadomość wysłana!", en: "Message sent!" },
  "contact.success.desc": { pl: "Dziękuję za kontakt. Odpowiem najszybciej jak to możliwe.", en: "Thank you for reaching out. I will respond as soon as possible." },
  
  // Services page
  "services.title": { pl: "Dla klienta", en: "For clients" },
  "services.offer": { pl: "Moja oferta", en: "My offer" },
  "services.imageAlt": { pl: "Moja oferta", en: "My offer" },
  "services.cta.title": { pl: "Gotowy na współpracę?", en: "Ready to collaborate?" },
  "services.cta.desc": { pl: "Skontaktuj się ze mną, aby omówić szczegóły Twojego projektu", en: "Contact me to discuss the details of your project" },
  "services.cta.button": { pl: "Wyślij wiadomość", en: "Send message" },
  
  // Services - Benefits
  "services.benefit.prof.title": { pl: "Profesjonalizm", en: "Professionalism" },
  "services.benefit.prof.desc": { pl: "Terminowość i najwyższa jakość wykonania każdego projektu", en: "Timeliness and highest quality execution of every project" },
  "services.benefit.individual.title": { pl: "Indywidualne podejście", en: "Individual approach" },
  "services.benefit.individual.desc": { pl: "Każdy projekt dostosowany do unikalnych potrzeb klienta", en: "Each project tailored to the unique needs of the client" },
  "services.benefit.tech.title": { pl: "Nowoczesne technologie", en: "Modern technologies" },
  "services.benefit.tech.desc": { pl: "Wykorzystanie najnowszych narzędzi i trendów w branży", en: "Using the latest tools and trends in the industry" },
  "services.benefit.support.title": { pl: "Wsparcie", en: "Support" },
  "services.benefit.support.desc": { pl: "Pomoc i konsultacje również po zakończeniu projektu", en: "Help and consultations also after project completion" },
  
  // Services - Offerings
  "services.va.title": { pl: "Wirtualny Asystent", en: "Virtual Assistant" },
  "services.va.desc": { pl: "Profesjonalne wsparcie w codziennych zadaniach biznesowych", en: "Professional support in daily business tasks" },
  "services.va.f1": { pl: "Odpowiadanie na maile i wiadomości klientów", en: "Responding to emails and customer messages" },
  "services.va.f2": { pl: "Obsługa telefonów i planowanie spotkań", en: "Phone handling and meeting scheduling" },
  "services.va.f3": { pl: "Administrowanie fanpage na Facebooku i Instagramie", en: "Managing Facebook and Instagram fanpages" },
  "services.va.f4": { pl: "Zarządzanie kalendarzem i terminami", en: "Calendar and schedule management" },
  "services.va.f5": { pl: "Przygotowywanie dokumentów i prezentacji", en: "Preparing documents and presentations" },
  
  "services.canva.title": { pl: "Grafiki w Canva + Szkolenia", en: "Canva Graphics + Training" },
  "services.canva.desc": { pl: "Tworzenie profesjonalnych materiałów wizualnych", en: "Creating professional visual materials" },
  "services.canva.f1": { pl: "Projektowanie postów na social media", en: "Designing social media posts" },
  "services.canva.f2": { pl: "Tworzenie grafik reklamowych i banerów", en: "Creating advertising graphics and banners" },
  "services.canva.f3": { pl: "Przygotowywanie prezentacji i infografik", en: "Preparing presentations and infographics" },
  "services.canva.f4": { pl: "Projektowanie materiałów drukowanych (ulotki, wizytówki)", en: "Designing printed materials (flyers, business cards)" },
  "services.canva.f5": { pl: "Szkolenia z Canva - nauczę Cię samodzielnie tworzyć profesjonalne grafiki", en: "Canva training - I will teach you to create professional graphics on your own" },
  
  "services.ads.title": { pl: "Szkolenia z Reklam Facebook i Instagram", en: "Facebook and Instagram Ads Training" },
  "services.ads.desc": { pl: "Kompleksowe szkolenia z zakresu płatnych kampanii", en: "Comprehensive training in paid campaigns" },
  "services.ads.f1": { pl: "Tworzenie skutecznych kampanii reklamowych", en: "Creating effective advertising campaigns" },
  "services.ads.f2": { pl: "Targetowanie i optymalizacja budżetu", en: "Targeting and budget optimization" },
  "services.ads.f3": { pl: "Analiza wyników i raportowanie", en: "Results analysis and reporting" },
  "services.ads.f4": { pl: "Tworzenie kreacji reklamowych", en: "Creating ad creatives" },
  "services.ads.f5": { pl: "Strategie remarketingowe", en: "Remarketing strategies" },
  
  "services.wordpress.title": { pl: "Tworzenie Stron WordPress", en: "WordPress Website Development" },
  "services.wordpress.desc": { pl: "Profesjonalne strony internetowe", en: "Professional websites" },
  "services.wordpress.f1": { pl: "Projektowanie i wdrażanie stron WordPress", en: "Designing and implementing WordPress websites" },
  "services.wordpress.f2": { pl: "Responsywne layouty dostosowane do urządzeń mobilnych", en: "Responsive layouts adapted for mobile devices" },
  "services.wordpress.f3": { pl: "Optymalizacja SEO i szybkości ładowania", en: "SEO and loading speed optimization" },
  "services.wordpress.f4": { pl: "Integracja z social media i narzędziami marketingowymi", en: "Integration with social media and marketing tools" },
  "services.wordpress.f5": { pl: "Szkolenie z obsługi panelu WordPress", en: "WordPress dashboard training" },
  
  "services.content.title": { pl: "Teksty na Social Media", en: "Social Media Content" },
  "services.content.desc": { pl: "Angażujący content dla Twojej marki", en: "Engaging content for your brand" },
  "services.content.f1": { pl: "Pisanie postów na Facebook i Instagram", en: "Writing posts for Facebook and Instagram" },
  "services.content.f2": { pl: "Tworzenie strategii contentowej", en: "Creating content strategy" },
  "services.content.f3": { pl: "Copywriting reklamowy", en: "Advertising copywriting" },
  "services.content.f4": { pl: "Planowanie kalendarza publikacji", en: "Publication calendar planning" },
  "services.content.f5": { pl: "Analiza zaangażowania i optymalizacja treści", en: "Engagement analysis and content optimization" },
  
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
