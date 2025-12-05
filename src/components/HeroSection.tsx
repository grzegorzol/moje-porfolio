import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              Dostępny do współpracy
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-8 leading-[1.1]"
          >
            Tworzę skuteczne
            <br />
            <span className="text-primary">strategie marketingowe</span>
          </motion.h1>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
            >
              <Link to="/projekty">
                Zobacz portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating UI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="flex justify-center items-end gap-4 overflow-hidden">
            <motion.div
              initial={{ rotate: -8, y: 40 }}
              animate={{ rotate: -8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block w-48 lg:w-64 -mr-8 z-0"
            >
              <img
                src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop"
                alt="Social media design"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-64 sm:w-80 lg:w-[500px] z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
                alt="Dashboard design"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ rotate: 8, y: 40 }}
              animate={{ rotate: 8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block w-48 lg:w-64 -ml-8 z-0"
            >
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop"
                alt="Mobile app design"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}