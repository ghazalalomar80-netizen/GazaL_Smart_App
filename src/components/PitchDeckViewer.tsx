import React, { useState } from 'react';
import {
  Presentation,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Target,
  ShieldCheck,
  DollarSign,
  Rocket,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ProjectPlan } from '../types';

interface PitchDeckViewerProps {
  plan: ProjectPlan;
}

export const PitchDeckViewer: React.FC<PitchDeckViewerProps> = ({ plan }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const slides = [
    {
      id: 1,
      badge: 'الشريحة 1: الغلاف والرؤية',
      title: plan.projectName,
      subtitle: plan.slogan,
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
      content: (
        <div className="space-y-4 text-center max-w-xl mx-auto py-6">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            {plan.category}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {plan.projectName}
          </h2>
          <p className="text-base sm:text-xl text-indigo-200 font-medium">
            "{plan.slogan}"
          </p>
          <div className="pt-4 border-t border-indigo-900/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {plan.summary}
          </div>
        </div>
      ),
      speakerNotes: `مرحباً، أقدم لكم مشروع "${plan.projectName}" وشعارنا هو "${plan.slogan}". نحن نسد فجوة جوهرية في سوق ${plan.category} من خلال تقديم حل عملي فائق السرعة ومدروس الجدوى.`,
    },
    {
      id: 2,
      badge: 'الشريحة 2: المشكلة والفرصة',
      title: 'أين يكمن ألم السوق غير المحلول؟',
      subtitle: 'المشكلات الحقيقية التي تؤرق العملاء المستهدفين',
      icon: <Target className="w-8 h-8 text-rose-400" />,
      content: (
        <div className="space-y-4 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-2">
              <span className="text-xs font-bold text-rose-300 block">أبرز الآلام والمشاكل الحالية:</span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                {plan.targetAudience?.painPoints?.slice(0, 3).map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2"></span>
                    <span>{p}</span>
                  </li>
                )) || <li>صعوبة إيجاد بدائل موثوقة وبأسعار واضحة</li>}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60 space-y-2">
              <span className="text-xs font-bold text-indigo-300 block">شريحة العميل المثالي:</span>
              <p className="text-sm font-bold text-white">
                {plan.targetPersona?.name || plan.targetAudience?.description}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {plan.targetPersona?.coreFrustration || 'يبحثون عن جودة ملموسة دون تعقيدات وبأقصر وقت للتنفيذ.'}
              </p>
            </div>
          </div>
        </div>
      ),
      speakerNotes: `العميل اليوم يواجه مشاكل متكررة في هذا المجال، مثل: ${plan.targetAudience?.painPoints?.[0] || 'التعقيد وارتفاع التكلفة'}. نحن نركز على ${plan.targetPersona?.name || 'الشريحة المستهدفة'} لتقديم راحة بال ونتائج سريعة.`,
    },
    {
      id: 3,
      badge: 'الشريحة 3: الحل والقيمة الفريدة',
      title: 'كيف نُحدث الفرق التنافسي الحاسم؟',
      subtitle: 'الحل العملي والميزة التنافسية (USP)',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      content: (
        <div className="space-y-4 py-3">
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-center space-y-2">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
              الميزة التنافسية المحورية (Unique Selling Proposition)
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              "{plan.uniqueSellingPoint}"
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-300 block">أول إنجاز سريع ملموس (خلال 24 ساعة):</span>
              <p className="text-xs sm:text-sm text-slate-200 font-semibold">{plan.quickWin}</p>
            </div>
          </div>
        </div>
      ),
      speakerNotes: `قيمتنا الفريدة التي لا يمكن للمنافسين مضاهاة سرعتها هي: "${plan.uniqueSellingPoint}". ونحن جاهزون للبدء فوراً بخطوة سريعة: "${plan.quickWin}".`,
    },
    {
      id: 4,
      badge: 'الشريحة 4: النموذج المالي والربحية',
      title: 'كيف يحقق المشروع تدفقاً مالياً مستداماً؟',
      subtitle: 'نموذج الإيرادات واقتصاديات الوحدة',
      icon: <DollarSign className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-4 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-center">
              <span className="text-[11px] font-bold text-amber-300 block">آلية الربح</span>
              <p className="text-xs sm:text-sm font-black text-white mt-1">
                {plan.monetizationStrategy?.primaryMethod || 'مبيعات مباشرة'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-center">
              <span className="text-[11px] font-bold text-emerald-300 block">هامش الربح المتوقع</span>
              <p className="text-xs sm:text-sm font-black text-white mt-1">
                {plan.monetizationStrategy?.profitMarginEstimate || '45% - 65%'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/60 text-center">
              <span className="text-[11px] font-bold text-purple-300 block">الوصول للتعادل</span>
              <p className="text-xs sm:text-sm font-black text-white mt-1">
                {plan.financialModel?.breakevenTimeline || '2-4 أشهر'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
            <span className="font-bold text-indigo-300 block">استراتيجية مضاعفة الأرباح:</span>
            <p className="leading-relaxed">{plan.monetizationStrategy?.howToMaximizeProfit}</p>
          </div>
        </div>
      ),
      speakerNotes: `يعتمد نموذجنا المالي على ${plan.monetizationStrategy?.primaryMethod} بهامش ربح متوقع ${plan.monetizationStrategy?.profitMarginEstimate}. والوصول لنقطة التعادل مقدر خلال ${plan.financialModel?.breakevenTimeline}.`,
    },
    {
      id: 5,
      badge: 'الشريحة 5: خطة الإطلاق ومراحل التنفيذ',
      title: 'خارطة طريق الانطلاق ومؤشرات النجاح',
      subtitle: 'من اليوم الأول حتى النمو والتوسع المستمر',
      icon: <Layers className="w-8 h-8 text-blue-400" />,
      content: (
        <div className="space-y-4 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {plan.executionPlan?.slice(0, 3).map((st) => (
              <div
                key={st.stageNumber}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {st.stageNumber}
                  </span>
                  <span className="text-[10px] text-indigo-300 font-semibold">{st.duration}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">{st.stageName}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {st.objective}
                </p>
              </div>
            ))}
          </div>

          {plan.strategicKPIs && (
            <div className="p-3.5 rounded-xl bg-indigo-950/50 border border-indigo-900/60 text-center">
              <span className="text-[11px] font-bold text-indigo-300 block">المؤشر النجمي الأساسي للنمو:</span>
              <p className="text-xs sm:text-sm font-black text-white mt-0.5">
                {plan.strategicKPIs.primaryNorthStarMetric}
              </p>
            </div>
          )}
        </div>
      ),
      speakerNotes: `قسمنا التنفيذ إلى مراحل واضحة تبدأ بالاختبار وبناء النموذج الأولي ثم حملة الإطلاق والتوسع. مؤشرنا الأساسي للنجاح هو ${plan.strategicKPIs?.primaryNorthStarMetric || 'النمو الشهري المستدام'}.`,
    },
  ];

  const current = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleCopyPitchScript = () => {
    let script = `🎙️ نص العرض التقديمي (Pitch Deck Script) لمشروع: ${plan.projectName}\n\n`;
    slides.forEach((sl) => {
      script += `--- ${sl.badge}: ${sl.title} ---\n`;
      script += `${sl.speakerNotes}\n\n`;
    });

    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden print-break-inside-avoid">
      {/* Top Deck Control Header */}
      <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                العرض التقديمي السريع (Pitch Deck)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                5 شرائح مقنعة
              </span>
            </div>
            <p className="text-xs text-slate-400">
              ملخص احترافي جاهز للإلقاء أمام الشركاء، المستثمرين، وحاضنات الأعمال
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyPitchScript}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">تم نسخ نص الإلقاء</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>نسخ نص الإلقاء (Script)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="p-6 sm:p-10 min-h-[360px] flex flex-col justify-between bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 relative">
        {/* Slide badge & indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            {current.icon}
            <div>
              <span className="text-xs font-extrabold text-indigo-400 block">
                {current.badge}
              </span>
              <h4 className="text-base sm:text-xl font-black text-white">{current.title}</h4>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-bold text-slate-300">
            <span>{currentSlide + 1}</span>
            <span className="text-slate-500">/</span>
            <span>{slides.length}</span>
          </div>
        </div>

        {/* Slide Body Content */}
        <div className="py-4 my-auto">{current.content}</div>

        {/* Speaker Notes Box */}
        <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200/90 leading-relaxed flex items-start gap-2.5">
          <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded shrink-0">
            ملاحظة المتحدث (Speaker Note)
          </span>
          <p className="italic">"{current.speakerNotes}"</p>
        </div>
      </div>

      {/* Slide Navigation Footer Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors border border-slate-700"
        >
          <ChevronRight className="w-4 h-4" />
          <span>الشريحة السابقة</span>
        </button>

        {/* Indicator dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              aria-label={`انتقال للشريحة ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlide
                  ? 'bg-indigo-500 w-6'
                  : 'bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs shadow-indigo-500/20"
        >
          <span>الشريحة التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
