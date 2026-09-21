// NUTS & SPICES - REAL-TIME CLOUD DB PERSISTENCE MODULE
// Syncs Admin edits (Products, Categories, Offers) across all devices globally

const CLOUD_STORAGE_KEY = 'nuts_spices_master_catalog_v1';
const FREE_CLOUD_API_URL = 'https://api.jsonbin.io/v3/b/65f4422f2b032d401a88b50f'; // Cloud Bin Backup Endpoint
const UPSTASH_KV_URL = 'https://nuts-spices-catalog-sync.deno.dev/api/catalog'; // Edge Deno Cloud Endpoint

export async function fetchCloudCatalog() {
  try {
    const res = await fetch(UPSTASH_KV_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && Array.isArray(data.categories)) {
        return { products: data.products, categories: data.categories };
      }
    }
  } catch (err) {
    console.log('Cloud DB GET fallback to default bundle');
  }
  return null;
}

export async function saveCloudCatalog(products, categories) {
  try {
    const payload = { products, categories, updatedAt: new Date().toISOString() };
    
    // Save to Edge Cloud Endpoint for All Devices
    fetch(UPSTASH_KV_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});

    // Save to local backend node server if active
    fetch('http://localhost:5000/api/admin/sync-git', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products, categories })
    }).catch(() => {});

    return true;
  } catch (err) {
    console.error('Cloud save failed:', err);
    return false;
  }
}
