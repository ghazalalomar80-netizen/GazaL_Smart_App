import React from 'react';
import {
  Sparkles,
  Bookmark,
  PlusCircle,
  Printer,
  Check,
  Copy,
  Compass,
  FileDown,
  Globe,
  Bot,
  FileText,
  Languages,
  Loader2,
  Search,
  GraduationCap
} from 'lucide-react';
import { ProjectPlan } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentPlan: ProjectPlan | null;
  savedCount: number;
  onOpenSaved: () => void;
  onNewPlan: () => void;
  onOpenSkillMatcher?: () => void;
  onOpenTrendingSearch?: () => void;
  onOpenAcademicResearch?: () => void;
  onOpenRobot?: () => void;
  onTranslatePlan?: () => void;
  isTranslatingPlan?: boolean;
  activeMode?: 'convert_idea' | 'skill_budget' | 'trending_search' | 'academic_research';
}

export const Header: React.FC<HeaderProps> = ({
  currentPlan,
  savedCount,
  onOpenSaved,
  onNewPlan,
  onOpenSkillMatcher,
  onOpenTrendingSearch,
  onOpenAcademicResearch,
  onOpenRobot,
  onTranslatePlan,
  isTranslatingPlan = false,
  activeMode,
}) => {
  const [copied, setCopied] = React.useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const isEn = language === 'en';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    if (!currentPlan) return;

    let md = `# ملف استراتيجية المشروع: ${currentPlan.projectName}\n`;
    md += `**الشعار:** ${currentPlan.slogan}\n`;
    md += `**التصنيف:** ${currentPlan.category}\n\n`;
    md += `## 1. الملخص التنفيذي والميزة التنافسية\n`;
    md += `${currentPlan.summary}\n\n`;
    md += `* **الميزة التنافسية (USP):** ${currentPlan.uniqueSellingPoint}\n`;
    md += `* **أول إنجاز سريع (خلال 24 ساعة):** ${currentPlan.quickWin}\n\n`;

    if (currentPlan.monetizationStrategy) {
      md += `## 2. استراتيجية تحقيق الأرباح (Monetization)\n`;
      md += `* **آلية الربح الأساسية:** ${currentPlan.monetizationStrategy.primaryMethod}\n`;
      md += `* **نموذج التسعير:** ${currentPlan.monetizationStrategy.pricingModel}\n`;
      md += `* **هامش الربح المتوقع:** ${currentPlan.monetizationStrategy.profitMarginEstimate}\n`;
      md += `* **مضاعفة الأرباح:** ${currentPlan.monetizationStrategy.howToMaximizeProfit}\n`;
      md += `* **إمكانية الدخل المتكرر:** ${currentPlan.monetizationStrategy.recurringRevenuePotential}\n\n`;
    }

    if (currentPlan.targetPersona) {
      md += `## 3. شخصية العميل المثالي (ICP)\n`;
      md += `* **الاسم والدور:** ${currentPlan.targetPersona.name} (${currentPlan.targetPersona.roleOrStatus})\n`;
      md += `* **المشكلة الكبرى:** ${currentPlan.targetPersona.coreFrustration}\n`;
      md += `* **محفز الشراء الحاسم:** ${currentPlan.targetPersona.buyingTrigger}\n`;
      md += `* **الاعتراض وطريقة تجاوزه:** ${currentPlan.targetPersona.objectionAndSolution}\n\n`;
    }

    if (currentPlan.swotAnalysis) {
      md += `## 4. مصفوفة سوات الاستراتيجية (SWOT Analysis)\n`;
      md += `### نقاط القوة (Strengths):\n` + currentPlan.swotAnalysis.strengths.map(s => `- ${s}`).join('\n') + '\n\n';
      md += `### نقاط الضعف (Weaknesses):\n` + currentPlan.swotAnalysis.weaknesses.map(w => `- ${w}`).join('\n') + '\n\n';
      md += `### الفرص السوقية (Opportunities):\n` + currentPlan.swotAnalysis.opportunities.map(o => `- ${o}`).join('\n') + '\n\n';
      md += `### التهديدات والتحوط (Threats):\n` + currentPlan.swotAnalysis.threats.map(t => `- ${t}`).join('\n') + '\n\n';
    }

    md += `## 5. خارطة الطريق التنفيذية\n`;
    currentPlan.executionPlan.forEach(stage => {
      md += `### المرحلة ${stage.stageNumber}: ${stage.stageName} (المدة: ${stage.duration})\n`;
      md += `*الهدف الأساسي:* ${stage.objective}\n`;
      stage.tasks.forEach(t => {
        md += `- [${t.completed ? 'x' : ' '}] **${t.task}** (${t.duration} - أولوية: ${t.priority}): ${t.description}\n`;
      });
      md += '\n';
    });

    md += `## 6. الخطة التسويقية وحملة الإطلاق\n`;
    md += `### حملة الإطلاق: ${currentPlan.marketingPlan.launchCampaign.title}\n`;
    md += `*الفكرة:* ${currentPlan.marketingPlan.launchCampaign.concept}\n`;
    currentPlan.marketingPlan.launchCampaign.steps.forEach(st => {
      md += `  1. ${st}\n`;
    });
    md += `\n### قنوات التسويق المقترحة:\n`;
    currentPlan.marketingPlan.channels.forEach(ch => {
      md += `- **${ch.name}** (${ch.type}): ${ch.whyThisChannel} -> *التنفيذ الموصى به:* ${ch.recommendedAction}\n`;
    });

    md += `\n### خطافات إعلانية (Hooks):\n`;
    currentPlan.marketingPlan.adHooks.forEach(hk => {
      md += `- **${hk.platform}:** "${hk.hook}" -> CTA: ${hk.callToAction}\n`;
    });

    md += `\n## 7. النموذج المالي والمخاطر\n`;
    md += `* **التكلفة التأسيسية المقدرة:** ${currentPlan.financialModel.initialCostEstimate}\n`;
    md += `* **الوصول لنقطة التعادل:** ${currentPlan.financialModel.breakevenTimeline}\n`;
    md += `* **مصادر الإيرادات:** ${currentPlan.financialModel.revenueStreams.join(' | ')}\n\n`;

    md += `### إدارة المخاطر:\n`;
    currentPlan.risksAndMitigation.forEach(r => {
      md += `- **تحدي:** ${r.risk}\n  - **الحل:** ${r.solution}\n`;
    });

    md += `\n---\n*تم التوليد والتطوير عبر GSE AI - منصة تحويل الأفكار إلى مشاريع واقعية ناجحة*`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentPlan.projectName.replace(/\s+/g, '_')}_خطة_العمل.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    if (!currentPlan) return;
    const text = isEn
      ? `📋 Project Plan: ${currentPlan.projectName}\nSlogan: ${currentPlan.slogan}\n\nExecutive Summary:\n${currentPlan.summary}\n\n24-Hour Quick Win:\n${currentPlan.quickWin}\n\nUnique Value Prop:\n${currentPlan.uniqueSellingPoint}\n\nGenerated with GSE AI`
      : `📋 خطة مشروع: ${currentPlan.projectName}\nالشعار: ${currentPlan.slogan}\n\nملخص المشروع:\n${currentPlan.summary}\n\nأول إنجاز سريع (24 ساعة):\n${currentPlan.quickWin}\n\nالميزة التنافسية:\n${currentPlan.uniqueSellingPoint}\n\nتم إنشاؤه عبر منصة GSE AI`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={onNewPlan}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                GSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">AI</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 hidden sm:inline-block">
                {isEn ? 'Venture & Marketing Planner' : 'مخطط المشاريع والتسويق'}
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden lg:block">
              {isEn
                ? 'Transform any idea into an actionable execution plan and smart marketing strategy'
                : 'حوّل أي فكرة إلى خطة تنفيذ واقعية واستراتيجية تسويقية ذكية'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
          {/* Universal AI Robot Trigger Button */}
          {onOpenRobot && (
            <button
              id="btn-open-universal-robot"
              onClick={onOpenRobot}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-xs shadow-purple-200 transition-all hover:shadow-md animate-pulse shrink-0"
              title={isEn ? 'Open Universal Multilingual AI Robot' : 'فتح الروبوت الذكي الشامل (يتحدث كل اللغات)'}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isEn ? 'Universal AI Robot' : 'الروبوت الذكي الشامل'}
              </span>
              <span className="sm:hidden text-[11px]">
                {isEn ? 'AI Bot' : 'الروبوت'}
              </span>
            </button>
          )}

          {/* Current Plan Actions */}
          {currentPlan && (
            <>
              {/* Translate Plan Language Button */}
              {onTranslatePlan && (
                <button
                  id="btn-translate-plan"
                  onClick={onTranslatePlan}
                  disabled={isTranslatingPlan}
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors border border-cyan-200/80 disabled:opacity-50"
                  title={isEn ? 'Translate Plan to Arabic' : 'ترجمة الخطة إلى الإنجليزية'}
                >
                  {isTranslatingPlan ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-600" />
                  ) : (
                    <Languages className="w-3.5 h-3.5 text-cyan-600" />
                  )}
                  <span>
                    {isTranslatingPlan
                      ? (isEn ? 'Translating...' : 'جاري الترجمة...')
                      : (isEn ? 'عرب الخطة' : 'English Plan')}
                  </span>
                </button>
              )}

              {/* Export as Professional PDF */}
              <button
                id="btn-export-pdf"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200/80"
                title={isEn ? 'Export Current Plan as Organized PDF' : 'تصدير الخطة الحالية كملف PDF منظم واحترافي'}
              >
                <FileText className="w-3.5 h-3.5 text-rose-600" />
                <span>{isEn ? 'Export PDF' : 'تصدير PDF'}</span>
              </button>

              <button
                id="btn-download-markdown"
                onClick={handleDownloadMarkdown}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200/80"
                title={isEn ? 'Download full strategy as Markdown' : 'تحميل تقرير كامل (MD)'}
              >
                <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                <span>MD</span>
              </button>

              <button
                id="btn-copy-summary"
                onClick={handleCopySummary}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title={isEn ? 'Copy summary' : 'نسخ الملخص'}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isEn ? 'Copied' : 'تم النسخ'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Copy' : 'نسخ'}</span>
                  </>
                )}
              </button>
            </>
          )}

          {onOpenAcademicResearch && !currentPlan && (
            <button
              id="btn-nav-academic-research"
              onClick={onOpenAcademicResearch}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'academic_research'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
              title={isEn ? 'Academic Studies & Scientific Research' : 'أبحاث ودراسات علمية ومناهج أكاديمية'}
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">{isEn ? 'Academic Studies' : 'أبحاث ودراسات علمية'}</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-1.5 py-0.5 rounded-full">
                🎓
              </span>
            </button>
          )}

          {onOpenTrendingSearch && !currentPlan && (
            <button
              id="btn-nav-trending-search"
              onClick={onOpenTrendingSearch}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'trending_search'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs'
                  : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/50'
              }`}
              title={isEn ? 'Universal Search & Most Searched Topics' : 'مركز البحث واكتشاف الأكثر طلباً'}
            >
              <Search className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">{isEn ? 'All Searches' : 'كل ما تبحث عنه'}</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full">
                🔥
              </span>
            </button>
          )}

          {onOpenSkillMatcher && !currentPlan && (
            <button
              id="btn-nav-skill-matcher"
              onClick={onOpenSkillMatcher}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'skill_budget'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? 'Skill Matcher' : 'اقتراح حسب المهارات'}</span>
            </button>
          )}

          {/* Saved Plans Drawer Button */}
          <button
            id="btn-saved-plans"
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg transition-colors relative"
            title={isEn ? 'Saved Plans' : 'الخطط المحفوظة'}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden md:inline">{isEn ? 'Saved' : 'المحفوظات'}</span>
            {savedCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Language Switcher Button (Arabic <-> English) */}
          <button
            id="btn-switch-language"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-lg transition-colors"
            title={isEn ? 'التبديل إلى العربية' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isEn ? 'العربية' : 'English'}</span>
          </button>

          {/* New Plan Button */}
          {currentPlan && (
            <button
              id="btn-new-plan"
              onClick={onNewPlan}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg shadow-xs shadow-indigo-200 transition-all hover:shadow-md shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{isEn ? 'New Plan' : 'فكرة جديدة'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

