const artists = [
  {
    id: 'picasso',
    name: 'Pablo Picasso',
    bio: 'A pioneer of Cubism and one of the most influential artists of the 20th century.',
    image: '/images/Picasso.jpg',
    artworks: [
      { id: 'guernica', title: 'Guernica', image: '/images/guernica.jpg' },
      { id: 'les-demoiselles', title: 'Les Demoiselles d\'Avignon', image: '/images/demoiselles.jpg' },
    ],
  },
  {
    id: 'vangogh',
    name: 'Vincent van Gogh',
    bio: 'A Dutch Post-Impressionist known for his vibrant and emotional works.',
    image: '/images/Van.jpg',
    artworks: [
      { id: 'starry-night', title: 'The Starry Night', image: '/images/starry-night.jpg' },
      { id: 'sunflowers', title: 'Sunflowers', image: '/images/sunflowers.jpg' },
    ],
  },
  {
    id: 'monet',
    name: 'Claude Monet',
    bio: 'Founder of French Impressionist painting, famous for his landscapes and water lilies.',
    image: '/images/Monet.jpg',
    artworks: [
      { id: 'water-lilies', title: 'Water Lilies', image: '/images/water-lilies.jpg' },
      { id: 'impression-sunrise', title: 'Impression, Sunrise', image: '/images/sunrise.jpg' },
    ],
  },
  {
    id: 'kahlo',
    name: 'Frida Kahlo',
    bio: 'A Mexican artist known for her powerful self-portraits and exploration of identity.',
    image: '/images/Kahlo.jpg',
    artworks: [
      { id: 'self-portrait', title: 'Self Portrait with Thorn Necklace', image: '/images/kahlo-self.jpg' },
      { id: 'frida', title: 'The Two Fridas', image: '/images/two-fridas.jpg' },
    ],
  },
  {
    id: 'warhol',
    name: 'Andy Warhol',
    bio: 'The leading figure in the visual art movement known as pop art.',
    image: '/images/Warhol.jpg',
    artworks: [
      { id: 'marilyn', title: 'Marilyn Diptych', image: '/images/marilyn.jpg' },
      { id: 'soup-cans', title: 'Campbell\'s Soup Cans', image: '/images/soup-cans.jpg' },
    ],
  },
];

export default artists;
