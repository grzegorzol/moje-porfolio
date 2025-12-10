import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  const sections = [
    { title: t("privacy.section1.title"), content: t("privacy.section1.content") },
    { title: t("privacy.section2.title"), content: t("privacy.section2.content") },
    { title: t("privacy.section3.title"), content: t("privacy.section3.content") },
    { title: t("privacy.section4.title"), content: t("privacy.section4.content") },
    { title: t("privacy.section5.title"), content: t("privacy.section5.content") },
    { title: t("privacy.section6.title"), content: t("privacy.section6.content") },
    { title: t("privacy.section7.title"), content: t("privacy.section7.content") },
  ];

  return (
    <main className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
            {t("privacy.title")}
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            {t("privacy.lastUpdate")}: 10.12.2025
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              {t("privacy.intro")}
            </p>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
