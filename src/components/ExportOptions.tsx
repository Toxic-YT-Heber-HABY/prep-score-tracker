
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown } from 'lucide-react';
import { toast } from "sonner";

const ExportOptions = () => {
  const handleExportPDF = () => {
    toast.info("Exportación a PDF será implementada próximamente");
  };
  
  const handleExportImage = () => {
    toast.info("Exportación a imagen será implementada próximamente");
  };
  
  const handleExportCSV = () => {
    toast.info("Exportación a CSV será implementada próximamente");
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        <FileDown className="h-4 w-4 mr-1" />
        PDF
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportImage}>
        <Download className="h-4 w-4 mr-1" />
        Imagen
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportCSV}>
        <FileDown className="h-4 w-4 mr-1" />
        CSV
      </Button>
    </div>
  );
};

export default ExportOptions;
