export async function saveProductToDb(product) {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gagal menyimpan: ${err}`);
  }
  return response.json();
}

export async function getProductsFromDb() {
  const response = await fetch('/api/products');
  if (!response.ok) throw new Error('Gagal mengambil data produk');
  return response.json();
}

export async function deleteProductFromDb(id) {
  const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Gagal menghapus produk');
  return response.json();
}