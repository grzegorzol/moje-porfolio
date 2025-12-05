import { motion } from "framer-motion";
import { services } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Zap, HeartHandshake, Globe, Palette, Target, Headphones, PenTool } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  palette: Palette,
  target: Target,
  headphones: Headphones,
  "pen-tool": PenTool,
};

const benefits = [
  {
    icon: Award,
    title: "Profesjonalizm",
    description: "Terminowość i najwyższa jakość wykonania każdego projektu"
  },
  {
    icon: Users,
    title: "Indywidualne podejście",
    description: "Każdy projekt dostosowany do unikalnych potrzeb klienta"
  },
  {
    icon: Zap,
    title: "Nowoczesne technologie",
    description: "Wykorzystanie najnowszych narzędzi i trendów w branży"
  },
  {
    icon: HeartHandshake,
    title: "Wsparcie",
    description: "Pomoc i konsultacje również po zakończeniu projektu"
  }
];

export default function Services() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">
              Dla klienta
            </h1>
            
            {/* Hero Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-12">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Moja oferta"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-12 text-center"
          >
            Moja oferta
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">
                        {index + 1}. {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 pl-16">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
              Gotowy na współpracę?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Skontaktuj się ze mną, aby omówić szczegóły Twojego projektu
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/kontakt">
                Wyślij wiadomość
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
