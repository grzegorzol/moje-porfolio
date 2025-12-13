import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, Search, Check, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface MediaItem {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
}

interface MediaGalleryPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  multiple?: boolean;
  onSelectMultiple?: (urls: string[]) => void;
}

export function MediaGalleryPicker({ 
  open, 
  onClose, 
  onSelect, 
  multiple = false,
  onSelectMultiple 
}: MediaGalleryPickerProps) {
  const { user } = useAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      fetchMedia();
      setSelectedItems([]);
    }
  }, [open]);

  const fetchMedia = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Błąd podczas pobierania mediów');
    } else {
      setMedia((data || []).filter(item => item.file_type.startsWith('image/')));
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} nie jest obrazem`);
        continue;
      }

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
    toast.success('Obrazy przesłane');
    fetchMedia();

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleItemClick = (item: MediaItem) => {
    if (multiple) {
      setSelectedItems(prev => 
        prev.includes(item.file_path)
          ? prev.filter(url => url !== item.file_path)
          : [...prev, item.file_path]
      );
    } else {
      onSelect(item.file_path);
      onClose();
    }
  };

  const handleConfirmMultiple = () => {
    if (onSelectMultiple && selectedItems.length > 0) {
      onSelectMultiple(selectedItems);
      onClose();
    }
  };

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {multiple ? 'Wybierz obrazy do galerii' : 'Wybierz obraz'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj obrazów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            variant="outline"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Przesyłanie...' : 'Dodaj'}
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[50vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Brak obrazów w bibliotece</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => fileInputRef.current?.click()}
              >
                Dodaj pierwszy obraz
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedItems.includes(item.file_path)
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-transparent hover:border-border'
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <img
                    src={item.file_path}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedItems.includes(item.file_path) && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary rounded-full p-1">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {multiple && selectedItems.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-muted-foreground">
              Wybrano: {selectedItems.length} {selectedItems.length === 1 ? 'obraz' : 'obrazów'}
            </span>
            <Button onClick={handleConfirmMultiple}>
              Wstaw galerię
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
