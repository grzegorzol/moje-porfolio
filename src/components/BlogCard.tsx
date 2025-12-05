import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/portfolioData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const categoryColors: Record<string, string> = {
  "social-media": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "bezpieczenstwo": "bg-red-500/10 text-red-600 border-red-500/20",
  "ai": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "darmowe-kursy": "bg-green-500/10 text-green-600 border-green-500/20",
};

export default function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.id}`} className="group block h-full">
        <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:shadow-lg hover:border-primary/20">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 text-xs font-medium rounded-full border ${categoryColors[post.category]}`}>
                {post.categoryLabel}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
              {post.excerpt}
            </p>
            
            {/* Read More */}
            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
              Czytaj więcej
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}