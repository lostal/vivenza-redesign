import SectionTitle from '@/components/section-title';
import ContactForm from '@/components/contact/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        title="Get In Touch"
        description="We'd love to hear from you. Whether you have a question about our products, need assistance, or just want to share your feedback, please reach out."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div>
          <h3 className="text-2xl font-headline mb-6 text-foreground">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">Our Headquarters</h4>
                <p className="text-muted-foreground">123 Vivenza Avenue, Design City, DC 54321</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">Phone</h4>
                <p className="text-muted-foreground">+1 (555) VIV-ENZA (848-3692)</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold text-lg text-foreground">Email</h4>
                <p className="text-muted-foreground">support@vivenzaexpo.es</p>
                <p className="text-muted-foreground">sales@vivenzaexpo.es</p>
              </div>
            </div>
          </div>
           <div className="mt-8 p-6 bg-card rounded-lg shadow">
            <h4 className="font-semibold text-lg text-foreground mb-2">Business Hours</h4>
            <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-muted-foreground">Sunday: Closed</p>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-headline mb-6 text-foreground">Send Us a Message</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
