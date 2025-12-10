import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { ExportButton } from "./ExportButton";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:kontakt@example.com", label: "Email" },
];

const footerLinks = [
  { href: "/o-mnie", label: "O mnie" },
  { href: "/projekty", label: "Projekty" },
  { href: "/dla-klienta", label: "Dla klienta" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div>
            <Link to="/" className="text-xl font-display font-bold text-foreground">
              GO
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & Export */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Grzegorz Olszowik. Wszelkie prawa zastrzeżone.
          </p>
          <ExportButton />
        </div>
      </div>
    </footer>
  );
}