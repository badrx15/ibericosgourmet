'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GraciasMayoristaPage() {
  useEffect(() => {
    // Google Analytics Event: Generate Lead
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'EUR',
        value: 0
      });
    }
  }, []);

  return (
    <div className="bg-stone-50 text-stone-900 flex items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full mx-4 text-center">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-stone-100 relative overflow-hidden">
          {/* Decorative circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-jamon/5 rounded-full blur-3xl"></div>
          
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <i className="fas fa-check text-4xl text-green-600"></i>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-black mb-6 text-stone-900">
            ¡Solicitud Recibida!
          </h1>
          
          <p className="text-xl text-stone-500 mb-8 leading-relaxed">
            Gracias por tu interés en distribuir nuestros productos. Hemos recibido tus datos correctamente.
          </p>
          
          <div className="bg-stone-50 p-6 rounded-2xl mb-10 border border-stone-200">
            <p className="font-bold text-jamon text-lg mb-2">¿Qué sucede ahora?</p>
            <p className="text-stone-500">
              Nuestro equipo comercial revisará tu solicitud y se pondrá en contacto contigo en las próximas <strong>24-48 horas</strong> para enviarte las tarifas especiales para mayoristas.
            </p>
          </div>
          
          <Link href="/" className="inline-block bg-stone-900 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-jamon transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            VOLVER AL INICIO
          </Link>
        </div>
        
        <p className="mt-8 text-stone-400 text-xs font-bold uppercase tracking-widest">
          Ibéricos Gourmet S.L.
        </p>
      </div>
    </div>
  );
}
