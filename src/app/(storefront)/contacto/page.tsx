import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para cualquier pregunta sobre nuestros productos.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-semibold text-charcoal-950 mb-2">
        Contacto
      </h1>
      <p className="text-charcoal-500 mb-10">
        ¿Tienes alguna pregunta? Escríbenos y te responderemos pronto.
      </p>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Form */}
        <div className="md:col-span-3">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input id="name" label="Nombre" placeholder="Tu nombre" />
              <Input id="email" label="Email" type="email" placeholder="tu@email.com" />
            </div>
            <Input id="subject" label="Asunto" placeholder="¿En qué podemos ayudarte?" />
            <Textarea
              id="message"
              label="Mensaje"
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
            />
            <Button type="submit" size="lg">
              Enviar mensaje
            </Button>
          </form>
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-charcoal-900 text-sm">Email</h3>
              <p className="text-charcoal-500 text-sm">contacto@pahr.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-charcoal-900 text-sm">WhatsApp</h3>
              <p className="text-charcoal-500 text-sm">+58 412-000-0000</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-charcoal-900 text-sm">Ubicación</h3>
              <p className="text-charcoal-500 text-sm">Venezuela</p>
            </div>
          </div>
          <div className="bg-sand-100 rounded-lg p-4 mt-4">
            <p className="text-sm text-charcoal-600">
              <strong>Horario de atención:</strong>
              <br />
              Lunes a Viernes: 9:00 AM - 6:00 PM
              <br />
              Sábados: 9:00 AM - 1:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
