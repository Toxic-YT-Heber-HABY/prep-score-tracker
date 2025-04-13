
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n";

/**
 * Privacy Policy page
 */
const Privacy = () => {
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
            {language === 'es' ? 'Política de privacidad' : 'Privacy policy'}
          </h1>
          
          <div className="prose dark:prose-invert max-w-none">
            {language === 'es' ? (
              <>
                <p className="lead">
                  Esta Política de Privacidad describe cómo HABY Score Tracker recopila, utiliza y comparte su información cuando utiliza nuestra aplicación.
                </p>
                
                <h2>1. Información que recopilamos</h2>
                
                <h3>1.1 Información proporcionada directamente por usted</h3>
                <p>
                  Al utilizar HABY Score Tracker, puede proporcionarnos información, como:
                </p>
                <ul>
                  <li>Nombres de categorías académicas</li>
                  <li>Nombres de actividades</li>
                  <li>Calificaciones y ponderaciones</li>
                </ul>
                
                <h3>1.2 Información recopilada automáticamente</h3>
                <p>
                  Cuando utiliza nuestra Aplicación, podemos recopilar automáticamente cierta información, como:
                </p>
                <ul>
                  <li>Información del dispositivo (tipo de dispositivo, sistema operativo)</li>
                  <li>Preferencias de idioma</li>
                  <li>Estadísticas de uso de la Aplicación</li>
                </ul>
                
                <h2>2. Cómo utilizamos su información</h2>
                <p>
                  Utilizamos la información recopilada para:
                </p>
                <ul>
                  <li>Proporcionar, mantener y mejorar nuestra Aplicación</li>
                  <li>Personalizar su experiencia</li>
                  <li>Responder a sus comentarios y preguntas</li>
                  <li>Monitorear y analizar tendencias de uso</li>
                  <li>Prevenir actividades fraudulentas</li>
                </ul>
                
                <h2>3. Almacenamiento de datos</h2>
                <p>
                  La aplicación HABY Score Tracker almacena la mayoría de los datos localmente en su dispositivo. Esto significa que sus categorías, actividades y calificaciones se guardan principalmente en su dispositivo. No se envían a servidores externos a menos que se activen funciones específicas de respaldo o sincronización.
                </p>
                
                <h2>4. Compartir información</h2>
                <p>
                  No vendemos, intercambiamos ni transferimos de otro modo su información personal a terceros sin su consentimiento, excepto como se describe en esta Política de Privacidad. Podemos compartir información en las siguientes circunstancias:
                </p>
                <ul>
                  <li>Con proveedores de servicios que nos ayudan a hacer funcionar nuestra Aplicación</li>
                  <li>Para cumplir con la ley o proteger nuestros derechos</li>
                  <li>En caso de una fusión, venta o adquisición de todos o una parte de nuestros activos</li>
                </ul>
                
                <h2>5. Sus derechos</h2>
                <p>
                  Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, incluyendo:
                </p>
                <ul>
                  <li>El derecho a acceder a su información personal</li>
                  <li>El derecho a corregir o actualizar su información personal</li>
                  <li>El derecho a eliminar su información personal</li>
                  <li>El derecho a oponerse al procesamiento de sus datos</li>
                </ul>
                
                <h2>6. Seguridad</h2>
                <p>
                  Implementamos medidas de seguridad diseñadas para proteger su información. Sin embargo, ninguna medida de seguridad es 100% segura, por lo que no podemos garantizar la seguridad absoluta de su información.
                </p>
                
                <h2>7. Cambios a esta política</h2>
                <p>
                  Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.
                </p>
                
                <h2>8. Contacto</h2>
                <p>
                  Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en: habyopenthedoors@gmail.com
                </p>
                
                <p className="text-sm text-gray-500 mt-8">
                  Última actualización: {currentYear}
                </p>
              </>
            ) : (
              <>
                <p className="lead">
                  This Privacy Policy describes how HABY Score Tracker collects, uses, and shares your information when you use our application.
                </p>
                
                <h2>1. Information We Collect</h2>
                
                <h3>1.1 Information You Provide Directly</h3>
                <p>
                  When using HABY Score Tracker, you may provide us with information such as:
                </p>
                <ul>
                  <li>Names of academic categories</li>
                  <li>Names of activities</li>
                  <li>Grades and weightings</li>
                </ul>
                
                <h3>1.2 Information We Collect Automatically</h3>
                <p>
                  When you use our Application, we may automatically collect certain information, such as:
                </p>
                <ul>
                  <li>Device information (device type, operating system)</li>
                  <li>Language preferences</li>
                  <li>Application usage statistics</li>
                </ul>
                
                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our Application</li>
                  <li>Personalize your experience</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage trends</li>
                  <li>Prevent fraudulent activities</li>
                </ul>
                
                <h2>3. Data Storage</h2>
                <p>
                  The HABY Score Tracker application stores most data locally on your device. This means that your categories, activities, and grades are primarily saved on your device. They are not sent to external servers unless specific backup or synchronization features are enabled.
                </p>
                
                <h2>4. Sharing Information</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share information in the following circumstances:
                </p>
                <ul>
                  <li>With service providers who help us operate our Application</li>
                  <li>To comply with the law or protect our rights</li>
                  <li>In the event of a merger, sale, or acquisition of all or a portion of our assets</li>
                </ul>
                
                <h2>5. Your Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul>
                  <li>The right to access your personal information</li>
                  <li>The right to correct or update your personal information</li>
                  <li>The right to delete your personal information</li>
                  <li>The right to object to the processing of your data</li>
                </ul>
                
                <h2>6. Security</h2>
                <p>
                  We implement security measures designed to protect your information. However, no security measure is 100% secure, so we cannot guarantee the absolute security of your information.
                </p>
                
                <h2>7. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
                
                <h2>8. Contact</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at: habyopenthedoors@gmail.com
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

export default Privacy;
