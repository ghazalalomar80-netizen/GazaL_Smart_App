import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IdeaInputForm } from './components/IdeaInputForm';
import { SkillBudgetMatcher } from './components/SkillBudgetMatcher';
import { PlanOverviewCard } from './components/PlanOverviewCard';
import { ExecutionRoadmap } from './components/ExecutionRoadmap';
import { MarketingSection } from './components/MarketingSection';
import { FinancialAndRisksCard } from './components/FinancialAndRisksCard';
import { StrategicAnalysisCard } from './components/StrategicAnalysisCard';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';
import { LeanCanvasView } from './components/LeanCanvasView';
import { PitchDeckViewer } from './components/PitchDeckViewer';
import { AiAdvisorChat } from './components/AiAdvisorChat';
import { SavedPlansModal } from './components/SavedPlansModal';
import { ProjectPlan, GeneratePlanInput } from './types';
import { getSavedPlans, savePlanToStorage, deletePlanFromStorage } from './utils/storage';
import {
  Layers,
  Megaphone,
  Coins,
  Bot,
  LayoutDashboard,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Sparkles,
  Compass,
  Lightbulb,
  Target,
  Calculator,
  FileSpreadsheet,
  Presentation,
} from 'lucide-react';

export default function App() {
  const [currentPlan, setCurrentPlan] = useState<ProjectPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<ProjectPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'canvas' | 'pitch' | 'strategy' | 'calculator' | 'execution' | 'marketing' | 'financial' | 'advisor'>('all');
  const [mainMode, setMainMode] = useState<'convert_idea' | 'skill_budget'>('convert_idea');

  // Load saved plans on initial render
  useEffect(() => {
    const plans = getSavedPlans();
    setSavedPlans(plans);
  }, []);

  const handleGeneratePlan = async (input: GeneratePlanInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || 'فشل في توليد الخطة');
      }

      const plan: ProjectPlan = await response.json();
      setCurrentPlan(plan);
      const updated = savePlanToStorage(plan);
      setSavedPlans(updated);
      setActiveTab('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error in handleGeneratePlan:', err);
      setErrorMessage(
        err.message || 'حدث خطأ غير متوقع أثناء توليد الخطة بواسطة الذكاء الاصطناعي.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestionForFullPlan = (
    suggestionText: string,
    category?: string,
    budgetLevel?: any
  ) => {
    handleGeneratePlan({
      idea: suggestionText,
      field: category,
      budgetLevel: budgetLevel || 'منخفضة جداً / صفرية',
      timeframe: 'شهر إلى 3 أشهر',
    });
  };

  const handleToggleTask = (stageNumber: number, taskId: string) => {
    if (!currentPlan) return;

    const updatedStages = currentPlan.executionPlan.map((stage) => {
      if (stage.stageNumber !== stageNumber) return stage;
      return {
        ...stage,
        tasks: stage.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
      };
    });

    const updatedPlan: ProjectPlan = {
      ...currentPlan,
      executionPlan: updatedStages,
    };

    setCurrentPlan(updatedPlan);
    const updatedList = savePlanToStorage(updatedPlan);
    setSavedPlans(updatedList);
  };

  const handleSelectPlan = (plan: ProjectPlan) => {
    setCurrentPlan(plan);
    setIsSavedModalOpen(false);
    setActiveTab('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePlan = (planId: string) => {
    const updated = deletePlanFromStorage(planId);
    setSavedPlans(updated);
    if (currentPlan?.id === planId) {
      setCurrentPlan(null);
    }
  };

  const handleNewPlan = () => {
    setCurrentPlan(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <Header
        currentPlan={currentPlan}
        savedCount={savedPlans.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onNewPlan={handleNewPlan}
        onOpenSkillMatcher={() => {
          setCurrentPlan(null);
          setMainMode('skill_budget');
        }}
        activeMode={mainMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">تنبيه: </strong>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800"
            >
              إغلاق
            </button>
          </div>
        )}

        {/* Display either input forms or active plan */}
        {!currentPlan ? (
          <div className="space-y-6">
            {/* Mode Switcher Segmented Control */}
            <div className="flex items-center justify-center">
              <div className="bg-slate-200/90 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner border border-slate-300/70 max-w-md w-full">
                <button
                  type="button"
                  id="tab-convert-idea"
                  onClick={() => setMainMode('convert_idea')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    mainMode === 'convert_idea'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>تحويل فكرة</span>
                </button>

                <button
                  type="button"
                  id="tab-skill-budget"
                  onClick={() => setMainMode('skill_budget')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                    mainMode === 'skill_budget'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>اقتراح حسب المهارات</span>
                  <span className="hidden sm:inline-block text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                    جديد ✨
                  </span>
                </button>
              </div>
            </div>

            {mainMode === 'convert_idea' ? (
              <IdeaInputForm
                onSubmit={handleGeneratePlan}
                isLoading={isLoading}
                onSwitchToSkillMatcher={() => setMainMode('skill_budget')}
              />
            ) : (
              <SkillBudgetMatcher
                onSelectSuggestionForFullPlan={handleSelectSuggestionForFullPlan}
              />
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {/* Plan Navigation Tabs (hidden in print) */}
            <div className="no-print bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>عرض كامل الخطة</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'canvas'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>مخطط نموذج العمل (Lean Canvas)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pitch')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'pitch'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>العرض التقديمي (Pitch Deck)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('strategy')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'strategy'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>التحليل الاستراتيجي و SWOT</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'calculator'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>حاسبة الجدوى والوحدة</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">تفاعلية</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('execution')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'execution'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>خطوات التنفيذ</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('marketing')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'marketing'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Megaphone className="w-4 h-4" />
                <span>أفكار التسويق</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('financial')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'financial'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>طريقة الربح والمالية</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('advisor')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                  activeTab === 'advisor'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>المستشار الذكي</span>
              </button>
            </div>

            {/* Render Sections based on activeTab */}
            {activeTab === 'all' && (
              <PlanOverviewCard plan={currentPlan} />
            )}

            {(activeTab === 'all' || activeTab === 'pitch') && (
              <PitchDeckViewer plan={currentPlan} />
            )}

            {(activeTab === 'all' || activeTab === 'canvas') && (
              <LeanCanvasView plan={currentPlan} />
            )}

            {(activeTab === 'all' || activeTab === 'strategy') && (
              <StrategicAnalysisCard
                swot={currentPlan.swotAnalysis}
                targetPersona={currentPlan.targetPersona}
                strategicKPIs={currentPlan.strategicKPIs}
                projectName={currentPlan.projectName}
              />
            )}

            {(activeTab === 'all' || activeTab === 'calculator') && (
              <UnitEconomicsCalculator
                unitEconomics={currentPlan.unitEconomics}
                projectName={currentPlan.projectName}
              />
            )}

            {(activeTab === 'all' || activeTab === 'execution') && (
              <ExecutionRoadmap
                stages={currentPlan.executionPlan}
                onToggleTask={handleToggleTask}
              />
            )}

            {(activeTab === 'all' || activeTab === 'marketing') && (
              <MarketingSection
                plan={currentPlan.marketingPlan}
                projectName={currentPlan.projectName}
                projectSummary={currentPlan.summary}
                targetAudience={currentPlan.targetAudience}
              />
            )}

            {(activeTab === 'all' || activeTab === 'financial') && (
              <FinancialAndRisksCard
                financial={currentPlan.financialModel}
                risks={currentPlan.risksAndMitigation}
                monetization={currentPlan.monetizationStrategy}
              />
            )}

            {(activeTab === 'all' || activeTab === 'advisor') && (
              <AiAdvisorChat plan={currentPlan} />
            )}
          </div>
        )}
      </main>

      {/* Saved Plans Modal Drawer */}
      <SavedPlansModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        plans={savedPlans}
        onSelectPlan={handleSelectPlan}
        onDeletePlan={handleDeletePlan}
        currentPlanId={currentPlan?.id}
      />

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">GSE AI</span>
            <span>—</span>
            <span>نظام الذكاء الاصطناعي لتحويل الأفكار إلى خطط عمل وخطوات تنفيذ وأفكار تسويق</span>
          </div>
          <div>
            <span>مدعوم بنماذج Gemini 3.8 Flash المتطورة</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
