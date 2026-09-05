import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Mic,
  MicOff,
  SlidersHorizontal,
  Lightbulb,
  ArrowLeft,
  Briefcase,
  Wallet,
  Clock,
  Users,
  Compass,
  Flame,
  Search,
  GraduationCap,
  AlertCircle,
  X,
  RotateCcw,
  Languages,
} from 'lucide-react';
import { GeneratePlanInput } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface IdeaInputFormProps {
  onSubmit: (input: GeneratePlanInput) => void;
  isLoading: boolean;
  onSwitchToSkillMatcher?: () => void;
  onSwitchToTrendingSearch?: () => void;
  onSwitchToAcademicResearch?: () => void;
}

interface SamplePromptItem {
  textAr: string;
  textEn: string;
  type: 'business' | 'research';
}

const SAMPLE_PROMPTS: SamplePromptItem[] = [
  {
    textAr: 'متجر إلكتروني لاشتراكات القهوة المختصة مع بوكس شهري حسب ذوق العميل',
    textEn: 'E-commerce store for specialty coffee subscriptions with tailored monthly boxes',
    type: 'business',
  },
  {
    textAr: 'تطبيق لتنظيم بطولات البادل وحجز الملاعب وتحديات اللاعبين في الحي',
    textEn: 'Mobile app for organizing padel tournaments, court bookings, and player rankings',
    type: 'business',
  },
  {
    textAr: 'دراسة أثر تطبيقات الذكاء الاصطناعي على كفاءة التعليم العالي وسلاسل الإمداد',
    textEn: 'Academic research on the impact of generative AI on higher education efficiency',
    type: 'research',
  },
  {
    textAr: 'وكالة رقمية تقدم خدمات أتمتة خدمة العملاء بالذكاء الاصطناعي للمتاجر الصغيرة',
    textEn: 'Digital agency offering AI customer service automation for small e-commerce stores',
    type: 'business',
  },
  {
    textAr: 'بحث أكاديمي حول استراتيجيات التسعير النفسي وأثرها على ولاء المستهلك في المنصات الناشئة',
    textEn: 'Research study on psychological pricing strategies and consumer brand loyalty in startups',
    type: 'research',
  },
  {
    textAr: 'مشروع مطبخ سحابي يقدم وجبات صحية غنية بالبروتين للرياضيين وموظفي الشركات',
    textEn: 'Cloud kitchen venture delivering high-protein healthy meals for corporate employees',
    type: 'business',
  },
];

const INDUSTRIES = [
  'تجارة إلكترونية ومتاجر',
  'تطبيقات ومنصات تقنية',
  'خدمات وأعمال حرة',
  'أطعمة ومشروبات ومطابخ سحابية',
  'صحة ولياقة ورياضة',
  'تعليم وتدريب واستشارات',
  'صناعة محتوى وإعلام رقمي',
];

const BUDGET_LEVELS: ('منخفضة جداً / صفرية' | 'متوسطة' | 'مرتفعة / استثمارية')[] = [
  'منخفضة جداً / صفرية',
  'متوسطة',
  'مرتفعة / استثمارية',
];

const TIMEFRAMES: ('أسبوعين (إطلاق سريع)' | 'شهر إلى 3 أشهر' | '6 أشهر فأكثر')[] = [
  'أسبوعين (إطلاق سريع)',
  'شهر إلى 3 أشهر',
  '6 أشهر فأكثر',
];

const LOADING_STEPS = [
  'جاري تحليل فكرة المشروع واستخلاص القيمة التنافسية...',
  'توليد مراحل التنفيذ وجدول المهام العملية...',
  'ابتكار أفكار تسويقية غير تقليدية وخطافات إعلانية...',
  'حساب التكاليف ونموذج تحقيق الإيرادات...',
  'وضع اللمسات النهائية على خطة GSE AI الخاصة بك...',
];

export const IdeaInputForm: React.FC<IdeaInputFormProps> = ({
  onSubmit,
  isLoading,
  onSwitchToSkillMatcher,
  onSwitchToTrendingSearch,
  onSwitchToAcademicResearch,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [idea, setIdea] = useState('');
  const [field, setField] = useState('');
  const [budgetLevel, setBudgetLevel] = useState<'منخفضة جداً / صفرية' | 'متوسطة' | 'مرتفعة / استثمارية' | 'غير محدد'>('غير محدد');
  const [timeframe, setTimeframe] = useState<'أسبوعين (إطلاق سريع)' | 'شهر إلى 3 أشهر' | '6 أشهر فأكثر' | 'غير محدد'>('غير محدد');
  const [targetMarket, setTargetMarket] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Web Speech API State
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [speechLang, setSpeechLang] = useState<'ar-SA' | 'en-US'>(() => (isEn ? 'en-US' : 'ar-SA'));
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  // Rotating loading messages
  useEffect(() => {
    if (!isLoading) {
      setLoadingStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Check Web Speech API availability on mount
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Sync speech language when interface language changes
  useEffect(() => {
    setSpeechLang(isEn ? 'en-US' : 'ar-SA');
  }, [isEn]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Web Speech API Toggle & Event Handlers
  const handleToggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setSpeechError(
        isEn
          ? 'Speech recognition is not supported in this browser. Please type directly or use Chrome/Edge.'
          : 'التعرف الصوتي غير مدعوم في متصفحك الحالي. يمكنك كتابة الفكرة مباشرة أو استخدام متصفح حديث مثل Chrome أو Edge.'
      );
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn('Error stopping speech recognition:', e);
        }
      }
      setIsRecording(false);
      setInterimTranscript('');
      return;
    }

    setSpeechError(null);
    setInterimTranscript('');

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = speechLang;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let finalChunk = '';
        let currentInterim = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalChunk += transcript + ' ';
          } else {
            currentInterim += transcript;
          }
        }

        if (finalChunk.trim()) {
          setIdea((prev) => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${finalChunk.trim()}` : finalChunk.trim();
          });
        }

        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition warning:', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setSpeechError(
            isEn
              ? 'Microphone permission was denied. Please allow microphone access in your browser to dictate.'
              : 'تم رفض إذن الميكروفون في المتصفح. يرجى السماح بالوصول للميكروفون من إعدادات المتصفح.'
          );
          setIsRecording(false);
        } else if (event.error === 'no-speech') {
          // Continue listening without resetting
        } else if (event.error === 'network') {
          setSpeechError(
            isEn
              ? 'Network connection error with speech recognition service.'
              : 'حدث خطأ في الاتصال بشبكة خدمة التعرف على الصوت.'
          );
          setIsRecording(false);
        } else if (event.error !== 'aborted') {
          setSpeechError(
            isEn
              ? `Speech recognition issue: ${event.error}`
              : `تعذر التعرف الصوتي (${event.error})`
          );
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimTranscript('');
      };

      recognition.start();
    } catch (e: any) {
      console.warn('Failed to start speech recognition:', e);
      setIsRecording(false);
      setSpeechError(
        isEn
          ? 'Could not access microphone. Please check your browser permissions.'
          : 'تعذر تشغيل الميكروفون. يرجى التحقق من أذونات المتصفح.'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isLoading) return;

    onSubmit({
      idea: idea.trim(),
      field: field || undefined,
      budgetLevel: budgetLevel !== 'غير محدد' ? budgetLevel : undefined,
      timeframe: timeframe !== 'غير محدد' ? timeframe : undefined,
      targetMarket: targetMarket.trim() || undefined,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {onSwitchToAcademicResearch && (
        <div className="mb-4 p-3 sm:p-3.5 bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-blue-900/10 border border-blue-300/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 text-center sm:text-right">
            <span className="p-1.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-2xs">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div>
              <strong className="font-extrabold text-blue-950">قسم الدراسات والأبحاث العلمية: </strong>
              <span className="text-slate-600">صياغة وتوليد أبحاث أكاديمية، فرضيات، متغيرات إجرائية، ومراجع APA 7th لأطروحات التخرج والماجستير والدكتوراه.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onSwitchToAcademicResearch}
            className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shrink-0 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ابدأ بحثاً أو دراسة علمية 🎓</span>
          </button>
        </div>
      )}

      {onSwitchToTrendingSearch && (
        <div className="mb-4 p-3 sm:p-3.5 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 border border-amber-300/70 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 text-center sm:text-right">
            <span className="p-1.5 rounded-xl bg-amber-500 text-white shrink-0 shadow-2xs">
              <Flame className="w-4 h-4" />
            </span>
            <div>
              <strong className="font-extrabold text-amber-950">تصفح كل ما يبحث عنه المستخدمون: </strong>
              <span className="text-slate-600">أكثر المشاريع ربحاً، المباحث الدراسية، وحلول المشكلات الأكثر طلباً في مركز بحث موحد.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onSwitchToTrendingSearch}
            className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shrink-0 shadow-xs flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>مركز البحث والاكتشاف 🔥</span>
          </button>
        </div>
      )}

      {onSwitchToSkillMatcher && (
        <div className="mb-6 p-3.5 sm:p-4 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 text-center sm:text-right">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 shadow-xs">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <strong className="font-extrabold text-emerald-950">لا تملك فكرة حتى الآن؟ </strong>
              <span className="text-slate-600">دع الذكاء الاصطناعي يقترح عليك أفضل مشروع يناسب مهاراتك وميزانيتك المتاحة.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onSwitchToSkillMatcher}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shrink-0 shadow-xs hover:shadow-md flex items-center justify-center gap-1.5"
          >
            <span>اقترح لي مشروعاً يناسبني</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>الذكاء الاصطناعي لتحويل الأفكار إلى مشاريع قائمة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          حوّل فكرتك إلى <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">خطة مشروع حقيقية</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          اكتب فكرتك بأي أسلوب، وسيقوم <span className="font-bold text-slate-800">GSE AI</span> بصياغة خطة عمل مبسطة، خطوات تنفيذ مرحلية، وأفكار تسويقية مبتكرة لتبدأ اليوم.
        </p>
      </div>

      {/* Main Input Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-100 overflow-hidden">
        <div className="p-5 sm:p-7">
          {/* Header with Title and Speech Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
            <div>
              <label htmlFor="idea-input" className="block text-sm font-bold text-slate-800">
                {isEn ? 'What is your business idea or research query?' : 'ما هي فكرة مشروعك أو استفسارك البحثي؟'}
              </label>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isEn
                  ? 'Type your query or use voice dictation directly via the Web Speech API.'
                  : 'يمكنك كتابة فكرتك أو إملاؤها صوتياً مباشرة عبر تقنية التعرف الصوتي الذكية.'}
              </p>
            </div>

            {/* Speech and Text Controls Bar */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
              {/* Dictation Language Selector */}
              <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/80 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (isRecording) handleToggleVoice();
                    setSpeechLang('ar-SA');
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    speechLang === 'ar-SA'
                      ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="الإملاء الصوتي باللغة العربية"
                >
                  عربي
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isRecording) handleToggleVoice();
                    setSpeechLang('en-US');
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                    speechLang === 'en-US'
                      ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Voice dictation in English"
                >
                  EN
                </button>
              </div>

              {/* Clear Text button */}
              {idea.trim().length > 0 && !isLoading && (
                <button
                  type="button"
                  onClick={() => {
                    setIdea('');
                    setInterimTranscript('');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                  title={isEn ? 'Clear text' : 'مسح النص'}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isEn ? 'Clear' : 'مسح'}</span>
                </button>
              )}

              {/* Web Speech Dictation Toggle Button */}
              <button
                type="button"
                id="btn-voice-dictation"
                role="button"
                aria-pressed={isRecording}
                aria-label={
                  isRecording
                    ? (isEn ? 'Stop voice dictation' : 'إيقاف الإملاء الصوتي')
                    : (isEn ? 'Start voice dictation' : 'بدء الإملاء الصوتي لفكرتك')
                }
                onClick={handleToggleVoice}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-200 animate-pulse'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 hover:border-indigo-300'
                }`}
              >
                {isRecording ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Listening... Click to Stop' : 'جاري الاستماع... اضغط للإيقاف'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isEn ? 'Dictate with Voice' : 'إملاء صوتي مباشر'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Speech Error Banner (No blocking window.alert) */}
          {speechError && (
            <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start justify-between gap-2 animate-fadeIn">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{isEn ? 'Voice Dictation Notice' : 'تنبيه التعرف الصوتي'}</p>
                  <p className="text-amber-800 text-[11px] mt-0.5">{speechError}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSpeechError(null)}
                className="p-1 hover:bg-amber-100 text-amber-600 rounded-md transition-colors cursor-pointer"
                title={isEn ? 'Dismiss' : 'إغلاق'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Live Recording Equalizer & Interim Transcript Bar */}
          {isRecording && (
            <div className="mb-2.5 p-2.5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-xl shadow-inner border border-indigo-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5">
                {/* Visual Audio Waveform Equalizer */}
                <div className="flex items-end gap-0.5 h-4 px-1">
                  <span className="w-1 bg-rose-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3"></span>
                  <span className="w-1 bg-amber-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.1s] h-4"></span>
                  <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.2s] h-2.5"></span>
                  <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.3s] h-3.5"></span>
                </div>
                <div className="text-[11px] text-slate-200">
                  <span className="font-bold text-white">
                    {isEn ? 'Dictating in English' : 'الإملاء الصوتي بالعربية'}:
                  </span>{' '}
                  <span className="text-slate-300">
                    {interimTranscript ? (
                      <span className="text-amber-300 font-semibold italic">"{interimTranscript}"</span>
                    ) : (
                      isEn ? 'Speak clearly into your microphone...' : 'تحدث بوضوح، وسيتم تدوين كلامك فوراً...'
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400">
                  {speechLang === 'ar-SA' ? 'ar-SA' : 'en-US'}
                </span>
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {isEn ? 'Done' : 'تم / إيقاف'}
                </button>
              </div>
            </div>
          )}

          {/* Textarea */}
          <div className="relative">
            <textarea
              id="idea-input"
              ref={textareaRef}
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isLoading}
              placeholder={
                isEn
                  ? "Example: I want to launch an on-demand specialty coffee subscription service with personalized monthly boxes, direct farm sourcing, and automated customer reorders..."
                  : "مثال: أريد تأسيس متجر إلكتروني لاشتراكات القهوة المختصة مع بوكس شهري، أو بحث علمي عن أثر الذكاء الاصطناعي في إدارة الأعمال..."
              }
              className={`w-full px-4 py-3.5 text-sm sm:text-base bg-slate-50/70 hover:bg-slate-50 focus:bg-white border rounded-xl outline-none transition-all resize-y text-slate-800 placeholder:text-slate-400 ${
                isRecording
                  ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100'
              }`}
            />
            {/* Live screen reader announcement */}
            <span className="sr-only" aria-live="polite">
              {isRecording ? 'Voice dictation is listening' : 'Voice dictation is idle'}
            </span>
          </div>

          {/* Sample Ideas & Research Queries Carousel / Chips */}
          <div className="mt-3">
            <div className="flex items-center justify-between gap-1.5 text-xs text-slate-500 mb-2">
              <div className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-slate-700">
                  {isEn ? 'Or try one of these suggested ideas & research topics:' : 'أو جرّب أحد هذه النماذج الجاهزة للأفكار والمسائل البحثية:'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {isEn ? 'Click to fill' : 'انقر للتعبئة الفورية'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((sample, idx) => {
                const sampleText = isEn ? sample.textEn : sample.textAr;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIdea(sampleText);
                      textareaRef.current?.focus();
                    }}
                    disabled={isLoading}
                    className="text-xs bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/80 transition-all text-right flex items-center gap-1.5 cursor-pointer"
                  >
                    {sample.type === 'research' ? (
                      <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">
                        {isEn ? 'Research' : 'بحث'}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">
                        {isEn ? 'Business' : 'مشروع'}
                      </span>
                    )}
                    <span>{sampleText.length > 55 ? `${sampleText.substring(0, 55)}...` : sampleText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              type="button"
              id="btn-toggle-advanced"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
              <span>{showAdvanced ? 'إخفاء التخصيصات الإضافية' : 'تخصيص الخطة (المجال، الميزانية، الإطار الزمني)'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 animate-fadeIn">
                {/* Industry */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    <span>مجال المشروع</span>
                  </label>
                  <select
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="">تلقائي (الذكاء الاصطناعي يحدد الأنسب)</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1.5">
                    <Wallet className="w-3.5 h-3.5 text-slate-500" />
                    <span>الميزانية المتاحة</span>
                  </label>
                  <select
                    value={budgetLevel}
                    onChange={(e) => setBudgetLevel(e.target.value as any)}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="غير محدد">مرنة / تلقائي</option>
                    {BUDGET_LEVELS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>المدة المستهدفة للبدء</span>
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="غير محدد">تلقائي حسب متطلبات المشروع</option>
                    {TIMEFRAMES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Market */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>الجمهور أو السوق المفضل (اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={targetMarket}
                    onChange={(e) => setTargetMarket(e.target.value)}
                    placeholder="مثلاً: طلاب الجامعات، أصحاب المشاريع الناشئة..."
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button & Loading Indicator */}
        <div className="px-5 py-4 bg-slate-50/90 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
            <span>نظام الذكاء الاصطناعي GSE AI مفعّل وجاهز للمعالجة الفورية</span>
          </div>

          <button
            type="submit"
            id="btn-generate-plan"
            disabled={!idea.trim() || isLoading}
            className={`w-full sm:w-auto min-w-[210px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
              !idea.trim() || isLoading
                ? 'bg-slate-300 cursor-not-allowed opacity-70'
                : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>جاري بناء الخطة...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>تحويل الفكرة إلى خطة عمل</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Dynamic Loading Overlay / Banner */}
      {isLoading && (
        <div className="mt-6 p-5 bg-indigo-50/80 border border-indigo-100 rounded-2xl text-center shadow-xs animate-pulse">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white mb-3">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-indigo-900 mb-1">
            {LOADING_STEPS[loadingStepIndex]}
          </h3>
          <p className="text-xs text-indigo-700/80">
            نقوم بصياغة نموذج العمل، خطوات التنفيذ المباشرة، والأفكار التسويقية الخاصة بمشروعك
          </p>
        </div>
      )}
    </div>
  );
};
