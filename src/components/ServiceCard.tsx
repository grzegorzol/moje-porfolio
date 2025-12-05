import { motion } from "framer-motion";
import { Globe, Palette, Share2, Target, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
  };
  index: number;
}

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  palette: Palette,
  share2: Share2,
  target: Target,
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="h-full p-8 rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-semibold mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}