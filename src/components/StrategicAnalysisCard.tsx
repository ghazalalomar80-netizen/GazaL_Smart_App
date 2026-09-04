import React from 'react';
import {
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Target,
  Sparkles,
  Compass,
  CheckCircle2,
  HelpCircle,
  ArrowUpRight,
  Flame,
} from 'lucide-react';
import { SWOTAnalysis, TargetPersona, StrategicKPIs } from '../types';

interface StrategicAnalysisCardProps {
  swot?: SWOTAnalysis;
  targetPersona?: TargetPersona;
  strategicKPIs?: StrategicKPIs;
  projectName: string;
}

export const StrategicAnalysisCard: React.FC<StrategicAnalysisCardProps> = ({
  swot,
  targetPersona,
  strategicKPIs,
  projectName,
}) => {
  // Safe Fallbacks if not provided in older plans
  const safeSwot: SWOTAnalysis = swot || {
    strengths: [
      'سرعة ومرونة عالية في التنفيذ والتخصيص مقارنة بالشركات الكبرى.',
      'تكاليف تشغيلية منخفضة في المرحلة الأولى توفر هامش ربح تنافسي.',
      'تواصل مباشر وشخصي مع أول دفعة من العملاء لبناء ولاء مبكر.',
    ],
    weaknesses: [
      'فريق عمل محدود في البداية يتطلب أتمتة العمليات المتكررة.',
      'الحاجة لبناء الثقة والمصداقية في السوق من الصفر.',
    ],
    opportunities: [
      'زيادة إقبال العملاء على الحلول الرقمية السريعة والمتخصصة.',
      'إمكانية الاستفادة من أدوات الذكاء الاصطناعي لتخفيض التكاليف الإنتاجية بمقدار 50%.',
      'بناء شراكات تكاملية مع أصحاب المشاريع التكميلية غير المنافسة.',
    ],
    threats: [
      'تغير خوارزميات منصات الترويج وارتفاع أسعار الإعلانات الممولة.',
      'احتمال ظهور مقلدين في حال نجاح الفكرة، مما يفرض الابتكار المستمر.',
    ],
  };

  const safePersona: TargetPersona = targetPersona || {
    name: 'سارة - رائدة أعمال وطموحة شابة (26-38 سنة)',
    roleOrStatus: 'صاحبة نشاط تجاري ناشئ أو مستقلة تسعى لزيادة مبيعاتها',
    coreFrustration: 'إضاعة ساعات طويلة وأموال طائلة على حلول تقليدية معقدة دون نتائج ملموسة',
    buyingTrigger: 'رؤية نموذج عملي يثبت حل المشكلة خلال أيام وبسعر واضح ومحدد',
    objectionAndSolution: 'الاعتراض: "هل يناسب وضعي تحديداً؟" — الرد: "جلسة استشارية أولى مجانية أو ضمان استرجاع كامل بدون شروط".',
  };

  const safeKPIs: StrategicKPIs = strategicKPIs || {
    month1Goal: 'الحصول على أول 10 عملاء محققين، وتوثيق 3 قصص نجاح حقيقية.',
    month3Goal: 'الوصول إلى 40-50 عميلاً نشطاً شهرياً مع تغطية كافة المصاريف التشغيلية وتحقيق صافي ربح.',
    month6Goal: 'مضاعفة الإيرادات الشهرية وبناء قاعدة دخل متكرر تتجاوز 15,000 ريال شهرياً.',
    primaryNorthStarMetric: 'صافي الإيرادات المتكررة (MRR) ونسبة رضا العملاء وإحالاتهم الشفهية.',
  };

  return (
    <div className="space-y-6 print-break-inside-avoid">
      {/* North Star Metric Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-sm border border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-300">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
              المؤشر النجمي الأساسي للنجاح (North Star Metric)
            </span>
            <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
              {safeKPIs.primaryNorthStarMetric}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              الرقم المحوري الوحيد الذي يوجّه كل قرارات التسويق، التسعير، والتطوير في {projectName}
            </p>
          </div>
        </div>

        <div className="shrink-0 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-indigo-200">
          <span className="font-semibold">بوصلة النمو القياسية</span>
        </div>
      </div>

      {/* SWOT Analysis 2x2 Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                تحليل سوات الرباعي المتقدم (SWOT Analysis)
              </h3>
              <p className="text-xs text-slate-500">
                تشخيص استراتيجي دقيق لتموضع المشروع التنافسي في السوق
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            مصفوفة 4 عناصر
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths (S) */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>نقاط القوة التنافسية (Strengths)</span>
              </h4>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                مزايا داخلية
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {safeSwot.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses (W) */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>نقاط الضعف والاحتياطات (Weaknesses)</span>
              </h4>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                تتطلب معالجة
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {safeSwot.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities (O) */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-blue-950 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>الفرص السوقية غير المستغلة (Opportunities)</span>
              </h4>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                رياح مواتية
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {safeSwot.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats (T) */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-rose-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>التهديدات والمخاطر الخارجية (Threats)</span>
              </h4>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
                تحوط وقائي
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {safeSwot.threats.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Target Persona Card (شخصية المشتري المثالي بدقة) */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white rounded-2xl border border-indigo-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-indigo-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                شخصية العميل المثالي (Ideal Customer Profile - ICP)
              </h3>
              <p className="text-xs text-slate-500">
                الملف النفسي والسلوكي لأكثر عميل مستعد للدفع والتكرار
              </p>
            </div>
          </div>
          <span className="text-[11px] font-extrabold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
            النموذج التمثيلي
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-white/90 p-4 rounded-xl border border-indigo-100/90 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-slate-500 block">الاسم التمثيلي والشريحة:</span>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">{safePersona.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{safePersona.roleOrStatus}</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-rose-700 flex items-center gap-1 mb-1">
                <AlertCircle className="w-3 h-3" />
                <span>أكبر ألم أو إحباط حالي:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {safePersona.coreFrustration}
              </p>
            </div>
          </div>

          <div className="space-y-3 bg-white/90 p-4 rounded-xl border border-indigo-100/90 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>لحظة الحسم ومحفز الشراء الفوري (Trigger):</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {safePersona.buyingTrigger}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-indigo-700 flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>أكبر اعتراض متوقع والرد الحاسم عليه:</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {safePersona.objectionAndSolution}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Milestones: Months 1, 3, 6 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              الأهداف الرقمية ومؤشرات الأداء القياسية (Milestones & KPIs)
            </h3>
            <p className="text-xs text-slate-500">
              أهداف كمية محددة وقابلة للقياس لتحقيق الاستقرار المالي والتوسع
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Month 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-indigo-900 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                الشهر الأول
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">مرحلة التحقق</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {safeKPIs.month1Goal}
            </p>
          </div>

          {/* Month 3 */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                الشهر الثالث
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">التدفق الإيجابي</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {safeKPIs.month3Goal}
            </p>
          </div>

          {/* Month 6 */}
          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/80 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                الشهر السادس
              </span>
              <span className="text-[10px] text-purple-700 font-semibold">التوسع والنمو</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {safeKPIs.month6Goal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
