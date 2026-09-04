import React from 'react';
import {
  CheckCircle,
  Circle,
  Calendar,
  Layers,
  Clock,
  TrendingUp,
  AlertCircle,
  ListTodo,
} from 'lucide-react';
import { ExecutionStage, TaskItem } from '../types';

interface ExecutionRoadmapProps {
  stages: ExecutionStage[];
  onToggleTask: (stageNumber: number, taskId: string) => void;
}

export const ExecutionRoadmap: React.FC<ExecutionRoadmapProps> = ({
  stages,
  onToggleTask,
}) => {
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'completed'>('all');

  // Compute total tasks and completed tasks
  const allTasks = stages.flatMap((s) => s.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'عالية':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'متوسطة':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 print-break-inside-avoid space-y-6">
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">خارطة خطوات التنفيذ والمهام</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                مراحل مرتبة زمنياً لنقل الفكرة من التخطيط إلى أرض الواقع
              </p>
            </div>
          </div>
        </div>

        {/* Progress Display */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700">نسبة إنجاز المهام:</span>
            <span className="text-indigo-600 font-bold">
              {completedTasks} من {totalTasks} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 100% Celebration Banner */}
      {progressPercent === 100 && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black">تهانينا! أكملت 100% من مهام خارطة الطريق!</h4>
              <p className="text-xs text-emerald-100">
                لقد أنجزت كافة المتطلبات الأساسية، مشروعك الآن جاهز تماماً للتشغيل واستقبال أول دفعات العملاء والأرباح.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-lg shrink-0">
            جاهز للإطلاق 🚀
          </span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="no-print flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500">تصفية المهام:</span>
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          كل المهام ({totalTasks})
        </button>
        <button
          type="button"
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
            filter === 'pending'
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          المتبقية ({totalTasks - completedTasks})
        </button>
        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
            filter === 'completed'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          المكتملة ({completedTasks})
        </button>
      </div>

      {/* Stages List */}
      <div className="space-y-6">
        {stages.map((stage) => {
          const stageCompletedCount = stage.tasks.filter((t) => t.completed).length;
          const isStageFinished = stage.tasks.length > 0 && stageCompletedCount === stage.tasks.length;
          const stageProgress = stage.tasks.length > 0 ? Math.round((stageCompletedCount / stage.tasks.length) * 100) : 0;

          // Filter tasks
          const displayedTasks = stage.tasks.filter((task) => {
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
          });

          if (displayedTasks.length === 0 && filter !== 'all') {
            return null;
          }

          return (
            <div
              key={stage.stageNumber}
              className={`rounded-2xl border transition-all ${
                isStageFinished
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 bg-slate-50/40'
              } p-5 sm:p-6`}
            >
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200/60">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                    isStageFinished ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white shadow-indigo-200'
                  }`}>
                    {stage.stageNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {stage.stageName}
                      </h4>
                      {isStageFinished && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                          مكتملة بالكامل ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{stage.objective}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>المدة: {stage.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                    <span>{stageCompletedCount}/{stage.tasks.length} مهام ({stageProgress}%)</span>
                  </span>
                </div>
              </div>

              {/* Stage Tasks Checklist */}
              <div className="space-y-3">
                {displayedTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(stage.stageNumber, task.id)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      task.completed
                        ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-500'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs hover:border-indigo-200'
                    }`}
                  >
                    <button
                      type="button"
                      aria-label="تحديد المهمة"
                      className="mt-0.5 shrink-0 transition-transform active:scale-90"
                    >
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-600" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`text-sm font-bold ${
                            task.completed ? 'line-through text-slate-500' : 'text-slate-900'
                          }`}
                        >
                          {task.task}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{task.duration}</span>
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                              task.priority
                            )}`}
                          >
                            أولوية {task.priority}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-xs mt-1.5 leading-relaxed ${
                          task.completed ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
