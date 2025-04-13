
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n";

/**
 * Contact page with form and contact information
 */
const Contact = () => {
  const { language } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // In a real implementation, this would send the form data to a server
      toast.success(language === 'es' 
        ? 'Mensaje enviado. Gracias por contactarnos.' 
        : 'Message sent. Thank you for contacting us.');
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleEmailClick = () => {
    window.location.href = "mailto:habyopenthedoors@gmail.com";
    toast.success(language === 'es' 
      ? 'Abriendo cliente de correo electrónico' 
      : 'Opening email client');
  };
  
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5221565368123", "_blank");
    toast.success(language === 'es' 
      ? 'Abriendo WhatsApp' 
      : 'Opening WhatsApp');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'es' ? 'Volver al inicio' : 'Back to home'}
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-6 text-education-primary">
            {language === 'es' ? 'Contacto' : 'Contact'}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === 'es' ? 'Nombre' : 'Name'}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-focused"
                    placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'es' ? 'Correo electrónico' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-focused"
                    placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    {language === 'es' ? 'Asunto' : 'Subject'}
                  </Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="input-focused"
                    placeholder={language === 'es' ? 'Asunto del mensaje' : 'Message subject'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {language === 'es' ? 'Mensaje' : 'Message'}
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="input-focused min-h-[150px]"
                    placeholder={language === 'es' ? 'Escribe tu mensaje aquí' : 'Write your message here'}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-education-primary text-white hover:bg-education-secondary"
                >
                  {isSubmitting ? (
                    language === 'es' ? 'Enviando...' : 'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {language === 'es' ? 'Información de contacto' : 'Contact information'}
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    {language === 'es' ? 'Acerca de' : 'About'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'es' 
                      ? 'HABY Score Tracker es una aplicación educativa desarrollada por Heber Zadkiel García Pérez para ayudar a los estudiantes a calcular sus calificaciones de manera precisa.'
                      : 'HABY Score Tracker is an educational application developed by Heber Zadkiel García Pérez to help students calculate their grades accurately.'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    {language === 'es' ? 'Correo electrónico' : 'Email'}
                  </h3>
                  <button
                    onClick={handleEmailClick}
                    className="flex items-center text-education-primary hover:text-education-secondary transition-colors"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    habyopenthedoors@gmail.com
                  </button>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">WhatsApp</h3>
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center text-education-primary hover:text-education-secondary transition-colors"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    +52 1 56 5368 1237
                  </button>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    {language === 'es' ? 'Horario de atención' : 'Business hours'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'es'
                      ? 'Lunes a viernes: 9:00 AM - 6:00 PM (Hora del Centro de México)'
                      : 'Monday to Friday: 9:00 AM - 6:00 PM (Mexico City Time)'}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">
                    {language === 'es' ? 'Tiempo de respuesta' : 'Response time'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'es'
                      ? 'Nos esforzamos por responder a todas las consultas dentro de las 24-48 horas hábiles.'
                      : 'We strive to respond to all inquiries within 24-48 business hours.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
