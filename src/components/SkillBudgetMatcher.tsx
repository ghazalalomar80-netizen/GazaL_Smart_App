import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Award,
  Wallet,
  Clock,
  Check,
  ArrowLeft,
  Flame,
  CheckCircle2,
  HelpCircle,
  Zap,
  Coins,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { ProjectSuggestion, SkillBudgetInput } from '../types';

interface SkillBudgetMatcherProps {
  onSelectSuggestionForFullPlan: (suggestionText: string, category?: string, budgetLevel?: any) => void;
}

const COMMON_SKILLS = [
  'التصميم والجرافيك',
  'صناعة وتعديل الفيديو (مونتاج)',
  'التسويق الرقمي والسوشيال ميديا',
  'الكتابة وصناعة المحتوى',
  'البرمجة وبناء المواقع',
  'الطبخ وصنع المأكولات والمشروبات',
  'الحرف والمنتجات اليدوية',
  'التدريس والشرح وتقديم الاستشارات',
  'المبيعات وخدمة العملاء',
  'التصوير الفوتوغرافي',
  'إدارة المشاريع والتنظيم',
  'اللياقة البدنية والصحة',
];

const BUDGET_OPTIONS = [
  { label: 'صفر ريال (بدون رأس مال إطلاقاً)', value: 'صفر ريال / بدون رأس مال' },
  { label: 'منخفضة جداً (100 - 500 ريال / حتى 150$)', value: '100 إلى 500 ريال' },
  { label: 'متوسطة (1,000 - 3,000 ريال / حتى 800$)', value: '1,000 إلى 3,000 ريال' },
  { label: 'استثمارية (5,000+ ريال فأكثر)', value: '5,000 ريال فأكثر' },
];

const TIME_OPTIONS = [
  'أقل من 10 ساعات أسبوعياً (عمل جانبي)',
  '10 إلى 20 ساعة أسبوعياً (دوام جزئي)',
  'تفرغ كامل (أكثر من 30 ساعة أسبوعياً)',
];

export const SkillBudgetMatcher: React.FC<SkillBudgetMatcherProps> = ({
  onSelectSuggestionForFullPlan,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0].value);
  const [availableTime, setAvailableTime] = useState(TIME_OPTIONS[1]);
  const [interests, setInterests] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleDiscover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0 && !customSkill.trim() && !interests.trim()) {
      setErrorMessage('يرجى اختيار مهارة واحدة على الأقل أو كتابة نبذة عن خبراتك.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const payload: SkillBudgetInput = {
      skills: selectedSkills,
      customSkillText: customSkill.trim() || undefined,
      budgetAmount: budget,
      availableHoursPerWeek: availableTime,
      interests: interests.trim() || undefined,
    };

    try {
      const res = await fetch('/api/suggest-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'تعذر اقتراح المشاريع');
      }

      const data: ProjectSuggestion[] = await res.json();
      setSuggestions(data);
      // scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('suggestions-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'حدث خطأ أثناء اقتراح المشاريع.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Intro Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-3 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>مستكشف المشاريع المخصصة الذكي</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          لا تملك فكرة بعد؟ <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">دعنا نجد المشروع الأنسب لك</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          حدد مهاراتك وميزانيتك والوقت المتاح لديك، وسيقوم محرك GSE AI باقتراح أفضل المشاريع الواقعية ذات العائد المرتفع مع خطوات بدء واضحة.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleDiscover} className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
        {/* Step 1: Skills */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>1. ما هي المهارات أو الخبرات التي تتقنها أو تفضلها؟</span>
            </span>
            <span className="text-xs font-normal text-slate-400">اختر واحدة أو أكثر</span>
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {COMMON_SKILLS.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>

          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            placeholder="أو اكتب مهارات أخرى محددة (مثلاً: استخدام كانفا، خبرة في المحاسبة وإكسيل، تنسيق الحفلات...)"
            className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Step 2: Budget */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>2. ما هي الميزانية المتاحة لديك للبدء؟</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BUDGET_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  budget === opt.value
                    ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 font-semibold ring-1 ring-emerald-400'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={opt.value}
                  checked={budget === opt.value}
                  onChange={(e) => setBudget(e.target.value)}
                  className="accent-emerald-600"
                />
                <span className="text-xs sm:text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 3: Time & Interests */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>3. الوقت المتوفر لديك أسبوعياً</span>
            </label>
            <select
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-emerald-500 outline-none"
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>مجالات تثير اهتمامك أو شغفك (اختياري)</span>
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="مثلاً: التجارة الإلكترونية، الرياضة، التعليم، الألعاب..."
              className="w-full text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            id="btn-discover-projects"
            disabled={isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
              isLoading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-200 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>جاري تحليل المهارات واقتراح أفضل المشاريع...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>اقترح لي أفضل المشاريع الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {suggestions && (
        <div id="suggestions-results" className="space-y-6 pt-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-emerald-600" />
                <span>المشاريع الأنسب لإمكانياتك وميزانيتك</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                تم ترتيبها وتخصيصها بناءً على المهارات والميزانية التي حددتها
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
              {suggestions.length} مشاريع مقترحة
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {suggestions.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-7 hover:border-emerald-300 transition-all space-y-5 relative overflow-hidden"
              >
                {/* Top Badge and Score */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      <span>نسبة التوافق {proj.matchScore}%</span>
                    </span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {proj.category}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                    الصعوبة: <strong>{proj.difficulty}</strong>
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {proj.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {proj.fullIdeaDescription}
                  </p>
                </div>

                {/* Why it matches */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/60 to-teal-50/40 border border-emerald-100 text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-emerald-950 block mb-0.5">
                    لماذا يناسبك هذا المشروع تحديداً:
                  </span>
                  <span>{proj.whyMatch}</span>
                </div>

                {/* Budget & Timeline row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-0.5">الميزانية المقترحة:</span>
                    <span className="text-slate-900 font-semibold">{proj.requiredBudget}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700 block mb-0.5">زمن أول دخل متوقع:</span>
                    <span className="text-emerald-700 font-semibold">{proj.expectedProfitTimeline}</span>
                  </div>
                </div>

                {/* How to Profit / Monetization Section */}
                {(proj.howToProfit || proj.pricingModel) && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/5 border-2 border-emerald-200/90 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-emerald-600" />
                        <span>طريقة الربح وتحقيق الدخل من هذا المشروع 💰:</span>
                      </h5>
                      {proj.profitMargin && (
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          هامش الربح: {proj.profitMargin}
                        </span>
                      )}
                    </div>

                    {proj.howToProfit && (
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {proj.howToProfit}
                      </p>
                    )}

                    {proj.pricingModel && (
                      <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-1.5 text-xs text-slate-700">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-emerald-950">نموذج التسعير:</span>
                        <span>{proj.pricingModel}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Initial Steps (Clear Starting Plan) */}
                <div>
                  <h5 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>خطة البدء السريعة (أول 3 خطوات مباشرة):</span>
                  </h5>
                  <div className="space-y-1.5">
                    {proj.initialSteps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 flex items-start gap-2 border border-slate-100"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action to convert to full plan */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    جاهز للانطلاق؟ حوّل هذا المقترح إلى خطة عمل وتنفيذ وتسويق متكاملة
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectSuggestionForFullPlan(
                        proj.fullIdeaDescription || proj.title,
                        proj.category,
                        budget.includes('صفر') || budget.includes('500') ? 'منخفضة جداً / صفرية' : 'متوسطة'
                      )
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl shadow-xs shadow-indigo-200 transition-all hover:shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>توليد خطة المشروع الكاملة في GSE AI</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
