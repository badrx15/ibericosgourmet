import Script from 'next/script'

export const metadata = {
  title: 'Ibéricos Gourmet - Jamón de Cebo de Campo 75% Ibérico',
  description: 'La excelencia del ibérico en sobres de 100g, listos para disfrutar. Envío Gratis y Regalo Sorpresa incluido.',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-stone-50 text-stone-900">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-87YQLV8LV5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-87YQLV8LV5');
          `}
        </Script>
        {children}
        <a 
          href="https://wa.me/34631615097?text=quiero%20mas%20informaccion%20sobre%20los%20sobres%20de%20jamon" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </body>
    </html>
  )
}
