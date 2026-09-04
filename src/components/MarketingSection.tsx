import React, { useState } from 'react';
import {
  Megaphone,
  Zap,
  Sparkles,
  Share2,
  Copy,
  Check,
  Rocket,
  Flame,
  Calendar,
  Layers,
  Send,
} from 'lucide-react';
import { MarketingPlan, ExtraMarketingIdeasResponse } from '../types';

interface MarketingSectionProps {
  plan: MarketingPlan;
  projectName: string;
  projectSummary: string;
  targetAudience: any;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({
  plan,
  projectName,
  projectSummary,
  targetAudience,
}) => {
  const [copiedHookIndex, setCopiedHookIndex] = useState<number | null>(null);
  const [extraIdeas, setExtraIdeas] = useState<ExtraMarketingIdeasResponse | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [expandError, setExpandError] = useState<string | null>(null);

  const handleCopyHook = (hook: string, cta: string, index: number) => {
    const textToCopy = `« ${hook} »\n${cta}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedHookIndex(index);
      setTimeout(() => setCopiedHookIndex(null), 2000);
    });
  };

  const handleExpandMarketing = async () => {
    setIsExpanding(true);
    setExpandError(null);
    try {
      const response = await fetch('/api/marketing-expansion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          summary: projectSummary,
          targetAudience,
        }),
      });

      if (!response.ok) {
        throw new Error('تعذر جلب الأفكار التسويقية الإضافية');
      }

      const data: ExtraMarketingIdeasResponse = await response.json();
      setExtraIdeas(data);
    } catch (err: any) {
      console.error(err);
      setExpandError(err.message || 'حدث خطأ في الاتصال');
    } finally {
      setIsExpanding(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 print-break-inside-avoid space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-xs shadow-pink-200">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">استراتيجية وأفكار التسويق والترويج</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              أفكار غير تقليدية، قنوات الوصول، وخطافات إعلانية جاهزة لاكتساب أول العملاء
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExpandMarketing}
          disabled={isExpanding}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-2xs self-start sm:self-auto"
        >
          {isExpanding ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>جاري التوليد...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>توليد أفكار تسويق إضافية 🚀</span>
            </>
          )}
        </button>
      </div>

      {expandError && (
        <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
          {expandError}
        </div>
      )}

      {/* 1. Guerrilla Marketing Tactics */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-amber-500" />
          <h4 className="text-sm font-bold text-slate-900">
            أفكار تسويق غير تقليدية (منخفضة التكلفة / Guerrilla Growth Hacks)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {plan.guerrillaIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{idea}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Target Marketing Channels */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-slate-900">
            قنوات الترويج الموصى بها لهذا المشروع
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.channels.map((ch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h5 className="text-sm font-bold text-slate-900">{ch.name}</h5>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  {ch.type}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
                <span className="font-semibold text-slate-700">لماذا هذه القناة: </span>
                {ch.whyThisChannel}
              </p>
              <div className="pt-2 border-t border-slate-200/60">
                <p className="text-xs text-indigo-700 font-medium">
                  <span className="font-semibold">الإجراء العملي: </span>
                  {ch.recommendedAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ready-To-Use Ad Hooks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">
              خطافات إعلانية جاهزة للنشر (Ad Hooks & Captions)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">انقر على الزر لنسخ الخطاف مباشرة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {plan.adHooks.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-xs transition-all relative group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {item.platform}
                </span>

                <button
                  type="button"
                  onClick={() => handleCopyHook(item.hook, item.callToAction, idx)}
                  className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 p-1 rounded hover:bg-slate-100 transition-colors"
                  title="نسخ الخطاف والدعوة لاتخاذ إجراء"
                >
                  {copiedHookIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-600 font-semibold">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">نسخ</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2 leading-relaxed">
                « {item.hook} »
              </p>

              <div className="text-[11px] text-slate-500 flex items-center gap-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Send className="w-3 h-3 text-slate-400 shrink-0" />
                <span>
                  <strong>الدعوة للإجراء (CTA): </strong>
                  {item.callToAction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Launch Campaign Concept */}
      <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-transparent border border-indigo-200/80">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="w-4 h-4 text-indigo-600" />
          <h4 className="text-sm font-bold text-slate-900">
            فكرة وتصميم حملة الإطلاق الرسمية: {plan.launchCampaign.title}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed">
          {plan.launchCampaign.concept}
        </p>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800">خطوات تنفيذ حملة الإطلاق:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {plan.launchCampaign.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Additional AI Expanded Marketing Ideas (if requested) */}
      {extraIdeas && (
        <div className="pt-6 border-t border-indigo-100 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="text-base font-bold text-indigo-950">
              أفكار تسويقية إضافية وحملات تم توليدها بالذكاء الاصطناعي
            </h4>
          </div>

          {/* Extra Campaigns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {extraIdeas.additionalCampaigns.map((camp, idx) => (
              <div
                key={idx}
                className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold text-indigo-900">{camp.title}</h5>
                  <span className="text-[10px] font-semibold bg-white text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                    {camp.targetChannel}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mb-2 leading-relaxed">{camp.description}</p>
                <div className="text-[11px] text-indigo-800 font-medium bg-white/80 p-2 rounded border border-indigo-100">
                  <strong>طريقة التنفيذ: </strong>
                  {camp.implementation}
                </div>
              </div>
            ))}
          </div>

          {/* Content Calendar Ideas */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h5 className="text-xs font-bold text-slate-800">
                مقترح جدول المحتوى للأسبوع الأول من الإطلاق
              </h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {extraIdeas.contentCalendarIdeas.map((cal, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 block mb-1">
                    {cal.week}
                  </span>
                  <h6 className="text-xs font-bold text-slate-800 mb-2">{cal.theme}</h6>
                  <ul className="space-y-1.5">
                    {cal.postIdeas.map((pIdea, pIdx) => (
                      <li key={pIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{pIdea}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
