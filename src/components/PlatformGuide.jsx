import { useState } from 'react';
import platformGuides from '../data/platformGuides';

export default function PlatformGuide({ defaultPlatform = 'Shopee' }) {
  const [platform, setPlatform] = useState(defaultPlatform);
  const guide = platformGuides[platform];
  const [checked, setChecked] = useState(() => guide.checklist.map(() => false));

  function toggle(idx) {
    setChecked((c) => {
      const next = [...c];
      next[idx] = !next[idx];
      return next;
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-2xl">{guide.title}</h3>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="border rounded px-3 py-2">
          {Object.keys(platformGuides).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <div>
          <p className="font-body font-semibold text-sm text-ink/60">Langkah</p>
          <ol className="list-decimal list-inside mt-2 space-y-2">
            {guide.steps.map((s, i) => (
              <li key={i} className="font-body text-ink">{s}</li>
            ))}
          </ol>
        </div>

        <div>
          <p className="font-body font-semibold text-sm text-ink/60">Checklist</p>
          <ul className="mt-2 space-y-2">
            {guide.checklist.map((c, i) => (
              <li key={i} className="flex items-center gap-3">
                <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
                <span className="font-body text-ink">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
