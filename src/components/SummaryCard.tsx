import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Activity, 
  Pill, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Eye,
  EyeOff,
  Image as ImageIcon
} from 'lucide-react';
import { AnalysisResult, LanguageMode } from '../types/medical';
import { TRANSLATIONS } from '../utils/translations';

interface SummaryCardProps {
  result: AnalysisResult;
  language: LanguageMode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ result, language }) => {
  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';
  const [showSourcePreview, setShowSourcePreview] = useState(false);

  const isLab = result.documentType === 'Lab Report';
  const isXray = result.documentType === 'Medical Imaging / X-Ray';
  const isRx = result.documentType === 'Prescription / Receipt';

  const bullets = isUrdu && result.plainLanguageSummaryUrdu && result.plainLanguageSummaryUrdu.length > 0
    ? result.plainLanguageSummaryUrdu
    : result.plainLanguageSummary;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
      {/* Top Header Strip */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-teal-200 shadow-inner">
            {isLab && <FileSpreadsheet className="w-5 h-5 text-teal-300" />}
            {isXray && <Activity className="w-5 h-5 text-sky-300" />}
            {isRx && <Pill className="w-5 h-5 text-purple-300" />}
            {!isLab && !isXray && !isRx && <FileText className="w-5 h-5 text-teal-300" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-teal-200">
                Identified Document Type
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white">
                {result.documentType}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
              {t.summaryTitle}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-teal-100">
          {(result.filePreviewUrl || result.rawTextPreview) && (
            <button
              onClick={() => setShowSourcePreview(!showSourcePreview)}
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 text-white font-semibold transition-colors"
            >
              {showSourcePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showSourcePreview ? 'Hide Original Document' : 'View Original Document'}</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
            <Clock className="w-3.5 h-3.5 text-teal-300" />
            <span>Analyzed: {result.analyzedAt}</span>
          </div>
          <span className="hidden md:inline-block text-teal-300/80">•</span>
          <span className="hidden md:inline-block font-mono text-xs opacity-90 truncate max-w-[200px]">
            {result.sourceFileName}
          </span>
        </div>
      </div>

      {/* Source Preview Drawer */}
      {showSourcePreview && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 sm:p-6 text-white animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ImageIcon className="w-4 h-4 text-teal-400" />
              <span>Original Input File: {result.sourceFileName}</span>
            </div>
            <button
              onClick={() => setShowSourcePreview(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close Preview
            </button>
          </div>

          {result.filePreviewUrl ? (
            <div className="max-h-96 flex items-center justify-center bg-black/40 rounded-xl overflow-hidden border border-slate-800 p-2">
              <img
                src={result.filePreviewUrl}
                alt="Source Medical Document"
                className="max-h-92 object-contain rounded-lg"
              />
            </div>
          ) : result.rawTextPreview ? (
            <pre className="max-h-60 overflow-y-auto text-xs font-mono bg-black/60 p-4 rounded-xl border border-slate-800 text-teal-300 whitespace-pre-wrap">
              {result.rawTextPreview}
            </pre>
          ) : null}
        </div>
      )}

      {/* Urgent Warning if out of range */}
      {result.urgentAttentionRequired && (
        <div className="bg-rose-50 border-b border-rose-200 p-4 flex items-start gap-3 text-rose-900">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">{t.urgentNotice}</span>
            <p className="mt-0.5 text-rose-800">
              {result.urgentReason || 'Certain biomarker parameters are significantly outside normal reference ranges. We strongly recommend scheduling a clinical appointment with your doctor soon.'}
            </p>
          </div>
        </div>
      )}

      {/* Patient Context Note */}
      {result.patientContext && (
        <div className="bg-slate-50/80 px-6 py-2.5 border-b border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
          <span className="font-semibold text-slate-700">Clinical Focus:</span>
          <span className="italic">{result.patientContext}</span>
        </div>
      )}

      {/* Plain Language Bullet Points */}
      <div className="p-6">
        <div className="space-y-3">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3.5 group">
              <div className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0 mt-0.5 text-teal-700 font-bold text-xs shadow-xs group-hover:bg-teal-600 group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal flex-1">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Health Literacy Guidance Note */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Health Literacy Translation • Plain Everyday Language</span>
          </div>
          <div className="flex items-center gap-1.5 text-teal-700 font-medium">
            <span>Scroll down for Interactive Visualizations & Doctor Questions</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
