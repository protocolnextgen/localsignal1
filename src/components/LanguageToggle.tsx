import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-xs font-semibold">
      {!compact && <Globe className="w-3.5 h-3.5 text-neutral-500 ml-1.5 mr-1 shrink-0" />}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-white text-neutral-900 shadow-xs font-bold'
            : 'text-neutral-600 hover:text-neutral-900'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
      <span className="text-neutral-300 select-none">|</span>
      <button
        type="button"
        onClick={() => setLanguage('mr')}
        className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
          language === 'mr'
            ? 'bg-rose-600 text-white shadow-xs font-bold'
            : 'text-neutral-600 hover:text-neutral-900'
        }`}
        aria-label="मराठी भाषेवर बदला"
      >
        मराठी
      </button>
    </div>
  );
};
