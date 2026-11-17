import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  ChevronDown, 
  ChevronUp, 
  CornerDownLeft, 
  ShieldAlert,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { AnalysisResult, ChatMessage, LanguageMode } from '../types/medical';
import { askFollowUpQuestion } from '../services/gemini';
import { TRANSLATIONS } from '../utils/translations';

interface FollowUpChatProps {
  result: AnalysisResult;
  language: LanguageMode;
}

export const FollowUpChat: React.FC<FollowUpChatProps> = ({
  result,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: language === 'ur'
        ? `السلام علیکم! میں میڈی کلیئر اسسٹنٹ ہوں۔ میں نے آپ کی دستاویز (${result.sourceFileName}) کا جائزہ لے لیا ہے۔ آپ اس کے کسی بھی ٹیسٹ، دوا، یا پرہیز کے بارے میں بلا جھجھک سوال پوچھ سکتے ہیں۔`
        : `Hello! I am your MediClear Health Assistant. I have reviewed your ${result.documentType} (${result.sourceFileName}). Feel free to ask any follow-up questions about what these numbers mean, dietary advice, or preparing for your doctor visit.`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Dynamic suggested prompts based on document type
  const suggestedPrompts = result.documentType === 'Prescription / Receipt'
    ? [
        'Can I take Metformin on an empty stomach?',
        'Why was Atorvastatin prescribed for bedtime?',
        'Explain this prescription in Urdu (اردو میں بتائیں)'
      ]
    : result.documentType === 'Medical Imaging / X-Ray'
    ? [
        'What does a CTR of 54% mean in practical terms?',
        'Does clear lung fields mean no bronchitis?',
        'What questions should I ask about my heart silhouette?'
      ]
    : [
        'What foods should I avoid with high LDL & triglycerides?',
        'Is fasting blood glucose of 112 mg/dL reversible?',
        'What are the best exercises for pre-diabetes?'
      ];

  const handleSend = async (questionText?: string) => {
    const textToSend = (questionText || inputQuestion).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const answer = await askFollowUpQuestion(
        result,
        messages,
        textToSend,
        language
      );

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: `Error: ${err?.message || 'Unable to connect to Gemini API. Please verify your API key.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header Bar (Collapsible) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 sm:p-5 bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 text-white flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white">
                {t.chatAssistantTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/30">
                Grounded in Document
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Ask follow-up questions about this specific report, dietary adjustments, or medical terms
            </p>
          </div>
        </div>

        <button className="p-1 rounded-lg hover:bg-white/10 text-slate-300">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Chat Body */}
      {isOpen && (
        <div className="flex flex-col h-[420px]">
          {/* Scrollable Message List */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isAssistant
                        ? 'bg-white border border-slate-200 text-slate-800'
                        : 'bg-teal-600 text-white font-medium'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span
                      className={`block text-[10px] mt-1.5 text-right ${
                        isAssistant ? 'text-slate-400' : 'text-teal-200'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  <span>MediClear AI is reviewing document context...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[11px] font-semibold text-slate-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Suggestions:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 text-[11px] font-medium transition-colors shrink-0 shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder={t.chatPlaceholder}
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputQuestion.trim() || isLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                <span>{t.sendBtn}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Answers are grounded in this report for educational purposes only.</span>
              <span className="hidden sm:inline">Always confirm with your doctor.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
