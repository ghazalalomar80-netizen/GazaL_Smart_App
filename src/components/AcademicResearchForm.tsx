import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Microscope,
  Send,
  HelpCircle,
  Award,
  Layers,
  FileCheck2,
  ListTree,
  ChevronDown
} from 'lucide-react';
import { GenerateResearchInput } from '../types';

interface AcademicResearchFormProps {
  onSubmit: (input: GenerateResearchInput) => void;
  isLoading: boolean;
  onOpenRobotModal: (query?: string, category?: string) => void;
}

const ACADEMIC_DISCIPLINES = [
  'الذكاء الاصطناعي وعلوم البيانات',
  'الطب والعلوم الصحية والصيدلة',
  'الهندسة والتقنيات الحديثة',
  'إدارة الأعمال والاقتصاد والتمويل',
  'العلوم الإنسانية والاجتماعية',
  'التربية وعلم النفس وتطوير التعليم',
  'القانون والأنظمة والسياسات العامة',
  'العلوم البيئية والاستدامة والطاقة المتجددة',
  'علوم الحاسب والأمن السيبراني',
  'الإعلام الرقمي والاتصال الجماهيري',
  'اللغويات والترجمة والآداب'
];

const DEGREE_LEVELS = [
  'بحث تخرج جامعي (Bachelor Thesis)',
  'رسالة ماجستير أكاديمية (Master\'s Dissertation)',
  'أطروحة دكتوراه وبحث متقدم (PhD Thesis)',
  'ورقة بحثية محكمة للنشر (Peer-Reviewed Paper)',
  'مقترح مشروع بحثي لتمويل أو منحة (Research Grant Proposal)',
  'ورقة عمل لمؤتمر علمي دولي (Conference Paper)'
];

const STUDY_TYPES = [
  'دراسة تطبيقية ميدانية (Empirical Field Study)',
  'دراسة وصفية تحليلية (Descriptive & Analytical Study)',
  'دراسة تجريبية وشبه تجريبية (Experimental Research)',
  'مراجعة منهجية وتوليفية (Systematic Literature Review & Meta-Analysis)',
  'دراسة حالة معمقة (In-depth Case Study)',
  'بحث تطويري وبناء نموذج (Developmental / Framework Design)'
];

const METHODOLOGY_APPROACHES = [
  'المنهج المختلط (كمي ونوعي Mixed Methods)',
  'المنهج الكمي الاستدلالي (Quantitative Empirical)',
  'المنهج النوعي الكيفي (Qualitative Exploratory)',
  'المنهج المقارن والمعياري (Comparative & Benchmarking)',
  'المنهج التحليلي الاستنباطي (Deductive & Conceptual)'
];

const INSPIRING_RESEARCH_TOPICS = [
  {
    topic: 'أثر توظيف نماذج الذكاء الاصطناعي التوليدي في تحسين جودة اتخاذ القرار الطبي في أقسام الطوارئ',
    field: 'الطب والعلوم الصحية والصيدلة',
    level: 'رسالة ماجستير أكاديمية (Master\'s Dissertation)'
  },
  {
    topic: 'فاعلية منصات التعلم التكيفي الذكية في تنمية مهارات التفكير الناقد والتحصيل الرياضي لدى طلاب المرحلة الثانوية',
    field: 'التربية وعلم النفس وتطوير التعليم',
    level: 'أطروحة دكتوراه وبحث متقدم (PhD Thesis)'
  },
  {
    topic: 'دور حوكمة الذكاء الاصطناعي في حماية الخصوصية الرقمية والمسؤولية القانونية للأنظمة ذاتية القيادة',
    field: 'القانون والأنظمة والسياسات العامة',
    level: 'ورقة بحثية محكمة للنشر (Peer-Reviewed Paper)'
  },
  {
    topic: 'أثر تبني ممارسات سلاسل الإمداد الخضراء على الأداء المالي المستدام للشركات الصناعية في الشرق الأوسط',
    field: 'إدارة الأعمال والاقتصاد والتمويل',
    level: 'بحث تخرج جامعي (Bachelor Thesis)'
  },
  {
    topic: 'تقييم كفاءة خوارزميات التعلم العميق في الكشف المبكر عن الهجمات السيبرانية في شبكات إنترنت الأشياء (IoT)',
    field: 'علوم الحاسب والأمن السيبراني',
    level: 'ورقة بحثية محكمة للنشر (Peer-Reviewed Paper)'
  },
  {
    topic: 'التحول نحو الهيدروجين الأخضر كركيزة لأمن الطاقة واستدامة الاقتصاد الدائري: دراسة تحليلية مقارنة',
    field: 'العلوم البيئية والاستدامة والطاقة المتجددة',
    level: 'رسالة ماجستير أكاديمية (Master\'s Dissertation)'
  }
];

export const AcademicResearchForm: React.FC<AcademicResearchFormProps> = ({
  onSubmit,
  isLoading,
  onOpenRobotModal
}) => {
  const [topic, setTopic] = useState('');
  const [academicField, setAcademicField] = useState(ACADEMIC_DISCIPLINES[0]);
  const [degreeLevel, setDegreeLevel] = useState(DEGREE_LEVELS[1]);
  const [studyType, setStudyType] = useState(STUDY_TYPES[0]);
  const [methodologyApproach, setMethodologyApproach] = useState(METHODOLOGY_APPROACHES[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    onSubmit({
      topic: topic.trim(),
      academicField,
      degreeLevel,
      studyType,
      methodologyApproach,
      lang: 'ar'
    });
  };

  const handleSelectSample = (sample: typeof INSPIRING_RESEARCH_TOPICS[0]) => {
    setTopic(sample.topic);
    setAcademicField(sample.field);
    setDegreeLevel(sample.level);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6" id="academic-research-form-container">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-l from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-700/40 relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold border border-blue-400/30">
              <GraduationCap className="w-4 h-4 text-blue-300" />
              المنصة الأكاديمية للدراسات والأبحاث العلمية
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-400/30">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-300" />
              توثيق APA 7 ومحاور إحصائية محكمة
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
            حوّل أي تساؤل أو فكرة علمية إلى دراسة وبحث أكاديمي متكامل
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            صياغة فورية للإشكالية البحثية، فرضيات الدراسة، المتغيرات وتعريفاتها الإجرائية، المنهجية والعينة، الإطار النظري، التحليل الإحصائي المقترح، وقائمة المراجع المعتمدة وفق أرقى معايير النشر الأكاديمي.
          </p>

          {/* Quick Stats or Highlights */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-indigo-700/50 text-xs">
            <div className="flex items-center gap-2 text-indigo-200">
              <Microscope className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>ضبط الفرضيات والمتغيرات</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-200">
              <ListTree className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>منهجية وعينات مقننة</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-200">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>تحليل إحصائي (SPSS / R)</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-200">
              <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
              <span>مراجع APA 7th موثقة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Research Formulation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-8 transition-all">
        <form onSubmit={handleSubmit} className="space-y-6" id="research-plan-generator-form">
          {/* Main Topic Input */}
          <div>
            <label
              htmlFor="research-topic-input"
              className="block text-base font-bold text-slate-900 dark:text-white mb-2"
            >
              عنوان البحث أو الإشكالية العلمية المراد دراستها <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="research-topic-input"
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="اكتب عنوان أو موضوع بحثك الأكاديمي أو التساؤل العلمي هنا بالتفصيل... (مثال: أثر تطبيقات الذكاء الاصطناعي في تشخيص الأمراض القلبية المبكرة ودقة اتخاذ القرار الطبي)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base leading-relaxed resize-none"
                required
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5 px-1">
              <span>كلما كان التساؤل أو العنوان محدداً، كانت الخطة الأكاديمية والفرضيات أكثر رصانة وعمقاً.</span>
              <button
                type="button"
                onClick={() => onOpenRobotModal(topic, 'أبحاث ودراسات علمية')}
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                استشر الروبوت الأكاديمي لبلورة الفكرة
              </button>
            </div>
          </div>

          {/* Academic Field & Degree Level Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="academic-field-select"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                التخصص العلمي والأكاديمي
              </label>
              <select
                id="academic-field-select"
                value={academicField}
                onChange={(e) => setAcademicField(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
              >
                {ACADEMIC_DISCIPLINES.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="degree-level-select"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                المستوى والهدف الأكاديمي
              </label>
              <select
                id="degree-level-select"
                value={degreeLevel}
                onChange={(e) => setDegreeLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
              >
                {DEGREE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Toggle Advanced Research Settings */}
          <div>
            <button
              type="button"
              id="toggle-advanced-research-settings-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Layers className="w-4 h-4" />
              <span>خيارات المنهجية والتصميم البحثي المتقدم</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  showAdvanced ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
                <div>
                  <label
                    htmlFor="study-type-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    نوع وتصنيف الدراسة
                  </label>
                  <select
                    id="study-type-select"
                    value={studyType}
                    onChange={(e) => setStudyType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {STUDY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="methodology-approach-select"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    المنهجية الفلسفية والبحثية
                  </label>
                  <select
                    id="methodology-approach-select"
                    value={methodologyApproach}
                    onChange={(e) => setMethodologyApproach(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {METHODOLOGY_APPROACHES.map((app) => (
                      <option key={app} value={app}>
                        {app}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="generate-academic-research-btn"
              disabled={isLoading || !topic.trim()}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري إعداد وصياغة البحث العلمي والأدبيات والمحاور...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>توليد وبناء خطة البحث العلمي المحكمة</span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Inspiring Academic Research Templates */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-800" id="inspiring-research-ideas-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              نماذج أبحاث علمية ملهمة وجاهزة للاختبار بنقرة واحدة
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline-block">
            انقر على أي نموذج لتعبئته مباشرة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {INSPIRING_RESEARCH_TOPICS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              id={`sample-research-topic-${idx}`}
              onClick={() => handleSelectSample(item)}
              className="text-right p-4 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm group cursor-pointer flex flex-col justify-between"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors leading-snug mb-2.5">
                {item.topic}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-medium text-slate-700 dark:text-slate-300">
                  {item.field}
                </span>
                <span className="text-slate-400">•</span>
                <span className="truncate">{item.level.split('(')[0]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
