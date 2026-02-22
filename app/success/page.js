'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get('method');
  const orderId = searchParams.get('orderId') || 'PENDIENTE';

  const isCod = method === 'cod';

  return (
    <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-10 text-center border border-stone-200">
      <div className="mb-6 text-green-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <i className="fas fa-check text-4xl"></i>
        </div>
      </div>
      <h1 className="font-serif text-3xl font-black text-jamon mb-4">
        {isCod ? '¡Pedido Registrado!' : '¡Pedido Recibido!'}
      </h1>
      <p className="text-stone-600 mb-8 leading-relaxed">
        {isCod 
          ? 'Tu pedido contrareembolso ha sido recibido. Prepárate para disfrutar del mejor ibérico directamente en tu casa.'
          : 'Gracias por confiar en Ibéricos Gourmet. Tu pago ha sido procesado correctamente y nuestro maestro cortador ya está preparando tu pedido.'
        }
      </p>
      
      <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-stone-100">
        <div className="text-xs font-bold text-stone-400 uppercase mb-1">ID de tu pedido</div>
        <div className="text-xl font-black text-stone-800 tracking-wider">#{orderId}</div>
      </div>

      <div className="space-y-4">
        <div className={`flex items-center gap-4 text-left text-sm p-4 rounded-xl ${isCod ? 'text-stone-600 bg-jamon/5 border border-jamon/20' : 'text-stone-500 bg-stone-50'}`}>
          <i className="fas fa-truck text-jamon text-lg"></i>
          <p>
            {isCod 
              ? <span><b>Pago en la entrega:</b> Recuerda tener el importe exacto para el repartidor.</span>
              : 'Recibirás un email con el seguimiento de tu envío en las próximas 24h.'
            }
          </p>
        </div>
        
        <Link href="/" className="block w-full bg-jamon text-white py-4 rounded-xl font-black hover:opacity-90 transition-all text-center">
          VOLVER A LA TIENDA
        </Link>
      </div>
      
      <p className="mt-8 text-[10px] text-stone-400 uppercase font-bold tracking-widest">Ibéricos Gourmet S.L.</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="bg-stone-50 flex items-center justify-center min-h-screen p-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
