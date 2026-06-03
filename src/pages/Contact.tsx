import React, { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import SEO from "@/components/SEO";

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
    setTimeout(() => {
      toast.success(language === 'es' ? 'Mensaje enviado. Gracias por contactarnos.' : 'Message sent. Thank you for contacting us.');
      setName(""); setEmail(""); setSubject(""); setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contacto - HABY Score Tracker"
        description="Contacta a HABY Score Tracker por correo o WhatsApp. Soporte de lunes a viernes 9:00-18:00 (CDMX)."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "HABY",
          url: "https://prep-score-tracker.lovable.app/",
          contactPoint: {
            "@type": "ContactPoint",
            email: "habyopenthedoors@gmail.com",
            telephone: "+52-56-5368-1237",
            contactType: "customer support",
            availableLanguage: ["Spanish", "English"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          },
        }}
      />
      <div className="px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'es' ? 'Contacto' : 'Contact'}
          </h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {language === 'es' ? 'Envíanos un mensaje' : 'Send us a message'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">{language === 'es' ? 'Nombre' : 'Name'}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder={language === 'es' ? 'Tu nombre' : 'Your name'} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">{language === 'es' ? 'Correo electrónico' : 'Email'}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email'} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">{language === 'es' ? 'Asunto' : 'Subject'}</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder={language === 'es' ? 'Asunto del mensaje' : 'Message subject'} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">{language === 'es' ? 'Mensaje' : 'Message'}</Label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required className="min-h-[150px]" placeholder={language === 'es' ? 'Escribe tu mensaje aquí' : 'Write your message here'} />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-education-primary text-white hover:bg-education-secondary">
                {isSubmitting ? (language === 'es' ? 'Enviando...' : 'Sending...') : (<><Send className="mr-2 h-4 w-4" />{language === 'es' ? 'Enviar mensaje' : 'Send message'}</>)}
              </Button>
            </form>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {language === 'es' ? 'Información de contacto' : 'Contact information'}
            </h2>
            <div className="bg-card border border-border p-6 rounded-xl space-y-5">
              <div>
                <h3 className="font-medium text-foreground mb-1">{language === 'es' ? 'Acerca de' : 'About'}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'es' ? 'HABY Score Tracker es una aplicación educativa desarrollada por Heber Zadkiel García Pérez.' : 'HABY Score Tracker is an educational application developed by Heber Zadkiel García Pérez.'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{language === 'es' ? 'Correo electrónico' : 'Email'}</h3>
                <a href="mailto:habyopenthedoors@gmail.com" className="flex items-center text-sm text-education-primary hover:underline">
                  <Mail className="mr-2 h-4 w-4" />habyopenthedoors@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">WhatsApp</h3>
                <a href="https://wa.me/5256536812377" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-education-primary hover:underline">
                  <MessageSquare className="mr-2 h-4 w-4" />+52 56 5368 1237
                </a>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{language === 'es' ? 'Horario' : 'Hours'}</h3>
                <p className="text-sm text-muted-foreground">{language === 'es' ? 'Lunes a viernes: 9:00 AM - 6:00 PM (CDMX)' : 'Monday to Friday: 9:00 AM - 6:00 PM (Mexico City)'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
