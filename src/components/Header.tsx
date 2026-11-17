import React from 'react';
import { 
  HeartPulse, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { LanguageMode } from '../types/medical';
import { TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  hasResults: boolean;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  hasResults,
  onReset,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-sky-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 ring-2 ring-white">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-teal-700 via-teal-800 to-sky-900 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  SehatLens
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center: UN SDG 3 Pill */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{t.sdgGoalBadge}</span>
            <span className="text-emerald-600/70">| Health Literacy</span>
          </div>

          {/* Right Controls: Language, AI Engine Badge, Reset */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => onLanguageChange('en')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-teal-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                <span>English</span>
              </button>
              <button
                onClick={() => onLanguageChange('ur')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-md transition-all ${
                  language === 'ur'
                    ? 'bg-white text-teal-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Simple Urdu / Roman Urdu"
              >
                <span>اردو / Urdu</span>
              </button>
            </div>

            {/* AI Engine Status Badge (Clean, No Key Prompts) */}
            <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50 border border-teal-200 text-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Gemini 2.5 Flash</span>
            </div>

            {/* Reset / New Scan Button (when results are loaded) */}
            {hasResults && (
              <button
                onClick={onReset}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                title="Start a new analysis"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Document</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
