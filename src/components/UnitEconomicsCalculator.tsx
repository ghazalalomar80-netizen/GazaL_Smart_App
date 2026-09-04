import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  PieChart,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Zap,
  Sparkles,
  ArrowRightLeft,
  RotateCcw,
} from 'lucide-react';
import { UnitEconomics } from '../types';

interface UnitEconomicsCalculatorProps {
  unitEconomics?: UnitEconomics;
  projectName: string;
}

export const UnitEconomicsCalculator: React.FC<UnitEconomicsCalculatorProps> = ({
  unitEconomics,
  projectName,
}) => {
  // Default numbers if not yet defined
  const initialPrice = unitEconomics?.suggestedPrice || 350;
  const initialVariableCost = unitEconomics?.variableCostPerUnit || 50;
  const initialFixedCost = unitEconomics?.monthlyFixedCost || 400;
  const initialCAC = unitEconomics?.estimatedCAC || 45;
  const unitName = unitEconomics?.unitName || 'طلب / عميل';

  // Interactive State
  const [price, setPrice] = useState<number>(initialPrice);
  const [variableCost, setVariableCost] = useState<number>(initialVariableCost);
  const [fixedCost, setFixedCost] = useState<number>(initialFixedCost);
  const [cac, setCac] = useState<number>(initialCAC);
  const [targetUnits, setTargetUnits] = useState<number>(30);
  const [activeScenario, setActiveScenario] = useState<'conservative' | 'realistic' | 'scale'>('realistic');

  // Calculations
  const metrics = useMemo(() => {
    const contributionMargin = Math.max(0, price - variableCost);
    const marginPercentage = price > 0 ? ((contributionMargin / price) * 100).toFixed(1) : '0';

    // Break-even units = Fixed Costs / (Price - Variable Cost - CAC) or Fixed Costs / Margin
    const effectiveMarginWithCAC = contributionMargin - cac;
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCost / contributionMargin) : 0;
    const breakEvenUnitsWithCAC = effectiveMarginWithCAC > 0 ? Math.ceil(fixedCost / effectiveMarginWithCAC) : 0;

    // Projected Monthly
    const totalRevenue = targetUnits * price;
    const totalVariableCosts = targetUnits * variableCost;
    const totalMarketingSpend = targetUnits * cac;
    const totalCosts = fixedCost + totalVariableCosts + totalMarketingSpend;
    const netProfit = totalRevenue - totalCosts;
    const netMarginPercentage = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0';
    const roas = totalMarketingSpend > 0 ? (totalRevenue / totalMarketingSpend).toFixed(1) : 'N/A';

    return {
      contributionMargin,
      marginPercentage,
      breakEvenUnits,
      breakEvenUnitsWithCAC,
      totalRevenue,
      totalCosts,
      totalMarketingSpend,
      netProfit,
      netMarginPercentage,
      roas,
    };
  }, [price, variableCost, fixedCost, cac, targetUnits]);

  // Scenario presets
  const applyScenario = (type: 'conservative' | 'realistic' | 'scale') => {
    setActiveScenario(type);
    if (type === 'conservative') {
      setTargetUnits(12);
      setCac(Math.round(initialCAC * 1.3));
    } else if (type === 'realistic') {
      setTargetUnits(35);
      setCac(initialCAC);
    } else if (type === 'scale') {
      setTargetUnits(90);
      setCac(Math.round(initialCAC * 0.85));
    }
  };

  const handleReset = () => {
    setPrice(initialPrice);
    setVariableCost(initialVariableCost);
    setFixedCost(initialFixedCost);
    setCac(initialCAC);
    setTargetUnits(30);
    setActiveScenario('realistic');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6 print-break-inside-avoid">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                حاسبة الجدوى الاقتصادية واقتصاديات الوحدة (Unit Economics)
              </h3>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                تفاعلية ومباشرة
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              محاكاة رقمية دقيقة لتسعير {projectName}، حساب نقطة التعادل، وتقدير الأرباح الصافية الشهرية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
            title="إعادة ضبط القيم الافتراضية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>
        </div>
      </div>

      {/* Scenario Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>اختر سيناريو المحاكاة السريع:</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => applyScenario('conservative')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              activeScenario === 'conservative'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            متحفظ (بداية هادئة)
          </button>
          <button
            type="button"
            onClick={() => applyScenario('realistic')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              activeScenario === 'realistic'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            واقعي (الهدف الموصى به)
          </button>
          <button
            type="button"
            onClick={() => applyScenario('scale')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              activeScenario === 'scale'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            توسع ونمو سريع 🚀
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Middle: Adjustable Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Price Per Unit */}
            <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>سعر البيع المقترح:</span>
                </label>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {price} ريال
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="3000"
                step="10"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">لكل ({unitName})</span>
            </div>

            {/* Variable Cost Per Unit */}
            <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>التكلفة المتغيرة للوحدة:</span>
                </label>
                <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {variableCost} ريال
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(10, price)}
                step="5"
                value={variableCost}
                onChange={(e) => setVariableCost(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">مواد، شحن، تنفيذ مباشر</span>
            </div>

            {/* Monthly Fixed Costs */}
            <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>التكاليف الثابتة الشهرية:</span>
                </label>
                <span className="text-xs font-extrabold text-slate-800 bg-slate-200/80 px-2 py-0.5 rounded-md">
                  {fixedCost} ريال
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={fixedCost}
                onChange={(e) => setFixedCost(Number(e.target.value))}
                className="w-full accent-slate-700 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">اشتراكات، استضافة، أدوات ثابتة</span>
            </div>

            {/* CAC - Customer Acquisition Cost */}
            <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>تكلفة اكتساب العميل (CAC):</span>
                </label>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {cac} ريال
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="400"
                step="5"
                value={cac}
                onChange={(e) => setCac(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">ميزانية إعلانات وترويج لكل عميل</span>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-200/80">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>المبيعات المستهدفة شهرياً:</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-indigo-700 bg-white px-3 py-0.5 rounded-lg border border-indigo-200 shadow-2xs">
                  {targetUnits} {unitName}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              step="1"
              value={targetUnits}
              onChange={(e) => setTargetUnits(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-indigo-500 font-semibold mt-1">
              <span>1 عميل تجريبي</span>
              <span>50 عميل منتظم</span>
              <span>100+ عميل متوسع</span>
            </div>
          </div>
        </div>

        {/* Right: Realtime Financial Verdict Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
              <span className="text-xs font-bold text-slate-300">النتيجة المالية الشهرية المتوقعة</span>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  metrics.netProfit > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    : metrics.netProfit === 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                }`}
              >
                {metrics.netProfit > 0 ? 'مشروع رابح ومجدٍ ✓' : metrics.netProfit === 0 ? 'نقطة تعادل' : 'يحتاج مبيعات أعلى'}
              </span>
            </div>

            {/* Big Net Profit Display */}
            <div className="text-center py-2">
              <span className="text-xs text-slate-400 block mb-1">صافي الربح الشهري المقدر</span>
              <div
                className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  metrics.netProfit > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {metrics.netProfit.toLocaleString('ar-SA')} <span className="text-lg font-bold">ريال</span>
              </div>
              <span className="text-xs text-slate-300 mt-1 block">
                هامش صافي ربح: <strong className="text-white">{metrics.netMarginPercentage}%</strong>
              </span>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2 pt-3 border-t border-slate-700/80 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span>إجمالي الإيرادات ({targetUnits} {unitName}):</span>
              <strong className="text-white font-bold">{metrics.totalRevenue.toLocaleString('ar-SA')} ريال</strong>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span>إجمالي التكاليف (ثابتة + تشغيلية + إعلانات):</span>
              <span className="text-rose-300 font-semibold">{metrics.totalCosts.toLocaleString('ar-SA')} ريال</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span>هامش ربح الوحدة الواحدة:</span>
              <span className="text-emerald-300 font-bold">{metrics.contributionMargin} ريال ({metrics.marginPercentage}%)</span>
            </div>

            <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-700/50">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>نقطة التعادل المطلوبة:</span>
              </span>
              <span className="text-amber-300 font-extrabold text-[11px]">
                {metrics.breakEvenUnits} {unitName} لتغطية التكاليف
              </span>
            </div>
          </div>

          {/* Advice pill */}
          <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-[11px] text-slate-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              {metrics.netProfit > 5000
                ? 'الأرقام ممتازة! بمجرد الوصول لهدف المبيعات، يمكنك إعادة استثمار 30% من الأرباح في إعلانات إضافية لتسريع التوسع.'
                : 'لرفع الأرباح سريعاً: ركّز على تقديم خدمة إضافية (Upsell) بقيمة 100 ريال لكل عميل لزيادة الربح الصافي بنسبة تفوق 40% دون زيادة تكاليفك.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
