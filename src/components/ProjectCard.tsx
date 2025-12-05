import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projekty/${project.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-secondary transition-all duration-300 hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            
            {/* Arrow Icon */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5 text-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-xl font-display font-semibold mt-2 text-foreground">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}