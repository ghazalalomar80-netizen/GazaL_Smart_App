import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { GeneratePlanInput } from '../types';

interface IdeaInputFormProps {
  onSubmit: (input: GeneratePlanInput) => void;
  isLoading: boolean;
  onSwitchToSkillMatcher?: () => void;
}

const SAMPLE_IDEAS = [
  'متجر إلكتروني لاشتراكات القهوة المختصة مع بوكس شهري حسب ذوق العميل',
  'تطبيق لتنظيم بطولات البادل وحجز الملاعب وتحديات اللاعبين في الحي',
  'وكالة رقمية تقدم خدمات أتمتة خدمة العملاء بالذكاء الاصطناعي للمتاجر الصغيرة',
  'منصة تفاعلية لربط أصحاب المهارات اليدوية والحرفية بالعملاء والشركات',
  'مشروع مطبخ سحابي يقدم وجبات صحية غنية بالبروتين للرياضيين وموظفي الشركات',
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
}) => {
  const [idea, setIdea] = useState('');
  const [field, setField] = useState('');
  const [budgetLevel, setBudgetLevel] = useState<'منخفضة جداً / صفرية' | 'متوسطة' | 'مرتفعة / استثمارية' | 'غير محدد'>('غير محدد');
  const [timeframe, setTimeframe] = useState<'أسبوعين (إطلاق سريع)' | 'شهر إلى 3 أشهر' | '6 أشهر فأكثر' | 'غير محدد'>('غير محدد');
  const [targetMarket, setTargetMarket] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
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

  // Voice recording handler
  const handleToggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('ميزة التعرف الصوتي غير مدعومة في متصفحك الحالي. يمكنك كتابة الفكرة مباشرة.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIdea((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
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
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="idea-input" className="block text-sm font-bold text-slate-800">
              ما هي فكرة مشروعك؟
            </label>
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isRecording
                  ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-3.5 h-3.5" />
                  <span>جاري الاستماع... اضغط للإيقاف</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-slate-600" />
                  <span>إملاء صوتي</span>
                </>
              )}
            </button>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              id="idea-input"
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isLoading}
              placeholder="مثال: بدي اعمل مشروع تطبيق لخدمة توصيل الطلبات الخاصة بين المدن، مع تتبع مباشر وتوفير أسعار اقتصادية للطرود العاجلة..."
              className="w-full px-4 py-3.5 text-sm sm:text-base bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-300 focus:border-indigo-500 rounded-xl outline-none transition-all resize-y text-slate-800 placeholder:text-slate-400 focus:ring-3 focus:ring-indigo-100"
            />
          </div>

          {/* Sample Ideas Carousel / Chips */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>أو جرّب إحدى هذه الأفكار الملهمة بنقرة واحدة:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_IDEAS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIdea(sample)}
                  disabled={isLoading}
                  className="text-xs bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/80 transition-all text-right"
                >
                  {sample.length > 55 ? `${sample.substring(0, 55)}...` : sample}
                </button>
              ))}
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
