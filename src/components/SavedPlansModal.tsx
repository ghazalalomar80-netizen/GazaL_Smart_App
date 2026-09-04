import React from 'react';
import { X, Trash2, Calendar, ArrowLeft, BookmarkCheck, FileText } from 'lucide-react';
import { ProjectPlan } from '../types';

interface SavedPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: ProjectPlan[];
  onSelectPlan: (plan: ProjectPlan) => void;
  onDeletePlan: (planId: string) => void;
  currentPlanId?: string;
}

export const SavedPlansModal: React.FC<SavedPlansModalProps> = ({
  isOpen,
  onClose,
  plans,
  onSelectPlan,
  onDeletePlan,
  currentPlanId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">سجل خطط المشاريع المحفوظة</h3>
              <p className="text-xs text-slate-500">
                لديك {plans.length} خطط محفوظة محلياً يمكنك العودة إليها في أي وقت
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {plans.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold text-slate-600">لا توجد خطط محفوظة بعد</p>
              <p className="text-xs text-slate-400 mt-1">
                عند توليد أي خطة مشروع جديدة، سيتم حفظها هنا تلقائياً.
              </p>
            </div>
          ) : (
            plans.map((p) => {
              const isSelected = p.id === currentPlanId;
              const allTasks = p.executionPlan?.flatMap((s) => s.tasks) || [];
              const doneTasks = allTasks.filter((t) => t.completed).length;

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/30 ring-2 ring-indigo-100'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex-1 cursor-pointer" onClick={() => onSelectPlan(p)}>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                        {p.projectName}
                      </h4>
                      {isSelected && (
                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                          الحالية
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1 mb-2">
                      « {p.slogan} » - {p.summary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(p.createdAt).toLocaleDateString('ar-SA')}</span>
                      </span>
                      <span>•</span>
                      <span>
                        إنجاز المهام: {doneTasks}/{allTasks.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => onSelectPlan(p)}
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>عرض</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`هل أنت متأكد من حذف خطة "${p.projectName}"؟`)) {
                          onDeletePlan(p.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="حذف الخطة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>يتم حفظ جميع الخطط محلياً في جهازك لحماية خصوصيتك</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 font-medium bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
