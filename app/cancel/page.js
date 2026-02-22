import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="bg-stone-50 flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-10 text-center border border-stone-200">
        <div className="mb-6 text-red-500">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <i className="fas fa-times text-4xl"></i>
          </div>
        </div>
        <h1 className="font-serif text-3xl font-black text-jamon mb-4">Pedido Cancelado</h1>
        <p className="text-stone-600 mb-8 leading-relaxed">
          Has cancelado el proceso de pago. No se ha realizado ningún cargo en tu tarjeta.
        </p>
        
        <Link href="/" className="block w-full bg-stone-900 text-white py-4 rounded-xl font-black hover:bg-jamon transition-all">
          VOLVER A INTENTAR
        </Link>
        
        <p className="mt-8 text-[10px] text-stone-400 uppercase font-bold tracking-widest">Ibéricos Gourmet S.L.</p>
      </div>
    </div>
  );
}
