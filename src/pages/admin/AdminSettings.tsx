import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Plus, Trash2 } from 'lucide-react';

interface HeroButton {
  href: string;
  label: string;
  variant: 'primary' | 'secondary';
}

interface HeroSettings {
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: HeroButton[];
}

export default function AdminSettings() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    title: '',
    subtitle: '',
    description: '',
    ctaButtons: []
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'hero')
      .maybeSingle();

    if (error) {
      toast.error('Błąd podczas pobierania ustawień');
      return;
    }

    if (data?.value) {
      setHeroSettings(data.value as unknown as HeroSettings);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    const { error } = await supabase
      .from('site_settings')
      .update({ value: heroSettings as any })
      .eq('key', 'hero');

    if (error) {
      toast.error('Błąd podczas zapisywania');
      setIsSaving(false);
      return;
    }

    toast.success('Ustawienia zapisane');
    setIsSaving(false);
  };

  const addButton = () => {
    setHeroSettings({
      ...heroSettings,
      ctaButtons: [...heroSettings.ctaButtons, { href: '/', label: 'Nowy przycisk', variant: 'secondary' }]
    });
  };

  const updateButton = (index: number, field: keyof HeroButton, value: string) => {
    const newButtons = [...heroSettings.ctaButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setHeroSettings({ ...heroSettings, ctaButtons: newButtons });
  };

  const removeButton = (index: number) => {
    setHeroSettings({
      ...heroSettings,
      ctaButtons: heroSettings.ctaButtons.filter((_, i) => i !== index)
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ustawienia strony</h1>
            <p className="text-muted-foreground">Edytuj sekcję hero i inne ustawienia</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">Sekcja Hero</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tytuł główny</Label>
                <Input
                  id="title"
                  value={heroSettings.title}
                  onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Podtytuł</Label>
                <Input
                  id="subtitle"
                  value={heroSettings.subtitle}
                  onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={heroSettings.description}
                  onChange={(e) => setHeroSettings({ ...heroSettings, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Przyciski CTA</h2>
              <Button variant="outline" size="sm" onClick={addButton}>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj przycisk
              </Button>
            </div>
            <div className="space-y-3">
              {heroSettings.ctaButtons.map((button, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <Input
                      placeholder="Tekst"
                      value={button.label}
                      onChange={(e) => updateButton(index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={button.href}
                      onChange={(e) => updateButton(index, 'href', e.target.value)}
                    />
                    <select
                      value={button.variant}
                      onChange={(e) => updateButton(index, 'variant', e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="primary">Główny</option>
                      <option value="secondary">Drugorzędny</option>
                    </select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeButton(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {heroSettings.ctaButtons.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Brak przycisków CTA
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
