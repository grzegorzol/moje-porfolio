import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, Settings, Layout, PenTool, Users } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [stats, setStats] = useState({
    pages: 0,
    posts: 0,
    media: 0
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      const [pagesRes, postsRes, mediaRes] = await Promise.all([
        supabase.from('pages').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('media').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        pages: pagesRes.count || 0,
        posts: postsRes.count || 0,
        media: mediaRes.count || 0
      });
    };

    if (user && isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const menuItems = [
    { title: 'Strony', description: 'Zarządzaj stronami', icon: Layout, href: '/admin/pages', count: stats.pages },
    { title: 'Blog', description: 'Wpisy na blogu', icon: PenTool, href: '/admin/posts', count: stats.posts },
    { title: 'Media', description: 'Biblioteka mediów', icon: Image, href: '/admin/media', count: stats.media },
    { title: 'Nagłówek', description: 'Edytuj nawigację', icon: FileText, href: '/admin/header' },
    { title: 'Stopka', description: 'Edytuj stopkę', icon: FileText, href: '/admin/footer' },
    { title: 'Ustawienia', description: 'Ustawienia strony', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Panel Administratora</h1>
        <p className="text-muted-foreground mb-8">Zarządzaj wszystkimi elementami strony</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.href}>
                <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {item.count !== undefined && (
                      <span className="text-2xl font-bold text-primary">{item.count}</span>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
