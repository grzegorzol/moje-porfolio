import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import SectionHeader from "@/components/SectionHeader";
import { blogPosts } from "@/data/portfolioData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t, language } = useLanguage();

  const categories = [
    { id: "all", labelKey: "blog.category.all" },
    { id: "social-media", labelKey: "blog.category.social" },
    { id: "bezpieczenstwo", labelKey: "blog.category.security" },
    { id: "ai", labelKey: "blog.category.ai" },
    { id: "darmowe-kursy", labelKey: "blog.category.courses" }
  ];

  const filteredPosts = activeCategory === "all"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t("blog.title")}
            subtitle={t("blog.subtitle")}
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
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border hover:border-primary/30 text-foreground"
                }`}
              >
                {t(category.labelKey)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-12"
            >
              {t("blog.empty")}
            </motion.p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t("blog.newsletter.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("blog.newsletter.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("blog.newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                {t("blog.newsletter.button")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
