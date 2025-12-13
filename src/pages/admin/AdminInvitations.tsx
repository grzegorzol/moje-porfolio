import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Copy, Trash2, KeyRound } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface InvitationCode {
  id: string;
  code: string;
  role: 'admin' | 'moderator' | 'user';
  used_at: string | null;
  created_at: string;
  expires_at: string | null;
  max_uses: number;
  current_uses: number;
}

export default function AdminInvitations() {
  const { user } = useAuth();
  const [codes, setCodes] = useState<InvitationCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'moderator' | 'user'>('admin');
  const [maxUses, setMaxUses] = useState(1);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    const { data, error } = await supabase
      .from('invitation_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Błąd pobierania kodów');
      return;
    }

    setCodes(data || []);
    setIsLoading(false);
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCode(code);
  };

  const createCode = async () => {
    if (!newCode.trim()) {
      toast.error('Wprowadź kod zaproszenia');
      return;
    }

    const expiresAt = expiresIn 
      ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase
      .from('invitation_codes')
      .insert({
        code: newCode.trim().toUpperCase(),
        role: newRole,
        max_uses: maxUses,
        expires_at: expiresAt,
        created_by: user?.id
      });

    if (error) {
      if (error.code === '23505') {
        toast.error('Kod już istnieje');
      } else {
        toast.error('Błąd tworzenia kodu');
      }
      return;
    }

    toast.success('Kod utworzony');
    setIsDialogOpen(false);
    setNewCode('');
    fetchCodes();
  };

  const deleteCode = async (id: string) => {
    const { error } = await supabase
      .from('invitation_codes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Błąd usuwania kodu');
      return;
    }

    toast.success('Kod usunięty');
    fetchCodes();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Kod skopiowany do schowka');
  };

  const roleLabels = {
    admin: 'Administrator',
    moderator: 'Moderator',
    user: 'Użytkownik'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kody zaproszenia</h1>
          <p className="text-muted-foreground mt-1">Zarządzaj kodami do rejestracji administratorów</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => generateCode()}>
              <Plus className="w-4 h-4 mr-2" />
              Nowy kod
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Utwórz kod zaproszenia</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Kod</Label>
                <div className="flex gap-2">
                  <Input
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    placeholder="ABCD1234"
                  />
                  <Button type="button" variant="outline" onClick={generateCode}>
                    Generuj
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rola</Label>
                <Select value={newRole} onValueChange={(v) => setNewRole(v as typeof newRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">Użytkownik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Maksymalna liczba użyć</Label>
                <Input
                  type="number"
                  min={1}
                  value={maxUses}
                  onChange={(e) => setMaxUses(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <Label>Wygasa po (dni)</Label>
                <Select 
                  value={expiresIn?.toString() || 'never'} 
                  onValueChange={(v) => setExpiresIn(v === 'never' ? null : parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Nigdy</SelectItem>
                    <SelectItem value="1">1 dzień</SelectItem>
                    <SelectItem value="7">7 dni</SelectItem>
                    <SelectItem value="30">30 dni</SelectItem>
                    <SelectItem value="90">90 dni</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={createCode} className="w-full">
                Utwórz kod
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Ładowanie...</div>
        ) : codes.length === 0 ? (
          <div className="p-8 text-center">
            <KeyRound className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Brak kodów zaproszenia</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Użycia</TableHead>
                <TableHead>Wygasa</TableHead>
                <TableHead>Utworzony</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell className="font-mono font-bold">{code.code}</TableCell>
                  <TableCell>{roleLabels[code.role]}</TableCell>
                  <TableCell>
                    {code.current_uses} / {code.max_uses}
                  </TableCell>
                  <TableCell>
                    {code.expires_at 
                      ? format(new Date(code.expires_at), 'd MMM yyyy', { locale: pl })
                      : 'Nigdy'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(code.created_at), 'd MMM yyyy', { locale: pl })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(code.code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCode(code.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </motion.div>
    </div>
  );
}
