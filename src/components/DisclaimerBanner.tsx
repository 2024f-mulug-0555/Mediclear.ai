import React from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { LanguageMode } from '../types/medical';
import { TRANSLATIONS } from '../utils/translations';

interface DisclaimerBannerProps {
  language: LanguageMode;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language, compact = false }) => {
  const t = TRANSLATIONS[language];

  if (compact) {
    return (
      <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-100/90 py-1.5 px-3 rounded-lg border border-slate-200">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="italic">
          {t.medicalDisclaimerBanner}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-50/70 to-teal-50/50 border-y sm:border sm:rounded-xl border-amber-200/80 p-3.5 sm:p-4 my-3 text-amber-950 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-start space-x-3">
        <div className="p-1.5 rounded-lg bg-amber-100/90 text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-amber-900 tracking-tight flex items-center gap-1.5">
              <span>Medical Safety & Compliance Notice</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-200/80 text-amber-900 border border-amber-300">
              Health Literacy & Patient Education Only
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-900 border border-teal-200 hidden md:inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              UN SDG 3 Compliance
            </span>
          </div>
          <p className="text-amber-900/90 leading-relaxed font-normal">
            <strong>Mandatory Medical Disclaimer:</strong> {t.medicalDisclaimerBanner} MediClear AI is strictly an educational tool to help patients understand medical terminology and prepare informed questions for their healthcare providers.
          </p>
        </div>
      </div>
    </div>
  );
};
