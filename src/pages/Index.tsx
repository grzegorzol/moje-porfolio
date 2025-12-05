import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import BlogCard from "@/components/BlogCard";
import SectionHeader from "@/components/SectionHeader";
import { blogPosts } from "@/data/portfolioData";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  // Get 3 latest blog posts
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Latest Blog Posts */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
            <div>
              <span className="text-sm text-muted-foreground mb-2 block">Najnowsze na blogu</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                3 ostatnie wpisy z bloga marketingowego
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md lg:text-right">
              Na stronie głównej możesz wyróżnić trzy najnowsze artykuły – zarządzane w panelu administratora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Zrealizujmy razem Twój projekt
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Szukasz partnera do realizacji kampanii marketingowej, projektu graficznego lub wydarzenia? Napisz do mnie – przygotuję propozycję dopasowaną do Twoich celów i budżetu.
            </p>
            <div className="flex flex-wrap gap-4">
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
                <Link to="/projekty">
                  Zobacz wybrane projekty
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}