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
      className="group p-8 rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-xl hover:border-primary/30"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      
      <h3 className="text-xl font-display font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}