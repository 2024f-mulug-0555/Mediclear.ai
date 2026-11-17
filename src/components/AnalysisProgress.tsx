import React, { useEffect, useState } from 'react';
import { Sparkles, ScanLine, Database, BookOpenCheck, Layers, CheckCircle2 } from 'lucide-react';
import { LanguageMode } from '../types/medical';
import { TRANSLATIONS } from '../utils/translations';

interface AnalysisProgressProps {
  language: LanguageMode;
  fileName?: string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ language, fileName }) => {
  const t = TRANSLATIONS[language];
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { num: 1, label: t.step1, icon: ScanLine },
    { num: 2, label: t.step2, icon: Database },
    { num: 3, label: t.step3, icon: BookOpenCheck },
    { num: 4, label: t.step4, icon: Layers }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(2), 1200);
    const timer2 = setTimeout(() => setActiveStep(3), 2600);
    const timer3 = setTimeout(() => setActiveStep(4), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl border border-teal-200/80 p-8 shadow-lg shadow-teal-500/5 text-center">
      {/* Animated glowing loader */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-2xl bg-teal-500/20 animate-ping" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
          <Sparkles className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
        {t.analyzingDocument}
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
        {fileName ? `Analyzing "${fileName}"` : t.analyzingSubtitle}
      </p>

      {/* Progress Steps */}
      <div className="space-y-3 text-left max-w-lg mx-auto">
        {steps.map((s) => {
          const Icon = s.icon;
          const isDone = activeStep > s.num;
          const isCurrent = activeStep === s.num;

          return (
            <div
              key={s.num}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                  : isCurrent
                  ? 'bg-teal-50/90 border-teal-300 text-teal-900 ring-2 ring-teal-500/10'
                  : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-teal-600 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs font-semibold flex-1">
                {s.label}
              </span>
              {isCurrent && (
                <span className="text-[10px] uppercase tracking-wider font-bold text-teal-600 animate-pulse">
                  Working...
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span>Google Gemini Multimodal AI</span>
        <span>•</span>
        <span>Strict Clinical Literacy Framework</span>
      </div>
    </div>
  );
};
