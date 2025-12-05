import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-display font-bold text-gradient">
                &lt;Portfolio /&gt;
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Marketing Specialist | Event Manager | Digital Strategist. 
              Tworzę strony WordPress, projektuję w Canva, zarządzam social media 
              i prowadzę kampanie reklamowe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              {["O mnie", "Projekty", "Dla klienta", "Blog", "Kontakt"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Social Media</h4>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Grzegorz Olszowik. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-sm text-muted-foreground">
            Zbudowane z 💜 w Lovable
          </p>
        </div>
      </div>
    </footer>
  );
}