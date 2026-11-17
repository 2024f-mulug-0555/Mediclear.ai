import React, { useState } from 'react';
import { 
  Stethoscope, 
  Printer, 
  Copy, 
  Check, 
  Plus, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ListChecks, 
  Lightbulb, 
  ExternalLink,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnalysisResult, DoctorQuestion, LanguageMode } from '../types/medical';
import { formatDoctorVisitSheetText } from '../utils/formatters';
import { TRANSLATIONS } from '../utils/translations';

interface DoctorPrepSheetProps {
  result: AnalysisResult;
  language: LanguageMode;
  onPrintRequest: () => void;
}

export const DoctorPrepSheet: React.FC<DoctorPrepSheetProps> = ({
  result,
  language,
  onPrintRequest,
}) => {
  const t = TRANSLATIONS[language];
  const isUrdu = language === 'ur';

  const [questions, setQuestions] = useState<DoctorQuestion[]>(
    result.questionsForDoctor || []
  );
  const [newQuestionText, setNewQuestionText] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleCheck = (id: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === id) {
          const updated = { ...q, checked: !q.checked };
          if (updated.checked) {
            confetti({
              particleCount: 25,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#0D9488', '#0284C7', '#10B981']
            });
          }
          return updated;
        }
        return q;
      })
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: DoctorQuestion = {
      id: `custom-q-${Date.now()}`,
      question: newQuestionText.trim(),
      reason: 'Personal question added by patient for consultation',
      checked: false
    };

    setQuestions(prev => [...prev, newQ]);
    setNewQuestionText('');
  };

  const handleCopy = () => {
    const updatedResult = { ...result, questionsForDoctor: questions };
    const text = formatDoctorVisitSheetText(updatedResult);
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0D9488', '#0284C7', '#6366F1']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const completedCount = questions.filter(q => q.checked).length;
  const lifestyleTips = isUrdu && result.nextStepsAndLifestyleUrdu && result.nextStepsAndLifestyleUrdu.length > 0
    ? result.nextStepsAndLifestyleUrdu
    : result.nextStepsAndLifestyle;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Left (8 cols): Doctor Visit Prep Checklist */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {t.questionsTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Personalized questions generated from your specific report values to ask your physician
            </p>
          </div>

          {/* Action Buttons: Copy & Print */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
              title="Copy formatted summary to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : t.copySheetBtn}</span>
            </button>

            <button
              onClick={onPrintRequest}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors shadow-xs"
              title="Print clean appointment handout"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printSheetBtn}</span>
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <ListChecks className="w-4 h-4 text-teal-600" />
            <span>Consultation Readiness:</span>
            <span className="font-bold text-slate-900">
              {completedCount} of {questions.length} questions reviewed
            </span>
          </div>
          <div className="w-24 sm:w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${questions.length ? (completedCount / questions.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Questions Checklist */}
        <div className="space-y-3 mb-5">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              onClick={() => toggleCheck(q.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                q.checked
                  ? 'bg-teal-50/60 border-teal-300 ring-1 ring-teal-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40'
              }`}
            >
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  checked={Boolean(q.checked)}
                  onChange={() => {}} // handled by parent onClick
                  className="w-4 h-4 text-teal-600 rounded-sm border-slate-300 focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <div className="flex-1">
                <p className={`text-xs sm:text-sm font-semibold leading-snug ${
                  q.checked ? 'text-teal-950 line-through opacity-85' : 'text-slate-900'
                }`}>
                  {isUrdu && q.questionUrdu ? q.questionUrdu : q.question}
                </p>
                {isUrdu && q.questionUrdu && (
                  <p className="text-[11px] text-slate-500 mt-0.5 italic">
                    {q.question}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{q.reason}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Custom Question Form */}
        <form onSubmit={handleAddQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="Add your own custom question for the doctor..."
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
          <button
            type="submit"
            disabled={!newQuestionText.trim()}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </button>
        </form>
      </div>

      {/* Right (4 cols): Safe Wellness & Next Steps */}
      <div className="lg:col-span-4 bg-gradient-to-br from-teal-50/40 via-sky-50/20 to-slate-50 rounded-2xl border border-teal-200/80 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-100 border border-teal-200 text-teal-700 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {t.lifestyleTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Safe, evidence-backed lifestyle and daily wellness suggestions while awaiting your clinical consultation
          </p>

          <div className="space-y-3">
            {lifestyleTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-teal-100 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-teal-200/60 text-[11px] text-slate-500">
          <p className="italic">
            <strong>Important:</strong> Lifestyle modifications support overall health but do not replace prescribed therapies or direct medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
