
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, UserCheck, Database, Share2, User, Lock, Refresh, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n";

/**
 * Enhanced Privacy Policy page with modern design
 */
const Privacy = () => {
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
            <div className="absolute inset-0 bg-education-primary/5 rounded-3xl transform -rotate-1"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-10">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
                {language === 'es' ? 'Política de privacidad' : 'Privacy policy'}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed font-light">
                {language === 'es' 
                  ? 'Esta política de privacidad describe cómo HABY Score Tracker recopila, utiliza y comparte su información cuando utiliza nuestra aplicación. Su privacidad es importante para nosotros.' 
                  : 'This privacy policy describes how HABY Score Tracker collects, uses, and shares your information when you use our application. Your privacy is important to us.'}
              </p>
              
              <div className="space-y-10">
                {language === 'es' ? (
                  <>
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <UserCheck className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">1. Información que recopilamos</h2>
                          
                          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">1.1 Información proporcionada directamente por usted</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Al utilizar HABY Score Tracker, puede proporcionarnos información, como:
                          </p>
                          <ul className="list-disc pl-6 space-y-1 mb-6 text-gray-600 dark:text-gray-300">
                            <li>Nombres de categorías académicas</li>
                            <li>Nombres de actividades</li>
                            <li>Calificaciones y ponderaciones</li>
                            <li>Información de perfil (opcional)</li>
                          </ul>
                          
                          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">1.2 Información recopilada automáticamente</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Cuando utiliza nuestra Aplicación, podemos recopilar automáticamente cierta información, como:
                          </p>
                          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                            <li>Información del dispositivo (tipo de dispositivo, sistema operativo)</li>
                            <li>Preferencias de idioma</li>
                            <li>Estadísticas de uso de la Aplicación</li>
                            <li>Información de diagnóstico para mejorar la experiencia del usuario</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <User className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">2. Cómo utilizamos su información</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Utilizamos la información recopilada para:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Proporcionar servicios:</span> Crear, mantener y mejorar nuestra Aplicación para satisfacer sus necesidades.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Personalización:</span> Adaptar su experiencia para que sea más relevante y útil para usted.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Comunicación:</span> Responder a sus comentarios, preguntas y solicitudes de soporte.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Análisis:</span> Monitorear y analizar tendencias de uso para mejorar la funcionalidad.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Seguridad:</span> Proteger nuestra Aplicación y prevenir actividades fraudulentas.</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Database className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">3. Almacenamiento de datos</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            La aplicación HABY Score Tracker almacena la mayoría de los datos localmente en su dispositivo. Esto significa que sus categorías, actividades y calificaciones se guardan principalmente en su dispositivo. No se envían a servidores externos a menos que se activen funciones específicas de respaldo o sincronización.
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                            Los datos almacenados localmente están sujetos a las políticas de seguridad de su dispositivo. Le recomendamos mantener su dispositivo seguro y actualizado para proteger su información.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Share2 className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">4. Compartir información</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            No vendemos, intercambiamos ni transferimos de otro modo su información personal a terceros sin su consentimiento, excepto como se describe en esta Política de Privacidad. Podemos compartir información en las siguientes circunstancias:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Proveedores de servicios:</span> Con empresas que nos ayudan a operar nuestra Aplicación y proporcionarle servicios.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Requisitos legales:</span> Para cumplir con la ley, reglamentos, procesos legales o solicitudes gubernamentales.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Protección:</span> Para proteger los derechos, la propiedad o la seguridad de HABY, nuestros usuarios o el público.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Transferencia de negocio:</span> En caso de fusión, venta o adquisición de todos o una parte de nuestros activos.</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Shield className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">5. Sus derechos</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Dependiendo de su ubicación, puede tener ciertos derechos con respecto a su información personal, incluyendo:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Derecho de acceso:</span> Puede solicitar acceso a su información personal que mantenemos.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Derecho de rectificación:</span> Puede solicitar que corrijamos información inexacta o incompleta.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Derecho de supresión:</span> Puede solicitar que eliminemos su información personal.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Derecho de oposición:</span> Puede oponerse al procesamiento de sus datos personales.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Derecho de portabilidad:</span> Puede solicitar una copia de su información personal en un formato estructurado.</li>
                          </ul>
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            Para ejercer cualquiera de estos derechos, póngase en contacto con nosotros a través de <a href="mailto:habyopenthedoors@gmail.com" className="text-education-primary hover:underline">habyopenthedoors@gmail.com</a>.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Lock className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">6. Seguridad</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Implementamos medidas de seguridad razonables para proteger su información contra pérdida, uso indebido o acceso no autorizado. Sin embargo, ningún sistema es completamente seguro, por lo que no podemos garantizar la seguridad absoluta de su información.
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            Tomamos en serio la seguridad de los datos y revisamos regularmente nuestras prácticas de seguridad para mejorar la protección de la información del usuario.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Refresh className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">7. Cambios a esta política</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y, cuando sea apropiado, le notificaremos por correo electrónico o mediante un aviso en nuestra Aplicación.
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            Le recomendamos revisar periódicamente esta Política de Privacidad para estar informado sobre cómo protegemos su información.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Phone className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">8. Contacto</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos en:
                          </p>
                          <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>
                              <span className="font-medium text-gray-700 dark:text-gray-200">Email:</span> 
                              <a href="mailto:habyopenthedoors@gmail.com" className="text-education-primary hover:underline ml-2">habyopenthedoors@gmail.com</a>
                            </li>
                            <li>
                              <span className="font-medium text-gray-700 dark:text-gray-200">WhatsApp:</span> 
                              <a href="https://wa.me/5256536812377" target="_blank" rel="noopener noreferrer" className="text-education-primary hover:underline ml-2">+52 56 5368 1237</a>
                            </li>
                            <li className="pt-2">
                              <Link to="/contact" className="inline-flex items-center text-education-primary hover:underline">
                                Visite nuestra página de contacto para más opciones
                                <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <UserCheck className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">1. Information We Collect</h2>
                          
                          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">1.1 Information You Provide Directly</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            When using HABY Score Tracker, you may provide us with information such as:
                          </p>
                          <ul className="list-disc pl-6 space-y-1 mb-6 text-gray-600 dark:text-gray-300">
                            <li>Names of academic categories</li>
                            <li>Names of activities</li>
                            <li>Grades and weightings</li>
                            <li>Profile information (optional)</li>
                          </ul>
                          
                          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">1.2 Information We Collect Automatically</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            When you use our Application, we may automatically collect certain information, such as:
                          </p>
                          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                            <li>Device information (device type, operating system)</li>
                            <li>Language preferences</li>
                            <li>Application usage statistics</li>
                            <li>Diagnostic information to improve user experience</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <User className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">2. How We Use Your Information</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            We use the information we collect to:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Provide Services:</span> Create, maintain, and improve our Application to meet your needs.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Personalization:</span> Tailor your experience to be more relevant and useful to you.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Communication:</span> Respond to your comments, questions, and support requests.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Analytics:</span> Monitor and analyze usage trends to improve functionality.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Security:</span> Protect our Application and prevent fraudulent activities.</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Database className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">3. Data Storage</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            The HABY Score Tracker application stores most data locally on your device. This means that your categories, activities, and grades are primarily saved on your device. They are not sent to external servers unless specific backup or synchronization features are enabled.
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                            Locally stored data is subject to your device's security policies. We recommend keeping your device secure and updated to protect your information.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Share2 className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">4. Sharing Information</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share information in the following circumstances:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Service Providers:</span> With companies that help us operate our Application and provide services to you.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Legal Requirements:</span> To comply with laws, regulations, legal processes, or governmental requests.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Protection:</span> To protect the rights, property, or safety of HABY, our users, or the public.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Business Transfer:</span> In the event of a merger, sale, or acquisition of all or a portion of our assets.</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Shield className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">5. Your Rights</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Depending on your location, you may have certain rights regarding your personal information, including:
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Right to Access:</span> You can request access to personal information we maintain about you.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Right to Rectification:</span> You can request that we correct inaccurate or incomplete information.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Right to Erasure:</span> You can request that we delete your personal information.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Right to Object:</span> You can object to the processing of your personal data.</li>
                            <li><span className="font-medium text-gray-700 dark:text-gray-200">Right to Portability:</span> You can request a copy of your personal information in a structured format.</li>
                          </ul>
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            To exercise any of these rights, please contact us at <a href="mailto:habyopenthedoors@gmail.com" className="text-education-primary hover:underline">habyopenthedoors@gmail.com</a>.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Lock className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">6. Security</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We implement reasonable security measures to protect your information from loss, misuse, or unauthorized access. However, no system is completely secure, so we cannot guarantee the absolute security of your information.
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            We take data security seriously and regularly review our security practices to enhance the protection of user information.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Refresh className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">7. Changes to This Policy</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and, when appropriate, we will notify you via email or through a notice on our Application.
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            We recommend reviewing this Privacy Policy periodically to stay informed about how we are protecting your information.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <section className="transform transition-all hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start">
                        <div className="bg-education-primary/10 p-3 rounded-full mr-5">
                          <Phone className="h-6 w-6 text-education-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-3 text-education-primary">8. Contact</h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            If you have any questions about this Privacy Policy, you can contact us at:
                          </p>
                          <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>
                              <span className="font-medium text-gray-700 dark:text-gray-200">Email:</span> 
                              <a href="mailto:habyopenthedoors@gmail.com" className="text-education-primary hover:underline ml-2">habyopenthedoors@gmail.com</a>
                            </li>
                            <li>
                              <span className="font-medium text-gray-700 dark:text-gray-200">WhatsApp:</span> 
                              <a href="https://wa.me/5256536812377" target="_blank" rel="noopener noreferrer" className="text-education-primary hover:underline ml-2">+52 56 5368 1237</a>
                            </li>
                            <li className="pt-2">
                              <Link to="/contact" className="inline-flex items-center text-education-primary hover:underline">
                                Visit our contact page for more options
                                <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
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

export default Privacy;
