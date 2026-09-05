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
import { UniversalRobotModal } from './components/UniversalRobotModal';
import { SavedPlansModal } from './components/SavedPlansModal';
import { UniversalSearchHub } from './components/UniversalSearchHub';
import { AcademicResearchForm } from './components/AcademicResearchForm';
import { AcademicResearchViewer } from './components/AcademicResearchViewer';
import { ProjectPlan, GeneratePlanInput, AcademicResearchPlan, GenerateResearchInput } from './types';
import {
  getSavedPlans,
  savePlanToStorage,
  deletePlanFromStorage,
  getSavedResearchPlans,
  saveResearchPlanToStorage,
  deleteResearchPlanFromStorage
} from './utils/storage';
import { useLanguage } from './context/LanguageContext';
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
  Globe,
  Printer,
  Search,
  Flame,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const { language, t, isRTL } = useLanguage();
  const isEn = language === 'en';

  const [currentPlan, setCurrentPlan] = useState<ProjectPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<ProjectPlan[]>([]);
  const [currentResearch, setCurrentResearch] = useState<AcademicResearchPlan | null>(null);
  const [savedResearchPlans, setSavedResearchPlans] = useState<AcademicResearchPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResearchLoading, setIsResearchLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isRobotOpen, setIsRobotOpen] = useState(false);
  const [robotInitialQuery, setRobotInitialQuery] = useState<string | undefined>(undefined);
  const [robotInitialCategory, setRobotInitialCategory] = useState<string | undefined>(undefined);
  const [isTranslatingPlan, setIsTranslatingPlan] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'canvas' | 'pitch' | 'strategy' | 'calculator' | 'execution' | 'marketing' | 'financial' | 'advisor'>('all');
  const [mainMode, setMainMode] = useState<'convert_idea' | 'skill_budget' | 'trending_search' | 'academic_research'>('academic_research');

  // Load saved plans and research studies on initial render
  useEffect(() => {
    const plans = getSavedPlans();
    setSavedPlans(plans);
    const researchList = getSavedResearchPlans();
    setSavedResearchPlans(researchList);
  }, []);

  const handleGenerateResearch = async (input: GenerateResearchInput) => {
    setIsResearchLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, lang: language }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || (isEn ? 'Failed to generate academic research' : 'فشل في توليد الدراسة والأطروحة العلمية'));
      }

      const plan: AcademicResearchPlan = await response.json();
      setCurrentResearch(plan);
      setCurrentPlan(null);
      const updated = saveResearchPlanToStorage(plan);
      setSavedResearchPlans(updated);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error in handleGenerateResearch:', err);
      setErrorMessage(
        err.message || (isEn ? 'An unexpected error occurred while generating academic study.' : 'حدث خطأ غير متوقع أثناء توليد الدراسة والبحث العلمي.')
      );
    } finally {
      setIsResearchLoading(false);
    }
  };

  const handleGeneratePlan = async (input: GeneratePlanInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, lang: language }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || (isEn ? 'Failed to generate plan' : 'فشل في توليد الخطة'));
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
        err.message || (isEn ? 'An unexpected error occurred while generating the plan.' : 'حدث خطأ غير متوقع أثناء توليد الخطة بواسطة الذكاء الاصطناعي.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslatePlan = async () => {
    if (!currentPlan || isTranslatingPlan) return;
    setIsTranslatingPlan(true);
    try {
      const targetLang = currentPlan.lang === 'en' ? 'ar' : 'en';
      const response = await fetch('/api/translate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectPlan: currentPlan, targetLang }),
      });

      if (!response.ok) {
        throw new Error(isEn ? 'Failed to translate plan' : 'فشل في ترجمة الخطة');
      }

      const translatedPlan = await response.json();
      setCurrentPlan(translatedPlan);
      const updated = savePlanToStorage(translatedPlan);
      setSavedPlans(updated);
    } catch (err: any) {
      console.error('Error translating plan:', err);
    } finally {
      setIsTranslatingPlan(false);
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
      budgetLevel: budgetLevel || (isEn ? 'Very Low / Bootstrapped' : 'منخفضة جداً / صفرية'),
      timeframe: isEn ? '1 to 3 months' : 'شهر إلى 3 أشهر',
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

  const handleDeleteResearchPlan = (researchId: string) => {
    const updated = deleteResearchPlanFromStorage(researchId);
    setSavedResearchPlans(updated);
    if (currentResearch?.id === researchId) {
      setCurrentResearch(null);
    }
  };

  const handleNewPlan = () => {
    setCurrentPlan(null);
    setCurrentResearch(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskRobotTopic = (query: string, category: string) => {
    setRobotInitialQuery(query);
    setRobotInitialCategory(category);
    setIsRobotOpen(true);
  };

  const handleGeneratePlanFromTopic = (ideaPrompt: string, category?: string) => {
    setCurrentPlan(null);
    setCurrentResearch(null);
    setMainMode('convert_idea');
    handleGeneratePlan({
      idea: ideaPrompt,
      field: category,
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Top Navbar */}
      <Header
        currentPlan={currentPlan}
        savedCount={savedPlans.length + savedResearchPlans.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onNewPlan={handleNewPlan}
        onOpenAcademicResearch={() => {
          setCurrentPlan(null);
          setCurrentResearch(null);
          setMainMode('academic_research');
        }}
        onOpenTrendingSearch={() => {
          setCurrentPlan(null);
          setCurrentResearch(null);
          setMainMode('trending_search');
        }}
        onOpenSkillMatcher={() => {
          setCurrentPlan(null);
          setCurrentResearch(null);
          setMainMode('skill_budget');
        }}
        onOpenRobot={() => setIsRobotOpen(true)}
        onTranslatePlan={handleTranslatePlan}
        isTranslatingPlan={isTranslatingPlan}
        activeMode={mainMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Dedicated Clean Print & PDF Cover Header for Business Plans */}
        {currentPlan && (
          <div className="hidden print:block mb-8 pb-6 border-b-2 border-indigo-600">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
                  GSE AI — {isEn ? 'Strategic Venture Blueprint & Execution Plan' : 'وثيقة الخطة الاستراتيجية والتنفيذية'}
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{currentPlan.projectName}</h1>
                <p className="text-base text-slate-600 mt-1 italic">{currentPlan.slogan}</p>
              </div>
              <div className="text-end text-xs text-slate-500">
                <div><strong>{isEn ? 'Category:' : 'التصنيف:'}</strong> {currentPlan.category}</div>
                <div><strong>{isEn ? 'Date:' : 'التاريخ:'}</strong> {new Date(currentPlan.createdAt).toLocaleDateString()}</div>
                <div><strong>{isEn ? 'Platform:' : 'المنصة:'}</strong> GSE AI</div>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">{isEn ? 'Notice: ' : 'تنبيه: '}</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800"
            >
              {isEn ? 'Close' : 'إغلاق'}
            </button>
          </div>
        )}

        {/* Display either academic research viewer, business plan, or generation hubs */}
        {currentResearch ? (
          <AcademicResearchViewer
            researchPlan={currentResearch}
            onReset={() => {
              setCurrentResearch(null);
              setMainMode('academic_research');
            }}
            onOpenRobotModal={handleAskRobotTopic}
          />
        ) : !currentPlan ? (
          <div className="space-y-6">
            {/* Mode Switcher Segmented Control */}
            <div className="flex items-center justify-center">
              <div className="bg-slate-200/90 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner border border-slate-300/70 max-w-2xl w-full overflow-x-auto">
                <button
                  type="button"
                  id="tab-academic-research"
                  onClick={() => setMainMode('academic_research')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    mainMode === 'academic_research'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{isEn ? 'Scientific Studies & Research' : 'أبحاث ودراسات علمية'}</span>
                  <span className="hidden md:inline-block text-[10px] bg-blue-500/20 text-blue-100 font-extrabold px-1.5 py-0.5 rounded-full">
                    🎓
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-convert-idea"
                  onClick={() => setMainMode('convert_idea')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    mainMode === 'convert_idea'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-indigo-600" />
                  <span>{isEn ? 'Transform Idea' : 'تحويل فكرة'}</span>
                </button>

                <button
                  type="button"
                  id="tab-skill-budget"
                  onClick={() => setMainMode('skill_budget')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    mainMode === 'skill_budget'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Match by Skills' : 'اقتراح حسب المهارات'}</span>
                </button>

                <button
                  type="button"
                  id="tab-trending-search"
                  onClick={() => setMainMode('trending_search')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    mainMode === 'trending_search'
                      ? 'bg-white text-amber-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>{isEn ? 'All Searches' : 'كل ما تبحث عنه'}</span>
                  <span className="hidden sm:inline-block text-[10px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded-full">
                    🔥
                  </span>
                </button>
              </div>
            </div>

            {mainMode === 'academic_research' ? (
              <AcademicResearchForm
                onSubmit={handleGenerateResearch}
                isLoading={isResearchLoading}
                onOpenRobotModal={handleAskRobotTopic}
              />
            ) : mainMode === 'convert_idea' ? (
              <IdeaInputForm
                onSubmit={handleGeneratePlan}
                isLoading={isLoading}
                onSwitchToSkillMatcher={() => setMainMode('skill_budget')}
                onSwitchToTrendingSearch={() => setMainMode('trending_search')}
                onSwitchToAcademicResearch={() => setMainMode('academic_research')}
              />
            ) : mainMode === 'skill_budget' ? (
              <SkillBudgetMatcher
                onSelectSuggestionForFullPlan={handleSelectSuggestionForFullPlan}
              />
            ) : (
              <UniversalSearchHub
                onGeneratePlanFromTopic={handleGeneratePlanFromTopic}
                onAskRobotTopic={handleAskRobotTopic}
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
                <span>{isEn ? 'All Sections' : 'عرض كامل الخطة'}</span>
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
                <span>Lean Canvas</span>
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
                <span>Pitch Deck</span>
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
                <span>{isEn ? 'Strategic SWOT' : 'التحليل الاستراتيجي و SWOT'}</span>
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
                <span>{isEn ? 'Unit Economics' : 'حاسبة الجدوى والوحدة'}</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                  {isEn ? 'Live' : 'تفاعلية'}
                </span>
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
                <span>{isEn ? 'Roadmap' : 'خطوات التنفيذ'}</span>
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
                <span>{isEn ? 'Marketing' : 'أفكار التسويق'}</span>
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
                <span>{isEn ? 'Monetization' : 'طريقة الربح والمالية'}</span>
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
                <span>{isEn ? 'AI Advisor' : 'المستشار الذكي'}</span>
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

      {/* Floating Omnilingual AI Robot Launcher Button */}
      <div className="fixed bottom-6 end-6 z-40 no-print">
        <button
          id="floating-robot-btn"
          onClick={() => setIsRobotOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/30 border border-white/20 transition-all transform hover:scale-105 active:scale-95"
          title={isEn ? 'Open Universal Multilingual AI Robot' : 'فتح الروبوت الذكي الشامل (يتحدث كل اللغات)'}
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -end-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
          </div>
          <div className="text-start hidden sm:block">
            <div className="text-xs font-extrabold flex items-center gap-1">
              <span>{isEn ? 'Universal AI Robot' : 'الروبوت الذكي الشامل'}</span>
              <Sparkles className="w-3 h-3 text-cyan-300" />
            </div>
            <div className="text-[10px] text-indigo-100 font-normal">
              {isEn ? 'Speaks all languages • All topics' : 'يتحدث جميع اللغات • دراسة، استنتاج وحلول'}
            </div>
          </div>
        </button>
      </div>

      {/* Universal Omnilingual Robot Modal */}
      <UniversalRobotModal
        isOpen={isRobotOpen}
        onClose={() => {
          setIsRobotOpen(false);
          setRobotInitialQuery(undefined);
          setRobotInitialCategory(undefined);
        }}
        currentPlan={currentPlan}
        initialQuery={robotInitialQuery}
        initialCategory={robotInitialCategory}
      />

      {/* Saved Plans & Academic Studies Modal Drawer */}
      <SavedPlansModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        plans={savedPlans}
        onSelectPlan={handleSelectPlan}
        onDeletePlan={handleDeletePlan}
        currentPlanId={currentPlan?.id}
        researchPlans={savedResearchPlans}
        onSelectResearchPlan={(r) => {
          setCurrentPlan(null);
          setCurrentResearch(r);
          setIsSavedModalOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDeleteResearchPlan={handleDeleteResearchPlan}
        currentResearchId={currentResearch?.id}
      />

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">GSE AI</span>
            <span>—</span>
            <span>
              {isEn
                ? 'AI Venture OS: Turning ideas into executable startups, studies, logic deductions & marketing'
                : 'نظام الذكاء الاصطناعي لتحويل الأفكار إلى خطط عمل وخطوات تنفيذ وأفكار تسويق ودراسات واستنتاج'}
            </span>
          </div>
          <div>
            <span>
              {isEn ? 'Powered by Gemini 3.8 Flash' : 'مدعوم بنماذج Gemini 3.8 Flash المتطورة'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

