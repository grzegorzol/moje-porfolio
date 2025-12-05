import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { blogPosts } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";

const categoryColors: Record<string, string> = {
  "social-media": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "bezpieczenstwo": "bg-red-500/10 text-red-600 border-red-500/20",
  "ai": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "darmowe-kursy": "bg-green-500/10 text-green-600 border-green-500/20",
};

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Artykuł nie znaleziony</h1>
          <Button asChild>
            <Link to="/blog">Wróć do bloga</Link>
          </Button>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[21/9] w-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto -mt-32 relative z-10">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Powrót do bloga
              </Link>
            </motion.div>

            {/* Article Card */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-lg"
            >
              {/* Category */}
              <span className={`inline-block px-3 py-1.5 text-xs font-medium rounded-full border mb-4 ${categoryColors[post.category]}`}>
                {post.categoryLabel}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} czytania
                </span>
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  Udostępnij
                </button>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-foreground/80 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
              Podobne artykuły
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}