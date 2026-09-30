const fs = require('fs');
let data = fs.readFileSync('src/data/products.js', 'utf8');
if (!data.includes('featured-today')) {
  data = data.replace('export const CATEGORIES = [', 'export const CATEGORIES = [\n  {\n    "id": "featured-today",\n    "name": "Featured Today",\n    "icon": "⭐",\n    "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",\n    "isPremium": true\n  },');
  data = data.replace(/export const CATALOG_VERSION = '.*?';/, "export const CATALOG_VERSION = 'v12_user_original_images_feat';");
  fs.writeFileSync('src/data/products.js', data);
  console.log('Added featured-today to products.js');
} else {
  console.log('Already exists');
}
