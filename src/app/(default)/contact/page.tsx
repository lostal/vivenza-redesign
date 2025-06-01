import SectionTitle from '@/components/section-title';
import ContactForm from '@/components/contact/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        title="Ponte en Contacto"
        description="Nos encantaría saber de ti. Ya sea que tengas una pregunta sobre nuestros productos, necesites ayuda o simplemente quieras compartir tus comentarios, por favor contáctanos."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div>
          <h3 className="text-2xl font-headline mb-6 text-foreground">Información de Contacto</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">Nuestra Sede</h4>
                <p className="text-muted-foreground">Avenida Vivenza 123, Ciudad Diseño, CD 54321</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">Teléfono</h4>
                <p className="text-muted-foreground">+34 900 VIV-ENZA (848-3692)</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">Correo Electrónico</h4>
                <p className="text-muted-foreground">soporte@vivenzaexpo.es</p>
                <p className="text-muted-foreground">ventas@vivenzaexpo.es</p>
              </div>
            </div>
          </div>
           <div className="mt-8 p-6 bg-card rounded-lg shadow">
            <h4 className="font-semibold text-lg text-foreground mb-2">Horario Comercial</h4>
            <p className="text-muted-foreground">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
            <p className="text-muted-foreground">Sábado: 10:00 AM - 4:00 PM</p>
            <p className="text-muted-foreground">Domingo: Cerrado</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-headline mb-6 text-foreground">Envíanos un Mensaje</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
