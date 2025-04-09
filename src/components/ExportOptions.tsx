
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown, Share2 } from 'lucide-react';
import { toast } from "sonner";
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

const ExportOptions = () => {
  const handleExportPDF = async () => {
    try {
      const element = document.getElementById('results-card');
      if (!element) {
        toast.error("No se pudo encontrar la sección de resultados");
        return;
      }
      
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      
      const pdf = new jspdf();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      
      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("calificacion.pdf");
      
      toast.success("PDF exportado correctamente");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error("Error al exportar PDF");
    }
  };
  
  const handleExportImage = async () => {
    try {
      const element = document.getElementById('results-card');
      if (!element) {
        toast.error("No se pudo encontrar la sección de resultados");
        return;
      }
      
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = data;
      link.download = 'calificacion.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Imagen exportada correctamente");
    } catch (error) {
      console.error("Error al exportar imagen:", error);
      toast.error("Error al exportar imagen");
    }
  };
  
  const handleExportCSV = () => {
    try {
      // Esta función solo mostrará un toast informativo por ahora
      toast.success("Exportación a CSV será implementada próximamente");
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      toast.error("Error al exportar CSV");
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mis Calificaciones',
        text: 'Mira mis calificaciones calculadas con Prep Score Tracker',
      })
      .then(() => toast.success('¡Compartido con éxito!'))
      .catch(error => {
        console.error('Error al compartir:', error);
        toast.error('Error al compartir');
      });
    } else {
      toast.info('Tu navegador no soporta la función de compartir');
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={handleExportPDF} className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30">
        <FileDown className="h-4 w-4 mr-1" />
        PDF
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportImage} className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30">
        <Download className="h-4 w-4 mr-1" />
        Imagen
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportCSV} className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30">
        <FileDown className="h-4 w-4 mr-1" />
        CSV
      </Button>
      <Button variant="outline" size="sm" onClick={handleShare} className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30">
        <Share2 className="h-4 w-4 mr-1" />
        Compartir
      </Button>
    </div>
  );
};

export default ExportOptions;
