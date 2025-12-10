import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
      className="h-9 px-3 rounded-lg font-semibold text-xs uppercase tracking-wider"
    >
      {language === "pl" ? "EN" : "PL"}
    </Button>
  );
}
