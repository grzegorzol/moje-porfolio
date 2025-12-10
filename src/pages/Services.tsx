import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Zap, HeartHandshake, Globe, Palette, Target, Headphones, PenTool } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  palette: Palette,
  target: Target,
  headphones: Headphones,
  "pen-tool": PenTool,
};

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: "headphones",
      titleKey: "services.va.title",
      descKey: "services.va.desc",
      features: ["services.va.f1", "services.va.f2", "services.va.f3", "services.va.f4", "services.va.f5"]
    },
    {
      icon: "palette",
      titleKey: "services.canva.title",
      descKey: "services.canva.desc",
      features: ["services.canva.f1", "services.canva.f2", "services.canva.f3", "services.canva.f4", "services.canva.f5"]
    },
    {
      icon: "target",
      titleKey: "services.ads.title",
      descKey: "services.ads.desc",
      features: ["services.ads.f1", "services.ads.f2", "services.ads.f3", "services.ads.f4", "services.ads.f5"]
    },
    {
      icon: "globe",
      titleKey: "services.wordpress.title",
      descKey: "services.wordpress.desc",
      features: ["services.wordpress.f1", "services.wordpress.f2", "services.wordpress.f3", "services.wordpress.f4", "services.wordpress.f5"]
    },
    {
      icon: "pen-tool",
      titleKey: "services.content.title",
      descKey: "services.content.desc",
      features: ["services.content.f1", "services.content.f2", "services.content.f3", "services.content.f4", "services.content.f5"]
    }
  ];

  const benefits = [
    { icon: Award, titleKey: "services.benefit.prof.title", descKey: "services.benefit.prof.desc" },
    { icon: Users, titleKey: "services.benefit.individual.title", descKey: "services.benefit.individual.desc" },
    { icon: Zap, titleKey: "services.benefit.tech.title", descKey: "services.benefit.tech.desc" },
    { icon: HeartHandshake, titleKey: "services.benefit.support.title", descKey: "services.benefit.support.desc" }
  ];

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
              {t("services.title")}
            </h1>
            
            {/* Hero Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-12">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt={t("services.imageAlt")}
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
            {t("services.offer")}
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.titleKey}
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
                        {index + 1}. {t(service.titleKey)}
                      </h3>
                      <p className="text-muted-foreground mb-4">{t(service.descKey)}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 pl-16">
                    {service.features.map((featureKey, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{t(featureKey)}</span>
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
                  key={benefit.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">{t(benefit.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(benefit.descKey)}</p>
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
              {t("services.cta.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t("services.cta.desc")}
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/kontakt">
                {t("services.cta.button")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
