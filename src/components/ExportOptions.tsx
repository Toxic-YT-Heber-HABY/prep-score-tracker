
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown, Share2 } from 'lucide-react';
import { toast } from "sonner";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useI18n } from '@/lib/i18n';

/**
 * Component that provides various export options for the results card
 * Supports exporting to PDF, PNG image, and CSV formats
 */
const ExportOptions = () => {
  const { language } = useI18n();
  const [exporting, setExporting] = useState<string | null>(null);
  
  /**
   * Exports the results card as a PDF document
   */
  const handleExportPDF = async () => {
    try {
      setExporting('pdf');
      const element = document.getElementById('results-card');
      if (!element) {
        toast.error(language === 'es' 
          ? "No se pudo encontrar la sección de resultados" 
          : "Could not find results section");
        setExporting(null);
        return;
      }
      
      // Create a clone with optimized styles for export
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.backgroundColor = 'white';
      clone.style.padding = '20px';
      clone.style.width = '800px';
      document.body.appendChild(clone);
      
      // Generate canvas from the element
      const canvas = await html2canvas(clone, {
        scale: 2, // Higher quality
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      document.body.removeChild(clone);
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF with proper sizing
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Center the image on the page
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
      // Add footer with timestamp
      const timestamp = new Date().toLocaleString();
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`HABY Score Tracker - ${timestamp}`, 10, pageHeight - 10);
      
      // Save the PDF
      pdf.save("HABY_Calificacion.pdf");
      
      toast.success(language === 'es' 
        ? "PDF exportado correctamente" 
        : "PDF exported successfully");
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      toast.error(language === 'es' 
        ? "Error al exportar PDF" 
        : "Error exporting PDF");
    } finally {
      setExporting(null);
    }
  };
  
  /**
   * Exports the results card as a PNG image
   */
  const handleExportImage = async () => {
    try {
      setExporting('image');
      const element = document.getElementById('results-card');
      if (!element) {
        toast.error(language === 'es' 
          ? "No se pudo encontrar la sección de resultados" 
          : "Could not find results section");
        setExporting(null);
        return;
      }
      
      // Create a clone with optimized styles for export
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.backgroundColor = 'white';
      clone.style.padding = '20px';
      clone.style.width = '800px';
      document.body.appendChild(clone);
      
      // Generate canvas from the element with high quality
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      document.body.removeChild(clone);
      
      // Create download link
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'HABY_Calificacion.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(language === 'es' 
        ? "Imagen exportada correctamente" 
        : "Image exported successfully");
    } catch (error) {
      console.error("Error al exportar imagen:", error);
      toast.error(language === 'es' 
        ? "Error al exportar imagen" 
        : "Error exporting image");
    } finally {
      setExporting(null);
    }
  };
  
  /**
   * Exports the results data as CSV
   */
  const handleExportCSV = () => {
    try {
      setExporting('csv');
      const results = document.querySelectorAll('#results-card table tbody tr');
      if (results.length === 0) {
        toast.error(language === 'es' 
          ? "No se encontraron datos para exportar" 
          : "No data found to export");
        setExporting(null);
        return;
      }
      
      // CSV header row - use localized terms if possible
      const headers = language === 'es' 
        ? ["Categoría", "Peso", "Promedio", "Puntos (100)", "Puntos (10)"]
        : ["Category", "Weight", "Average", "Points (100)", "Points (10)"];
      
      let csvContent = headers.join(',') + '\n';
      
      // Process data rows (skip the total row which will be handled separately)
      results.forEach((row, index) => {
        if (index < results.length - 1) { // Skip total row
          const cells = row.querySelectorAll('td');
          const rowData = Array.from(cells).map(cell => {
            // Escape commas and quotes for CSV compatibility
            const text = cell.textContent?.trim() || '';
            return `"${text.replace(/"/g, '""')}"`;
          });
          csvContent += rowData.join(',') + '\n';
        }
      });
      
      // Add the total row
      const totalRow = results[results.length - 1];
      if (totalRow) {
        const totalCells = totalRow.querySelectorAll('td');
        const totalHeader = language === 'es' ? "Calificación Total" : "Total Grade";
        csvContent += `"${totalHeader}",,,"${totalCells[3]?.textContent?.trim() || ''}","${totalCells[4]?.textContent?.trim() || ''}"\n`;
      }
      
      // Create download link for the CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'HABY_Calificacion.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(language === 'es' 
        ? "CSV exportado correctamente" 
        : "CSV exported successfully");
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      toast.error(language === 'es' 
        ? "Error al exportar CSV" 
        : "Error exporting CSV");
    } finally {
      setExporting(null);
    }
  };
  
  /**
   * Shares results using Web Share API when available
   */
  const handleShare = async () => {
    try {
      setExporting('share');
      
      if (navigator.share) {
        // Web Share API is available
        const element = document.getElementById('results-card');
        if (!element) {
          toast.error(language === 'es' 
            ? "No se pudo encontrar la sección de resultados" 
            : "Could not find results section");
          setExporting(null);
          return;
        }
        
        // Generate image for sharing
        const canvas = await html2canvas(element, { 
          scale: 2,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        // Convert canvas to blob for sharing
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              // First try with file sharing (not supported on all platforms)
              const file = new File([blob], 'HABY_Calificacion.png', { type: 'image/png' });
              
              await navigator.share({
                title: language === 'es' ? 'Mi calificación HABY' : 'My HABY grade',
                text: language === 'es' 
                  ? 'Mira mi calificación calculada con HABY Score Tracker' 
                  : 'Check out my grade calculated with HABY Score Tracker',
                files: [file]
              });
              
            } catch (fileError) {
              // Fallback to sharing without files
              await navigator.share({
                title: language === 'es' ? 'Mi calificación HABY' : 'My HABY grade',
                text: language === 'es' 
                  ? 'Mira mi calificación calculada con HABY Score Tracker' 
                  : 'Check out my grade calculated with HABY Score Tracker',
              });
            }
            
            toast.success(language === 'es' 
              ? '¡Compartido con éxito!' 
              : 'Shared successfully!');
          }
        }, 'image/png');
      } else {
        toast.info(language === 'es' 
          ? 'Tu navegador no soporta la función de compartir' 
          : 'Your browser does not support sharing');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      toast.error(language === 'es' ? 'Error al compartir' : 'Error sharing');
    } finally {
      setExporting(null);
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExportPDF} 
        disabled={!!exporting}
        className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30"
      >
        <FileDown className={`h-4 w-4 mr-1 ${exporting === 'pdf' ? 'animate-spin' : ''}`} />
        PDF
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExportImage} 
        disabled={!!exporting}
        className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30"
      >
        <Download className={`h-4 w-4 mr-1 ${exporting === 'image' ? 'animate-spin' : ''}`} />
        {language === 'es' ? 'Imagen' : 'Image'}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExportCSV} 
        disabled={!!exporting}
        className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30"
      >
        <FileDown className={`h-4 w-4 mr-1 ${exporting === 'csv' ? 'animate-spin' : ''}`} />
        CSV
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleShare} 
        disabled={!!exporting}
        className="transition-all hover:bg-education-light dark:hover:bg-education-dark/30"
      >
        <Share2 className={`h-4 w-4 mr-1 ${exporting === 'share' ? 'animate-spin' : ''}`} />
        {language === 'es' ? 'Compartir' : 'Share'}
      </Button>
    </div>
  );
};

export default ExportOptions;
