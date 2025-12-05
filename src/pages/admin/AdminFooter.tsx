import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, Save } from 'lucide-react';

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

interface FooterSettings {
  copyright: string;
  footerLinks: FooterLink[];
  socialLinks: SocialLink[];
}

export default function AdminFooter() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [settings, setSettings] = useState<FooterSettings>({
    copyright: 'Grzegorz Olszowik',
    footerLinks: [],
    socialLinks: []
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
      .eq('key', 'footer')
      .maybeSingle();

    if (error) {
      toast.error('Błąd podczas pobierania ustawień');
      return;
    }

    if (data?.value) {
      setSettings(data.value as unknown as FooterSettings);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    const { error } = await supabase
      .from('site_settings')
      .update({ value: settings as any })
      .eq('key', 'footer');

    if (error) {
      toast.error('Błąd podczas zapisywania');
      setIsSaving(false);
      return;
    }

    toast.success('Ustawienia zapisane');
    setIsSaving(false);
  };

  const addFooterLink = () => {
    setSettings({
      ...settings,
      footerLinks: [...settings.footerLinks, { href: '/', label: 'Nowy link' }]
    });
  };

  const updateFooterLink = (index: number, field: 'href' | 'label', value: string) => {
    const newLinks = [...settings.footerLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSettings({ ...settings, footerLinks: newLinks });
  };

  const removeFooterLink = (index: number) => {
    setSettings({
      ...settings,
      footerLinks: settings.footerLinks.filter((_, i) => i !== index)
    });
  };

  const addSocialLink = () => {
    setSettings({
      ...settings,
      socialLinks: [...settings.socialLinks, { icon: 'Linkedin', href: '#', label: 'LinkedIn' }]
    });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...settings.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSettings({ ...settings, socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    setSettings({
      ...settings,
      socialLinks: settings.socialLinks.filter((_, i) => i !== index)
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
            <h1 className="text-3xl font-bold text-foreground">Stopka</h1>
            <p className="text-muted-foreground">Edytuj linki i informacje w stopce</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Copyright */}
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">Copyright</h2>
            <div className="space-y-2">
              <Label htmlFor="copyright">Tekst copyright</Label>
              <Input
                id="copyright"
                value={settings.copyright}
                onChange={(e) => setSettings({ ...settings, copyright: e.target.value })}
              />
            </div>
          </div>

          {/* Footer Links */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Linki w stopce</h2>
              <Button variant="outline" size="sm" onClick={addFooterLink}>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj link
              </Button>
            </div>
            <div className="space-y-3">
              {settings.footerLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Etykieta"
                      value={link.label}
                      onChange={(e) => updateFooterLink(index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.href}
                      onChange={(e) => updateFooterLink(index, 'href', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeFooterLink(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {settings.footerLinks.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Brak linków w stopce
                </p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Social Media</h2>
              <Button variant="outline" size="sm" onClick={addSocialLink}>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj
              </Button>
            </div>
            <div className="space-y-3">
              {settings.socialLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <Input
                      placeholder="Ikona (np. Linkedin)"
                      value={link.icon}
                      onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                    />
                    <Input
                      placeholder="Etykieta"
                      value={link.label}
                      onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={link.href}
                      onChange={(e) => updateSocialLink(index, 'href', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeSocialLink(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {settings.socialLinks.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Brak linków social media
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
