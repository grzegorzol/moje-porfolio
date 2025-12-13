import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  PenTool,
  Image,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  Layers,
  Footprints,
  Briefcase,
  KeyRound
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { title: 'Strony', icon: Layers, href: '/admin/pages' },
  { title: 'Portfolio', icon: Briefcase, href: '/admin/projects' },
  { title: 'Blog', icon: PenTool, href: '/admin/posts' },
  { title: 'Media', icon: Image, href: '/admin/media' },
  { title: 'Nagłówek', icon: FileText, href: '/admin/header' },
  { title: 'Stopka', icon: Footprints, href: '/admin/footer' },
  { title: 'Zaproszenia', icon: KeyRound, href: '/admin/invitations' },
  { title: 'Ustawienia', icon: Settings, href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-card border-r border-border transition-all duration-300 flex flex-col',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/admin" className="font-bold text-xl text-foreground">
              Admin
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={isCollapsed ? 'mx-auto' : ''}
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  isCollapsed && 'justify-center'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          {!isCollapsed && profile && (
            <div className="mb-3 text-sm text-muted-foreground truncate">
              {profile.email}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size={isCollapsed ? 'icon' : 'default'}
              className={cn('flex-1', isCollapsed && 'flex-none')}
              asChild
            >
              <Link to="/">
                {isCollapsed ? '←' : 'Wróć na stronę'}
              </Link>
            </Button>
            {!isCollapsed && (
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
