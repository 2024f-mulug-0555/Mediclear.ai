import React, { useState } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { UploadZone } from './components/UploadZone';
import { AnalysisProgress } from './components/AnalysisProgress';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PrintableReport } from './components/PrintableReport';
import { 
  AnalysisResult, 
  DemoSampleScenario, 
  LanguageMode 
} from './types/medical';
import { analyzeMedicalDocument } from './services/gemini';
import { TRANSLATIONS } from './utils/translations';
import { AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingFileName, setAnalyzingFileName] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const handleLanguageChange = (newLang: LanguageMode) => {
    setLanguage(newLang);
  };

  // Handle file analysis with Gemini multimodal API / smart clinical engine
  const handleFileSelected = async (file: File, base64: string, rawText?: string) => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setAnalyzingFileName(file.name);

    try {
      const result = await analyzeMedicalDocument({
        fileBase64: base64,
        mimeType: file.type || 'text/plain',
        rawText: rawText,
        fileName: file.name,
        language: language
      });

      setAnalysisResult(result);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#0284C7', '#10B981']
      });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(
        err?.message || 'Failed to process document. Please try again with a clear document.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle 1-click sample demo scenario for hackathon judges
  const handleSelectSampleScenario = (scenario: DemoSampleScenario) => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setAnalyzingFileName(scenario.mockFile.name);

    // Simulate real brief analysis loading UX (1.1s) for realistic hackathon presentation
    setTimeout(() => {
      setAnalysisResult(scenario.sampleResult);
      setIsAnalyzing(false);
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#0284C7', '#6366F1']
      });
    }, 1100);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setErrorMessage(null);
    setAnalyzingFileName('');
  };

  const handlePrintRequest = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Global Navigation Bar */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        hasResults={Boolean(analysisResult)}
        onReset={handleReset}
      />

      {/* 2. Medical Safety & Compliance Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full no-print">
        <DisclaimerBanner language={language} />

        {/* Global Error Alert */}
        {errorMessage && (
          <div className="my-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-950 mb-0.5">Analysis Notice</p>
                <p className="leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-500 hover:text-rose-800 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 no-print">
        {isAnalyzing ? (
          <AnalysisProgress language={language} fileName={analyzingFileName} />
        ) : analysisResult ? (
          <ResultsDashboard
            result={analysisResult}
            language={language}
            onPrintRequest={handlePrintRequest}
          />
        ) : (
          <UploadZone
            language={language}
            onLanguageChange={handleLanguageChange}
            onFileSelected={handleFileSelected}
            onSelectSampleScenario={handleSelectSampleScenario}
            isAnalyzing={isAnalyzing}
          />
        )}
      </main>

      {/* 4. Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">MediClear AI (SehatLens)</span>
            <span>•</span>
            <span className="text-teal-700 font-medium">UN SDG 3: AI for Accessible Healthcare & Well-Being</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Patient Health Literacy & Empowerment Initiative</span>
            <span>•</span>
            <span>Powered by Google Gemini 2.5 Flash</span>
            <span>•</span>
            <span className="text-slate-400">University AI Hackathon Edition</span>
          </div>
        </div>
      </footer>

      {/* Hidden Printable Handout Sheet (Triggered by window.print()) */}
      <PrintableReport result={analysisResult} />
    </div>
  );
}
