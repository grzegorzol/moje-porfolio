import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolioData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t, language } = useLanguage();

  const categories = [
    { id: "all", labelKey: "projects.category.all" },
    { id: "grafiki-canva", labelKey: "projects.category.canva" },
    { id: "marketing", labelKey: "projects.category.marketing" },
    { id: "social-media", labelKey: "projects.category.social" },
    { id: "strony-wordpress", labelKey: "projects.category.wordpress" }
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category.pl.toLowerCase().replace(/\s+/g, '-') === activeCategory);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {t("projects.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("projects.subtitle")}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-foreground text-background"
                    : "bg-card border border-border hover:border-foreground/30 text-foreground"
                }`}
              >
                {t(category.labelKey)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-12"
            >
              {t("projects.empty")}
            </motion.p>
          )}
        </div>
      </section>
    </main>
  );
}
