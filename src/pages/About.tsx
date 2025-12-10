import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import profileImage from "@/assets/grzegorz-profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const specializations = [
    { titleKey: "about.spec.wordpress.title", descKey: "about.spec.wordpress.desc" },
    { titleKey: "about.spec.canva.title", descKey: "about.spec.canva.desc" },
    { titleKey: "about.spec.social.title", descKey: "about.spec.social.desc" },
    { titleKey: "about.spec.events.title", descKey: "about.spec.events.desc" },
    { titleKey: "about.spec.va.title", descKey: "about.spec.va.desc" },
  ];

  const experiences = [
    { year: "2023-2025", titleKey: "about.exp1.title", companyKey: "about.exp1.company", descKey: "about.exp1.desc" },
    { year: "2022", titleKey: "about.exp2.title", companyKey: "about.exp2.company", descKey: "about.exp2.desc" },
    { year: "2018-2021", titleKey: "about.exp3.title", companyKey: "about.exp3.company", descKey: "about.exp3.desc" },
    { year: "2017-2018", titleKey: "about.exp4.title", companyKey: "about.exp4.company", descKey: "about.exp4.desc" },
    { yearKey: "about.exp5.year", titleKey: "about.exp5.title", companyKey: "about.exp5.company", descKey: "about.exp5.desc" },
  ];

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
                {t("about.greeting")}
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
                {t("about.role")}
              </p>
              
              <p className="text-muted-foreground mb-8">
                {t("about.intro")}
              </p>

              {/* Specializations */}
              <h2 className="text-2xl font-display font-bold mb-6">{t("about.specialization")}</h2>
              <div className="space-y-6">
                {specializations.map((spec, index) => (
                  <motion.div
                    key={spec.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="font-semibold mb-1">{t(spec.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(spec.descKey)}</p>
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
            {t("about.experience")}
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
                <span className="text-sm text-primary font-medium">
                  {exp.yearKey ? t(exp.yearKey) : exp.year}
                </span>
                <h3 className="text-xl font-display font-semibold mt-1">{t(exp.titleKey)}</h3>
                <p className="text-muted-foreground font-medium">{t(exp.companyKey)}</p>
                <p className="text-muted-foreground mt-2">{t(exp.descKey)}</p>
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
