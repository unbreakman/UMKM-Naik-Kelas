import { useState, useEffect } from 'react';
import { getProductsFromDb, deleteProductFromDb } from '../lib/productsClient';

export default function ProgressDashboard({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsFromDb()
      .then(setProducts)
      .catch((err) => console.error('Gagal load produk:', err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  async function remove(id) {
    try {
      await deleteProductFromDb(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    }
  }

  if (loading) {
    return (
      <div className="bg-white border rounded-2xl p-6 text-center">
        <p className="font-body text-ink/60">Memuat data...</p>
      </div>
    );
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