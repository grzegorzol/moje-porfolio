import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import profileImage from "@/assets/grzegorz-profile.jpg";

const experiences = [
  {
    year: "2023-2025",
    title: "Asystent Działu Marketingu",
    company: "Dealz Polska",
    description: "Koordynacja otwarć nowych sklepów, materiały marketingowe, analiza ankiet klienckich.",
  },
  {
    year: "2022",
    title: "Specjalista ds. Promocji - PR",
    company: "Partners Network",
    description: "Tworzenie kampanii promocyjnych i współpraca z mediami.",
  },
  {
    year: "2018-2021",
    title: "Współwłaściciel",
    company: "Ambasada Kreatywności",
    description: "Organizacja ponad 500 wydarzeń kulturalnych i muzycznych.",
  },
  {
    year: "2017-2018",
    title: "Programista WordPress",
    company: "Gogler Sp. z o.o",
    description: "Tworzenie profesjonalnych stron internetowych dla klientów biznesowych.",
  },
  {
    year: "Od 2023",
    title: "Freelance Event Manager",
    company: "Działalność własna",
    description: "Koordynacja wydarzeń DJ-skich i festiwali muzycznych.",
  },
];

const specializations = [
  {
    title: "WordPress & Strony Internetowe",
    description: "Od 2017 roku tworzę profesjonalne strony na WordPress. Pracowałem jako Programista WordPress w Gogler Sp. z o.o., gdzie realizowałem projekty dla klientów biznesowych."
  },
  {
    title: "Canva & Grafika",
    description: "Tworzę materiały graficzne dla social media, kampanii reklamowych i wydarzeń. Prowadzę również szkolenia z Canvy, ucząc innych jak samodzielnie tworzyć profesjonalne projekty."
  },
  {
    title: "Social Media & Reklamy",
    description: "Zarządzam kampaniami na Facebooku i Instagramie, tworzę strategie contentowe i prowadzę szkolenia z Facebook Ads. Doświadczenie zdobyte m.in. w Dealz Polska i Partners Network."
  },
  {
    title: "Event Management",
    description: "Zorganizowałem ponad 500 wydarzeń jako współwłaściciel Ambasady Kreatywności. Obecnie jako freelancer koordynuję wydarzenia DJ-skie i festiwale muzyczne."
  },
  {
    title: "Wirtualny Asystent",
    description: "Wspieram firmy w codziennych zadaniach: obsługa korespondencji, zarządzanie social media, koordynacja projektów, przygotowywanie raportów."
  }
];

export default function About() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={profileImage}
                  alt="Grzegorz Olszowik"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Cześć! Jestem Grzegorz Olszowik
              </h1>
              
              <div className="flex flex-col gap-2 mb-6">
                <a 
                  href="mailto:grzegorz.olszowik@gmail.com" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  grzegorz.olszowik@gmail.com
                </a>
                <a 
                  href="tel:+48502420804" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  502 420 804
                </a>
              </div>

              <p className="text-lg font-medium text-primary mb-4">
                Marketing Specialist | Event Manager | Digital Strategist
              </p>
              
              <p className="text-muted-foreground mb-8">
                Jestem specjalistą od marketingu internetowego z ponad 8-letnim doświadczeniem w branży. 
                Moją pasją jest łączenie kreatywności z praktycznymi rozwiązaniami biznesowymi.
              </p>

              {/* Specializations */}
              <h2 className="text-2xl font-display font-bold mb-6">Moja specjalizacja</h2>
              <div className="space-y-6">
                {specializations.map((spec, index) => (
                  <motion.div
                    key={spec.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="font-semibold mb-1">{spec.title}</h3>
                    <p className="text-sm text-muted-foreground">{spec.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-12 text-center"
          >
            Doświadczenie
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0 border-l-2 border-border"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                <span className="text-sm text-primary font-medium">{exp.year}</span>
                <h3 className="text-xl font-display font-semibold mt-1">{exp.title}</h3>
                <p className="text-muted-foreground font-medium">{exp.company}</p>
                <p className="text-muted-foreground mt-2">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4">📧 grzegorz.olszowik@gmail.com</p>
            <p className="text-muted-foreground">📱 502 420 804</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
