import React from 'react';
import { AlertCircle } from 'lucide-react';

export const SampleDataBanner: React.FC = () => {
  return (
    <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-tight">
          <strong className="font-semibold text-amber-950">Sample / Illustrative Data:</strong> All trend scores, search volumes, and business counts are synthetic demo figures for the Kopargaon pilot. They demonstrate system logic and must not be interpreted as real Kopargaon municipal statistics or guaranteed business returns.
        </p>
      </div>
    </div>
  );
};
