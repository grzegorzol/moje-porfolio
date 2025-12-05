import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Indywidualne podejście do każdego projektu",
  "Transparentne raportowanie wyników",
  "Szybki czas realizacji",
  "Konkurencyjne ceny",
  "Wsparcie po zakończeniu projektu",
  "Gwarancja satysfakcji",
];

export default function Services() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Dla klienta"
            subtitle="Kompleksowe usługi marketingowe dopasowane do Twoich potrzeb biznesowych"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Dlaczego warto ze mną <span className="text-gradient">współpracować?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Jako freelancer oferuję elastyczność i indywidualne podejście, 
                którego nie znajdziesz w dużych agencjach. Każdy projekt traktuję 
                jak własny biznes.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Współpraca"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
              Zainteresowany współpracą?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Napisz do mnie i opowiedz o swoim projekcie. Pierwsza konsultacja jest bezpłatna!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/kontakt">
                Skontaktuj się
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}