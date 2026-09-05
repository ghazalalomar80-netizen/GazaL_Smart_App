import React, { useState } from 'react';
import {
  GraduationCap,
  Download,
  Copy,
  Check,
  Share2,
  BookOpen,
  Microscope,
  FileText,
  ListTree,
  Calendar,
  Layers,
  Sparkles,
  Bot,
  Send,
  HelpCircle,
  ExternalLink,
  Award,
  Scale,
  Database,
  ArrowRight,
  Printer
} from 'lucide-react';
import { AcademicResearchPlan } from '../types';

interface AcademicResearchViewerProps {
  researchPlan: AcademicResearchPlan;
  onReset: () => void;
  onOpenRobotModal: (query?: string, category?: string) => void;
}

export const AcademicResearchViewer: React.FC<AcademicResearchViewerProps> = ({
  researchPlan,
  onReset,
  onOpenRobotModal
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'hypotheses_variables' | 'methodology' | 'literature' | 'analysis' | 'roadmap' | 'references' | 'advisor'
  >('overview');
  const [copied, setCopied] = useState(false);
  const [copiedCitationIdx, setCopiedCitationIdx] = useState<number | null>(null);

  // AI Advisor state
  const [advisorQuestion, setAdvisorQuestion] = useState('');
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorHistory, setAdvisorHistory] = useState<Array<{ q: string; a: string }>>([
    {
      q: 'ما هي أهم نقطة قوة في منهجية هذا البحث؟',
      a: `تتميز هذه الدراسة بالربط المحكم بين الإطار النظري والأدوات الإجرائية، واستخدام أساليب إحصائية متقدمة للتحقق من الفرضيات، مما يمنح النتائج قابلية عالية للنشر في المجلات العلمية المحكمة.`
    }
  ]);

  const handleCopyFullDossier = () => {
    const text = `
عنوان البحث: ${researchPlan.title}
English Title: ${researchPlan.englishTitle || 'N/A'}
التخصص: ${researchPlan.academicField} | المستوى: ${researchPlan.academicDegreeLevel} | نوع الدراسة: ${researchPlan.studyType}

الملخص العربي:
${researchPlan.abstractAr}

Abstract (English):
${researchPlan.abstractEn}

الكلمات المفتاحية: ${researchPlan.keywords.join(', ')}

مشكلة البحث:
${researchPlan.problemStatement}

سؤال البحث الرئيسي: ${researchPlan.mainResearchQuestion}
الأسئلة الفرعية:
${researchPlan.subQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

أهداف البحث:
${researchPlan.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

الفجوة البحثية: ${researchPlan.researchGap}

الفرضيات العلمية:
${researchPlan.hypotheses.map((h, i) => `${i + 1}. [${h.type}] ${h.statement}\n   المبرر: ${h.rationale}`).join('\n')}

المتغيرات:
${researchPlan.variables.map((v, i) => `${i + 1}. ${v.name} (${v.type})\n   التعريف الإجرائي: ${v.operationalDefinition}\n   أداة القياس: ${v.measurementTool}`).join('\n')}

المنهجية:
- المنهج: ${researchPlan.methodology.approach}
- مجتمع وعينة الدراسة: ${researchPlan.methodology.populationAndSample}
- أدوات جمع البيانات: ${researchPlan.methodology.dataCollectionTools.join(', ')}
- الصدق والثبات: ${researchPlan.methodology.validityAndReliability}
- الأخلاقيات: ${researchPlan.methodology.ethicalConsiderations.join(', ')}

الإطار النظري:
${researchPlan.literatureReview.theoreticalFramework}

خطة التحليل الإحصائي:
- الأساليب الإحصائية: ${researchPlan.dataAnalysisPlan.statisticalTechniques.join(', ')}
- البرمجيات: ${researchPlan.dataAnalysisPlan.softwareTools.join(', ')}
- النتائج المتوقعة: ${researchPlan.dataAnalysisPlan.expectedFindings}

المراجع (APA 7):
${researchPlan.suggestedReferences.map((r, i) => `[${i + 1}] ${r.citationApa} (${r.sourceType})`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyCitation = (citation: string, idx: number) => {
    navigator.clipboard.writeText(citation);
    setCopiedCitationIdx(idx);
    setTimeout(() => setCopiedCitationIdx(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorQuestion.trim() || advisorLoading) return;

    const q = advisorQuestion.trim();
    setAdvisorQuestion('');
    setAdvisorLoading(true);

    try {
      const response = await fetch('/api/chat-robot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `بصفتك أستاذ جامعي ومستشار أبحاث علمية في GSE AI، أجب عن هذا السؤال المتعلق ببحثنا بعنوان "${researchPlan.title}": ${q}`,
          topicCategory: 'أبحاث ودراسات علمية',
          projectContext: {
            projectName: researchPlan.title,
            summary: researchPlan.abstractAr
          }
        })
      });

      const data = await response.json();
      setAdvisorHistory((prev) => [...prev, { q, a: data.answer || 'تمت الإجابة بنجاح.' }]);
    } catch (err) {
      setAdvisorHistory((prev) => [
        ...prev,
        {
          q,
          a: 'يمكنك مراجعة الأدبيات السابقة ذات الصلة أو استشارة لجنة الإشراف الأكاديمي لضبط تفاصيل هذا الجانب.'
        }
      ]);
    } finally {
      setAdvisorLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6" id="academic-research-viewer-container">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          type="button"
          id="back-to-research-form-btn"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بدء دراسة أو بحث علمي جديد</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="print-academic-research-btn"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition cursor-pointer"
            title="طباعة أو تصدير كـ PDF"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>طباعة / تصدير PDF</span>
          </button>

          <button
            type="button"
            id="copy-full-research-dossier-btn"
            onClick={handleCopyFullDossier}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>تم نسخ ملف البحث كاملاً!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ محتوى البحث</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Research Title & Metadata Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden mb-6">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30 inline-flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
              {researchPlan.academicField}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold border border-indigo-400/30">
              {researchPlan.academicDegreeLevel}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-medium">
              {researchPlan.studyType}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-relaxed mb-2 font-serif">
            {researchPlan.title}
          </h1>

          {researchPlan.englishTitle && (
            <p className="text-sm sm:text-base text-slate-300 font-sans italic font-normal mb-4 text-left dir-ltr">
              {researchPlan.englishTitle}
            </p>
          )}

          {/* Keywords */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-700/60 text-xs">
            <span className="text-slate-400 font-semibold ml-2">الكلمات المفتاحية:</span>
            {researchPlan.keywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md bg-white/10 text-slate-200 font-medium"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-slate-200 dark:border-slate-800 no-scrollbar" id="academic-research-tabs">
        <button
          type="button"
          id="tab-btn-overview"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>الملخص والمشكلة والأهمية</span>
        </button>

        <button
          type="button"
          id="tab-btn-hypotheses-variables"
          onClick={() => setActiveTab('hypotheses_variables')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'hypotheses_variables'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>الفرضيات والمتغيرات</span>
        </button>

        <button
          type="button"
          id="tab-btn-methodology"
          onClick={() => setActiveTab('methodology')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'methodology'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ListTree className="w-4 h-4" />
          <span>المنهجية والعينة والأدوات</span>
        </button>

        <button
          type="button"
          id="tab-btn-literature"
          onClick={() => setActiveTab('literature')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'literature'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>الإطار النظري والأدبيات</span>
        </button>

        <button
          type="button"
          id="tab-btn-analysis"
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'analysis'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>التحليل الإحصائي والبرمجيات</span>
        </button>

        <button
          type="button"
          id="tab-btn-roadmap"
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'roadmap'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>الخطة الزمنية للإنجاز</span>
        </button>

        <button
          type="button"
          id="tab-btn-references"
          onClick={() => setActiveTab('references')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'references'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>المراجع (APA 7th)</span>
        </button>

        <button
          type="button"
          id="tab-btn-advisor"
          onClick={() => setActiveTab('advisor')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'advisor'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>مستشار البحث الأكاديمي</span>
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className="space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Arabic Abstract & English Abstract */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    الملخص باللغة العربية (Abstract)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold">
                    معتمد
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                  {researchPlan.abstractAr}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    Abstract (English)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-semibold">
                    Peer-Review Ready
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-left dir-ltr font-sans">
                  {researchPlan.abstractEn}
                </p>
              </div>
            </div>

            {/* Problem Statement & Research Gap */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                مشكلة البحث وخلفيتها العلمية (Problem Statement)
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {researchPlan.problemStatement}
              </p>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  الفجوة البحثية التي يسدها هذا البحث (Research Gap):
                </div>
                <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
                  {researchPlan.researchGap}
                </p>
              </div>
            </div>

            {/* Research Questions & Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  تساؤلات الدراسة (Research Questions)
                </h3>
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-4">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block mb-1">
                    السؤال الرئيسي:
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                    {researchPlan.mainResearchQuestion}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    الأسئلة الفرعية:
                  </span>
                  {researchPlan.subQuestions.map((sq, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        {i + 1}
                      </span>
                      <span>{sq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  أهداف البحث المحددة (Research Objectives)
                </h3>
                <div className="space-y-3">
                  {researchPlan.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="w-5 h-5 rounded-md bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                        ✓
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-snug">
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Theoretical & Practical Significance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  الأهمية النظرية والعلمية (Theoretical Significance)
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {researchPlan.significance.theoretical}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-teal-600" />
                  الأهمية التطبيقية والميدانية (Practical Significance)
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {researchPlan.significance.practical}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HYPOTHESES & VARIABLES */}
        {activeTab === 'hypotheses_variables' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Hypotheses */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                الفرضيات العلمية للدراسة (Research Hypotheses)
              </h3>
              <div className="space-y-4">
                {researchPlan.hypotheses.map((hyp, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                        {hyp.type}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">فرضية #{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {hyp.statement}
                    </p>
                    <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/80 dark:border-slate-700/60">
                      <span className="font-medium text-slate-700 dark:text-slate-300">الأساس النظري والمبرر: </span>
                      {hyp.rationale}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variables */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-blue-600" />
                المتغيرات والتعريفات الإجرائية (Operational Variables & Scales)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {researchPlan.variables.map((v, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {v.name}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                        {v.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                        التعريف الإجرائي (Operational Definition):
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {v.operationalDefinition}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                        أداة القياس المعتمدة:
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {v.measurementTool}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: METHODOLOGY */}
        {activeTab === 'methodology' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ListTree className="w-5 h-5 text-emerald-600" />
                تصميم المنهجية وإجراءات البحث (Research Design & Procedures)
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                    المنهج العلمي المتبع:
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {researchPlan.methodology.approach}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                    مجتمع البحث والعينة (Population & Sampling):
                  </span>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {researchPlan.methodology.populationAndSample}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mb-1.5">
                    أدوات جمع البيانات (Instruments):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {researchPlan.methodology.dataCollectionTools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700"
                      >
                        ✓ {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block mb-1">
                    إجراءات الصدق والثبات (Validity & Reliability):
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {researchPlan.methodology.validityAndReliability}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1.5">
                    الاعتبارات الأخلاقية للبحث (Research Ethics):
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {researchPlan.methodology.ethicalConsiderations.map((eth, idx) => (
                      <li key={idx}>{eth}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LITERATURE REVIEW */}
        {activeTab === 'literature' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Theoretical Framework */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                الإطار النظري المفسر (Theoretical Framework)
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {researchPlan.literatureReview.theoreticalFramework}
              </p>
            </div>

            {/* Literature Review Themes */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                محاور مراجعة الأدبيات والدراسات السابقة (Thematic Literature Review)
              </h3>

              {researchPlan.literatureReview.themes.map((theme, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-blue-600 dark:text-blue-400">
                      المحور {i + 1}: {theme.themeTitle}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                    {theme.synthesis}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      النظريات والمصادر المرجعية المرتبطة:{' '}
                    </span>
                    {theme.keyScholarsOrTheories}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DATA ANALYSIS PLAN */}
        {activeTab === 'analysis' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                خطة المعالجة والتحليل الإحصائي (Statistical Data Analysis Plan)
              </h3>

              <div className="space-y-5">
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                    الأساليب والاختبارات الإحصائية المقترحة:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {researchPlan.dataAnalysisPlan.statisticalTechniques.map((tech, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
                    البرمجيات الإحصائية الموصى بها:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {researchPlan.dataAnalysisPlan.softwareTools.map((sw, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
                    النتائج والتوقعات العلمية المرجوة (Expected Findings):
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200/90 leading-relaxed">
                    {researchPlan.dataAnalysisPlan.expectedFindings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ROADMAP & PHASES */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                خطة العمل ومراحل إنجاز البحث (Research Execution Roadmap)
              </h3>

              <div className="relative border-r-2 border-indigo-200 dark:border-indigo-900 pr-4 sm:pr-6 space-y-8">
                {researchPlan.roadmap.map((phase) => (
                  <div key={phase.phaseNumber} className="relative group">
                    {/* Phase Marker */}
                    <div className="absolute -right-7 sm:-right-9 top-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center border-4 border-white dark:border-slate-900 shadow">
                      {phase.phaseNumber}
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {phase.phaseName}
                        </h4>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                          {phase.duration}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-700/60 text-xs">
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          المخرج الأساسي للمرحلة:{' '}
                        </span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {phase.keyDeliverable}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          المهام الإجرائية:
                        </span>
                        {phase.tasks.map((task, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: REFERENCES (APA 7th) */}
        {activeTab === 'references' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  قائمة المراجع والمصادر المقترحة (وفق نظام APA 7th)
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  توثيق أكاديمي وفق الإصدار السابع
                </span>
              </div>

              <div className="space-y-3">
                {researchPlan.suggestedReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 flex flex-col sm:flex-row sm:items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                          {ref.sourceType}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-serif text-slate-900 dark:text-white leading-relaxed text-left dir-ltr pl-7">
                        {ref.citationApa}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 pl-7">
                        <span className="font-medium text-slate-600 dark:text-slate-300">صلته بالبحث: </span>
                        {ref.relevance}
                      </p>
                    </div>

                    <button
                      type="button"
                      id={`copy-ref-btn-${idx}`}
                      onClick={() => handleCopyCitation(ref.citationApa, idx)}
                      className="shrink-0 p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 text-xs font-medium inline-flex items-center gap-1 transition cursor-pointer self-end sm:self-center"
                    >
                      {copiedCitationIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ التوثيق</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: AI ADVISOR */}
        {activeTab === 'advisor' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      مستشار البحث العلمي والأطروحات
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      استفسر عن أي تفصيل في الإشكالية، الصدق والثبات، الفرضيات أو النشر المحكم
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenRobotModal(`أحتاج استشارة معمقة حول بحثي الأكاديمي: ${researchPlan.title}`, 'أبحاث ودراسات علمية')
                  }
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>فتح الروبوت الشامل</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto pr-1">
                {advisorHistory.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start gap-2 justify-end">
                      <div className="p-3 rounded-xl bg-blue-600 text-white text-xs sm:text-sm max-w-[80%]">
                        {item.q}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs shrink-0 mt-1">
                        🎓
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm max-w-[85%] leading-relaxed">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}

                {advisorLoading && (
                  <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 py-2">
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span>المستشار الأكاديمي يقوم بالتحليل والصياغة...</span>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleAskAdvisor} className="flex gap-2">
                <input
                  type="text"
                  id="academic-advisor-input"
                  value={advisorQuestion}
                  onChange={(e) => setAdvisorQuestion(e.target.value)}
                  placeholder="اسأل المستشار الأكاديمي عن منهجية البحث، العينة، الاستبانة، أو المراجع..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  id="send-academic-advisor-btn"
                  disabled={advisorLoading || !advisorQuestion.trim()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
