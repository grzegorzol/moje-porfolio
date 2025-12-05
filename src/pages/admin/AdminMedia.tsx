import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Upload, Trash2, Search, Copy, Image as ImageIcon, FileText } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  created_at: string;
}

export default function AdminMedia() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Błąd podczas pobierania mediów');
      return;
    }
    setMedia(data || []);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) {
        toast.error(`Błąd podczas przesyłania ${file.name}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('media')
        .insert([{
          name: file.name,
          file_path: publicUrl,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user?.id
        }]);

      if (dbError) {
        toast.error(`Błąd podczas zapisywania ${file.name}`);
      }
    }

    setIsUploading(false);
    toast.success('Pliki przesłane');
    fetchMedia();

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm('Czy na pewno chcesz usunąć ten plik?')) return;

    const filePath = item.file_path.split('/media/')[1];
    
    if (filePath) {
      await supabase.storage.from('media').remove([filePath]);
    }

    const { error } = await supabase.from('media').delete().eq('id', item.id);

    if (error) {
      toast.error('Błąd podczas usuwania pliku');
      return;
    }
    toast.success('Plik usunięty');
    fetchMedia();
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL skopiowany do schowka');
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = (type: string) => type.startsWith('image/');

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-foreground">Biblioteka mediów</h1>
            <p className="text-muted-foreground">Zarządzaj obrazami i plikami</p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Przesyłanie...' : 'Dodaj pliki'}
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj plików..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Brak plików do wyświetlenia</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
            >
              Dodaj pierwszy plik
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-card border rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedMedia(item)}
              >
                <div className="aspect-square bg-muted flex items-center justify-center">
                  {isImage(item.file_type) ? (
                    <img
                      src={item.file_path}
                      alt={item.alt_text || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(item.file_size)}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item.file_path);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia?.name}</DialogTitle>
            </DialogHeader>
            {selectedMedia && (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  {isImage(selectedMedia.file_type) ? (
                    <img
                      src={selectedMedia.file_path}
                      alt={selectedMedia.alt_text || selectedMedia.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <FileText className="w-24 h-24 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>URL pliku</Label>
                  <div className="flex gap-2">
                    <Input value={selectedMedia.file_path} readOnly />
                    <Button onClick={() => copyToClipboard(selectedMedia.file_path)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Typ: </span>
                    {selectedMedia.file_type}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rozmiar: </span>
                    {formatFileSize(selectedMedia.file_size)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Data dodania: </span>
                    {new Date(selectedMedia.created_at).toLocaleDateString('pl-PL')}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
