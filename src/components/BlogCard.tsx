import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/portfolioData";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { language } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-secondary transition-all duration-300 hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={post.image}
              alt={post.title[language]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                {post.categoryLabel[language]}
              </span>
            </div>
            
            {/* Arrow Icon */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5 text-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <time className="text-xs text-muted-foreground">
              {post.date}
            </time>
            <h3 className="text-lg font-display font-semibold mt-2 text-foreground line-clamp-2">
              {post.title[language]}
            </h3>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {post.excerpt[language]}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
