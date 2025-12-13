import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, User, KeyRound } from 'lucide-react';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Imię musi mieć minimum 2 znaki').max(100),
  email: z.string().email('Nieprawidłowy adres email').max(255),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków').max(128),
  invitationCode: z.string().min(1, 'Kod zaproszenia jest wymagany').max(100)
});

export default function AdminRegister() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse({ fullName, email, password, invitationCode });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // First verify the invitation code exists
      const { data: codeData, error: codeError } = await supabase
        .from('invitation_codes')
        .select('id')
        .eq('code', invitationCode.trim())
        .maybeSingle();

      if (codeError || !codeData) {
        toast.error('Nieprawidłowy lub wygasły kod zaproszenia');
        setIsSubmitting(false);
        return;
      }

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: { full_name: fullName.trim() }
        }
      });

      if (authError) {
        const errorMessage = authError.message === 'User already registered'
          ? 'Użytkownik o tym emailu już istnieje'
          : authError.message;
        toast.error('Błąd rejestracji', { description: errorMessage });
        setIsSubmitting(false);
        return;
      }

      if (!authData.user) {
        toast.error('Błąd rejestracji');
        setIsSubmitting(false);
        return;
      }

      // Use the invitation code to assign admin role
      const { data: useResult, error: useError } = await supabase.rpc('use_invitation_code', {
        p_code: invitationCode.trim(),
        p_user_id: authData.user.id
      });

      if (useError || !useResult) {
        toast.error('Błąd przypisania roli administratora');
        setIsSubmitting(false);
        return;
      }

      toast.success('Konto administratora utworzone!', {
        description: 'Możesz się teraz zalogować.'
      });
      navigate('/admin/login');
    } catch (error) {
      toast.error('Wystąpił nieoczekiwany błąd');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Rejestracja Administratora</h1>
            <p className="text-muted-foreground mt-2">Utwórz konto z kodem zaproszenia</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invitationCode">Kod zaproszenia</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="invitationCode"
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  placeholder="Wprowadź kod zaproszenia"
                  className={`pl-10 ${errors.invitationCode ? 'border-destructive' : ''}`}
                  required
                />
              </div>
              {errors.invitationCode && (
                <p className="text-sm text-destructive">{errors.invitationCode}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Imię i nazwisko</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jan Kowalski"
                  className={`pl-10 ${errors.fullName ? 'border-destructive' : ''}`}
                  required
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                  required
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 znaków"
                  className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Tworzenie konta...' : 'Zarejestruj się'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Masz już konto?{' '}
              <Link to="/admin/login" className="text-primary hover:underline">
                Zaloguj się
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
