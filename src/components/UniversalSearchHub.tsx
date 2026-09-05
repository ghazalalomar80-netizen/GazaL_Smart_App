import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Bot,
  Rocket,
  BookOpen,
  BrainCircuit,
  Lightbulb,
  Globe,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  Flame,
  HelpCircle,
  Tag,
  ChevronRight,
  Eye,
  X,
  Copy,
  Check,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface SearchTopicItem {
  id: string;
  category: 'business' | 'studies' | 'solutions' | 'deductions' | 'general_knowledge';
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  searchTerms: string[];
  badgeAr: string;
  badgeEn: string;
  highlightStat: string;
  directAnswerAr: string;
  directAnswerEn: string;
  keyPointsAr: string[];
  keyPointsEn: string[];
  canGeneratePlan: boolean;
  planIdeaPrompt?: string;
  planCategory?: string;
  robotQueryAr: string;
  robotQueryEn: string;
}

export const TOP_SEARCHED_ITEMS: SearchTopicItem[] = [
  // 1. BUSINESS & VENTURES
  {
    id: 'biz_ecommerce_dropship',
    category: 'business',
    titleAr: 'متجر إلكتروني بنموذج الدروب شيبينغ أو المنتجات المتخصصة',
    titleEn: 'Niche E-Commerce & Dropshipping Venture',
    subtitleAr: 'أكثر المشاريع بحثاً لبدء التجارة الإلكترونية بأقل رأس مال ممكن',
    subtitleEn: 'Top-searched venture model for low-capital direct-to-consumer sales',
    searchTerms: ['متجر', 'الدروب شيبينغ', 'دروبشيبينغ', 'ecommerce', 'dropshipping', 'تجارة الكترونية', 'شوبيفاي', 'shopify', 'سلة', 'زد', 'منتجات رابحة'],
    badgeAr: 'الأكثر بحثاً 🔥',
    badgeEn: 'Top Trending 🔥',
    highlightStat: 'أكثر من 85,000 عملية بحث شهرياً',
    directAnswerAr: 'الدروب شيبينغ هو نموذج بيع بالتجزئة حيث لا يحتفظ المتجر بالمنتجات في المخزون، بل يقوم بشراء المنتج من طرف ثالث وشحنه مباشرة للعميل عند إتمام الطلب. سر النجاح يكمن في اختيار "نيتش" دقيق (مثل مستلزمات الحيوانات، أدوات تنظيم المكاتب، إكسسوارات اللياقة) مع إعلانات فيديو إبداعية على تيك توك وإنستغرام.',
    directAnswerEn: 'Dropshipping allows retailers to sell without holding inventory by routing customer orders directly to manufacturers. Success relies on choosing a high-margin micro-niche (ergonomics, pet care, niche hobbies) paired with hyper-engaging short-form video ads on TikTok and Meta.',
    keyPointsAr: [
      'اختيار منتج يحل مشكلة واضحة وله هامش ربح لا يقل عن 60%',
      'إنشاء متجر جذاب وسريع عبر منصات مثل سلة أو شوبيفاي مع بوابات دفع محلية',
      'الاعتماد على التسويق بالفيديو القصير (UGC) والمؤثرين المصغرين',
      'تقديم تجربة عملاء موثوقة مع سياسة استرجاع شفافة'
    ],
    keyPointsEn: [
      'Select a problem-solving product with at least 60% gross margin',
      'Build a high-trust, fast mobile storefront with localized payment gateways',
      'Leverage short-form User Generated Content (UGC) and micro-influencers',
      'Provide clear tracking and frictionless return policies'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'متجر إلكتروني مخصص لمنتجات تحسين جودة النوم والمكاتب المريحة بنموذج دروب شيبينغ سريع وعلامة تجارية موثوقة',
    planCategory: 'تجارة إلكترونية ومتاجر',
    robotQueryAr: 'كيف أختار المنتج الرابح لمتجري الإلكتروني وما هي تكلفة البدء بالتفصيل؟',
    robotQueryEn: 'How do I identify a winning e-commerce product and what are the exact launch costs?'
  },
  {
    id: 'biz_ai_agency',
    category: 'business',
    titleAr: 'وكالة أتمتة وخدمات الذكاء الاصطناعي (AI Agency)',
    titleEn: 'AI Automation Agency (AAA)',
    subtitleAr: 'بناء شات بوت واتساب وأتمتة خدمة العملاء والمبيعات للشركات',
    subtitleEn: 'Deploying custom AI customer service bots & CRM automations for local businesses',
    searchTerms: ['ذكاء اصطناعي', 'وكالة', 'ai agency', 'شات بوت', 'chatbot', 'واتساب', 'أتمتة', 'automation', 'chatgpt', 'خدمة عملاء'],
    badgeAr: 'الأسرع نمواً 🚀',
    badgeEn: 'Fastest Growing 🚀',
    highlightStat: 'نمو بنسبة 320% في الطلب التجاري',
    directAnswerAr: 'الشركات المحلية والمتاجر تعاني من بطء الرد على استفسارات العملاء وهدر فرص المبيعات. بناء وكالة أتمتة AI يركز على تزويدهم بحلول جاهزة: بوت واتساب ذكي مربوط بنظام الحجوزات والمخزون، وأتمتة تأكيد الطلبات، مع اشتراك شهري ثابت (Retainer).',
    directAnswerEn: 'Local businesses lose customers due to delayed replies. An AI Automation Agency solves this by integrating custom WhatsApp/web conversational bots with CRMs, scheduling systems, and payment links on a high-retention monthly subscription.',
    keyPointsAr: [
      'التركيز على نيتش محدد: عيادات الأسنان، مكاتب المحاماة، أو متاجر الملابس',
      'استخدام أدوات No-Code مثل Make.com وBotpress وVoiceflow مع Gemini API',
      'تسعير الخدمة: رسوم إعداد أولية (Setup Fee) + اشتراك دعم شهري',
      'ضمان زيادة سرعة الاستجابة إلى أقل من 30 ثانية على مدار الساعة'
    ],
    keyPointsEn: [
      'Focus on a single vertical: dental clinics, real estate brokers, or boutiques',
      'Utilize no-code orchestration (Make, Voiceflow, Botpress) backed by LLMs',
      'Pricing model: One-time onboarding fee + recurring monthly retainer',
      'Guarantee 24/7 lead capture and sub-30-second response latency'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'وكالة خدمات وأتمتة الذكاء الاصطناعي تقدم روبوتات واتساب ذكية لإدارة حجوزات عيادات التجميل والأسنان',
    planCategory: 'تقنية وتطبيقات سحابية',
    robotQueryAr: 'كيف أبدأ وكالة أتمتة ذكاء اصطناعي (AAA) وأحصل على أول 3 عملاء يدفعون؟',
    robotQueryEn: 'How do I launch an AI Automation Agency and sign my first 3 paying clients?'
  },
  {
    id: 'biz_specialty_coffee',
    category: 'business',
    titleAr: 'مشروع كافيه مختص أو عربة قهوة متنقلة (Coffee Cart)',
    titleEn: 'Specialty Coffee Cart & Micro-Roastery',
    subtitleAr: 'دراسة جدوى وتكاليف بدء مشروع قهوة مختصة بأعلى عوائد تشغيلية',
    subtitleEn: 'High-margin mobile coffee cart & premium beans subscription venture',
    searchTerms: ['قهوة', 'كافيه', 'عربة قهوة', 'coffee', 'specialty coffee', 'باريستا', 'مشروع كوفي', 'اسبريسو'],
    badgeAr: 'طلب مرتفع ☕',
    badgeEn: 'Evergreen Demand ☕',
    highlightStat: 'أعلى معدل استهلاك يومي متكرر',
    directAnswerAr: 'صناعة القهوة المختصة تتميز بهوامش ربح إجمالية تتجاوز 75% لكل كوب. للبدء بتكلفة منخفضة، تعتبر عربة القهوة المتنقلة (Coffee Cart) في المجمعات الإدارية، الجامعات، أو بجوار ملاعب البادل أفضل خيار لتفادي الإيجارات الباهظة واختبار جودة المنتج وقاعدة العملاء.',
    directAnswerEn: 'Specialty coffee delivers gross margins exceeding 75% per cup. Starting with a mobile cart inside business parks, universities, or sports complexes minimizes fixed rent while validating unit economics and customer loyalty.',
    keyPointsAr: [
      'اختيار آلة إسبريسو ومطحنة ذات كفاءة واعتمادية تجارية عالية',
      'التعاقد مع محامص محلية ذات حبوب معتمدة بنقاط تقييم أعلى من 84',
      'برنامج ولاء رقمي (الكوب السادس مجاناً عبر الهاتف) لضمان تكرار الشراء',
      'إضافة منتجات تكميلية ذات هامش ربح مرتفع (كوكيز، ماتشا، ماء معبأ)'
    ],
    keyPointsEn: [
      'Invest in a dual-boiler commercial espresso machine and zero-retention grinder',
      'Source beans with 84+ cupping scores from reputable micro-roasters',
      'Deploy an SMS/QR digital loyalty card (e.g., 6th cup free) to boost LTV',
      'Upsell high-margin pairings: ceremonial matcha, artisan cookies, cold brew'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'مشروع عربة قهوة مختصة وماتشا عالية الجودة متمركزة بجوار مجمع أعمال ورياضة مع برنامج اشتراكات سريعة',
    planCategory: 'أطعمة ومشروبات ومطابخ سحابية',
    robotQueryAr: 'ما هي تكلفة معدات عربة قهوة مختصة وهامش الربح الحقيقي لكل كوب؟',
    robotQueryEn: 'What are the equipment costs and exact gross margin per cup of specialty coffee?'
  },
  {
    id: 'biz_padel_court',
    category: 'business',
    titleAr: 'مشروع ملاعب البادل والبطولات الرياضية',
    titleEn: 'Padel Club, Court Rentals & Tournaments',
    subtitleAr: 'تكاليف إنشاء ملعب بادل، ونموذج الاشتراكات وحجز الساعات التفاعلي',
    subtitleEn: 'Turnkey padel court venture: booking app, community leagues, and pro-shop',
    searchTerms: ['بادل', 'padel', 'ملاعب بادل', 'حجز بادل', 'رياضة', 'بطولات بادل', 'مضرب بادل'],
    badgeAr: 'تريند رياضي 🎾',
    badgeEn: 'Trending Sport 🎾',
    highlightStat: 'أعلى معدل إشغال ساعات مسائي',
    directAnswerAr: 'رياضة البادل هي الأسرع انتشاراً عالمياً وتتميز بطلب جماهيري كثيف ومعدل إشغال يتجاوز 70% في الفترات المسائية. الأرباح لا تقتصر على إيجار الساعة، بل تشمل مبيعات المضارب والكرات، الكافيه المصاحب، وتنظيم البطولات برعاية الشركات.',
    directAnswerEn: 'Padel is the fastest-growing racquet sport globally, boasting 70%+ evening court occupancy. Beyond hourly rentals, significant cash flow comes from pro-shop gear, beverage sales, private coaching, and corporate sponsored tournaments.',
    keyPointsAr: [
      'تكلفة إنشاء الملعب البانورامي الواحد تتراوح بين 25,000 إلى 40,000 دولار',
      'تطبيق حجز إلكتروني فوري مع ميزة مطابقة اللاعبين (Matchmaking)',
      'تنظيم دوريات أسبوعية للمبتدئين والمحترفين لزيادة ولاء المجتمع',
      'إضافة كافيه ومقهى صحي داخل النادي لتحقيق إيراد إضافي لكل زائر'
    ],
    keyPointsEn: [
      'Turnkey panoramic court construction typically runs $25k-$40k per court',
      'Automated app booking with skill-based open matchmaking features',
      'Host weekly amateur ladders and corporate leagues to build a sticky community',
      'Integrate an on-site healthy smoothie bar and pro shop for ancillary margins'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'نادي وملاعب بادل حديثة بنظام حجز وتحديات عبر تطبيق ذكي مع كافيه رياضي ومتجر معدات',
    planCategory: 'صحة ولياقة ورياضة',
    robotQueryAr: 'كيف أحسب دراسة جدوى مبسطة لمشروع ملعبين بادل وتكلفة الاسترداد المالي؟',
    robotQueryEn: 'What is the ROI timeframe and financial feasibility for a 2-court padel facility?'
  },
  {
    id: 'biz_cloud_kitchen',
    category: 'business',
    titleAr: 'مطبخ سحابي واشتراكات الوجبات الصحية (Meal Prep)',
    titleEn: 'Cloud Kitchen & Healthy Meal Prep Subscriptions',
    subtitleAr: 'تقديم وجبات صحية محسوبة السعرات للرياضيين وموظفي الشركات بدون مطعم تقليدي',
    subtitleEn: 'Ghost kitchen delivering macro-counted weekly meal subscriptions',
    searchTerms: ['مطبخ سحابي', 'وجبات صحية', 'دايت', 'meal prep', 'اشتراك وجبات', 'سحابي', 'cloud kitchen', 'سعرات'],
    badgeAr: 'نمو مستدام 🥗',
    badgeEn: 'High Retention 🥗',
    highlightStat: 'إيراد شهري متكرر (MRR) مضمون',
    directAnswerAr: 'المطابخ السحابية توفر تكاليف الديكور ومواقع الشوارع الرئيسية وتعتمد كلياً على التوصيل والاشتراكات الأسبوعية والشهرية. تقديم باقات دايت محسوبة الماكروز للرياضيين وموظفي الشركات يضمن تدفقاً نقدياً مدفوعاً مقدماً قبل شراء المواد الغذائية.',
    directAnswerEn: 'Cloud kitchens eliminate costly prime real-estate storefronts by operating purely on delivery and recurring weekly subscriptions. Pre-paid athlete and office meal plans provide predictable cash flow and minimal food waste.',
    keyPointsAr: [
      'استئجار مساحة مرخصة داخل مطبخ مشترك لخفض التكلفة التشغيلية',
      'نظام اشتراكات شهرية مدفوعة مقدماً عبر تطبيق أو موقع بسيط',
      'حساب دقيق للماكروز (بروتين، كارب، دهون) مع تنوع في قوائم الطعام',
      'التعاقد مع شركات توصيل مخصصة لضمان وصول الوجبات طازجة يومياً'
    ],
    keyPointsEn: [
      'Lease shared licensed commissary kitchen space to slash initial capex',
      'Collect upfront weekly/monthly subscription payments to fund inventory',
      'Provide verified nutritional breakdowns (protein/carbs/fats) with menu rotation',
      'Partner with dedicated last-mile logistics for guaranteed morning delivery'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'مشروع مطبخ سحابي يقدم اشتراكات أسبوعية لوجبات صحية غنية بالبروتين للرياضيين وموظفي الشركات مع خدمة توصيل صباحية',
    planCategory: 'أطعمة ومشروبات ومطابخ سحابية',
    robotQueryAr: 'كيف أحسب تكلفة الوجبة الواحدة في مشروع المطبخ السحابي وهامش الربح الصافي؟',
    robotQueryEn: 'How do I calculate cost per meal and net margins for a subscription meal-prep cloud kitchen?'
  },
  {
    id: 'biz_digital_products',
    category: 'business',
    titleAr: 'بيع المنتجات الرقمية والقوالب (Digital Products & Notion)',
    titleEn: 'Digital Downloads & Notion Templates Venture',
    subtitleAr: 'صناعة القوالب والكتب والدورات المصغرة وبيعها بهامش ربح 95%+',
    subtitleEn: 'Building and monetizing digital templates, guides, and toolkits at zero marginal cost',
    searchTerms: ['منتجات رقمية', 'قوالب نوشن', 'notion', 'كتب الكترونية', 'digital products', 'دخل سلبي', 'passive income'],
    badgeAr: 'هامش ربح 95%+ 💎',
    badgeEn: '95%+ Margins 💎',
    highlightStat: 'تكلفة نسخ وتشغيل تقارب الصفر',
    directAnswerAr: 'المنتج الرقمي يُصنع مرة واحدة ويُباع لآلاف العملاء دون تكاليف شحن أو تخزين. تشمل هذه المنتجات: قوالب نوشن لتنظيم الأعمال، أدلة تدريبية، ملفات إكسل للميزانيات، وحزم تصميمات جاهزة عبر منصات مثل Gumroad أو سلة.',
    directAnswerEn: 'Digital products boast near-zero marginal production cost. Once built, Notion workspaces, financial spreadsheets, prompt libraries, and mini-guides can be sold infinitely worldwide through automated checkout platforms.',
    keyPointsAr: [
      'حل مشكلة محددة جداً: مثلاً قالب نوشن لإدارة عيادات الأسنان أو تنظيم المذاكرة',
      'إنشاء مقاطع توضيحية سريعة على يوتيوب وتيك توك تشرح كيفية استخدام القالب',
      'أتمتة إرسال رابط التحميل فور الدفع وتجميع إيميلات المشترين',
      'بناء قائمة بريدية لبيع منتجات مستقبلية متطورة بنفس النيتش'
    ],
    keyPointsEn: [
      'Solve a hyper-specific pain point (e.g., Notion system for freelance agencies)',
      'Produce short screen-recording walkthroughs for social media discovery',
      'Automate instant digital delivery upon payment capture via Stripe or Gumroad',
      'Build an email newsletter audience to launch complementary tools'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'منصة لبيع حزم وقوالب رقمية ذكية لإدارة المشاريع والميزانيات للشركات الناشئة ورواد الأعمال',
    planCategory: 'خدمات وأعمال حرة',
    robotQueryAr: 'ما هي أكثر أنواع المنتجات الرقمية مبيعاً في 2026 وكيف أسوق لها؟',
    robotQueryEn: 'What are the top-selling digital products in 2026 and how do I market them effectively?'
  },

  // 2. ACADEMIC & STUDIES
  {
    id: 'study_math_calculus',
    category: 'studies',
    titleAr: 'شرح وحل مسائل الرياضيات، الجبر والتفاضل والتكامل',
    titleEn: 'Mathematics, Algebra & Calculus Step-by-Step',
    subtitleAr: 'تبسيط المعادلات، قواعد الاشتقاق والتكامل، وحل المسائل الصعبة خطوة بخطوة',
    subtitleEn: 'Derivatives, integrals, polynomial factoring, and clear geometric proofs',
    searchTerms: ['رياضيات', 'تفاضل', 'تكامل', 'معادلات', 'جبر', 'math', 'calculus', 'algebra', 'حل مسائل', 'اشتقاق'],
    badgeAr: 'مباحث دراسية 🎓',
    badgeEn: 'Academic Study 🎓',
    highlightStat: 'البحث الأكاديمي الأكثر طلباً عالمياً',
    directAnswerAr: 'الرياضيات لا تعتمد على الحفظ بل على إدراك الأنماط والقواعد المنطقية. لحل أي معادلة تفاضلية أو جبرية: أولاً بسّط الحدود المتشابهة، حدد المتغيرات والمجاهيل، ثم طبّق القواعد الأساسية (مثل قاعدة القوة في الاشتقاق: مشتقة x^n هي n*x^(n-1)).',
    directAnswerEn: 'Mathematics is mastery of logical patterns. To solve calculus problems systematically: identify the variable, isolate terms, and apply standard differentiation rules (e.g. Power Rule: d/dx[x^n] = n*x^(n-1)).',
    keyPointsAr: [
      'فهم المعنى الهندسي للمشتقة: المشتقة هي ميل المماس للمنحنى ومعدل التغير اللحظي',
      'التكامل هو العملية العكسية للاشتقاق ويمثل حساب المساحة تحت المنحنى',
      'استخدام الروبوت الذكي لكتابة خطوات حل أي مسألة رياضية بالتفصيل',
      'التحقق من صحة الحل بالتعويض في المعادلة الأصلية'
    ],
    keyPointsEn: [
      'Geometric intuition: The derivative represents the instantaneous slope of a curve',
      'Integration is the reverse of differentiation and calculates area under a curve',
      'Use the Universal Robot to generate line-by-line breakdown for any equation',
      'Always test your solution by substituting the result back into the original formula'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'اشرح لي قواعد الاشتقاق الأساسية في التفاضل والتكامل مع أمثلة محلولة خطوة بخطوة.',
    robotQueryEn: 'Explain fundamental calculus derivative rules with step-by-step solved examples.'
  },
  {
    id: 'study_physics_newton',
    category: 'studies',
    titleAr: 'الفيزياء وقوانين نيوتن للحركة والجاذبية',
    titleEn: 'Physics & Newton’s Laws of Motion',
    subtitleAr: 'شرح قوانين الحركة الثلاثة، حفظ الطاقة، وقوى الاحتكاك والجاذبية الأرضية',
    subtitleEn: 'Inertia, F=ma, action-reaction dynamics, and gravitational forces explained simply',
    searchTerms: ['فيزياء', 'قوانين نيوتن', 'physics', 'جاذبية', 'طاقة', 'حركة', 'تسارع', 'قوة', 'سرعة'],
    badgeAr: 'علوم وفيزياء ⚛️',
    badgeEn: 'Physics ⚛️',
    highlightStat: 'المبحث العلمي الأكثر تكراراً في الامتحانات',
    directAnswerAr: 'قوانين نيوتن تفسر حركة كل الأجسام الكلاسيكية: 1) القصور الذاتي: الجسم الساكن يبقى ساكناً والمتحرك يستمر بحركته ما لم تؤثر عليه قوة خارجية. 2) القانون الثاني: القوة = الكتلة × التسارع (F = m*a). 3) القانون الثالث: لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه.',
    directAnswerEn: 'Newtonian mechanics governs classic physical motion: 1) Law of Inertia (objects maintain velocity unless acted upon by a net external force). 2) F = ma (acceleration is proportional to net force and inverse to mass). 3) For every action, there is an equal and opposite reaction.',
    keyPointsAr: [
      'مخطط الجسم الحر (Free Body Diagram): رسم جميع القوى المؤثرة لحل أي مسألة فيزيائية',
      'الفرق بين الكتلة (ثابتة بالكيلوجرام) والوزن (قوة متغيرة بالنيوتن حسب تسارع الجاذبية)',
      'قانون حفظ الطاقة: الطاقة لا تفنى ولا تستحدث من العدم بل تتحول من شكل لآخر',
      'تطبيقات واقعية: إطلاق الصواريخ، وسائد الأمان في السيارات، ومدارات الأقمار الصناعية'
    ],
    keyPointsEn: [
      'Always sketch a Free-Body Diagram before setting up equations',
      'Distinguish mass (scalar in kg) from weight (gravitational force in Newtons)',
      'Conservation of Energy: Mechanical energy transfers between potential and kinetic forms',
      'Real-world applications: Rocket propulsion, vehicle seatbelts, and orbital satellites'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'اشرح لي قوانين نيوتن الثلاثة للحركة مع أمثلة عملية من الحياة اليومية وكيف أحل مسائلها؟',
    robotQueryEn: 'Explain Newton’s 3 laws of motion with real-world examples and problem-solving tips.'
  },
  {
    id: 'study_english_grammar',
    category: 'studies',
    titleAr: 'قواعد اللغة الإنجليزية وطرق إتقان المحادثة بطلاقة',
    titleEn: 'English Grammar & Conversational Fluency',
    subtitleAr: 'شرح الأزمنة (Tenses)، والفرق بين Past Simple و Present Perfect، وأسرار الطلاقة',
    subtitleEn: 'Mastering English verb tenses, conditional clauses, and conversational mastery',
    searchTerms: ['انجليزي', 'لغة انجليزية', 'english', 'grammar', 'قواعد انجليزي', 'محادثة', 'tenses', 'تعلم الانجليزية'],
    badgeAr: 'لغات ومهارات 🗣️',
    badgeEn: 'Languages 🗣️',
    highlightStat: 'أعلى مهارة مطلوبة في سوق العمل العالمي',
    directAnswerAr: 'الفرق الأهم الذي يبحث عنه الطلاب هو بين Past Simple (حدث بدأ وانتهى في وقت محدد بالماضي: "I visited London in 2022") وبين Present Perfect (حدث له أثر مستمر بالحاضر أو تجربة حياتية دون تحديد وقت: "I have visited London three times"). الطلاقة لا تأتي بحفظ القواعد مجردة بل بالممارسة السمعية والتحدث اليومي.',
    directAnswerEn: 'The key distinction learners seek is Past Simple (completed at a specific past moment: "I lived there in 2020") vs Present Perfect (unspecified timeframe or ongoing relevance: "I have lived there before"). Fluency develops through active immersion, shadowing speech, and contextual practice.',
    keyPointsAr: [
      'التركيز على أكثر 500 كلمة شائعة تمثل 75% من المحادثات اليومية',
      'التدرب على تقنية التظليل الصوتي (Shadowing): تكرار كلام المتحدثين الأصليين فوراً',
      'التفكير بالإنجليزية وتجنب الترجمة الحرفية من لغتك الأم',
      'استخدام الروبوت الذكي لإجراء محادثات إنجليزية تفاعلية وتصحيح الأخطاء فوراً'
    ],
    keyPointsEn: [
      'Master the top 500 high-frequency vocabulary words covering 75% of daily dialogue',
      'Practice speech shadowing with native podcasts to hone pronunciation and cadence',
      'Think directly in English to eliminate mental translation delays',
      'Practice dynamic interactive English dialogues with the Universal AI Robot'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'أريد تدريباً على المحادثة باللغة الإنجليزية وشرح أهم الفروق بين الأزمنة الشائعة مع أمثلة.',
    robotQueryEn: 'Let us practice conversational English and explain the key differences between past tenses.'
  },
  {
    id: 'study_research_paper',
    category: 'studies',
    titleAr: 'كتابة الأبحاث الأكاديمية والرسائل الجامعية (Thesis & Research)',
    titleEn: 'Academic Research & Thesis Methodology',
    subtitleAr: 'خطوات إعداد خطة البحث، كتابة الإطار النظري، والتوثيق العلمي بأسلوب APA',
    subtitleEn: 'Research design, literature review, APA referencing, and scientific integrity',
    searchTerms: ['بحث', 'بحث علمي', 'رسالة ماجستير', 'بحث جامعي', 'academic research', 'توثيق', 'apa', 'اطار نظري'],
    badgeAr: 'بحث أكاديمي 📑',
    badgeEn: 'Academic Research 📑',
    highlightStat: 'دليل شامل لطلبة الجامعات والدراسات العليا',
    directAnswerAr: 'البحث العلمي الرصين يقوم على أركان واضحة: 1) مشكلة بحثية دقيقة وأسئلة قابلة للقياس. 2) مراجعة الدراسات السابقة واستخلاص الفجوة المعرفية. 3) منهجية واضحة (كمية أو نوعية). 4) تحليل النتائج ومناقشتها بحيادية. 5) التوثيق الدقيق وفق نظام APA 7th لمنع الانتحال.',
    directAnswerEn: 'High-caliber research rests on rigorous foundations: a concise problem statement, comprehensive literature review identifying gaps, sound quantitative or qualitative methodology, empirical data interpretation, and strict APA 7th referencing to eliminate plagiarism.',
    keyPointsAr: [
      'صياغة فرضيات البحث بوضوح وتحديد المتغير التابع والمتغير المستقل',
      'استخدام مصادر محكمة من قواعد بيانات مثل Google Scholar وScopus',
      'هيكلة ورقة البحث: الملخص، المقدمة، المنهجية، النتائج، المناقشة، والمراجع',
      'الاستعانة بالروبوت الذكي لصياغة الملخص وتوليد أسئلة بحثية مبتكرة'
    ],
    keyPointsEn: [
      'Formulate testable hypotheses with explicit independent and dependent variables',
      'Synthesize peer-reviewed literature indexed on Google Scholar and Scopus',
      'Structure standard IMRaD sections: Abstract, Intro, Methodology, Results, Discussion',
      'Leverage the AI Robot to outline thesis arguments and review citation consistency'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'ساعدني في كتابة خطة بحث أكاديمي قوية: كيف أصيغ مشكلة البحث وأحدد المنهجية؟',
    robotQueryEn: 'How do I construct a strong academic research proposal and methodology section?'
  },

  // 3. PRACTICAL SOLUTIONS
  {
    id: 'solution_zero_capital',
    category: 'solutions',
    titleAr: 'كيف تبدأ مشروعاً بدون رأس مال إطلاقاً (0$ Capital)',
    titleEn: 'Starting a Business with Zero Initial Capital',
    subtitleAr: 'نماذج العمل التي تعتمد على استثمار المهارة، الوساطة الخدمية، والدفع المسبق',
    subtitleEn: 'Proven frameworks to build profitable cash flow relying purely on sweat equity and pre-sales',
    searchTerms: ['بدون راس مال', 'بدون مال', 'مشروع بدون فلوس', 'zero capital', 'كيف ابدأ', 'استثمار مجاني', 'ارباح'],
    badgeAr: 'حلول عملية 💡',
    badgeEn: 'Practical Solution 💡',
    highlightStat: 'السؤال رقم 1 لدى رواد الأعمال المبتدئين',
    directAnswerAr: 'بدء مشروع بدون مال يتطلب استبدال رأس المال المالي برأس المال المهاري (Skill Equity). الطريقة الأكثر أماناً هي بيع الخدمات: مثل إدارة الحسابات، كتابة المحتوى، التصميم، أو الوساطة العقارية والخدمية، حيث تحصل على دفعة مقدمة من العميل قبل تنفيذ العمل، ثم استخدام الأرباح لتأسيس مشاريع أكبر.',
    directAnswerEn: 'Launching with zero cash requires trading time and specialized skill for immediate cash flow. The safest model is high-ticket service arbitrage (social media management, copywriting, sales brokering) with 50% upfront deposits, which later funds productized ventures.',
    keyPointsAr: [
      'نموذج الخدمة أولاً (Service-to-Product): بيع مهارة تتقنها للحصول على سيولة أولية',
      'التسويق بالعمولة (Affiliate Marketing): جلب مبيعات لمنتجات جاهزة وأخذ نسبة فورية',
      'نموذج الطلب المسبق (Pre-orders): بيع الفكرة والحصول على ثمنها قبل تصنيعها',
      'استخدام الأدوات السحابية المجانية لبناء موقعك وتصميم عروضك دون أي تكلفة'
    ],
    keyPointsEn: [
      'Service-to-Product flywheel: Sell expertise first to bank operational cash reserve',
      'Affiliate brokering: Generate customer demand for existing products to earn commissions',
      'Pre-selling model: Collect early deposits before investing in manufacturing inventory',
      'Leverage 100% free software tiers (GitHub, Notion, Canva, Stripe) to operate'
    ],
    canGeneratePlan: true,
    planIdeaPrompt: 'مشروع وكالة وساطة رقمية تقدم خدمات التصميم وإدارة الإعلانات للمتاجر المحلية برأس مال صفري يعتمد على الدفع المسبق',
    planCategory: 'خدمات وأعمال حرة',
    robotQueryAr: 'ما هي الخطوات العملية لبدء مشروع خدمي مربح من البيت بدون أي رأس مال في 7 أيام؟',
    robotQueryEn: 'What are the exact actionable steps to launch a profitable zero-capital service business in 7 days?'
  },
  {
    id: 'solution_procrastination',
    category: 'solutions',
    titleAr: 'القضاء على التسويف والمماطلة والوصول إلى تركيز فائق',
    titleEn: 'Overcoming Procrastination & Mastering Deep Focus',
    subtitleAr: 'تقنيات علم النفس السلوكي، قاعدة الـ 5 ثوانٍ، ونظام البومودورو لإنجاز المهام فوراً',
    subtitleEn: 'Behavioral psychology protocols, the 5-second rule, and deep work systems',
    searchTerms: ['تسويف', 'تركيز', 'مماطلة', 'procrastination', 'انتاجية', 'تنظيم الوقت', 'تشتت', 'pomodoro'],
    badgeAr: 'إنتاجية وتطوير 🧠',
    badgeEn: 'Productivity 🧠',
    highlightStat: 'الحل الأكثر طلباً للطلاب والموظفين',
    directAnswerAr: 'التسويف ليس مشكلة كسل، بل استجابة عاطفية للتوتر والشعور بضخامة المهمة. الحل يكمن في "قاعدة الدقيقتين": قسّم أي مهمة صعبة إلى خطوة تستغرق دقيقتين فقط للبدء بها. بمجرد أن تبدأ، يفرز الدماغ الدوبامين لإكمال العمل وتختفي مقاومة البداية.',
    directAnswerEn: 'Procrastination is an emotional regulation issue, not laziness. The proven psychological remedy is lowering the barrier to entry via the "2-Minute Rule": commit only to opening the document and typing one sentence. Overcoming initial inertia eliminates friction.',
    keyPointsAr: [
      'قاعدة الـ 5 ثوانٍ: عد تنازلياً (5-4-3-2-1) وتحرك فوراً دون منح عقلك وقتاً للتردد',
      'نظام بومودورو: العمل 25 دقيقة بتركيز تام مع هاتف بعيد، ثم 5 دقائق استراحة',
      'تجهيز بيئة العمل في المساء: كتابة أهم 3 مهام لليوم التالي قبل النوم',
      'إلغاء الإشعارات ومشتتات وسائل التواصل أثناء ساعات التركيز الصباحية'
    ],
    keyPointsEn: [
      'The 5-Second Rule: Count backwards (5-4-3-2-1) and initiate physical action immediately',
      'Pomodoro technique: 25 minutes of zero-distraction sprint followed by a 5-minute break',
      'Night-before preparation: Identify exactly 3 high-impact outcomes for tomorrow',
      'Friction engineering: Put phones in another room during high-leverage focus blocks'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'أعطني خطة عملية يومية مثبتة علمياً للتخلص من التسويف وإنجاز مهام المذاكرة والعمل.',
    robotQueryEn: 'Give me a scientifically backed daily system to defeat procrastination and sustain deep focus.'
  },
  {
    id: 'solution_budget_saving',
    category: 'solutions',
    titleAr: 'طريقة تقسيم الراتب والادخار من الدخل (قاعدة 50/30/20)',
    titleEn: 'Smart Budgeting & The 50/30/20 Wealth Rule',
    subtitleAr: 'كيف تدخر 20% من راتبك شهرياً دون الشعور بالحرمان وسداد الديون بذكاء',
    subtitleEn: 'Systematic salary budgeting formula, automated saving, and debt elimination',
    searchTerms: ['راتب', 'ميزانية', 'ادخار', 'توفير', 'فلوس', 'مالية', 'budgeting', 'saving', 'دخل'],
    badgeAr: 'مالية وادخار 💰',
    badgeEn: 'Finance & Saving 💰',
    highlightStat: 'الدليل المالي الأكثر تطبيقاً',
    directAnswerAr: 'قاعدة 50/30/20 هي أسهل وأنجح معادلة مالية عالمية: 50% من الراتب للاحتياجات الضرورية (إيجار، فواتير، بقالة، مواصلات)، 30% للرغبات والترفيه، و 20% تذهب فوراً في يوم نزول الراتب للادخار والاستثمار وبناء صندوق الطوارئ.',
    directAnswerEn: 'The 50/30/20 formula is the gold-standard framework for personal cash flow: 50% for fixed obligations (housing, groceries, utilities), 30% for discretionary lifestyle, and 20% automatically routed into investments and emergency reserves.',
    keyPointsAr: [
      'أتمتة الادخار: تحويل الـ 20% إلى حساب منفصل غير مرتبط ببطاقة مدى في نفس يوم الراتب',
      'بناء صندوق الطوارئ أولاً: جمع ما يعادل مصاريف 3 إلى 6 أشهر لمواجهة الظروف المفاجئة',
      'مراجعة الاشتراكات الشهرية غير المستخدمة وإلغاؤها فوراً',
      'استثمار مبالغ الادخار في أصول مدرة للعوائد (صناديق استثمارية، صكوك، ذهب)'
    ],
    keyPointsEn: [
      'Automate your savings: Transfer the 20% to an investment vault on payday',
      'Emergency Fund First: Secure 3 to 6 months of living expenses in liquid high-yield storage',
      'Audit recurring expenses: Cancel unused gym and app subscriptions quarterly',
      'Deploy saved capital into diversified low-cost index funds and income-generating assets'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'كيف أقسم راتبي الشهري عملياً وأوفر منه حتى لو كان الدخل متوسطاً؟',
    robotQueryEn: 'How do I practically budget my monthly salary and build consistent savings on an average income?'
  },

  // 4. LOGIC & DEDUCTIONS
  {
    id: 'deduction_5whys_rootcause',
    category: 'deductions',
    titleAr: 'كيف تستنتج السبب الجذري لأي مشكلة معقدة (تقنية 5 Whys)',
    titleEn: 'Root-Cause Deduction: The 5 Whys Methodology',
    subtitleAr: 'طريقة تويوتا اليابانية لاستخلاص أصل المشكلة ومنع تكرارها نهائياً',
    subtitleEn: 'Toyota’s iconic problem-solving framework to diagnose core structural failures',
    searchTerms: ['استنتاج', 'تحليل', 'حل المشاكل', '5 whys', 'سبب جذري', 'تفكير نقدي', 'logic', 'problem solving'],
    badgeAr: 'استنتاج ومنطق 🧠',
    badgeEn: 'Logic & Deduction 🧠',
    highlightStat: 'أداة الإدارة الرائدة عالمياً',
    directAnswerAr: 'عند حدوث خلل، يميل معظم الناس لمعالجة العرض السطحي. تقنية "لماذا خمس مرات" تسأل "لماذا حدث هذا؟" 5 مرات متتالية. مثال: الخادم توقف -> لماذا؟ تعطلت قاعدة البيانات -> لماذا؟ امتلأت الذاكرة -> لماذا؟ كود التخزين المؤقت به تسريب -> لماذا؟ لم يُجر اختبار أداء قبل الإطلاق! إذن الحل ليس إعادة تشغيل الخادم، بل فرض اختبار أداء إلزامي.',
    directAnswerEn: 'Surface symptoms distract from structural causes. The "5 Whys" method drills through successive layers by asking "Why?" repeatedly until the underlying systemic flaw is exposed, turning repeated firefighting into permanent prevention.',
    keyPointsAr: [
      'تجنب إلقاء اللوم على الأشخاص والتركيز على الخلل في النظام أو الإجراءات',
      'التوقف عند الوصول إلى سبب قابل للتغيير والتنفيذ الجذري',
      'توثيق النتائج ومشاركتها مع الفريق لضمان عدم تكرار الخطأ',
      'تطبيق التقنية في المشاكل الشخصية والمالية وإدارة الشركات'
    ],
    keyPointsEn: [
      'Focus strictly on process and system vulnerabilities rather than human error',
      'Stop asking once you reach a foundational lever that can be permanently engineered',
      'Document corrective actions and update operating procedures',
      'Applicable equally to business operations, product defects, and personal workflows'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'اشرح لي كيف أستخدم تقنية 5 Whys لاستنتاج أسباب انخفاض مبيعات متجري وتصحيحها؟',
    robotQueryEn: 'Explain how to apply the 5 Whys deduction method to diagnose drop in sales.'
  },
  {
    id: 'deduction_fallacies',
    category: 'deductions',
    titleAr: 'كشف المغالطات المنطقية الشائعة في الحوارات والقرارات',
    titleEn: 'Identifying Logical Fallacies in Arguments & Decisions',
    subtitleAr: 'كيف تكشف رجل القش، الشخصنة، والاحتكام للعاطفة وتفكر بحيادية ومنطقية',
    subtitleEn: 'Dissecting straw man arguments, ad hominem attacks, and false dilemmas',
    searchTerms: ['مغالطات منطقية', 'تفكير نقدي', 'منطق', 'نقاش', 'اقناع', 'fallacies', 'critical thinking'],
    badgeAr: 'تفكير نقدي 🎯',
    badgeEn: 'Critical Thinking 🎯',
    highlightStat: 'أهم مهارة في اتخاذ القرارات وحماية الفكر',
    directAnswerAr: 'المغالطة المنطقية هي خلل في بناء الحجة يجعل الاستنتاج غير سليم حتى لو بدا مقنعاً ظاهرياً. من أشهرها: 1) مغالطة رجل القش (تحريف كلام الطرف الآخر لمهاجمة نسخة مشوهة منه). 2) مغالطة الشخصنة (مهاجمة شخص المتحدث بدلاً من مناقشة فكرته). 3) مغالطة المعضلة الكاذبة (حصر الخيارات في أبيض وأسود فقط).',
    directAnswerEn: 'A logical fallacy is a flaw in reasoning that invalidates an argument despite sounding rhetorically persuasive. Common types include Straw Man (misrepresenting an opponent’s claim), Ad Hominem (attacking character rather than substance), and False Dilemma (limiting options to only two extremes).',
    keyPointsAr: [
      'فصل الفكرة عن صاحبها لتقييم الحجة بموضوعية وتجرد',
      'التأكد من وجود علاقة سببية حقيقية وليس مجرد تزامن زمني',
      'التحقق من صحة المقدمات المنطقية قبل قبول أي استنتاج',
      'استخدام الروبوت الذكي لتحليل أي نص أو نقاش وكشف مغالطاته'
    ],
    keyPointsEn: [
      'Evaluate arguments purely on logical consistency, independent of the speaker',
      'Distinguish genuine causality from mere accidental correlation',
      'Verify the truth of underlying premises before accepting derived conclusions',
      'Use the Universal Robot to audit debates and spot rhetorical deception'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'ما هي أهم 5 مغالطات منطقية شائعة في النقاشات اليومية وكيف أرد عليها باحترافية؟',
    robotQueryEn: 'What are the top 5 common logical fallacies in debates and how to dismantle them?'
  },

  // 5. GENERAL KNOWLEDGE & TECH
  {
    id: 'gk_ai_llm_explained',
    category: 'general_knowledge',
    titleAr: 'كيف تعمل نماذج الذكاء الاصطناعي التوليدي LLMs؟',
    titleEn: 'How Large Language Models (LLMs) Actually Work',
    subtitleAr: 'تبسيط بنية المحولات (Transformers)، والشبكات العصبية، وكيف تولد النصوص والصور',
    subtitleEn: 'Deep dive into Transformers, self-attention, neural weights, and generative intelligence',
    searchTerms: ['ذكاء اصطناعي', 'llm', 'gemini', 'chatgpt', 'كيف يعمل الذكاء الاصطناعي', 'transformers', 'توليد نصوص'],
    badgeAr: 'تقنية المستقبل 🤖',
    badgeEn: 'Frontier Tech 🤖',
    highlightStat: 'أكثر موضوع تقني بحثاً في هذا العصر',
    directAnswerAr: 'نماذج اللغات الكبيرة لا "تفكر" كالإنسان بل تعتمد على حساب الاحتمالات الإحصائية عبر مليارات المعاملات (Parameters). بفضل معمارية Transformer وآلية الانتباه (Attention Mechanism)، يستطيع النموذج فهم سياق الكلمات السابقة وتوقع الكلمة التالية الأكثر ملاءمة وفائدة بدقة مذهلة.',
    directAnswerEn: 'LLMs operate on probabilistic token prediction across hundreds of billions of mathematical weights. Using the Transformer architecture and self-attention mechanisms, models parse contextual dependencies across full sentences to predict the most coherent next token.',
    keyPointsAr: [
      'آلية الانتباه (Self-Attention): تمكين النموذج من ربط الضمائر والكلمات ببعضها مهما تباعدت',
      'مراحل التدريب: التدريب المسبق على كميات هائلة من البيانات، ثم الضبط الدقيق (RLHF)',
      'أهمية هندسة الأوامر (Prompt Engineering): كيف تطلب من النموذج لتحصل على أدق نتيجة',
      'المستقبل: الذكاء الاصطناعي متعدد الوسائط (Multimodal) الذي يعالج الصوت، الصورة، والبيانات'
    ],
    keyPointsEn: [
      'Self-Attention allows models to connect concepts and pronouns across vast text spans',
      'Two-stage lifecycle: Massive unsupervised pre-training followed by human feedback (RLHF)',
      'Prompt engineering mastery directly dictates the quality and precision of AI output',
      'Multimodality is the standard: Real-time simultaneous processing of text, audio, and visual inputs'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'اشرح لي ببساطة ودقة علمية كيف يعمل الذكاء الاصطناعي التوليدي والشبكات العصبية؟',
    robotQueryEn: 'Explain how Generative AI and Transformer neural networks function in simple yet rigorous terms.'
  },
  {
    id: 'gk_quantum_computing',
    category: 'general_knowledge',
    titleAr: 'الحوسبة الكمومية وثورة الكيوبت (Quantum Computing)',
    titleEn: 'Quantum Computing & The Qubit Revolution',
    subtitleAr: 'الفرق بين البت الكلاسيكي والكيوبت، ظاهرة التراكب والتشابك الكمي وتأثيرها على العالم',
    subtitleEn: 'Superposition, quantum entanglement, cryptography impact, and subatomic computing',
    searchTerms: ['حوسبة كمومية', 'كمومي', 'quantum', 'qubit', 'كيوبت', 'فيزياء كمية', 'كمبيوتر كمومي'],
    badgeAr: 'علوم واكتشافات 🌌',
    badgeEn: 'Quantum Science 🌌',
    highlightStat: 'القفزة التقنية الكبرى القادمة',
    directAnswerAr: 'الحاسوب التقليدي يعالج البيانات كبتات (0 أو 1). أما الحاسوب الكمومي فيستخدم "الكيوبت" الذي يمكن أن يكون 0 و 1 في نفس الوقت بفضل ظاهرة "التراكب الكمي" (Superposition)، بالإضافة لظاهرة "التشابك الكمي" التي تجعل الكيوبتات مترابطة فورياً، مما يمكنه من حل معادلات رياضية معقدة في دقائق يستغرق الحاسوب العادي آلاف السنين لحلها.',
    directAnswerEn: 'Classical computers process binary bits (0 or 1). Quantum computers harness subatomic qubits capable of existing in multiple states simultaneously via Superposition and Entanglement, calculating vast combinatorial possibilities in seconds.',
    keyPointsAr: [
      'التراكب الكمي: إمكانية استكشاف ملايين الاحتمالات في وقت متزامن',
      'التشابك الكمي: ترابط الجسيمات بشكل فوري مهما بعدت المسافة بينها',
      'التطبيقات الثورية: اكتشاف الأدوية، فك التشفير، نمذجة البطاريات وتغير المناخ',
      'التحديات الحالية: الحاجة لدرجات حرارة تقارب الصفر المطلق لمنع انهيار الحالة الكمية'
    ],
    keyPointsEn: [
      'Superposition enables simultaneous exploration of millions of computation branches',
      'Entanglement binds subatomic particle states regardless of physical distance',
      'Breakthrough domains: Molecular drug discovery, financial modeling, and materials science',
      'Current frontier challenges: Thermal decoherence requiring near-absolute-zero cryogenics'
    ],
    canGeneratePlan: false,
    robotQueryAr: 'ما هي الحوسبة الكمومية وكيف ستغير التشفير والأدوية والذكاء الاصطناعي؟',
    robotQueryEn: 'What is quantum computing and how will it revolutionize cryptography and medicine?'
  },
];

const FILTER_TAGS = [
  { labelAr: 'الكل', labelEn: 'All', query: '' },
  { labelAr: 'متجر إلكتروني', labelEn: 'E-commerce', query: 'متجر' },
  { labelAr: 'رياضيات وتفاضل', labelEn: 'Math & Calculus', query: 'رياضيات' },
  { labelAr: 'بدون رأس مال', labelEn: 'Zero Capital', query: 'بدون راس مال' },
  { labelAr: 'ذكاء اصطناعي', labelEn: 'AI & Automation', query: 'ذكاء اصطناعي' },
  { labelAr: 'تسويف وتركيز', labelEn: 'Focus & Anti-Procrastination', query: 'تسويف' },
  { labelAr: 'بادل', labelEn: 'Padel Courts', query: 'بادل' },
  { labelAr: 'قهوة مختصة', labelEn: 'Specialty Coffee', query: 'قهوة' },
  { labelAr: 'فيزياء ونيوتن', labelEn: 'Physics', query: 'فيزياء' },
  { labelAr: 'تقسيم الراتب', labelEn: 'Salary Budget', query: 'راتب' },
  { labelAr: 'لغة إنجليزية', labelEn: 'English Fluency', query: 'انجليزي' },
  { labelAr: 'استنتاج منطقي', labelEn: 'Logical Deduction', query: 'استنتاج' },
];

interface UniversalSearchHubProps {
  onGeneratePlanFromTopic?: (prompt: string, category?: string) => void;
  onAskRobotTopic?: (query: string, category: string) => void;
}

export const UniversalSearchHub: React.FC<UniversalSearchHubProps> = ({
  onGeneratePlanFromTopic,
  onAskRobotTopic,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemDetails, setActiveItemDetails] = useState<SearchTopicItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter items dynamically based on search query and category
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return TOP_SEARCHED_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      // Text search in titles, subtitles, tags, and answers
      const matchTitle = item.titleAr.toLowerCase().includes(q) || item.titleEn.toLowerCase().includes(q);
      const matchSubtitle = item.subtitleAr.toLowerCase().includes(q) || item.subtitleEn.toLowerCase().includes(q);
      const matchAnswer = item.directAnswerAr.toLowerCase().includes(q) || item.directAnswerEn.toLowerCase().includes(q);
      const matchTerms = item.searchTerms.some((term) => term.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchAnswer || matchTerms;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'business':
        return Rocket;
      case 'studies':
        return BookOpen;
      case 'solutions':
        return Lightbulb;
      case 'deductions':
        return BrainCircuit;
      case 'general_knowledge':
        return Globe;
      default:
        return Sparkles;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'business':
        return isEn ? 'Business & Startups' : 'مشاريع وريادة أعمال';
      case 'studies':
        return isEn ? 'Academic Studies' : 'المباحث الدراسية';
      case 'solutions':
        return isEn ? 'Practical Solutions' : 'حلول المشكلات';
      case 'deductions':
        return isEn ? 'Logic & Deductions' : 'استنتاج ومنطق';
      case 'general_knowledge':
        return isEn ? 'General Knowledge' : 'معلومات عامة';
      default:
        return isEn ? 'General' : 'عام';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'business':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'studies':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'solutions':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'deductions':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'general_knowledge':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white border border-indigo-900/50 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-cyan-300 text-xs font-bold mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{isEn ? 'Universal Search & Discovery Hub' : 'مركز البحث والاكتشاف الشامل — كل ما يبحث عنه المستخدمون'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isEn
              ? 'Everything Users Search For, In One Place'
              : 'كل ما يبحث عنه المستخدمون... متوفر فوراً بين يديك'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            {isEn
              ? 'Explore top-trending business models, academic studies, actionable problem remedies, and logical deductions. Read instant solutions, launch strategic plans, or consult the multilingual AI Robot with one click.'
              : 'تصفح أفكار المشاريع الأكثر ربحاً، المباحث الدراسية، حلول التحديات اليومية، والاستنتاجات المنطقية. احصل على حلول وشروحات فورية، أو أطلق خطة عمل كاملة، أو استشر الروبوت الذكي فوراً.'}
          </p>

          {/* Interactive Live Search Bar */}
          <div className="mt-5 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-indigo-400 absolute start-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search anything: e.g. e-commerce, calculus, zero capital, procrastination, coffee, padel, AI...'
                    : 'ابحث في كل شيء: مثل متجر، رياضيات، بدون رأس مال، تسويف، بادل، قهوة، ذكاء اصطناعي...'
                }
                className="w-full ps-11 pe-24 py-3.5 text-xs sm:text-sm bg-slate-800/90 text-white placeholder-slate-400 rounded-2xl border border-slate-700/80 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <div className="absolute end-3 hidden sm:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-700/50 px-2 py-1 rounded-md border border-slate-600/50">
                  <span>{filteredItems.length}</span>
                  <span>{isEn ? 'results' : 'نتيجة'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick-Click Popular Tags */}
          <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1 shrink-0">
              <Tag className="w-3 h-3 text-indigo-400" />
              <span>{isEn ? 'Trending Tags:' : 'الأكثر بحثاً:'}</span>
            </span>
            {FILTER_TAGS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchQuery(tag.query)}
                className={`px-2.5 py-1 rounded-full text-xs transition-all whitespace-nowrap shrink-0 border ${
                  searchQuery === tag.query
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-xs'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700/60'
                }`}
              >
                {isEn ? tag.labelEn : tag.labelAr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', labelAr: 'جميع الموضوعات', labelEn: 'All Topics', icon: Sparkles },
          { id: 'business', labelAr: 'مشاريع وريادة أعمال', labelEn: 'Business & Startups', icon: Rocket },
          { id: 'studies', labelAr: 'المباحث الدراسية', labelEn: 'Academic Studies', icon: BookOpen },
          { id: 'solutions', labelAr: 'حلول المشكلات', labelEn: 'Practical Solutions', icon: Lightbulb },
          { id: 'deductions', labelAr: 'استنتاج ومنطق', labelEn: 'Logic & Deductions', icon: BrainCircuit },
          { id: 'general_knowledge', labelAr: 'معلومات عامة وتقنية', labelEn: 'Knowledge & Tech', icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-white text-indigo-700 border-indigo-300 shadow-xs ring-2 ring-indigo-500/10'
                  : 'bg-white/60 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
              <span>{isEn ? tab.labelEn : tab.labelAr}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count & Search Query feedback */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          <span>{isEn ? 'Showing ' : 'يتم عرض '}</span>
          <strong className="text-slate-800 font-bold">{filteredItems.length}</strong>
          <span>{isEn ? ' topics matching user searches' : ' موضوعاً مما يبحث عنه المستخدمون'}</span>
          {searchQuery && (
            <span>
              {isEn ? ' for ' : ' لكلمة: '}
              <strong className="text-indigo-600 font-semibold">"{searchQuery}"</strong>
            </span>
          )}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredItems.map((item) => {
          const Icon = getCategoryIcon(item.category);
          const colorClass = getCategoryColor(item.category);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Badge */}
              <div className="p-5 flex-1">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`p-2 rounded-xl border ${colorClass} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                    {isEn ? item.badgeEn : item.badgeAr}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-indigo-700 transition-colors">
                  {isEn ? item.titleEn : item.titleAr}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {isEn ? item.subtitleEn : item.subtitleAr}
                </p>

                {/* Direct Answer Sneak-peek */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <p className="line-clamp-3">
                    {isEn ? item.directAnswerEn : item.directAnswerAr}
                  </p>
                </div>

                {/* Stat Highlight */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-lg border border-emerald-100 w-fit">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.highlightStat}</span>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveItemDetails(item)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-white transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{isEn ? 'View Guide & Steps' : 'عرض الشرح والحل'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {item.canGeneratePlan && onGeneratePlanFromTopic && (
                    <button
                      type="button"
                      onClick={() =>
                        onGeneratePlanFromTopic(
                          item.planIdeaPrompt || item.titleAr,
                          item.planCategory
                        )
                      }
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg text-xs font-bold shadow-2xs transition-all"
                      title={isEn ? 'Generate Full Venture Plan' : 'توليد خطة مشروع كاملة بضغطة زر'}
                    >
                      <Rocket className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Plan' : 'خطة عمل'}</span>
                    </button>
                  )}

                  {onAskRobotTopic && (
                    <button
                      type="button"
                      onClick={() =>
                        onAskRobotTopic(
                          isEn ? item.robotQueryEn : item.robotQueryAr,
                          item.category === 'business' ? 'business' : item.category
                        )
                      }
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/80 rounded-lg text-xs font-bold transition-colors"
                      title={isEn ? 'Ask Universal AI Robot' : 'استشر الروبوت الذكي في هذا الموضوع'}
                    >
                      <Bot className="w-3.5 h-3.5 text-purple-600" />
                      <span>{isEn ? 'Ask Bot' : 'اسأل الروبوت'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No results fallback */}
      {filteredItems.length === 0 && (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {isEn ? 'Did not find the exact topic in the catalog?' : 'لم تجد الموضوع في قائمة الأكثر بحثاً؟'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              {isEn
                ? `You can ask the Universal Multilingual AI Robot about "${searchQuery}" right now, or generate a custom venture plan directly.`
                : `يمكنك سؤال الروبوت الذكي متعدد اللغات عن "${searchQuery}" فوراً وسيجيبك بدقة، أو توليد خطة مشروع مخصصة.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onAskRobotTopic && (
              <button
                type="button"
                onClick={() => onAskRobotTopic(searchQuery, 'solutions')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <Bot className="w-4 h-4" />
                <span>{isEn ? `Ask AI Robot about "${searchQuery}"` : `اسأل الروبوت الذكي عن: "${searchQuery}"`}</span>
              </button>
            )}

            {onGeneratePlanFromTopic && (
              <button
                type="button"
                onClick={() => onGeneratePlanFromTopic(searchQuery)}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <Rocket className="w-4 h-4 text-indigo-600" />
                <span>{isEn ? 'Convert into Project Plan' : 'حول استفسارك إلى خطة عمل'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Item Full Details Modal */}
      {activeItemDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn">
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-white/10 text-cyan-300">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold block">
                    {getCategoryLabel(activeItemDetails.category)}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base">
                    {isEn ? activeItemDetails.titleEn : activeItemDetails.titleAr}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveItemDetails(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              {/* Highlight Banner */}
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>{activeItemDetails.highlightStat}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-white text-indigo-700 font-bold text-[11px] border border-indigo-200">
                  {isEn ? activeItemDetails.badgeEn : activeItemDetails.badgeAr}
                </span>
              </div>

              {/* Direct Explanation & Solution */}
              <div>
                <strong className="text-slate-900 text-xs sm:text-sm font-bold block mb-1.5 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>{isEn ? 'Direct Summary & Solution:' : 'الشرح المباشر والحل العملي:'}</span>
                </strong>
                <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed text-slate-800">
                  {isEn ? activeItemDetails.directAnswerEn : activeItemDetails.directAnswerAr}
                </p>
              </div>

              {/* Key Implementation Points */}
              <div>
                <strong className="text-slate-900 text-xs sm:text-sm font-bold block mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Key Actionable Steps & Insights:' : 'أهم الخطوات والنقاط العملية:'}</span>
                </strong>
                <div className="space-y-2">
                  {(isEn ? activeItemDetails.keyPointsEn : activeItemDetails.keyPointsAr).map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100/70 text-slate-800 text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    activeItemDetails.id,
                    isEn
                      ? `${activeItemDetails.titleEn}\n\n${activeItemDetails.directAnswerEn}\n\nKey Steps:\n${activeItemDetails.keyPointsEn.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
                      : `${activeItemDetails.titleAr}\n\n${activeItemDetails.directAnswerAr}\n\nالخطوات العملية:\n${activeItemDetails.keyPointsAr.map((p, i) => `${i + 1}. ${p}`).join('\n')}`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedId === activeItemDetails.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isEn ? 'Copied' : 'تم النسخ'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Copy Guide' : 'نسخ الشرح'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {onAskRobotTopic && (
                  <button
                    type="button"
                    onClick={() => {
                      const query = isEn ? activeItemDetails.robotQueryEn : activeItemDetails.robotQueryAr;
                      const cat = activeItemDetails.category === 'business' ? 'business' : activeItemDetails.category;
                      setActiveItemDetails(null);
                      onAskRobotTopic(query, cat);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span>{isEn ? 'Ask AI Robot' : 'استشر الروبوت الذكي'}</span>
                  </button>
                )}

                {activeItemDetails.canGeneratePlan && onGeneratePlanFromTopic && (
                  <button
                    type="button"
                    onClick={() => {
                      const prompt = activeItemDetails.planIdeaPrompt || activeItemDetails.titleAr;
                      const cat = activeItemDetails.planCategory;
                      setActiveItemDetails(null);
                      onGeneratePlanFromTopic(prompt, cat);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>{isEn ? 'Generate Full Plan' : 'توليد خطة مشروع كاملة'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
