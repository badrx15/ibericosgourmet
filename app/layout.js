export const metadata = {
  title: 'Ibéricos Gourmet - Jamón de Cebo de Campo 75% Ibérico',
  description: 'La excelencia del ibérico en sobres de 100g, listos para disfrutar. Envío Gratis y Regalo Sorpresa incluido.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', process.env.NEXT_PUBLIC_META_PIXEL_ID);
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="bg-stone-50 text-stone-900">
        {children}
        <a 
          href="https://wa.me/34614070656?text=quiero%20saber%20mas%20informaccion%20de%20los%20sobres%20de%20jamon" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-[1000] flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </body>
    </html>
  )
}
