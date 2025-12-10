import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:kontakt@example.com", label: "Email" },
];

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { href: "/o-mnie", label: t("footer.about") },
    { href: "/projekty", label: t("footer.projects") },
    { href: "/dla-klienta", label: t("footer.services") },
    { href: "/blog", label: t("footer.blog") },
    { href: "/kontakt", label: t("footer.contact") },
    { href: "/polityka-prywatnosci", label: t("footer.privacy") },
  ];

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

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Grzegorz Olszowik. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}