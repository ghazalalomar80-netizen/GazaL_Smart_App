import React from 'react';
import { Coins, ShieldAlert, TrendingUp, CheckCircle, AlertTriangle, DollarSign, Sparkles, ArrowUpRight } from 'lucide-react';
import { FinancialModel, RiskItem, MonetizationStrategy } from '../types';

interface FinancialAndRisksCardProps {
  financial: FinancialModel;
  risks: RiskItem[];
  monetization?: MonetizationStrategy;
}

export const FinancialAndRisksCard: React.FC<FinancialAndRisksCardProps> = ({
  financial,
  risks,
  monetization,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print-break-inside-avoid">
      {/* Financial & Revenue Model Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">طريقة الربح والنموذج المالي</h3>
            <p className="text-xs text-slate-500">التكاليف المقدرة ونموذج تحقيق الأرباح المباشرة</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Key Metrics row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                الميزانية التأسيسية التقديرية
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                {financial.initialCostEstimate}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                الوصول لنقطة التعادل المتوقعة
              </span>
              <span className="text-sm font-extrabold text-emerald-700">
                {financial.breakevenTimeline}
              </span>
            </div>
          </div>

          {/* Dedicated Monetization Details if available */}
          {monetization && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/70 to-teal-50/50 border border-emerald-200/80 space-y-3">
              <div>
                <span className="text-[11px] font-extrabold text-emerald-950 flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>طريقة الربح الأساسية:</span>
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {monetization.primaryMethod}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block text-[10px]">استراتيجية التسعير:</span>
                  <span className="text-slate-800 font-bold">{monetization.pricingModel}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block text-[10px]">هامش الربح المتوقع:</span>
                  <span className="text-emerald-700 font-bold">{monetization.profitMarginEstimate}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 text-xs space-y-1">
                <div className="text-slate-700">
                  <strong className="text-indigo-900">طريقة مضاعفة الأرباح: </strong>
                  <span>{monetization.howToMaximizeProfit}</span>
                </div>
                <div className="text-slate-700">
                  <strong className="text-purple-900">بناء دخل متكرر: </strong>
                  <span>{monetization.recurringRevenuePotential}</span>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Streams */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>مصادر الدخل الإضافية:</span>
            </h4>
            <div className="space-y-1.5">
              {financial.revenueStreams.map((stream, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-emerald-50/40 rounded-lg border border-emerald-100/80 text-xs text-slate-800 flex items-start gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{stream}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Costs */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-2">النفقات التشغيلية الدورية:</h4>
            <div className="flex flex-wrap gap-2">
              {financial.operationalCosts.map((cost, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200"
                >
                  {cost}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risks & Mitigation Strategy Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">إدارة المخاطر وتفادي العقبات</h3>
            <p className="text-xs text-slate-500">توقع التحديات ووضع حلول استباقية لمعالجتها</p>
          </div>
        </div>

        <div className="space-y-3.5">
          {risks.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  المخاطرة: {item.risk}
                </h4>
              </div>
              <p className="text-xs text-slate-600 pr-6 leading-relaxed">
                <span className="font-semibold text-indigo-700">الحل والوقاية: </span>
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
