import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Sparkles, 
  FileSpreadsheet, 
  Activity, 
  Pill, 
  CheckCircle2, 
  X, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { LanguageMode, DemoSampleScenario } from '../types/medical';
import { SAMPLE_SCENARIOS } from '../services/sampleData';
import { TRANSLATIONS } from '../utils/translations';

interface UploadZoneProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  onFileSelected: (file: File, base64: string, rawText?: string) => void;
  onSelectSampleScenario: (scenario: DemoSampleScenario) => void;
  isAnalyzing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  language,
  onLanguageChange,
  onFileSelected,
  onSelectSampleScenario,
  isAnalyzing,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [rawText, setRawText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'text'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFilePreview(result);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFilePreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      // Plain text
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setRawText(result);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (activeTab === 'upload' && selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onFileSelected(selectedFile, base64);
      };
      reader.readAsDataURL(selectedFile);
    } else if (activeTab === 'text' && rawText.trim()) {
      const fakeFile = new File([rawText], 'Patient_Pasted_Lab_Notes.txt', { type: 'text/plain' });
      onFileSelected(fakeFile, '', rawText);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setRawText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Multimodal AI Powered Health Literacy</span>
          <span className="text-slate-400">•</span>
          <span>UN SDG 3 Focus</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Transform Confusing Medical Documents into{' '}
          <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
            Clear, Actionable Insights
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Upload any medical lab report, prescription receipt, or chest X-ray. MediClear AI explains complex jargon, graphs your biomarkers, and equips you with smart questions for your doctor.
        </p>

        {/* Language Selection Bar */}
        <div className="mt-5 inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-600 px-2">Report Language:</span>
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === 'en'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('ur')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === 'ur'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            اردو / Roman Urdu
          </button>
        </div>
      </div>

      {/* Main Grid: Upload Box + Sample Scenarios Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Upload / Paste (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Tabs: File Upload vs Paste Text */}
          <div className="flex border-b border-slate-200 bg-slate-50/60 p-1.5 gap-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-teal-600" />
              <span>Upload PDF / Image File</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-teal-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-sky-600" />
              <span>Paste Report Text</span>
            </button>
          </div>

          <div className="p-5 sm:p-6">
            {activeTab === 'upload' ? (
              <div>
                {!selectedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragOver
                        ? 'border-teal-500 bg-teal-50/60 ring-4 ring-teal-500/10'
                        : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50/80'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/*"
                      onChange={handleFileInput}
                    />
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-xs">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">
                      {t.dragDropText}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                      {t.supportedFormats}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors">
                      <span>Choose File from Device</span>
                    </div>
                  </div>
                ) : (
                  <div className="border border-teal-200 bg-teal-50/40 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                          {selectedFile.type === 'application/pdf' ? (
                            <FileText className="w-5 h-5" />
                          ) : (
                            <ImageIcon className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Document'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={clearSelection}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Preview Thumbnail if image */}
                    {filePreview && selectedFile.type.startsWith('image/') && (
                      <div className="relative rounded-xl overflow-hidden max-h-48 border border-slate-200 mb-3 bg-slate-900/5 flex items-center justify-center">
                        <img
                          src={filePreview}
                          alt="Medical Document Preview"
                          className="max-h-48 object-contain"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={clearSelection}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200/60"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAnalyzeClick}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isAnalyzing ? 'Analyzing Document...' : 'Run Gemini AI Analysis'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Paste Raw Lab Values, Prescription Text, or Clinical Findings:
                </label>
                <textarea
                  rows={7}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Example: Total Cholesterol: 238 mg/dL, Triglycerides: 210 mg/dL, LDL: 154 mg/dL, Fasting Glucose: 112 mg/dL, HbA1c: 5.9%..."
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] text-slate-400">
                    Paste raw text directly for quick review
                  </span>
                  <button
                    onClick={handleAnalyzeClick}
                    disabled={!rawText.trim() || isAnalyzing}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Pasted Text</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Try With Sample Medical Data (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 via-teal-50/20 to-sky-50/30 rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Live Hackathon Demo Mode
            </span>
            <span className="text-[11px] font-medium text-slate-500">1-Click Evaluation</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-1">
            {t.samplesHeading}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {t.samplesSubheading}
          </p>

          {/* 3 Clickable Scenario Cards */}
          <div className="space-y-3">
            {SAMPLE_SCENARIOS.map((scenario) => {
              const isLab = scenario.documentType === 'Lab Report';
              const isXray = scenario.documentType === 'Medical Imaging / X-Ray';
              const isRx = scenario.documentType === 'Prescription / Receipt';

              return (
                <button
                  key={scenario.id}
                  onClick={() => onSelectSampleScenario(scenario)}
                  disabled={isAnalyzing}
                  className="w-full text-left p-3.5 rounded-xl bg-white hover:bg-teal-50/60 border border-slate-200 hover:border-teal-300 transition-all shadow-xs group flex items-start gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isLab
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : isXray
                        ? 'bg-sky-100 text-sky-700 border border-sky-200'
                        : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {isLab && <FileSpreadsheet className="w-5 h-5" />}
                    {isXray && <Activity className="w-5 h-5" />}
                    {isRx && <Pill className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                        {language === 'ur' ? scenario.titleUrdu : scenario.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                        {scenario.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {scenario.subtitle}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-teal-700">
                      <span>Load Scenario</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>Synthetic clinical cases</span>
            <span className="text-teal-600 font-medium">Bilingual Support Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
