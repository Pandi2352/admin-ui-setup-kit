
import { useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'gu', label: 'Gujarati', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { code: 'ta', label: 'Tamil', flag: '🇮🇳' },
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Detect current language from cookie
    const getCookie = (name: string) => {
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    };
    const langCookie = getCookie('googtrans');
    if (langCookie) {
      // cookie format is usually /en/target or /auto/target
      const parts = langCookie.split('/');
      if (parts.length === 3) {
        setCurrentLang(parts[2]);
      }
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    // Set google translate cookie
    // standard format: /source_lang/target_lang
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`; // fallback for localhost

    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Reload to apply translation
    window.location.reload();
  };

  const selectedLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <span className="text-lg leading-none">{selectedLang.flag}</span>
        <span className="text-sm font-medium text-gray-700">{selectedLang.label}</span>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50",
                  currentLang === lang.code ? "text-indigo-600 bg-indigo-50/50 font-medium" : "text-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {currentLang === lang.code && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
