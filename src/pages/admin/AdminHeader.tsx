import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface HeaderSettings {
  logo: string;
  navLinks: NavLink[];
  ctaButton: {
    href: string;
    label: string;
  };
}

export default function AdminHeader() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [settings, setSettings] = useState<HeaderSettings>({
    logo: 'GO',
    navLinks: [],
    ctaButton: { href: '/kontakt', label: 'Kontakt' }
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
      .eq('key', 'header')
      .maybeSingle();

    if (error) {
      toast.error('Błąd podczas pobierania ustawień');
      return;
    }

    if (data?.value) {
      setSettings(data.value as unknown as HeaderSettings);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    const { error } = await supabase
      .from('site_settings')
      .update({ value: settings as any })
      .eq('key', 'header');

    if (error) {
      toast.error('Błąd podczas zapisywania');
      setIsSaving(false);
      return;
    }

    toast.success('Ustawienia zapisane');
    setIsSaving(false);
  };

  const addNavLink = () => {
    setSettings({
      ...settings,
      navLinks: [...settings.navLinks, { href: '/', label: 'Nowy link' }]
    });
  };

  const updateNavLink = (index: number, field: 'href' | 'label', value: string) => {
    const newLinks = [...settings.navLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSettings({ ...settings, navLinks: newLinks });
  };

  const removeNavLink = (index: number) => {
    setSettings({
      ...settings,
      navLinks: settings.navLinks.filter((_, i) => i !== index)
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
            <h1 className="text-3xl font-bold text-foreground">Nagłówek</h1>
            <p className="text-muted-foreground">Edytuj nawigację i logo</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Logo */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">Logo</h2>
            <div className="space-y-2">
              <Label htmlFor="logo">Tekst logo</Label>
              <Input
                id="logo"
                value={settings.logo}
                onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Linki nawigacji</h2>
              <Button variant="outline" size="sm" onClick={addNavLink}>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj link
              </Button>
            </div>
            <div className="space-y-3">
              {settings.navLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Etykieta"
                      value={link.label}
                      onChange={(e) => updateNavLink(index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.href}
                      onChange={(e) => updateNavLink(index, 'href', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeNavLink(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {settings.navLinks.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Brak linków nawigacji
                </p>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">Przycisk CTA</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctaLabel">Tekst przycisku</Label>
                <Input
                  id="ctaLabel"
                  value={settings.ctaButton.label}
                  onChange={(e) => setSettings({
                    ...settings,
                    ctaButton: { ...settings.ctaButton, label: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaHref">URL przycisku</Label>
                <Input
                  id="ctaHref"
                  value={settings.ctaButton.href}
                  onChange={(e) => setSettings({
                    ...settings,
                    ctaButton: { ...settings.ctaButton, href: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
