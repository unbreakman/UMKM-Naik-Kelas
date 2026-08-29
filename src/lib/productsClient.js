export async function saveProductToDb(product) {
  console.log('📡 Fetch POST /api/products dengan data:', product);
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  console.log('📡 Response status:', response.status);
  if (!response.ok) {
    const err = await response.text();
    console.error('📡 Error response:', err);
    throw new Error(`Gagal menyimpan: ${err}`);
  }
  return response.json();
}

export async function getProductsFromDb() {
  console.log('📡 Fetch GET /api/products');
  const response = await fetch('/api/products');
  console.log('📡 Response status:', response.status);
  if (!response.ok) throw new Error('Gagal mengambil data produk');
  const data = await response.json();
  console.log('📡 Produk yang diambil:', data);
  return data;
}

export async function deleteProductFromDb(id) {
  const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Gagal menghapus produk');
  return response.json();
}