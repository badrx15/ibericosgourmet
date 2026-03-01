'use client';

import React, { useState } from 'react';
import './globals.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: '',
    cardPrice: 0,
    codPrice: 0,
    quantity: 0
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const openModal = (name, cardPrice, codPrice, quantity) => {
    setModalData({ name, cardPrice, codPrice, quantity });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const currentPrice = paymentMethod === 'cod' ? modalData.codPrice : modalData.cardPrice;

  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      {/* Header / Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="font-serif text-3xl font-black text-jamon tracking-tight flex items-center gap-2">
            <i className="fas fa-piggy-bank"></i> IBÉRICOS GOURMET
          </div>
          <div className="hidden md:flex gap-8 font-semibold text-stone-600">
            <a href="#ofertas" className="hover:text-jamon transition-colors">Ofertas</a>
            <a href="#mayorista" className="hover:text-jamon transition-colors font-bold text-indigo-600">Al Por Mayor</a>
            <a href="#calidad" className="hover:text-jamon transition-colors">Calidad</a>
          </div>
          <a href="#ofertas" className="bg-jamon text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-all">COMPRAR AHORA</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-16 bg-white overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1 px-4 rounded-full bg-jamon/10 text-jamon text-xs font-bold uppercase tracking-[0.2em] mb-6">
            Cortado a Cuchillo por Maestros
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-black mb-4 leading-tight text-stone-900">
            JAMÓN DE CEBO DE CAMPO <br />
            <span className="text-jamon">75% IBÉRICOS GOURMET</span>
          </h1>
          <p className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto font-medium">
            La excelencia del ibérico en sobres de 100g, listos para disfrutar. Envío Gratis y Regalo Sorpresa incluido.
          </p>
          
          {/* Main Offer Grid */}
          <div id="ofertas" className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-16">
            {/* Pack 10 */}
            <div className="bg-white rounded-[2rem] border-4 border-stone-100 p-10 relative group hover:border-jamon/20 transition-all shadow-sm hover:shadow-2xl">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase">
                10 SOBRES (100g c/u)
              </div>
              <div className="text-6xl font-black text-jamon mb-4 mt-4 tracking-tighter">
                72.99€
              </div>
              <div className="text-stone-400 font-bold uppercase text-xs tracking-widest mb-8">Envío Gratis + Regalo</div>
              <button onClick={() => openModal('Pack 10 Sobres Ibérico', 67.99, 72.99, 10)} className="w-full bg-jamon text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-jamon/20 hover:scale-[1.02] transition-all">
                PEDIR PACK 10
              </button>
            </div>

            {/* Pack 20 */}
            <div className="bg-white rounded-[2rem] border-4 border-yellow-500 p-10 relative group shadow-2xl scale-105 z-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 gold-gradient text-jamon px-8 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-md">
                20 SOBRES (100g c/u)
              </div>
              <div className="text-6xl font-black text-jamon mb-4 mt-4 tracking-tighter">
                129.99€
              </div>
              <div className="text-stone-500 font-bold uppercase text-xs tracking-widest mb-8">Mejor Valor - Envío Gratis + Regalo</div>
              <button onClick={() => openModal('Pack 20 Sobres Ibérico', 121.99, 129.99, 20)} className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-jamon transition-all">
                PEDIR PACK 20
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-8 text-stone-400 font-bold text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2"><i className="fas fa-truck text-jamon"></i> Envío Gratis</div>
            <div className="flex items-center gap-2"><i className="fas fa-gift text-jamon"></i> Regalo Sorpresa</div>
            <div className="flex items-center gap-2"><i className="fas fa-certificate text-jamon"></i> 75% Ibérico</div>
          </div>
        </div>
      </header>

      {/* Image Display */}
      <section className="py-12 bg-stone-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="relative">
            <img src="/plato-jamon.png" alt="Plato de Jamón Ibérico Cortado a Cuchillo" className="rounded-full shadow-2xl mx-auto mb-12 border-8 border-white w-full max-w-md md:max-w-lg hover:scale-105 transition-transform duration-500" />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl hidden md:block border border-stone-100 animate-bounce">
              <p className="font-serif text-2xl font-black text-jamon italic">"Calidad que se deshace en la boca"</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN AL POR MAYOR */}
      <section id="mayorista" className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-jamon/5 -skew-x-12 transform translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block py-1 px-4 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-yellow-500/30">
                Canal Horeca & Distribuidores
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-black mb-8 leading-tight">
                Venta al Por Mayor <br />para <span className="text-yellow-500">Negocios</span>
              </h2>
              <p className="text-xl text-stone-400 mb-10 leading-relaxed">
                ¿Tienes un restaurante, tienda gourmet o buscas regalos corporativos? Ofrecemos precios especiales para pedidos de gran volumen (más de 50 sobres) y suministros recurrentes.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0"><i className="fas fa-percentage"></i></div>
                  <div>
                    <h4 className="font-bold text-lg">Descuentos por Volumen</h4>
                    <p className="text-stone-500">Precios escalonados según la cantidad de sobres mensuales.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0"><i className="fas fa-shipping-fast"></i></div>
                  <div>
                    <h4 className="font-bold text-lg">Logística Prioritaria</h4>
                    <p className="text-stone-500">Envíos urgentes refrigerados garantizados en 24h.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-10 text-stone-900 shadow-2xl border border-stone-800">
              <h3 className="font-serif text-2xl font-black mb-6 text-jamon">Solicitar Tarifas Mayoristas</h3>
              <form action="/api/contacto-mayorista" method="POST" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nombre de Empresa / Autónomo</label>
                    <input type="text" name="empresa" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-jamon transition-all" placeholder="Ej: Restaurante La Dehesa" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Email Corporativo</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-jamon transition-all" placeholder="info@empresa.com" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Teléfono</label>
                    <input type="tel" name="telefono" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-jamon transition-all" placeholder="+34 ..." />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Volumen estimado (Sobres/mes)</label>
                    <select name="volumen" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-jamon transition-all appearance-none">
                      <option value="50 - 100 sobres">50 - 100 sobres</option>
                      <option value="100 - 500 sobres">100 - 500 sobres</option>
                      <option value="+500 sobres">+500 sobres</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-xl font-black text-lg hover:bg-jamon transition-all mt-4 uppercase tracking-widest">
                  RECIBIR TARIFAS
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Compra */}
      {isModalOpen && (
        <div id="buyModal" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-jamon p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold">Finalizar Pedido</h3>
                <p className="text-white/60 text-sm">Ibéricos Gourmet - Corte a Cuchillo</p>
              </div>
              <button onClick={closeModal} className="text-white/60 hover:text-white text-2xl"><i className="fas fa-times"></i></button>
            </div>
            <form action="/api/checkout-jamon" method="POST" className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <input type="hidden" name="productName" value={modalData.name} />
              <input type="hidden" name="price" value={currentPrice} />
              <input type="hidden" name="quantity" value={modalData.quantity} />
              <input type="hidden" name="paymentMethod" value={paymentMethod} />
              
              <div className="flex items-center justify-between p-5 bg-stone-50 rounded-2xl border border-stone-100 mb-6">
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Pack Seleccionado</div>
                  <div className="font-black text-jamon text-lg">{modalData.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Precio Total</div>
                  <div className="font-black text-2xl">{currentPrice.toFixed(2)}€</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Método de Pago</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative flex flex-col p-4 bg-stone-50 border-2 rounded-2xl cursor-pointer hover:border-jamon/30 transition-all ${paymentMethod === 'cod' ? 'border-jamon bg-jamon/5' : 'border-stone-200'}`}>
                      <input type="radio" name="paymentMethodDisplay" value="cod" checked={paymentMethod === 'cod'} onChange={handlePaymentChange} className="absolute opacity-0" />
                      <span className="flex items-center gap-2 font-bold text-sm">
                        <i className="fas fa-hand-holding-usd text-jamon"></i> Contrareembolso
                      </span>
                      <span className="text-[10px] text-stone-400 mt-1">Recomendado</span>
                    </label>
                    <label className={`relative flex flex-col p-4 bg-stone-50 border-2 rounded-2xl cursor-pointer hover:border-jamon/30 transition-all ${paymentMethod === 'card' ? 'border-jamon bg-jamon/5' : 'border-stone-200'}`}>
                      <input type="radio" name="paymentMethodDisplay" value="card" checked={paymentMethod === 'card'} onChange={handlePaymentChange} className="absolute opacity-0" />
                      <span className="flex items-center gap-2 font-bold text-sm">
                        <i className="fas fa-credit-card text-jamon"></i> Tarjeta
                      </span>
                      <span className="text-[10px] text-stone-400 mt-1">Square Gateway</span>
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Nombre Completo</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-jamon outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Email de contacto</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-jamon outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Dirección de Envío</label>
                  <input type="text" name="address" required placeholder="Calle, número, piso..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-jamon outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Ciudad</label>
                  <input type="text" name="city" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-jamon outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Código Postal</label>
                  <input type="text" name="postalCode" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-jamon outline-none transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full bg-jamon text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-jamon/20 hover:opacity-90 transition-all mt-6">
                {paymentMethod === 'cod' ? 'CONFIRMAR PEDIDO (CONTRAREEMBOLSO)' : 'PAGAR Y RECIBIR EN CASA'}
              </button>
              <div className="flex items-center justify-center gap-4 text-stone-400">
                <i className="fab fa-stripe text-2xl"></i>
                <i className="fab fa-cc-visa text-2xl"></i>
                <i className="fab fa-cc-mastercard text-2xl"></i>
                <i className="fab fa-apple-pay text-2xl"></i>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white text-stone-400 py-16 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-serif text-3xl font-black text-jamon italic mb-6">IBÉRICOS GOURMET</div>
          <p className="text-sm max-w-md mx-auto mb-8">Selección premium de jamón de cebo de campo cortado a cuchillo por maestros jamoneros. Directo de la dehesa.</p>
          <div className="flex justify-center gap-8 text-xs uppercase tracking-widest font-bold mb-12">
            <a href="#" className="hover:text-jamon transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-jamon transition-colors">Privacidad</a>
            <a href="#" className="hover:text-jamon transition-colors">Envíos</a>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-black">© 2024 Ibéricos Gourmet S.L.</div>
        </div>
      </footer>
    </div>
  );
}
