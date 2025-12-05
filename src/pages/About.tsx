import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Award, Briefcase, GraduationCap, Heart } from "lucide-react";

const experiences = [
  {
    year: "2019 - Obecnie",
    title: "Marketing Specialist",
    company: "Freelancer",
    description: "Kompleksowa obsługa marketingowa dla klientów z różnych branż.",
  },
  {
    year: "2017 - 2019",
    title: "Social Media Manager",
    company: "Agencja Marketingowa XYZ",
    description: "Zarządzanie profilami social media dla klientów B2B i B2C.",
  },
  {
    year: "2015 - 2017",
    title: "Event Manager",
    company: "Event Company",
    description: "Organizacja eventów firmowych i masowych imprez muzycznych.",
  },
];

const skills = [
  { name: "WordPress", level: 95 },
  { name: "Canva & Design", level: 90 },
  { name: "Facebook Ads", level: 92 },
  { name: "Google Ads", level: 85 },
  { name: "Social Media", level: 95 },
  { name: "SEO", level: 80 },
];

export default function About() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-primary p-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Grzegorz Olszowik"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Cześć, jestem <span className="text-gradient">Grzegorz</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Marketing Specialist z ponad 5-letnim doświadczeniem w branży digital. 
                Specjalizuję się w tworzeniu stron WordPress, projektowaniu grafik, 
                zarządzaniu social media i prowadzeniu kampanii reklamowych.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Wierzę, że dobry marketing to taki, który przynosi realne rezultaty. 
                Dlatego w każdym projekcie skupiam się na celach biznesowych klienta, 
                a nie tylko na estetyce.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, label: "50+ projektów" },
                  { icon: Heart, label: "30+ klientów" },
                  { icon: Award, label: "5+ lat doświadczenia" },
                  { icon: GraduationCap, label: "Certyfikaty Google" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Umiejętności"
            subtitle="Technologie i narzędzia, w których się specjalizuję"
          />

          <div className="max-w-3xl mx-auto grid gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Doświadczenie"
            subtitle="Moja ścieżka zawodowa"
          />

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
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-primary" />
                <span className="text-sm text-primary font-medium">{exp.year}</span>
                <h3 className="text-xl font-display font-semibold mt-1">{exp.title}</h3>
                <p className="text-muted-foreground font-medium">{exp.company}</p>
                <p className="text-muted-foreground mt-2">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}