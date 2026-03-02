export const metadata = {
  title: 'Política de Privacidad - Ibéricos Gourmet',
  description: 'Conoce nuestra política de privacidad y cómo tratamos tus datos en Ibéricos Gourmet.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-stone-100 p-8 md:p-12 relative overflow-hidden">
          {/* Decorative circle from landing page */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-jamon/5 rounded-full blur-3xl"></div>

          <h1 className="font-serif text-4xl md:text-5xl font-black text-jamon mb-8 text-center">Política de Privacidad</h1>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">1. Responsable del Tratamiento de Datos</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              El responsable del tratamiento de sus datos es [Tu Nombre/Razón Social], con NIF [Tu CIF/NIF] y domicilio en [Tu Dirección Física].
              Puede contactar con nosotros a través del correo electrónico [Tu Email de Contacto].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">2. Finalidad del Tratamiento de Datos</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              En Ibéricos Gourmet tratamos la información que nos facilitan las personas interesadas con los siguientes fines:
            </p>
            <ul className="list-disc list-inside text-stone-600 leading-relaxed ml-4 space-y-2">
              <li>Gestionar la compra de nuestros productos y el envío de los mismos.</li>
              <li>Gestionar la relación contractual con nuestros clientes.</li>
              <li>Atender sus consultas, solicitudes o reclamaciones.</li>
              <li>Enviar comunicaciones comerciales sobre nuestros productos y servicios, siempre que hayamos obtenido su consentimiento.</li>
              <li>Realizar análisis estadísticos y de mercado.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">3. Legitimación para el Tratamiento de Datos</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              La base legal para el tratamiento de sus datos es:
            </p>
            <ul className="list-disc list-inside text-stone-600 leading-relaxed ml-4 space-y-2">
              <li>La ejecución de un contrato o la aplicación de medidas precontractuales (para la gestión de pedidos y la relación contractual).</li>
              <li>El consentimiento del interesado (para el envío de comunicaciones comerciales).</li>
              <li>El interés legítimo del responsable (para análisis estadísticos y de mercado).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">4. Destinatarios de los Datos</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Sus datos podrán ser comunicados a terceros para el cumplimiento de las finalidades indicadas, como empresas de transporte, entidades bancarias o proveedores de servicios tecnológicos.
              No se realizarán transferencias internacionales de datos sin su consentimiento explícito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">5. Derechos del Interesado</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Usted tiene derecho a obtener confirmación sobre si en Ibéricos Gourmet estamos tratando datos personales que le conciernan, o no.
              Asimismo, tiene derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.
            </p>
            <p className="text-stone-600 leading-relaxed">
              En determinadas circunstancias, podrá solicitar la limitación del tratamiento de sus datos, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones.
              También podrá oponerse al tratamiento de sus datos, en cuyo caso dejaremos de tratar los datos, salvo por motivos legítimos imperiosos, o el ejercicio o la defensa de posibles reclamaciones.
            </p>
            <p className="text-stone-600 leading-relaxed mt-4">
              Para ejercer estos derechos, puede enviar un correo electrónico a [Tu Email de Contacto] adjuntando una copia de su DNI o documento identificativo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">6. Plazo de Conservación de los Datos</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}