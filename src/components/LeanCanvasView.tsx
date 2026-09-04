import React, { useState } from 'react';
import {
  FileSpreadsheet,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ShieldAlert,
  Users,
  BarChart3,
  Share2,
  Receipt,
  DollarSign,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Info,
} from 'lucide-react';
import { ProjectPlan, LeanCanvasModel } from '../types';

interface LeanCanvasViewProps {
  plan: ProjectPlan;
}

export const LeanCanvasView: React.FC<LeanCanvasViewProps> = ({ plan }) => {
  const [copied, setCopied] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  // Derive or use provided Lean Canvas
  const canvas: LeanCanvasModel = plan.leanCanvas || {
    problem: plan.targetAudience?.painPoints?.length
      ? plan.targetAudience.painPoints.slice(0, 3)
      : [
          'الحاجة إلى حل سريع واقتصادي للمشكلة الحالية.',
          'التعقيد وغياب الشفافية في الخيارات التقليدية بالسوق.',
          'إهدار الوقت والموارد بدون ضمان تحقيق نتائج ملموسة.',
        ],
    solution: [
      plan.quickWin || 'تقديم نموذج عمل أولي ملموس وسهل الاستخدام.',
      'أتمتة العمليات الأساسية لتقليل تكلفة الخدمة بنسبة تتجاوز 40%.',
      'دعم مباشر ومخصص يضمن رضا العميل من أول تجربة.',
    ],
    uniqueValueProposition:
      plan.uniqueSellingPoint ||
      `${plan.projectName}: حل ذكي متكامل يجمع بين الجودة العالية والسرعة والتكلفة المناسبة.`,
    unfairAdvantage:
      plan.swotAnalysis?.strengths?.[0] ||
      'خفة حركة ومرونة فائقة في التخصيص، مع تكاليف تشغيلية منخفضة واستثمار عميق في ولاء العملاء.',
    customerSegments: plan.targetAudience?.keySegments?.length
      ? plan.targetAudience.keySegments
      : [
          plan.targetPersona?.name || 'الأفراد ورواد الأعمال الطموحون',
          'الشركات الصغيرة الباحثة عن حلول رقمية فعالة وبأسعار عادلة',
        ],
    keyMetrics: plan.strategicKPIs
      ? [
          `المؤشر النجمي: ${plan.strategicKPIs.primaryNorthStarMetric}`,
          `هدف الشهر 1: ${plan.strategicKPIs.month1Goal.slice(0, 45)}...`,
          `هدف الشهر 3: ${plan.strategicKPIs.month3Goal.slice(0, 45)}...`,
        ]
      : [
          'تكلفة اكتساب العميل (CAC) ونسبة العائد على الإنفاق (ROAS).',
          'معدل التحويل (Conversion Rate) من الزائر إلى مشتري.',
          'نسبة رضا العملاء ومعدل تكرار الشراء والاشتراك (LTV).',
        ],
    channels: plan.marketingPlan?.channels?.length
      ? plan.marketingPlan.channels.slice(0, 3).map((c) => `${c.name} (${c.type})`)
      : [
          'محتوى متخصص على تيك توك وإنستغرام (Organic Reach).',
          'إعلانات ممولة مستهدفة بدقة بناءً على نية الشراء.',
          'برنامج إحالات وتوصيات من العملاء الأوائل الراضين.',
        ],
    costStructure: [
      `التكلفة التأسيسية: ${plan.financialModel?.initialCostEstimate || 'منخفضة مرنة'}`,
      plan.unitEconomics
        ? `تكلفة الوحدة المتغيرة: ${plan.unitEconomics.variableCostPerUnit} ريال`
        : 'مصاريف تسويق وإعلانات رقمية موجهة',
      plan.unitEconomics
        ? `المصاريف الثابتة الشهرية: ${plan.unitEconomics.monthlyFixedCost} ريال`
        : 'اشتراكات برمجية وأدوات أتمتة واستضافة',
    ],
    revenueStreams: plan.financialModel?.revenueStreams?.length
      ? plan.financialModel.revenueStreams
      : [
          plan.monetizationStrategy?.primaryMethod || 'مبيعات مباشرة للخدمة/المنتج',
          `نموذج التسعير: ${plan.monetizationStrategy?.pricingModel || 'تسعير بالقيمة'}`,
          `هامش الربح المتوقع: ${plan.monetizationStrategy?.profitMarginEstimate || '40% - 60%'}`,
        ],
  };

  const handleCopyCanvasText = () => {
    let text = `📊 مخطط نموذج العمل التجاري المرن (Lean Canvas) - ${plan.projectName}\n`;
    text += `الشعار: ${plan.slogan}\n\n`;
    text += `1. المشكلة (Problem):\n` + canvas.problem.map((p) => ` - ${p}`).join('\n') + '\n\n';
    text += `2. الحلول (Solution):\n` + canvas.solution.map((s) => ` - ${s}`).join('\n') + '\n\n';
    text += `3. القيمة الفريدة (UVP):\n ${canvas.uniqueValueProposition}\n\n`;
    text += `4. الميزة المحصنة (Unfair Advantage):\n ${canvas.unfairAdvantage}\n\n`;
    text += `5. شرائح العملاء (Customer Segments):\n` + canvas.customerSegments.map((c) => ` - ${c}`).join('\n') + '\n\n';
    text += `6. المقاييس الرئيسية (Key Metrics):\n` + canvas.keyMetrics.map((k) => ` - ${k}`).join('\n') + '\n\n';
    text += `7. القنوات (Channels):\n` + canvas.channels.map((ch) => ` - ${ch}`).join('\n') + '\n\n';
    text += `8. هيكل التكاليف (Cost Structure):\n` + canvas.costStructure.map((cs) => ` - ${cs}`).join('\n') + '\n\n';
    text += `9. مصادر الإيرادات (Revenue Streams):\n` + canvas.revenueStreams.map((rs) => ` - ${rs}`).join('\n') + '\n\n';

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 print-break-inside-avoid space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-indigo-200">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                مخطط نموذج العمل التجاري المرن (Lean Canvas)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                معيار وادي السيليكون
              </span>
            </div>
            <p className="text-xs text-slate-500">
              الملخص الشامل لبنية المشروع في لوحة واحدة واضحة للمستثمرين وفرق العمل
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleCopyCanvasText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/60"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">تم نسخ المخطط</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>نسخ المخطط</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* The 9-Box Bento Grid of Lean Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {/* Box 1: Problem */}
        <div className="md:row-span-2 p-4 rounded-xl bg-rose-50/40 border border-rose-200/70 flex flex-col justify-between space-y-2 hover:border-rose-300 transition-all">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-200/50">
              <span className="text-xs font-extrabold text-rose-950 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                1. المشكلات (Problem)
              </span>
              <span className="text-[9px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                ألم السوق
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.problem.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-rose-200/40 text-[10px] text-rose-700 font-medium">
            بدائل حالية: الحلول اليدوية أو خدمات الشركات الباهظة
          </div>
        </div>

        {/* Box 2: Solution */}
        <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200/70 flex flex-col justify-between space-y-2 hover:border-blue-300 transition-all">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-200/50">
              <span className="text-xs font-extrabold text-blue-950 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                2. الحل المقترح (Solution)
              </span>
              <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                3 ميزات
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.solution.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-blue-200/40 text-[10px] text-blue-700 font-medium">
            المنتج الأدنى (MVP): إطلاق أول نموذج خلال أيام
          </div>
        </div>

        {/* Box 3: Unique Value Proposition (Spans middle height) */}
        <div className="md:row-span-2 p-4 rounded-xl bg-gradient-to-b from-indigo-50/60 to-purple-50/40 border border-indigo-200/80 flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-200/50">
              <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                3. القيمة الفريدة (UVP)
              </span>
              <span className="text-[9px] font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                الجوهر
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 leading-relaxed bg-white/90 p-3 rounded-lg border border-indigo-100 shadow-2xs">
              "{canvas.uniqueValueProposition}"
            </p>
          </div>
          <div className="bg-indigo-600 text-white p-2.5 rounded-lg text-center text-xs font-bold">
            شعار المشروع: {plan.slogan}
          </div>
        </div>

        {/* Box 4: Unfair Advantage */}
        <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200/70 flex flex-col justify-between space-y-2 hover:border-purple-300 transition-all">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-200/50">
              <span className="text-xs font-extrabold text-purple-950 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                4. الميزة المحصنة (Unfair)
              </span>
              <span className="text-[9px] font-bold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
                صعبة التقليد
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {canvas.unfairAdvantage}
            </p>
          </div>
          <div className="pt-2 border-t border-purple-200/40 text-[10px] text-purple-700 font-medium">
            حاجز دخول المنافسين وسرعة الاستجابة
          </div>
        </div>

        {/* Box 5: Customer Segments (Spans right height) */}
        <div className="md:row-span-2 p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/70 flex flex-col justify-between space-y-2 hover:border-emerald-300 transition-all">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200/50">
              <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                5. شرائح العملاء
              </span>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                الهدف
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.customerSegments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-emerald-200/40 text-[10px] text-emerald-800 font-bold bg-emerald-100/60 p-2 rounded-lg">
            المتبنون الأوائل (Early Adopters): المهتمون بالحل الفوري والتكلفة العادلة
          </div>
        </div>

        {/* Box 6: Key Metrics (Under Solution) */}
        <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-200/70 flex flex-col justify-between space-y-2 hover:border-teal-300 transition-all">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-teal-200/50">
              <span className="text-xs font-extrabold text-teal-950 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
                6. المقاييس (Key Metrics)
              </span>
              <span className="text-[9px] font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                أرقام النجاح
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.keyMetrics.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-teal-200/40 text-[10px] text-teal-700 font-medium">
            التركيز على مقاييس الإيراد والاحتفاظ
          </div>
        </div>

        {/* Box 7: Channels (Under Unfair Advantage) */}
        <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/70 flex flex-col justify-between space-y-2 hover:border-amber-300 transition-all">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/50">
              <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-amber-600" />
                7. القنوات (Channels)
              </span>
              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                الوصول
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.channels.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-amber-200/40 text-[10px] text-amber-800 font-medium">
            مزيج التسويق العضوي والمممول
          </div>
        </div>

        {/* Bottom Row: Cost Structure (Col 1 to 2.5) */}
        <div className="md:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
              <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-slate-600" />
                8. هيكل التكاليف (Cost Structure)
              </span>
              <span className="text-[9px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                المصروفات
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.costStructure.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500">
            الهدف: الحفاظ على تكاليف تشغيل مرنة في الأشهر الثلاثة الأولى
          </div>
        </div>

        {/* Bottom Row: Revenue Streams (Col 3 to 5) */}
        <div className="md:col-span-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/90 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200">
              <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                9. مصادر الإيرادات والأرباح (Revenue Streams)
              </span>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                التدفق النقدي
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {canvas.revenueStreams.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-emerald-200 text-[10px] text-emerald-800 font-bold">
            نموذج التسعير يعتمد على عائد الاستثمار المباشر للعميل لضمان سهولة الإقناع
          </div>
        </div>
      </div>
    </div>
  );
};
