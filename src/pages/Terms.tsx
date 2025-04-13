
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n";

/**
 * Terms and Conditions page with enhanced visual design
 */
const Terms = () => {
  const { language } = useI18n();
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-6 -ml-4 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Button>
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 bg-education-primary/5 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-10">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
                {language === 'es' ? 'Términos y condiciones' : 'Terms and conditions'}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light">
                {language === 'es' 
                  ? 'Este documento establece los términos y condiciones bajo los cuales puede utilizar la aplicación HABY Score Tracker. Al acceder y utilizar nuestra aplicación, acepta estos términos en su totalidad.' 
                  : 'This document sets forth the terms and conditions under which you may use the HABY Score Tracker application. By accessing and using our application, you accept these terms in their entirety.'}
              </p>
              
              <div className="space-y-10">
                {language === 'es' ? (
                  <>
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">1</span>
                        Aceptación de los términos
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        Al acceder y utilizar la aplicación HABY Score Tracker ("la Aplicación"), usted acepta estar obligado por estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice la Aplicación. Estos términos constituyen un acuerdo legalmente vinculante entre usted y HABY.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">2</span>
                        Descripción del servicio
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY Score Tracker es una herramienta educativa diseñada para ayudar a los usuarios a calcular y gestionar calificaciones académicas. La Aplicación permite a los usuarios crear categorías de evaluación, agregar actividades con sus respectivas calificaciones y calcular promedios ponderados. Ofrecemos esta herramienta para facilitar el seguimiento académico y mejorar la experiencia educativa de nuestros usuarios.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">3</span>
                        Propiedad intelectual
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        Todos los derechos de propiedad intelectual relacionados con la Aplicación, incluyendo pero no limitado a derechos de autor, marcas comerciales, nombres comerciales, código, imágenes, logotipos y diseños son propiedad exclusiva de HABY y su creador, Heber Zadkiel García Pérez. Ningún contenido de esta Aplicación puede ser reproducido, distribuido, transmitido, presentado, publicado o difundido sin el previo consentimiento por escrito de HABY. Respetamos la creatividad y el esfuerzo invertido en el desarrollo de esta aplicación, y esperamos que nuestros usuarios también lo hagan.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">4</span>
                        Licencia de uso
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY le otorga una licencia limitada, no exclusiva, no transferible y revocable para utilizar la Aplicación para su uso personal y no comercial. Esta licencia está condicionada a su cumplimiento de estos términos. No puede modificar, adaptar, traducir, realizar ingeniería inversa, descompilar o desensamblar ninguna parte de la Aplicación. Cualquier uso no autorizado de la Aplicación resultará en la terminación inmediata de esta licencia.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">5</span>
                        Limitación de responsabilidad
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        La Aplicación se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo. HABY no garantiza que la Aplicación sea ininterrumpida, oportuna, segura o libre de errores. En ningún caso HABY será responsable por daños indirectos, incidentales, especiales, consecuenciales o punitivos. Hacemos todo lo posible para garantizar la precisión de los cálculos y la fiabilidad de la aplicación, pero recomendamos a los usuarios que verifiquen siempre los resultados importantes.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">6</span>
                        Privacidad
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        El uso de la Aplicación está sujeto a nuestra <Link to="/privacy" className="text-education-primary hover:underline">Política de Privacidad</Link>, que describe cómo recopilamos, usamos y compartimos su información. Al utilizar nuestra Aplicación, usted consiente la recopilación y el uso de información según lo establecido en dicha política. Nos comprometemos a proteger su privacidad y a mantener sus datos seguros.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">7</span>
                        Modificaciones
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Aplicación. Su uso continuado de la Aplicación después de cualquier modificación constituye su aceptación de los nuevos términos. Le recomendamos revisar estos términos periódicamente para estar informado de cualquier cambio.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">8</span>
                        Terminación
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY puede, a su exclusiva discreción, suspender o terminar su acceso a la Aplicación en cualquier momento sin previo aviso por cualquier razón, incluyendo si HABY cree que ha violado estos Términos. Tras la terminación, su derecho a utilizar la Aplicación cesará inmediatamente. Las disposiciones relativas a propiedad intelectual, limitación de responsabilidad y resolución de disputas sobrevivirán a cualquier terminación.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">9</span>
                        Ley aplicable
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        Estos Términos se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta sus conflictos de disposiciones legales. Cualquier disputa que surja en relación con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de la Ciudad de México.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">10</span>
                        Contacto
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        Si tiene alguna pregunta sobre estos Términos, contáctenos en: <a href="mailto:habyopenthedoors@gmail.com" className="text-education-primary hover:underline">habyopenthedoors@gmail.com</a> o visite nuestra <Link to="/contact" className="text-education-primary hover:underline">página de contacto</Link>. Estamos comprometidos a proporcionar el mejor servicio posible y valoramos sus comentarios y sugerencias.
                      </p>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">1</span>
                        Acceptance of Terms
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        By accessing and using the HABY Score Tracker application ("the Application"), you agree to be bound by these Terms and Conditions. If you disagree with any of these terms, please do not use the Application. These terms constitute a legally binding agreement between you and HABY.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">2</span>
                        Service Description
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY Score Tracker is an educational tool designed to help users calculate and manage academic grades. The Application allows users to create evaluation categories, add activities with their respective grades, and calculate weighted averages. We offer this tool to facilitate academic tracking and improve the educational experience of our users.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">3</span>
                        Intellectual Property
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        All intellectual property rights related to the Application, including but not limited to copyrights, trademarks, trade names, code, images, logos, and designs are the exclusive property of HABY and its creator, Heber Zadkiel García Pérez. No content from this Application may be reproduced, distributed, transmitted, displayed, published, or broadcast without the prior written consent of HABY. We respect the creativity and effort invested in the development of this application and expect our users to do the same.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">4</span>
                        License to Use
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY grants you a limited, non-exclusive, non-transferable, revocable license to use the Application for your personal and non-commercial use. This license is conditioned upon your compliance with these terms. You may not modify, adapt, translate, reverse engineer, decompile, or disassemble any part of the Application. Any unauthorized use of the Application will result in the immediate termination of this license.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">5</span>
                        Limitation of Liability
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        The Application is provided "as is" and "as available" without warranties of any kind. HABY does not guarantee that the Application will be uninterrupted, timely, secure, or error-free. In no event shall HABY be liable for any indirect, incidental, special, consequential, or punitive damages. We do our best to ensure the accuracy of the calculations and the reliability of the application, but we recommend users always verify important results.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">6</span>
                        Privacy
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        The use of the Application is subject to our <Link to="/privacy" className="text-education-primary hover:underline">Privacy Policy</Link>, which describes how we collect, use, and share your information. By using our Application, you consent to the collection and use of information as outlined in that policy. We are committed to protecting your privacy and keeping your data secure.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">7</span>
                        Modifications
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY reserves the right to modify these Terms and Conditions at any time. Modifications will become effective immediately upon posting on the Application. Your continued use of the Application after any modification constitutes your acceptance of the new terms. We recommend reviewing these terms periodically to stay informed of any changes.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">8</span>
                        Termination
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        HABY may, in its sole discretion, suspend or terminate your access to the Application at any time without prior notice for any reason, including if HABY believes you have violated these Terms. Upon termination, your right to use the Application will cease immediately. The provisions relating to intellectual property, limitation of liability, and dispute resolution will survive any termination.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">9</span>
                        Governing Law
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        These Terms shall be governed by and construed in accordance with the laws of Mexico, without regard to its conflict of law provisions. Any dispute arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Mexico City.
                      </p>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-education-primary flex items-center">
                        <span className="bg-education-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-education-primary">10</span>
                        Contact
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
                        If you have any questions about these Terms, please contact us at: <a href="mailto:habyopenthedoors@gmail.com" className="text-education-primary hover:underline">habyopenthedoors@gmail.com</a> or visit our <Link to="/contact" className="text-education-primary hover:underline">contact page</Link>. We are committed to providing the best service possible and value your feedback and suggestions.
                      </p>
                    </section>
                  </>
                )}
              </div>
              
              <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  &copy; {currentYear} HABY Score Tracker. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'es' ? 'Última actualización:' : 'Last updated:'} {currentYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
