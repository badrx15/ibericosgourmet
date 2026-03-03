import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <div className="relative min-h-screen bg-white text-stone-800">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-orange-400 to-orange-600 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="url(#pattern-waves)"
          >
            <defs>
              <pattern
                id="pattern-waves"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10L5 0L10 10Z"
                  fill="rgba(255,255,255,0.1)"
                ></path>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#pattern-waves)"></rect>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Política de Envíos
          </h1>
          <p className="text-xl font-light opacity-90">
            Información detallada sobre nuestros métodos de envío, plazos y costes.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            1. Métodos de Envío
          </h2>
          <p className="mb-4 leading-relaxed">
            Ofrecemos diferentes opciones de envío para adaptarnos a tus necesidades. Todos nuestros envíos se realizan con empresas de transporte de confianza para asegurar que tu pedido llegue en perfectas condiciones.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Envío Estándar:</strong> Plazo de entrega de 3-5 días laborables.
            </li>
            <li>
              <strong>Envío Urgente:</strong> Plazo de entrega de 1-2 días laborables (disponible para ciertas zonas y con coste adicional).
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            2. Plazos de Entrega
          </h2>
          <p className="mb-4 leading-relaxed">
            Los plazos de entrega comienzan a contar desde el momento en que el pedido sale de nuestro almacén. Recibirás una notificación por correo electrónico con el número de seguimiento una vez que tu pedido haya sido enviado.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Preparación del Pedido:</strong> Los pedidos suelen prepararse en 24-48 horas laborables.
            </li>
            <li>
              <strong>Días Laborables:</strong> Se consideran días laborables de lunes a viernes, excluyendo festivos nacionales y locales.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            3. Costes de Envío
          </h2>
          <p className="mb-4 leading-relaxed">
            Los costes de envío varían en función del destino y el peso/volumen del pedido. Podrás ver el coste exacto de tu envío antes de finalizar la compra.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Envío Gratuito:</strong> Ofrecemos envío gratuito en pedidos superiores a un determinado importe (consulta nuestra página de inicio para ver la oferta actual).
            </li>
            <li>
              <strong>Costes Adicionales:</strong> Para envíos urgentes o a zonas especiales (Islas, Ceuta, Melilla), pueden aplicarse costes adicionales.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            4. Seguimiento del Pedido
          </h2>
          <p className="mb-4 leading-relaxed">
            Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento y un enlace para que puedas consultar el estado de tu envío en tiempo real.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">
            5. Incidencias en la Entrega
          </h2>
          <p className="mb-4 leading-relaxed">
            Si experimentas algún problema con la entrega de tu pedido (retrasos, paquetes dañados, etc.), por favor, ponte en contacto con nuestro servicio de atención al cliente lo antes posible. Estaremos encantados de ayudarte a resolver cualquier incidencia.
          </p>
          <p className="leading-relaxed">
            Puedes contactarnos a través de nuestro formulario de contacto o enviando un correo electrónico a badreddinnakhil@gmail.com.
          </p>
        </section>
      </main>

      {/* Footer Section (Optional, if you want a specific footer for legal pages) */}
      {/* You can also rely on the main layout's footer */}
    </div>
  );
};

export default ShippingPolicyPage;
