import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import BlogCard from "@/components/BlogCard";
import SectionHeader from "@/components/SectionHeader";
import { projects, services, blogPosts } from "@/data/portfolioData";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Wybrane projekty"
            subtitle="Najlepsze realizacje z mojego portfolio"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/projekty">
                Zobacz wszystkie projekty
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Dla klienta"
            subtitle="Kompleksowe usługi marketingowe dopasowane do Twoich potrzeb"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Blog Marketingowy"
            subtitle="Najnowsze artykuły, porady i darmowe kursy z marketingu cyfrowego"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/blog">
                Zobacz wszystkie artykuły
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Gotowy na współpracę?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Skontaktuj się ze mną i porozmawiajmy o Twoim projekcie. 
              Razem stworzymy skuteczną strategię marketingową.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="px-8"
            >
              <Link to="/kontakt">
                Napisz do mnie
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}