import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/portfolioData";

const categories = ["Wszystkie", "Strony WordPress", "Grafiki Canva", "Social Media", "Marketing"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  const filteredProjects = activeCategory === "Wszystkie"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Moje projekty"
            subtitle="Zobacz realizacje, które przyniosły klientom realne rezultaty"
          />

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border hover:border-primary/30 text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-background">
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
              Brak projektów w tej kategorii.
            </motion.p>
          )}
        </div>
      </section>
    </main>
  );
}