import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import BlogCard from "@/components/BlogCard";
import ProjectCard from "@/components/ProjectCard";
import { blogPosts, projects } from "@/data/portfolioData";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  // Get 3 latest blog posts
  const latestPosts = blogPosts.slice(0, 3);
  // Get 3 featured projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Wybrane projekty
            </h2>
            <p className="text-muted-foreground">
              Najlepsze realizacje z mojego portfolio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/projekty">
                Zobacz wszystkie projekty
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Najnowsze na blogu
            </h2>
            <p className="text-muted-foreground">
              3 ostatnie wpisy z bloga marketingowego
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/blog">
                Zobacz wszystkie artykuły
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Zrealizujmy razem Twój projekt
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Szukasz partnera do realizacji kampanii marketingowej, projektu graficznego lub wydarzenia? 
              Napisz do mnie – przygotuję propozycję dopasowaną do Twoich celów i budżetu.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full"
              >
                <Link to="/kontakt">
                  Napisz do mnie
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link to="/dla-klienta">
                  Zobacz ofertę
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
