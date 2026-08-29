import { useState } from 'react';
import Landing from './components/Landing';
import UploadForm from './components/UploadForm';
import ResultPage from './components/ResultPage';
import PlatformGuide from './components/PlatformGuide';
import ProgressDashboard from './components/ProgressDashboard';
import { saveProductToDb } from './lib/productsClient';

function App() {
  const [step, setStep] = useState('landing');
  const [productData, setProductData] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="min-h-screen bg-paper">
      {step === 'landing' && (
        <Landing onStart={() => setStep('upload')} />
      )}
      {step === 'upload' && (
        <UploadForm onSubmit={(data) => { setProductData(data); setStep('result'); }} />
      )}
      {step === 'result' && (
        <ResultPage
          productData={productData}
          onBack={() => setStep('upload')}
          onNext={(result) => { setAiResult(result); setStep('guide'); }}
        />
      )}
      {step === 'guide' && (
        <div className="p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border rounded-2xl p-6">
              <h2 className="font-display font-bold text-2xl">Panduan Setup Toko</h2>
              <p className="font-body text-ink/60 mt-2">Berikut panduan langkah demi langkah. Simpan produk yang berhasil di-generate agar masuk ke Dashboard.</p>

              <div className="mt-4">
                <button
                  onClick={async () => {
                    if (!aiResult) return alert('Belum ada hasil AI untuk disimpan');
                    try {
                      console.log('💾 Menyimpan produk:', { namaProduk: productData?.namaProduk, ...aiResult });
                      const response = await saveProductToDb({
                        namaProduk: productData?.namaProduk || 'Produk',
                        deskripsi: aiResult.deskripsi,
                        hargaJual: aiResult.hargaJual,
                        alasanHarga: aiResult.alasanHarga,
                        tagline: aiResult.tagline,
                      });
                      console.log('✅ Produk berhasil disimpan:', response);
                      setRefreshTrigger((t) => t + 1);
                      alert('Produk disimpan ke Dashboard');
                    } catch (err) {
                      console.error('❌ Error saat simpan:', err);
                      alert('Gagal menyimpan: ' + err.message);
                    }
                  }}
                  className="bg-ink text-paper px-4 py-2 rounded"
                >
                  Simpan Produk ke Dashboard
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PlatformGuide />
              <ProgressDashboard refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;