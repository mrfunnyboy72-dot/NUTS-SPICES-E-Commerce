// NUTS & SPICES - REAL-TIME CLOUD DB PERSISTENCE MODULE
// Syncs Admin edits (Products, Categories, Offers) across all devices globally

function getApiCatalogUrl() {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}/api/catalog`;
  }
  return '/api/catalog';
}

export async function fetchCloudCatalog() {
  try {
    const primaryUrl = getApiCatalogUrl();
    const res = await fetch(primaryUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0 && Array.isArray(data.categories) && data.categories.length > 0) {
        return { products: data.products, categories: data.categories };
      }
    }
  } catch (err) {
    console.log('Primary /api/catalog GET fallback');
  }

  return null;
}

export async function saveCloudCatalog(products, categories) {
  try {
    const payload = { products, categories, updatedAt: new Date().toISOString() };
    const primaryUrl = getApiCatalogUrl();
    
    // 1. Save to primary Vercel API endpoint
    fetch(primaryUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});

    // 2. Save to local node server if running on localhost
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      fetch('http://localhost:5000/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    }

    return true;
  } catch (err) {
    console.error('Cloud save failed:', err);
    return false;
  }
}
