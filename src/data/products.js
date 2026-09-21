export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '✨', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
  { id: 'viral-products', name: 'VIRAL PRODUCT', icon: '🔥', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600' },
  { id: 'nuts-dry-fruits', name: 'NUTS & DRY FRUITS', icon: '🌰', image: 'https://images.unsplash.com/photo-1508061252966-177bf9f7f457?auto=format&fit=crop&q=80&w=600' },
  { id: 'dates', name: 'DATES', icon: '🌴', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=600' },
  { id: 'malt-beverages', name: 'MALT & BEVERAGES', icon: '☕', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600' },
  { id: 'seeds-items', name: 'SEEDS ITEMS', icon: '🌱', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600' },
  { id: 'honey', name: 'HONEY', icon: '🍯', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600' },
  { id: 'rice-millet', name: 'RICE & MILLET', icon: '🌾', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
  { id: 'masala', name: 'MASALA', icon: '🌶️', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' },
  { id: 'soup', name: 'SOUP', icon: '🥣', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
  { id: 'weight-loss', name: 'WEIGHT LOSS PRODUCT', icon: '⚖️', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' }
];

export const PRODUCTS = [
  // VIRAL PRODUCT
  {
    id: 'vp-01',
    name: 'Viral Saffron Cardamom Wellness Elixir',
    category: 'viral-products',
    categoryName: 'VIRAL PRODUCT',
    badge: '🔥 Trending #1',
    rating: 5.0,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g Jar', price: 490, originalPrice: 590 },
      { label: '500g Jar', price: 890, originalPrice: 1050 }
    ],
    description: 'Internet viral blend of pure Kashmiri Saffron, Green Cardamom, and Almond flakes. Boosting immunity and natural glow.',
    origin: 'Kashmir, India',
    shelfLife: '9 Months'
  },

  // NUTS & DRY FRUITS
  {
    id: 'ndf-01',
    name: 'California Jumbo Almonds (Badam)',
    category: 'nuts-dry-fruits',
    categoryName: 'NUTS & DRY FRUITS',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1508061252966-177bf9f7f457?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 340, originalPrice: 390 },
      { label: '500g', price: 650, originalPrice: 750 },
      { label: '1 kg', price: 1250, originalPrice: 1450 }
    ],
    description: 'Premium grade California Jumbo Almonds, crunchy, nutrient-dense, and 100% natural.',
    origin: 'California, USA',
    shelfLife: '9 Months'
  },
  {
    id: 'ndf-02',
    name: 'W240 King Size Whole Cashews (Kaju)',
    category: 'nuts-dry-fruits',
    categoryName: 'NUTS & DRY FRUITS',
    badge: 'Premium',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 380, originalPrice: 420 },
      { label: '500g', price: 720, originalPrice: 800 },
      { label: '1 kg', price: 1390, originalPrice: 1550 }
    ],
    description: 'Whole, creamy, single-origin W240 grade Cashews.',
    origin: 'Mangalore, India',
    shelfLife: '6 Months'
  },
  {
    id: 'ndf-03',
    name: 'Afghan Sun-Dried Anjeer (Figs)',
    category: 'nuts-dry-fruits',
    categoryName: 'NUTS & DRY FRUITS',
    badge: 'Superfood',
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 450, originalPrice: 500 },
      { label: '500g', price: 870, originalPrice: 980 }
    ],
    description: 'Hand-strung sun-dried Afghan figs, naturally sweet and rich in dietary fiber.',
    origin: 'Kandahar, Afghanistan',
    shelfLife: '6 Months'
  },

  // DATES
  {
    id: 'dt-01',
    name: 'AJWA - SOUDIA',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Holy Harvest',
    rating: 5.0,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 650, originalPrice: 750 },
      { label: '500g', price: 1250, originalPrice: 1450 }
    ],
    description: 'Authentic dark Ajwa dates imported from Saudi Arabia.',
    origin: 'Saudi Arabia',
    shelfLife: '12 Months'
  },
  {
    id: 'dt-02',
    name: 'SAFAVI KALIMA - SOUDIA',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Premium Grade',
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 380, originalPrice: 450 },
      { label: '500g', price: 740, originalPrice: 880 }
    ],
    description: 'Rich dark Safawi Kalima dates from Saudi Arabia.',
    origin: 'Saudi Arabia',
    shelfLife: '12 Months'
  },
  {
    id: 'dt-03',
    name: 'KALUTTU - IRAN',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Soft & Sweet',
    rating: 4.7,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 260, originalPrice: 310 },
      { label: '500g', price: 500, originalPrice: 600 }
    ],
    description: 'Naturally soft and delicious Kaluttu dates from Iran.',
    origin: 'Iran',
    shelfLife: '9 Months'
  },
  {
    id: 'dt-04',
    name: 'MASAFATI - IRAN',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '500g Box', price: 290, originalPrice: 340 },
      { label: '1 kg Box', price: 540, originalPrice: 650 }
    ],
    description: 'Melt-in-mouth soft Mazafati fresh dates imported from Iran.',
    origin: 'Iran',
    shelfLife: '9 Months'
  },
  {
    id: 'dt-05',
    name: 'BROWN DATES SEED - IRAQ',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Natural Choice',
    rating: 4.6,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 180, originalPrice: 220 },
      { label: '500g', price: 340, originalPrice: 420 }
    ],
    description: 'Traditional brown seeded dates from Iraq.',
    origin: 'Iraq',
    shelfLife: '12 Months'
  },
  {
    id: 'dt-06',
    name: 'BROWN DATES',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Everyday Value',
    rating: 4.5,
    reviews: 75,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 160, originalPrice: 200 },
      { label: '500g', price: 300, originalPrice: 380 }
    ],
    description: 'Quality brown dates for daily healthy snacking.',
    origin: 'Middle East',
    shelfLife: '12 Months'
  },
  {
    id: 'dt-07',
    name: 'SEEDLESS - IRAQ YELLOW DRY DATES',
    category: 'dates',
    categoryName: 'DATES',
    badge: 'Dry Special',
    rating: 4.8,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 240, originalPrice: 290 },
      { label: '500g', price: 460, originalPrice: 550 }
    ],
    description: 'Seedless yellow dry dates imported from Iraq.',
    origin: 'Iraq',
    shelfLife: '12 Months'
  },

  // MALT & BEVERAGES
  {
    id: 'mb-01',
    name: 'Herbal Almond Malt & Badam Drink Powder',
    category: 'malt-beverages',
    categoryName: 'MALT & BEVERAGES',
    badge: 'Energy Boost',
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g Jar', price: 280, originalPrice: 340 },
      { label: '500g Jar', price: 520, originalPrice: 620 }
    ],
    description: 'Traditional malt beverage with real crushed almonds, cardamom, and saffron.',
    origin: 'Tamil Nadu, India',
    shelfLife: '9 Months'
  },

  // SEEDS ITEMS
  {
    id: 'sd-01',
    name: 'Organic Black Chia Seeds',
    category: 'seeds-items',
    categoryName: 'SEEDS ITEMS',
    badge: 'Superfood',
    rating: 4.8,
    reviews: 140,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 180, originalPrice: 220 },
      { label: '500g', price: 330, originalPrice: 400 }
    ],
    description: 'Raw, unrefined organic Chia seeds. Packed with soluble fiber, calcium, protein.',
    origin: 'Madhya Pradesh, India',
    shelfLife: '12 Months'
  },
  {
    id: 'sd-02',
    name: 'Roasted & Lightly Salted Pumpkin Seeds',
    category: 'seeds-items',
    categoryName: 'SEEDS ITEMS',
    badge: 'Keto Friendly',
    rating: 4.9,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g', price: 260, originalPrice: 310 },
      { label: '500g', price: 490, originalPrice: 580 }
    ],
    description: 'Crispy green AAA-grade roasted pumpkin seeds.',
    origin: 'Rajasthan, India',
    shelfLife: '9 Months'
  },

  // HONEY
  {
    id: 'hn-01',
    name: 'Raw Unprocessed Forest Honey (Natural Apiary)',
    category: 'honey',
    categoryName: 'HONEY',
    badge: '100% Pure',
    rating: 4.9,
    reviews: 165,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '250g Bottle', price: 240, originalPrice: 290 },
      { label: '500g Bottle', price: 440, originalPrice: 520 },
      { label: '1 kg Bottle', price: 820, originalPrice: 980 }
    ],
    description: 'Direct wild forest honey harvested naturally without heat treatment or artificial syrups.',
    origin: 'Western Ghats, India',
    shelfLife: '24 Months'
  },

  // RICE & MILLET
  {
    id: 'rm-01',
    name: 'Organic Traditional Kodo & Little Millet',
    category: 'rice-millet',
    categoryName: 'RICE & MILLET',
    badge: 'Diabetic Friendly',
    rating: 4.7,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '1 kg Pack', price: 160, originalPrice: 190 },
      { label: '2 kg Pack', price: 300, originalPrice: 360 }
    ],
    description: 'Unpolished traditional millets rich in fiber, minerals, and low glycemic index.',
    origin: 'Karnataka, India',
    shelfLife: '12 Months'
  },

  // MASALA
  {
    id: 'ms-01',
    name: 'Handcrafted Heritage Royal Garam Masala',
    category: 'masala',
    categoryName: 'MASALA',
    badge: 'Chef Special',
    rating: 5.0,
    reviews: 195,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '100g Pouch', price: 150, originalPrice: 180 },
      { label: '250g Pouch', price: 340, originalPrice: 410 }
    ],
    description: 'Slow-roasted 16 whole spice blend. Intensely aromatic without chemical preservatives.',
    origin: 'Kerala, India',
    shelfLife: '12 Months'
  },

  // SOUP
  {
    id: 'sp-01',
    name: 'Nourishing Organic Herbal Soup Powder',
    category: 'soup',
    categoryName: 'SOUP',
    badge: 'Instant Healthy',
    rating: 4.8,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '150g Box', price: 190, originalPrice: 230 },
      { label: '300g Box', price: 360, originalPrice: 430 }
    ],
    description: 'Warm soothing herbal soup mix with pepper, coriander, and immunity boosting herbs.',
    origin: 'India',
    shelfLife: '9 Months'
  },

  // WEIGHT LOSS PRODUCT
  {
    id: 'wl-01',
    name: 'SlimFit Green Coffee & Herbal Detox Mix',
    category: 'weight-loss',
    categoryName: 'WEIGHT LOSS PRODUCT',
    badge: 'Fat Burner',
    rating: 4.9,
    reviews: 280,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    weights: [
      { label: '200g Pack', price: 390, originalPrice: 490 },
      { label: '400g Pack', price: 720, originalPrice: 890 }
    ],
    description: 'Natural weight loss formulation with Green Coffee Bean extract, Garcinia, and Chia seeds.',
    origin: 'India',
    shelfLife: '12 Months'
  }
];

export const STORE_WHATSAPP_NUMBER = '919876543210';
