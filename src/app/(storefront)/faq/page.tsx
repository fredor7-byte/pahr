"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Aceptamos Pago Móvil, Transferencia Bancaria (en bolívares) y Zelle (en dólares). Una vez realices tu pedido, te mostraremos los datos de pago y podrás subir tu comprobante directamente en la página.",
  },
  {
    q: "¿Cómo funciona el proceso de compra?",
    a: "Seleccionas tus productos, agregas al carrito, completas tus datos y eliges tu método de pago. Luego subes el comprobante de pago y nuestro equipo lo verifica. Una vez verificado, preparamos tu pedido para envío.",
  },
  {
    q: "¿Cuánto tarda la verificación del pago?",
    a: "Verificamos los pagos en un máximo de 24 horas hábiles. Recibirás un email de confirmación cuando tu pago sea aprobado.",
  },
  {
    q: "¿Cómo se calcula el precio en bolívares?",
    a: "Los precios base están en dólares. El equivalente en bolívares se calcula usando la tasa del día que actualizamos diariamente. La tasa aplicada a tu pedido es la vigente al momento de la compra.",
  },
  {
    q: "¿Cuál es la guía de tallas?",
    a: "Nuestras prendas van desde XS hasta XXL. Recomendamos revisar la tabla de tallas de cada producto. Si tienes dudas, contáctanos por WhatsApp y te ayudamos a elegir tu talla ideal.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, realizamos envíos a toda Venezuela a través de MRW, Zoom, Tealca y DOMESA. El costo de envío se calcula según tu ubicación.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "Una vez verificado el pago, preparamos tu pedido en 1-2 días hábiles. El tiempo de envío varía según la empresa y tu ubicación, generalmente entre 2-5 días hábiles.",
  },
  {
    q: "¿Puedo rastrear mi pedido?",
    a: "Sí. Una vez que tu pedido sea despachado, recibirás un email con el número de guía y la empresa de envío para que puedas rastrear tu paquete.",
  },
  {
    q: "¿Aceptan devoluciones o cambios?",
    a: "Aceptamos cambios de talla dentro de los 7 días posteriores a la recepción del pedido, siempre que la prenda esté en su estado original con etiquetas. Contáctanos para coordinar el cambio.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-semibold text-charcoal-950 mb-2">
        Preguntas Frecuentes
      </h1>
      <p className="text-charcoal-500 mb-10">
        Encuentra respuestas a las preguntas más comunes sobre nuestros
        productos, pagos y envíos.
      </p>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-charcoal-200 rounded-lg bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-charcoal-900 pr-4">
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-charcoal-400 shrink-0 transition-transform",
                  openIndex === i && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === i ? "max-h-96" : "max-h-0"
              )}
            >
              <p className="px-4 pb-4 text-sm text-charcoal-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
