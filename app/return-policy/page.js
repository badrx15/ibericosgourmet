export const metadata = {
  title: 'Política de Devoluciones - Ibéricos Gourmet',
  description: 'Conoce nuestra política de devoluciones para los productos Ibéricos Gourmet.',
}

export default function ReturnPolicyPage() {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-stone-100 p-8 md:p-12 relative overflow-hidden">
          {/* Decorative circle from landing page */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-jamon/5 rounded-full blur-3xl"></div>

          <h1 className="font-serif text-4xl md:text-5xl font-black text-jamon mb-8 text-center">Política de Devoluciones</h1>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">1. Derecho de Desistimiento</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              De acuerdo con la legislación vigente, el cliente tiene derecho a desistir del presente contrato en un plazo de 14 días naturales sin necesidad de justificación.
            </p>
            <p className="text-stone-600 leading-relaxed">
              El plazo de desistimiento expirará a los 14 días naturales del día que usted o un tercero por usted indicado, distinto del transportista, adquirió la posesión material de los bienes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">2. Excepciones al Derecho de Desistimiento</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              El derecho de desistimiento no será aplicable a los contratos que se refieran a:
            </p>
            <ul className="list-disc list-inside text-stone-600 leading-relaxed ml-4 space-y-2">
              <li>El suministro de bienes precintados que no sean aptos para ser devueltos por razones de protección de la salud o de higiene y que hayan sido desprecintados tras la entrega.</li>
              <li>El suministro de bienes que puedan deteriorarse o caducar con rapidez.</li>
              <li>El suministro de bienes confeccionados conforme a las especificaciones del consumidor y usuario o claramente personalizados.</li>
            </ul>
            <p className="text-stone-600 leading-relaxed mt-4">
              Dado que nuestros productos son alimentos perecederos y, en muchos casos, envasados al vacío, una vez abiertos o desprecintados, no podrán ser devueltos por razones de higiene y seguridad alimentaria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">3. Consecuencias del Desistimiento</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              En caso de desistimiento por su parte, le devolveremos todos los pagos recibidos de usted, incluidos los gastos de entrega (con la excepción de los gastos adicionales resultantes de la elección por su parte de una modalidad de entrega diferente a la modalidad menos costosa de entrega ordinaria que ofrezcamos) sin ninguna demora indebida y, en todo caso, a más tardar en 14 días naturales a partir de la fecha en la que se nos informe de su decisión de desistir del presente contrato.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Procederemos a efectuar dicho reembolso utilizando el mismo medio de pago empleado por usted para la transacción inicial, a no ser que haya usted dispuesto expresamente lo contrario; en todo caso, no incurrirá en ningún gasto como consecuencia del reembolso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">4. Devolución de Productos Defectuosos o Erróneos</h2>
            <p className="text-stone-600 leading-relaxed">
              Si el producto recibido presenta algún defecto de fabricación o no corresponde con el pedido realizado, por favor, póngase en contacto con nosotros en un plazo máximo de 24 horas desde la recepción del pedido. Le indicaremos los pasos a seguir para la devolución y reemplazo del producto sin coste adicional para usted.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">5. Contacto</h2>
            <p className="text-stone-600 leading-relaxed">
              Para ejercer el derecho de desistimiento o para cualquier consulta relacionada con devoluciones, puede contactarnos a través de nuestro email o número de teléfono de atención al cliente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
