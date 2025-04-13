
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n";

/**
 * Terms and Conditions page
 */
const Terms = () => {
  const { language } = useI18n();
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-6 text-education-primary">
            {language === 'es' ? 'Términos y condiciones' : 'Terms and conditions'}
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            {language === 'es' ? (
              <>
                <h2>1. Aceptación de los términos</h2>
                <p>
                  Al acceder y utilizar la aplicación HABY Score Tracker ("la Aplicación"), usted acepta estar obligado por estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, no utilice la Aplicación.
                </p>
                
                <h2>2. Descripción del servicio</h2>
                <p>
                  HABY Score Tracker es una herramienta educativa diseñada para ayudar a los usuarios a calcular y gestionar calificaciones académicas. La Aplicación permite a los usuarios crear categorías de evaluación, agregar actividades con sus respectivas calificaciones y calcular promedios ponderados.
                </p>
                
                <h2>3. Propiedad intelectual</h2>
                <p>
                  Todos los derechos de propiedad intelectual relacionados con la Aplicación, incluyendo pero no limitado a derechos de autor, marcas comerciales, nombres comerciales, código, imágenes, logotipos y diseños son propiedad exclusiva de HABY y su creador, Heber Zadkiel García Pérez. Ningún contenido de esta Aplicación puede ser reproducido, distribuido, transmitido, presentado, publicado o difundido sin el previo consentimiento por escrito de HABY.
                </p>
                
                <h2>4. Licencia de uso</h2>
                <p>
                  HABY le otorga una licencia limitada, no exclusiva, no transferible y revocable para utilizar la Aplicación para su uso personal y no comercial. No puede modificar, adaptar, traducir, realizar ingeniería inversa, descompilar o desensamblar ninguna parte de la Aplicación.
                </p>
                
                <h2>5. Limitación de responsabilidad</h2>
                <p>
                  La Aplicación se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo. HABY no garantiza que la Aplicación sea ininterrumpida, oportuna, segura o libre de errores. En ningún caso HABY será responsable por daños indirectos, incidentales, especiales, consecuenciales o punitivos.
                </p>
                
                <h2>6. Privacidad</h2>
                <p>
                  El uso de la Aplicación está sujeto a nuestra Política de Privacidad, que describe cómo recopilamos, usamos y compartimos su información.
                </p>
                
                <h2>7. Modificaciones</h2>
                <p>
                  HABY se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Aplicación. Su uso continuado de la Aplicación después de cualquier modificación constituye su aceptación de los nuevos términos.
                </p>
                
                <h2>8. Terminación</h2>
                <p>
                  HABY puede, a su exclusiva discreción, suspender o terminar su acceso a la Aplicación en cualquier momento sin previo aviso por cualquier razón, incluyendo si HABY cree que ha violado estos Términos.
                </p>
                
                <h2>9. Ley aplicable</h2>
                <p>
                  Estos Términos se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta sus conflictos de disposiciones legales.
                </p>
                
                <h2>10. Contacto</h2>
                <p>
                  Si tiene alguna pregunta sobre estos Términos, contáctenos en: habyopenthedoors@gmail.com
                </p>
                
                <p className="text-sm text-gray-500 mt-8">
                  Última actualización: {currentYear}
                </p>
              </>
            ) : (
              <>
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the HABY Score Tracker application ("the Application"), you agree to be bound by these Terms and Conditions. If you disagree with any of these terms, do not use the Application.
                </p>
                
                <h2>2. Service Description</h2>
                <p>
                  HABY Score Tracker is an educational tool designed to help users calculate and manage academic grades. The Application allows users to create evaluation categories, add activities with their respective grades, and calculate weighted averages.
                </p>
                
                <h2>3. Intellectual Property</h2>
                <p>
                  All intellectual property rights related to the Application, including but not limited to copyrights, trademarks, trade names, code, images, logos, and designs are the exclusive property of HABY and its creator, Heber Zadkiel García Pérez. No content from this Application may be reproduced, distributed, transmitted, displayed, published, or broadcast without the prior written consent of HABY.
                </p>
                
                <h2>4. License to Use</h2>
                <p>
                  HABY grants you a limited, non-exclusive, non-transferable, revocable license to use the Application for your personal and non-commercial use. You may not modify, adapt, translate, reverse engineer, decompile, or disassemble any part of the Application.
                </p>
                
                <h2>5. Limitation of Liability</h2>
                <p>
                  The Application is provided "as is" and "as available" without warranties of any kind. HABY does not guarantee that the Application will be uninterrupted, timely, secure, or error-free. In no event shall HABY be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                
                <h2>6. Privacy</h2>
                <p>
                  The use of the Application is subject to our Privacy Policy, which describes how we collect, use, and share your information.
                </p>
                
                <h2>7. Modifications</h2>
                <p>
                  HABY reserves the right to modify these Terms and Conditions at any time. Modifications will become effective immediately upon posting on the Application. Your continued use of the Application after any modification constitutes your acceptance of the new terms.
                </p>
                
                <h2>8. Termination</h2>
                <p>
                  HABY may, in its sole discretion, suspend or terminate your access to the Application at any time without prior notice for any reason, including if HABY believes you have violated these Terms.
                </p>
                
                <h2>9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of Mexico, without regard to its conflict of law provisions.
                </p>
                
                <h2>10. Contact</h2>
                <p>
                  If you have any questions about these Terms, please contact us at: habyopenthedoors@gmail.com
                </p>
                
                <p className="text-sm text-gray-500 mt-8">
                  Last updated: {currentYear}
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
