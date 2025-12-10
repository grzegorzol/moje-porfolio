import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { exportWebsiteToXml, downloadXml } from "@/utils/exportToXml";
import { useToast } from "@/hooks/use-toast";

interface ExportButtonProps {
  className?: string;
}

export const ExportButton = ({ className }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const xmlContent = await exportWebsiteToXml();
      const filename = `website-export-${new Date().toISOString().split("T")[0]}.xml`;
      downloadXml(xmlContent, filename);
      
      toast({
        title: "Eksport zakończony",
        description: `Plik ${filename} został pobrany`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować strony",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className={className}
      variant="outline"
    >
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Eksportowanie...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Eksportuj do XML
        </>
      )}
    </Button>
  );
};
