export const products = [
  {
    id: 'pack-5',
    name: 'Pack 5 Sobres Ibérico',
    title: '5 SOBRES',
    subtitle: '(100g c/u)',
    description: 'La excelencia del ibérico en 5 cómodos sobres de 100g. Cortado a cuchillo por maestros jamoneros. Perfecto para degustar la máxima calidad.',
    price: 37.90,
    quantity: 5,
    image: '/product-image.png',
    popular: false,
    color: 'stone-100'
  },
  {
    id: 'pack-10',
    name: 'Pack 10 Sobres Ibérico',
    title: '10 SOBRES',
    subtitle: '(100g c/u)',
    description: 'Disfruta de 10 sobres de jamón ibérico de cebo de campo. Envasado al vacío para mantener todo su sabor y frescura intactos.',
    price: 61.90,
    quantity: 10,
    image: '/product-image.png',
    popular: false,
    color: 'stone-100'
  },
  {
    id: 'pack-15',
    name: 'Pack 15 Sobres Ibérico',
    title: '15 SOBRES',
    subtitle: '(100g c/u)',
    description: 'Ideal para compartir en eventos y celebraciones. 15 sobres de la más alta calidad cortados a cuchillo.',
    price: 84.90,
    quantity: 15,
    image: '/product-image.png',
    popular: false,
    color: 'stone-100'
  },
  {
    id: 'pack-20',
    name: 'Pack 20 Sobres Ibérico',
    title: '20 SOBRES',
    subtitle: '(100g c/u)',
    description: 'El mejor valor para los verdaderos amantes del jamón. 20 sobres con el máximo ahorro, envío prioritario y la calidad garantizada de siempre.',
    price: 109.90,
    quantity: 20,
    image: '/product-image.png',
    popular: true,
    color: 'yellow-500'
  },
  {
    id: 'paleta-cebo',
    name: 'Paleta Ibérica de Cebo',
    title: 'PALETA IBÉRICA',
    subtitle: 'DE CEBO',
    description: 'Espectacular Paleta Ibérica de Cebo. Calidad premium garantizada, ideal para los que prefieren el sabor intenso de la paleta. Envío incluido y pago contrareembolso disponible.',
    price: 51.95, // Precio base (desde)
    hasOptions: true,
    options: [
      { id: 'pack-1', name: 'Pack 1', price: 51.95, quantity: 1 },
      { id: 'pack-2', name: 'Pack 2', price: 87.95, quantity: 2, popular: true }
    ],
    quantity: 1, // Cantidad por defecto
    image: '/paleta.png',
    popular: false,
    color: 'stone-100'
  }
];
