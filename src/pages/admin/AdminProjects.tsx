import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2, Eye, Search, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  title_en: string | null;
  description: string | null;
  description_en: string | null;
  category: string | null;
  category_en: string | null;
  image: string | null;
  tags: string[];
  link: string | null;
  featured: boolean;
  sort_order: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

export default function AdminProjects() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    category: '',
    category_en: '',
    image: '',
    tags: '',
    link: '',
    featured: false,
    sort_order: 0,
    status: 'draft' as 'draft' | 'published' | 'archived'
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Błąd podczas pobierania projektów');
      return;
    }
    setProjects(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

    if (editingProject) {
      const { error } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          title_en: formData.title_en || null,
          description: formData.description || null,
          description_en: formData.description_en || null,
          category: formData.category || null,
          category_en: formData.category_en || null,
          image: formData.image || null,
          tags: tagsArray,
          link: formData.link || null,
          featured: formData.featured,
          sort_order: formData.sort_order,
          status: formData.status
        })
        .eq('id', editingProject.id);

      if (error) {
        toast.error('Błąd podczas aktualizacji projektu');
        return;
      }
      toast.success('Projekt zaktualizowany');
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([{
          title: formData.title,
          title_en: formData.title_en || null,
          description: formData.description || null,
          description_en: formData.description_en || null,
          category: formData.category || null,
          category_en: formData.category_en || null,
          image: formData.image || null,
          tags: tagsArray,
          link: formData.link || null,
          featured: formData.featured,
          sort_order: formData.sort_order,
          status: formData.status,
          author_id: user?.id
        }]);

      if (error) {
        toast.error('Błąd podczas tworzenia projektu');
        return;
      }
      toast.success('Projekt utworzony');
    }

    setIsDialogOpen(false);
    setEditingProject(null);
    resetForm();
    fetchProjects();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_en: '',
      description: '',
      description_en: '',
      category: '',
      category_en: '',
      image: '',
      tags: '',
      link: '',
      featured: false,
      sort_order: 0,
      status: 'draft'
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      title_en: project.title_en || '',
      description: project.description || '',
      description_en: project.description_en || '',
      category: project.category || '',
      category_en: project.category_en || '',
      image: project.image || '',
      tags: project.tags?.join(', ') || '',
      link: project.link || '',
      featured: project.featured,
      sort_order: project.sort_order,
      status: project.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten projekt?')) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      toast.error('Błąd podczas usuwania projektu');
      return;
    }
    toast.success('Projekt usunięty');
    fetchProjects();
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
    };
    const labels = {
      draft: 'Szkic',
      published: 'Opublikowany',
      archived: 'Zarchiwizowany'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
            <p className="text-muted-foreground">Zarządzaj projektami w portfolio</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingProject(null);
                resetForm();
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj projekt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edytuj projekt' : 'Nowy projekt'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tytuł (PL)</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_en">Tytuł (EN)</Label>
                    <Input
                      id="title_en"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Opis (PL)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Opis (EN)</Label>
                    <Textarea
                      id="description_en"
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategoria (PL)</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category_en">Kategoria (EN)</Label>
                    <Input
                      id="category_en"
                      value={formData.category_en}
                      onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">URL obrazka</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link">Link do projektu</Label>
                    <Input
                      id="link"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tagi (oddzielone przecinkami)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, TypeScript, Tailwind"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Kolejność</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) => setFormData({ ...formData, status: v as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Szkic</SelectItem>
                        <SelectItem value="published">Opublikowany</SelectItem>
                        <SelectItem value="archived">Zarchiwizowany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="featured">Wyróżniony</Label>
                    <div className="flex items-center h-10">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Anuluj
                  </Button>
                  <Button type="submit">
                    {editingProject ? 'Zapisz' : 'Utwórz'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj projektów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tytuł</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Tagi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Brak projektów do wyświetlenia
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        {project.title}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.category || '-'}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-muted rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {project.tags?.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {project.link && (
                          <Button size="icon" variant="ghost" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(project)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
