export const INITIAL_STORE_SETTINGS = {
  storeName: 'NUTS & SPICES',
  logoUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200',
  whatsappNumber: '919876543210',
  phone: '+91 98765 43210',
  email: 'orders@nutsandspices.store',
  address: '124, Gourmet Spice Market Road, T. Nagar, Chennai - 600017',
  deliveryCharge: 50,
  minOrderAmount: 500,
  instagram: 'https://instagram.com/nutsandspices',
  facebook: 'https://facebook.com/nutsandspices'
};

export const INITIAL_ORDERS = [
  {
    orderId: '1789792548000',
    customerName: 'Rakkammal',
    phone: '9876543210',
    email: 'rakkammal@gmail.com',
    address: 'Main Street',
    city: 'Kalingapatti',
    pincode: '627756',
    date: '19 Sept 2026',
    status: 'Pending',
    total: 3287,
    items: [
      { productId: 'vp-01', name: 'Viral Saffron Cardamom Wellness Elixir', weight: '500g Jar', price: 890, quantity: 2 },
      { productId: 'ndf-01', name: 'California Jumbo Almonds (Badam)', weight: '1 kg', price: 1507, quantity: 1 }
    ],
    notes: 'Urgent delivery requested.'
  },
  {
    orderId: 'NS10025',
    customerName: 'Ramesh Kumar',
    phone: '9876543210',
    email: 'ramesh.k@gmail.com',
    address: '45, North Usman Road, T. Nagar, Chennai - 600017',
    city: 'Chennai',
    pincode: '600017',
    date: '2026-09-18',
    status: 'NEW',
    total: 1447,
    items: [
      { productId: 'vp-01', name: 'Viral Saffron Cardamom Wellness Elixir', weight: '500g Jar', price: 890, quantity: 1 },
      { productId: 'ndf-01', name: 'California Jumbo Almonds (Badam)', weight: '250g', price: 340, quantity: 1 },
      { productId: 'sp-01', name: 'Nourishing Organic Herbal Soup Powder', weight: '150g Box', price: 190, quantity: 1 }
    ],
    notes: 'Please pack in gift wrap.'
  },
  {
    orderId: 'NS10024',
    customerName: 'Customer 2 (Priya Sharma)',
    phone: '9876543211',
    email: 'priya.s@yahoo.com',
    address: '12, 3rd Main Road, Anna Nagar, Chennai - 600040',
    city: 'Chennai',
    pincode: '600040',
    date: '2026-09-18',
    status: 'CONFIRMED',
    total: 899,
    items: [
      { productId: 'vp-01', name: 'Viral Saffron Cardamom Wellness Elixir', weight: '500g Jar', price: 890, quantity: 1 }
    ],
    notes: 'Leave at door step.'
  },
  {
    orderId: 'NS10023',
    customerName: 'Customer 3 (Anand Sundaram)',
    phone: '9876543212',
    email: 'anand.sun@gmail.com',
    address: '88, LB Road, Adyar, Chennai - 600020',
    city: 'Chennai',
    pincode: '600020',
    date: '2026-09-17',
    status: 'DELIVERED',
    total: 650,
    items: [
      { productId: 'ndf-01', name: 'California Jumbo Almonds (Badam)', weight: '500g', price: 650, quantity: 1 }
    ],
    notes: ''
  },
  {
    orderId: 'NS10022',
    customerName: 'Kavitha Swaminathan',
    phone: '9876543213',
    email: 'kavitha.s@hotmail.com',
    address: '22, Velachery Main Road, Chennai - 600042',
    city: 'Chennai',
    pincode: '600042',
    date: '2026-09-16',
    status: 'PREPARING',
    total: 1250,
    items: [
      { productId: 'dt-02', name: 'Premium Ajwa Al-Madinah Dates', weight: '500g', price: 1250, quantity: 1 }
    ],
    notes: 'Fast delivery requested'
  },
  {
    orderId: 'NS10021',
    customerName: 'Suresh Babu',
    phone: '9876543214',
    email: 'suresh.babu@gmail.com',
    address: '10, Mount Road, Guindy, Chennai - 600032',
    city: 'Chennai',
    pincode: '600032',
    date: '2026-09-15',
    status: 'OUT FOR DELIVERY',
    total: 1780,
    items: [
      { productId: 'ndf-02', name: 'W240 King Size Whole Cashews (Kaju)', weight: '1 kg', price: 1390, quantity: 1 },
      { productId: 'hn-01', name: 'Raw Unprocessed Forest Honey', weight: '250g Bottle', price: 240, quantity: 1 }
    ],
    notes: ''
  },
  {
    orderId: 'NS10012',
    customerName: 'Customer 1 (Ramesh Kumar)',
    phone: '9876543210',
    email: 'ramesh.k@gmail.com',
    address: '45, North Usman Road, T. Nagar, Chennai - 600017',
    city: 'Chennai',
    pincode: '600017',
    date: '2026-09-10',
    status: 'DELIVERED',
    total: 2100,
    items: [
      { productId: 'ndf-01', name: 'California Jumbo Almonds (Badam)', weight: '1 kg', price: 1250, quantity: 1 },
      { productId: 'hn-01', name: 'Raw Unprocessed Forest Honey', weight: '1 kg Bottle', price: 820, quantity: 1 }
    ],
    notes: ''
  },
  {
    orderId: 'NS10005',
    customerName: 'Customer 1 (Ramesh Kumar)',
    phone: '9876543210',
    email: 'ramesh.k@gmail.com',
    address: '45, North Usman Road, T. Nagar, Chennai - 600017',
    city: 'Chennai',
    pincode: '600017',
    date: '2026-08-28',
    status: 'DELIVERED',
    total: 980,
    items: [
      { productId: 'ndf-03', name: 'Afghan Sun-Dried Anjeer (Figs)', weight: '500g', price: 870, quantity: 1 }
    ],
    notes: ''
  }
];

export const INITIAL_OFFERS = [
  {
    id: 'off-01',
    name: '20% OFF – Premium Nuts',
    discountPercent: 20,
    applicableCategory: 'nuts-dry-fruits',
    applicableCategoryName: 'Nuts & Dry Fruits',
    minOrderAmount: 999,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    status: 'ACTIVE'
  },
  {
    id: 'off-02',
    name: '15% OFF – Royal Dates Harvest',
    discountPercent: 15,
    applicableCategory: 'dates',
    applicableCategoryName: 'Dates',
    minOrderAmount: 500,
    startDate: '2026-09-10',
    endDate: '2026-10-15',
    status: 'ACTIVE'
  },
  {
    id: 'off-03',
    name: 'Festive Gourmet Spice Combo 25% OFF',
    discountPercent: 25,
    applicableCategory: 'masala',
    applicableCategoryName: 'Masala & Spices',
    minOrderAmount: 750,
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    status: 'SCHEDULED'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    productName: 'Viral Saffron Cardamom Wellness Elixir',
    productId: 'vp-01',
    customerName: 'Meenakshi Iyer',
    rating: 5,
    comment: 'Extremely fresh and authentic saffron aroma! Drinking this every night with warm milk.',
    date: '2026-09-17',
    status: 'APPROVED'
  },
  {
    id: 'rev-02',
    productName: 'California Jumbo Almonds (Badam)',
    productId: 'ndf-01',
    customerName: 'Karthik Raja',
    rating: 5,
    comment: 'Super crunchy badam, uniform size. Very fast delivery via WhatsApp order!',
    date: '2026-09-16',
    status: 'APPROVED'
  },
  {
    id: 'rev-03',
    productName: 'Raw Unprocessed Forest Honey',
    productId: 'hn-01',
    customerName: 'Divya Narayanan',
    rating: 4,
    comment: 'Pure honey texture, crystallizes naturally in cool weather. Great taste.',
    date: '2026-09-15',
    status: 'PENDING'
  },
  {
    id: 'rev-04',
    productName: 'Handcrafted Heritage Royal Garam Masala',
    productId: 'ms-01',
    customerName: 'Sanjay Kumar',
    rating: 5,
    comment: 'Aroma is unbelievable! Very authentic South Indian blend.',
    date: '2026-09-14',
    status: 'APPROVED'
  }
];
