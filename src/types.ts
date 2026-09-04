export interface TaskItem {
  id: string;
  task: string;
  description: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  duration: string;
  completed: boolean;
}

export interface ExecutionStage {
  stageNumber: number;
  stageName: string;
  duration: string;
  objective: string;
  tasks: TaskItem[];
}

export interface MarketingChannel {
  name: string;
  type: string;
  whyThisChannel: string;
  recommendedAction: string;
}

export interface AdHook {
  platform: string;
  hook: string;
  callToAction: string;
}

export interface LaunchCampaign {
  title: string;
  concept: string;
  steps: string[];
}

export interface MarketingPlan {
  guerrillaIdeas: string[];
  channels: MarketingChannel[];
  adHooks: AdHook[];
  launchCampaign: LaunchCampaign;
  growthTactics: string[];
}

export interface TargetAudience {
  description: string;
  keySegments: string[];
  painPoints: string[];
  valueDelivered: string;
}

export interface FinancialModel {
  initialCostEstimate: string;
  revenueStreams: string[];
  operationalCosts: string[];
  breakevenTimeline: string;
}

export interface MonetizationStrategy {
  primaryMethod: string; // طريقة الربح الأساسية بالتفصيل
  pricingModel: string; // نموذج التسعير المقترح
  profitMarginEstimate: string; // هامش الربح المتوقع
  howToMaximizeProfit: string; // كيف تضاعف أرباحك وتزيد متوسط قيمة الطلب
  recurringRevenuePotential: string; // إمكانية بناء دخل متكرر مستمر
}

export interface RiskItem {
  risk: string;
  solution: string;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface TargetPersona {
  name: string; // اسم تمثيلي لشخصية العميل المثالي
  roleOrStatus: string; // الوظيفة أو المرحلة الحياتية
  coreFrustration: string; // أكبر مشكلة أو إحباط يعاني منه
  buyingTrigger: string; // المحفز الذي يدفعه لاتخاذ قرار الشراء فوراً
  objectionAndSolution: string; // أكبر اعتراض متوقع وكيفية تجاوزه
}

export interface StrategicKPIs {
  month1Goal: string; // هدف ومؤشر أداء الشهر الأول
  month3Goal: string; // هدف ومؤشر أداء الشهر الثالث
  month6Goal: string; // هدف ومؤشر أداء الشهر السادس
  primaryNorthStarMetric: string; // المؤشر النجمي الأساسي (North Star Metric)
}

export interface UnitEconomics {
  unitName: string; // اسم الوحدة (مثال: استشارة، طلب، اشتراك شهري، حزمة)
  suggestedPrice: number; // سعر البيع المقترح بالريال
  variableCostPerUnit: number; // التكلفة المتغيرة التقديرية لكل وحدة
  monthlyFixedCost: number; // التكاليف الثابتة الشهرية المقدرة
  estimatedCAC: number; // تكلفة اكتساب العميل المقدرة (CAC)
}

export interface LeanCanvasModel {
  problem: string[]; // أهم 3 مشاكل يعاني منها العميل
  customerSegments: string[]; // شريحة العملاء والمتبنون الأوائل (Early Adopters)
  uniqueValueProposition: string; // القيمة الفريدة المتبلورة
  solution: string[]; // أهم 3 حلول مباشرة وميزات أساسية
  channels: string[]; // مسارات التوزيع والوصول للعميل
  revenueStreams: string[]; // مصادر الإيرادات وتدفقات النقد
  costStructure: string[]; // هيكل التكاليف الثابتة والمتغيرة
  keyMetrics: string[]; // المقاييس الرقمية للنمو
  unfairAdvantage: string; // الميزة التنافسية المحصنة وصعبة التقليد
}

export type Language = 'ar' | 'en';

export interface ProjectPlan {
  id: string;
  projectName: string;
  slogan: string;
  summary: string;
  category: string;
  targetAudience: TargetAudience;
  uniqueSellingPoint: string;
  quickWin: string; // أول خطوة تبدأ بها اليوم خلال 24 ساعة
  monetizationStrategy: MonetizationStrategy; // طريقة الربح من المشروع
  executionPlan: ExecutionStage[];
  marketingPlan: MarketingPlan;
  financialModel: FinancialModel;
  risksAndMitigation: RiskItem[];
  swotAnalysis?: SWOTAnalysis; // تحليل سوات الرباعي الدقيق
  targetPersona?: TargetPersona; // شخصية العميل المثالي بالتفصيل
  strategicKPIs?: StrategicKPIs; // مؤشرات الأداء والأهداف الرقمية المحددة
  unitEconomics?: UnitEconomics; // اقتصاديات الوحدة ونموذج التسعير الدقيق
  leanCanvas?: LeanCanvasModel; // مخطط نموذج العمل التجاري المرن (Lean Canvas)
  createdAt: string;
  originalIdea: string;
  lang?: Language;
}

export interface GeneratePlanInput {
  idea: string;
  field?: string;
  budgetLevel?: 'منخفضة جداً / صفرية' | 'متوسطة' | 'مرتفعة / استثمارية' | 'غير محدد' | string;
  timeframe?: 'أسبوعين (إطلاق سريع)' | 'شهر إلى 3 أشهر' | '6 أشهر فأكثر' | 'غير محدد' | string;
  targetMarket?: string;
  lang?: Language;
}

export interface ExtraMarketingIdeasResponse {
  additionalCampaigns: {
    title: string;
    description: string;
    targetChannel: string;
    implementation: string;
  }[];
  contentCalendarIdeas: {
    week: string;
    theme: string;
    postIdeas: string[];
  }[];
}

export interface ProjectSuggestion {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  whyMatch: string;
  requiredBudget: string;
  howToProfit: string; // طريقة الربح المباشرة من هذا المشروع
  pricingModel: string; // نموذج التسعير المقترح
  profitMargin: string; // هامش الربح المتوقع
  difficulty: 'سهل ومباشر' | 'متوسط' | 'يتطلب مجهود عالي';
  expectedProfitTimeline: string;
  initialSteps: string[];
  fullIdeaDescription: string;
}

export interface SkillBudgetInput {
  skills: string[];
  customSkillText?: string;
  budgetAmount: string;
  availableHoursPerWeek?: string;
  interests?: string;
  lang?: Language;
}
