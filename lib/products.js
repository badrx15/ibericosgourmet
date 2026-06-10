export const products = [
  {
    id: 'sobres-jamon-cebo',
    name: 'Sobres de Jamón de Cebo',
    title: 'SOBRES DE JAMÓN',
    subtitle: 'DE CEBO',
    description: 'La excelencia del ibérico en cómodos sobres de 100g. Cortado a cuchillo por maestros jamoneros. Perfecto para degustar la máxima calidad con envío gratuito y pago contrareembolso.',
    price: 37.90, // Precio base (Pack de 5)
    hasOptions: true,
    options: [
      { id: 'pack-5', name: '5 Sobres', price: 37.90, quantity: 5, popular: false },
      { id: 'pack-10', name: '10 Sobres', price: 61.90, quantity: 10, popular: false },
      { id: 'pack-15', name: '15 Sobres', price: 84.90, quantity: 15, popular: false },
      { id: 'pack-20', name: '20 Sobres', price: 109.90, quantity: 20, popular: true }
    ],
    quantity: 5, // Cantidad por defecto del primer pack
    image: '/product-image.png',
    popular: true,
    color: 'yellow-500',
    features: [
      'Cortado a cuchillo por maestros jamoneros',
      'Sobres de 100g envasados al vacío',
      'Jamón de Cebo de Campo 75% Ibérico'
    ]
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
    color: 'stone-100',
    features: [
      'Peso aproximado entre 4.5kg y 5kg',
      'Curación óptima garantizada',
      'Paleta de Cebo de Campo 75% Ibérica'
    ]
  }
];
