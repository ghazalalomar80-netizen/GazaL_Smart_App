import React from 'react';
import { Sparkles, Zap, Target, Award, Users, AlertCircle, CheckCircle2, Coins, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { ProjectPlan } from '../types';

interface PlanOverviewCardProps {
  plan: ProjectPlan;
}

export const PlanOverviewCard: React.FC<PlanOverviewCardProps> = ({ plan }) => {
  // Safe fallback if plan was created prior to monetization field addition
  const monetization = plan.monetizationStrategy || {
    primaryMethod: plan.financialModel?.revenueStreams?.[0] || 'المبيعات المباشرة للمنتجات والخدمات مع باقات قيمة مضافة.',
    pricingModel: 'تسعير مبني على القيمة السوقية مع باقات مرنة للعملاء.',
    profitMarginEstimate: '50% - 75% هامش ربح تشغيلي.',
    howToMaximizeProfit: 'تقديم خدمات أو منتجات تكميلية (Cross-sell) ورفع متوسط قيمة الطلب.',
    recurringRevenuePotential: 'إتاحة اشتراكات شهرية أو دورية تضمن تدفقات مالية مستقرة.',
  };

  return (
    <div className="space-y-6">
      {/* Hero Project Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden print-break-inside-avoid">
        {/* Accent background element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <span>{plan.category || 'مشروع تجاري ناشئ'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {plan.projectName}
            </h1>
            <p className="mt-1 text-sm sm:text-base font-medium text-indigo-600">
              « {plan.slogan} »
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 self-start">
            <span className="font-semibold text-slate-800">تاريخ الإنشاء:</span>
            <span>{new Date(plan.createdAt).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            الملخص التنفيذي ورؤية المشروع
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {plan.summary}
          </p>
        </div>

        {/* Unique Value Proposition */}
        <div className="mt-5 p-4 bg-gradient-to-r from-slate-50 to-indigo-50/50 rounded-xl border border-indigo-100/60 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-indigo-950 mb-1">
              الميزة التنافسية والقيمة الفريدة (Unique Selling Proposition)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700">
              {plan.uniqueSellingPoint}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Monetization Card (طريقة الربح من هذا المشروع) */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border-2 border-emerald-300/80 rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden print-break-inside-avoid">
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-emerald-200/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-emerald-950">
                  طريقة الربح من هذا المشروع وكيف تكسب منه المال 💰
                </h3>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  نموذج الدخل
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                الاستراتيجية المباشرة لتحويل الفكرة إلى تدفقات مالية حقيقية وأرباح مجزية
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-semibold">هامش الربح التقديري</span>
            <span className="text-sm font-extrabold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
              {monetization.profitMarginEstimate}
            </span>
          </div>
        </div>

        {/* Primary Method Full Width */}
        <div className="p-4 bg-white/90 rounded-xl border border-emerald-200/80 shadow-2xs mb-4">
          <h4 className="text-xs font-extrabold text-emerald-900 mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>آلية تحقيق الأرباح الأساسية:</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {monetization.primaryMethod}
          </p>
        </div>

        {/* Grid of pricing, upsell and recurring revenue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 bg-white/90 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-700 block mb-1 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>نموذج التسعير المقترح</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {monetization.pricingModel}
            </p>
          </div>

          <div className="p-3.5 bg-white/90 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-700 block mb-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
              <span>كيف تضاعف أرباحك؟</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {monetization.howToMaximizeProfit}
            </p>
          </div>

          <div className="p-3.5 bg-white/90 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-700 block mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>إمكانية الدخل المتكرر</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {monetization.recurringRevenuePotential}
            </p>
          </div>
        </div>
      </div>

      {/* 24-Hour Quick Win Action Box */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden print-break-inside-avoid">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-200">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                الخطوة السريعة الأولى (Quick Win) — ابدأ اليوم في 24 ساعة
              </h3>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                أولوية فورية
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {plan.quickWin}
            </p>
          </div>
        </div>
      </div>

      {/* Target Audience & Market Problem */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 print-break-inside-avoid">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">الجمهور المستهدف والقيمة المقدمة</h3>
            <p className="text-xs text-slate-500">لمن نوجه هذا المشروع وما هي المشاكل التي نحلها لهم</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Segments */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
            <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>الشرائح الرئيسية</span>
            </h4>
            <ul className="space-y-1.5">
              {plan.targetAudience.keySegments.map((segment, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>{segment}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pain Points */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
            <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>نقاط الألم والمشاكل</span>
            </h4>
            <ul className="space-y-1.5">
              {plan.targetAudience.painPoints.map((pain, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Value Delivered */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
            <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>القيمة والحل المستلم</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {plan.targetAudience.valueDelivered}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
