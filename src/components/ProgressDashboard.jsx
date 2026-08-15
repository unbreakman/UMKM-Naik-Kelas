import { useState, useEffect } from 'react';

function loadProducts() {
  try {
    const raw = localStorage.getItem('umkm_products');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export default function ProgressDashboard({ current }) {
  const [products, setProducts] = useState(() => loadProducts());

  useEffect(() => {
    // keep in sync with localStorage changes from other tabs
    function onStorage(e) {
      if (e.key === 'umkm_products') setProducts(loadProducts());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function remove(id) {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    localStorage.setItem('umkm_products', JSON.stringify(next));
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border rounded-2xl p-6 text-center">
        <p className="font-body text-ink/60">Belum ada produk disimpan. Simpan dari halaman hasil AI.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-6">
      <h4 className="font-display font-bold text-xl mb-4">Progress Saya</h4>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="flex items-start justify-between">
            <div>
              <div className="font-body font-semibold">{p.namaProduk}</div>
              <div className="text-sm text-ink/60 mt-1">{p.deskripsi}</div>
              <div className="mt-2 text-leaf font-display font-bold">Rp{Number(p.hargaJual).toLocaleString('id-ID')}</div>
            </div>
            <div className="text-right">
              <button onClick={() => remove(p.id)} className="text-red-600 underline">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
