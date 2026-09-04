export type Language = 'ar' | 'en';

export interface Translations {
  common: {
    appName: string;
    tagline: string;
    subTagline: string;
    loading: string;
    error: string;
    close: string;
    copied: string;
    copy: string;
    print: string;
    exportMarkdown: string;
    delete: string;
    cancel: string;
    save: string;
    currency: string;
    days: string;
    weeks: string;
    months: string;
  };
  header: {
    badge: string;
    subtitle: string;
    savedPlans: string;
    newPlan: string;
    switchLanguage: string;
    currentLanguageName: string;
    copySummary: string;
    downloadReport: string;
    printPdf: string;
    skillMatcherNav: string;
    translateToOtherLang: string;
    translatingPlan: string;
  };
  modeSwitcher: {
    convertIdea: string;
    skillBudget: string;
    newBadge: string;
  };
  tabs: {
    all: string;
    canvas: string;
    pitch: string;
    strategy: string;
    calculator: string;
    execution: string;
    marketing: string;
    financial: string;
    advisor: string;
    interactive: string;
  };
  ideaForm: {
    title: string;
    subtitle: string;
    placeholder: string;
    sampleIdeasLabel: string;
    sampleIdeas: string[];
    advancedToggle: string;
    hideAdvanced: string;
    fieldLabel: string;
    fieldPlaceholder: string;
    industries: string[];
    budgetLabel: string;
    budgetLevels: { label: string; value: string }[];
    timeframeLabel: string;
    timeframes: { label: string; value: string }[];
    targetMarketLabel: string;
    targetMarketPlaceholder: string;
    generateBtn: string;
    generatingBtn: string;
    voiceActive: string;
    voiceInactive: string;
    voiceUnsupported: string;
    switchPrompt: string;
    switchBtn: string;
    loadingSteps: string[];
  };
  skillMatcher: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
    skillsLabel: string;
    skillsHint: string;
    commonSkills: string[];
    customSkillPlaceholder: string;
    budgetLabel: string;
    budgetOptions: { label: string; value: string }[];
    timeLabel: string;
    timeOptions: string[];
    interestsLabel: string;
    interestsPlaceholder: string;
    discoverBtn: string;
    discoveringBtn: string;
    validationError: string;
    resultsTitle: string;
    resultsSubtitle: string;
    matchScore: string;
    requiredBudget: string;
    howToProfit: string;
    pricingModel: string;
    profitMargin: string;
    difficulty: string;
    timeline: string;
    initialSteps: string;
    turnIntoFullPlan: string;
    convertingToPlan: string;
  };
  planOverview: {
    createdOn: string;
    executiveSummary: string;
    uspTitle: string;
    monetizationTitle: string;
    monetizationBadge: string;
    monetizationSubtitle: string;
    profitMarginEst: string;
    primaryMethod: string;
    pricingStrategy: string;
    recurringRevenue: string;
    howToMaximize: string;
    targetAudienceTitle: string;
    targetAudienceSubtitle: string;
    keySegments: string;
    painPoints: string;
    valueDelivered: string;
    quickWinTitle: string;
    quickWinSubtitle: string;
    quickWinTag: string;
    translateAction: string;
    translatingAction: string;
    currentPlanLanguage: string;
  };
  leanCanvas: {
    title: string;
    subtitle: string;
    copyCanvas: string;
    problemTitle: string;
    problemDesc: string;
    solutionTitle: string;
    solutionDesc: string;
    uvpTitle: string;
    uvpDesc: string;
    unfairAdvantageTitle: string;
    unfairAdvantageDesc: string;
    customerSegmentsTitle: string;
    customerSegmentsDesc: string;
    keyMetricsTitle: string;
    keyMetricsDesc: string;
    channelsTitle: string;
    channelsDesc: string;
    costStructureTitle: string;
    costStructureDesc: string;
    revenueStreamsTitle: string;
    revenueStreamsDesc: string;
  };
  pitchDeck: {
    title: string;
    subtitle: string;
    slide: string;
    of: string;
    speakerNotes: string;
    prevSlide: string;
    nextSlide: string;
    copyPresentation: string;
    copiedPresentation: string;
    slides: {
      cover: string;
      problem: string;
      solution: string;
      persona: string;
      monetization: string;
      unitEconomics: string;
      execution: string;
      marketing: string;
      swot: string;
      cta: string;
    };
  };
  strategic: {
    northStarLabel: string;
    swotTitle: string;
    swotSubtitle: string;
    strengths: string;
    strengthsDesc: string;
    weaknesses: string;
    weaknessesDesc: string;
    opportunities: string;
    opportunitiesDesc: string;
    threats: string;
    threatsDesc: string;
    personaTitle: string;
    personaSubtitle: string;
    coreProblem: string;
    buyingTrigger: string;
    objectionHandling: string;
    kpiTitle: string;
    kpiSubtitle: string;
    month1Goal: string;
    month3Goal: string;
    month6Goal: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    unitPrice: string;
    variableCost: string;
    monthlyFixedCost: string;
    cacLabel: string;
    targetUnitsLabel: string;
    scenariosLabel: string;
    conservative: string;
    realistic: string;
    scale: string;
    contributionMargin: string;
    breakEvenUnits: string;
    breakEvenWithCAC: string;
    monthlyRevenue: string;
    monthlyCosts: string;
    netProfit: string;
    netMargin: string;
    roas: string;
    interactiveNotice: string;
    currencySymbol: string;
    resetDefaults: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    progress: string;
    ofTasks: string;
    congratsTitle: string;
    congratsDesc: string;
    readyForLaunch: string;
    filterLabel: string;
    filterAll: string;
    filterPending: string;
    filterCompleted: string;
    stageLabel: string;
    priorityHigh: string;
    priorityMedium: string;
    priorityLow: string;
    estimatedDuration: string;
  };
  marketing: {
    title: string;
    subtitle: string;
    expandAiBtn: string;
    expandingAiBtn: string;
    guerrillaTitle: string;
    channelsTitle: string;
    adHooksTitle: string;
    launchCampaignTitle: string;
    growthTacticsTitle: string;
    whyChannel: string;
    recommendedAction: string;
    copyHook: string;
    hookCopied: string;
    extraCampaignsTitle: string;
    contentCalendarTitle: string;
    weekLabel: string;
    themeLabel: string;
  };
  financial: {
    title: string;
    subtitle: string;
    initialEstimate: string;
    breakevenTimeline: string;
    revenueStreams: string;
    operationalCosts: string;
    risksTitle: string;
    risksSubtitle: string;
    riskLabel: string;
    solutionLabel: string;
  };
  advisor: {
    title: string;
    subtitle: string;
    quickQuestionsLabel: string;
    quickQuestions: string[];
    inputPlaceholder: string;
    sendBtn: string;
    initialGreeting: (projectName: string) => string;
    errorMsg: string;
  };
  savedModal: {
    title: string;
    countSubtitle: (count: number) => string;
    emptyTitle: string;
    emptyDesc: string;
    tasksProgress: string;
    viewPlan: string;
    deletePlan: string;
    confirmDelete: string;
  };
  footer: {
    desc: string;
    poweredBy: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    common: {
      appName: 'GSE AI',
      tagline: 'مخطط المشاريع والتسويق',
      subTagline: 'حوّل أي فكرة إلى خطة تنفيذ واقعية واستراتيجية تسويقية ذكية',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      close: 'إغلاق',
      copied: 'تم النسخ',
      copy: 'نسخ',
      print: 'تصدير / طباعة',
      exportMarkdown: 'تحميل تقرير كامل (MD)',
      delete: 'حذف',
      cancel: 'إلغاء',
      save: 'حفظ',
      currency: 'ريال',
      days: 'أيام',
      weeks: 'أسابيع',
      months: 'أشهر',
    },
    header: {
      badge: 'مخطط المشاريع والتسويق',
      subtitle: 'حوّل أي فكرة إلى خطة تنفيذ واقعية واستراتيجية تسويقية ذكية',
      savedPlans: 'الخطط المحفوظة',
      newPlan: 'فكرة جديدة',
      switchLanguage: 'English',
      currentLanguageName: 'العربية',
      copySummary: 'نسخ الملخص',
      downloadReport: 'تحميل تقرير كامل (MD)',
      printPdf: 'تصدير / طباعة',
      skillMatcherNav: 'اقتراح مشروع حسب المهارات',
      translateToOtherLang: 'ترجمة الخطة إلى الإنجليزية',
      translatingPlan: 'جاري ترجمة الخطة بالذكاء الاصطناعي...',
    },
    modeSwitcher: {
      convertIdea: 'تحويل فكرة',
      skillBudget: 'اقتراح حسب المهارات',
      newBadge: 'جديد ✨',
    },
    tabs: {
      all: 'عرض كامل الخطة',
      canvas: 'مخطط نموذج العمل (Lean Canvas)',
      pitch: 'العرض التقديمي (Pitch Deck)',
      strategy: 'التحليل الاستراتيجي و SWOT',
      calculator: 'حاسبة الجدوى والوحدة',
      execution: 'خطوات التنفيذ',
      marketing: 'أفكار التسويق',
      financial: 'طريقة الربح والمالية',
      advisor: 'المستشار الذكي',
      interactive: 'تفاعلية',
    },
    ideaForm: {
      title: 'حوّل فكرتك إلى خطة عمل واقعية',
      subtitle: 'اكتب فكرة مشروعك بحرية وعفوية، وسيقوم GSE AI ببناء خطة تنفيذ مجدولة، أفكار تسويق مبتكرة، ونموذج ربحي فوري.',
      placeholder: 'مثال: متجر اشتراكات للقهوة المختصة مع بوكس تجربة شهري، أو تطبيق لتأجير معدات التصوير الاحترافية...',
      sampleIdeasLabel: 'أو جرّب إحدى الأفكار الرائجة:',
      sampleIdeas: [
        'متجر إلكتروني لاشتراكات القهوة المختصة مع بوكس شهري حسب ذوق العميل',
        'تطبيق لتنظيم بطولات البادل وحجز الملاعب وتحديات اللاعبين في الحي',
        'وكالة رقمية تقدم خدمات أتمتة خدمة العملاء بالذكاء الاصطناعي للمتاجر الصغيرة',
        'منصة تفاعلية لربط أصحاب المهارات اليدوية والحرفية بالعملاء والشركات',
        'مشروع مطبخ سحابي يقدم وجبات صحية غنية بالبروتين للرياضيين وموظفي الشركات',
      ],
      advancedToggle: 'تخصيص تفاصيل إضافية (الميزانية، المجال، النطاق الزمني)',
      hideAdvanced: 'إخفاء الخيارات الإضافية',
      fieldLabel: 'مجال المشروع المقترح',
      fieldPlaceholder: 'مثلاً: تجارة إلكترونية، مطاعم وكافيهات، تقنية...',
      industries: [
        'تجارة إلكترونية ومتاجر',
        'تطبيقات ومنصات تقنية',
        'خدمات وأعمال حرة',
        'أطعمة ومشروبات ومطابخ سحابية',
        'صحة ولياقة ورياضة',
        'تعليم وتدريب واستشارات',
        'صناعة محتوى وإعلام رقمي',
      ],
      budgetLabel: 'الميزانية التقديرية المتاحة للبدء',
      budgetLevels: [
        { label: 'منخفضة جداً / صفرية (أقل من 500 ريال)', value: 'منخفضة جداً / صفرية' },
        { label: 'متوسطة (1,000 إلى 5,000 ريال)', value: 'متوسطة' },
        { label: 'مرتفعة / استثمارية (أكثر من 10,000 ريال)', value: 'مرتفعة / استثمارية' },
      ],
      timeframeLabel: 'النطاق الزمني المستهدف للإطلاق',
      timeframes: [
        { label: 'أسبوعين (إطلاق سريع MVP)', value: 'أسبوعين (إطلاق سريع)' },
        { label: 'شهر إلى 3 أشهر', value: 'شهر إلى 3 أشهر' },
        { label: '6 أشهر فأكثر', value: '6 أشهر فأكثر' },
      ],
      targetMarketLabel: 'الجمهور أو السوق المستهدف (اختياري)',
      targetMarketPlaceholder: 'مثال: طلاب الجامعات، أصحاب المتاجر، عشاق الرياضة في الرياض...',
      generateBtn: 'توليد خطة المشروع والتسويق الذكية',
      generatingBtn: 'جاري بناء الخطة المتكاملة...',
      voiceActive: 'جاري الاستماع... تحدّث الآن',
      voiceInactive: 'تحدث بالصوت',
      voiceUnsupported: 'ميزة التعرف الصوتي غير مدعومة في متصفحك الحالي. يمكنك كتابة الفكرة مباشرة.',
      switchPrompt: 'لا تمتلك فكرة واضحة بعد؟',
      switchBtn: 'استكشف أفضل مشروع يناسب مهاراتك وميزانيتك',
      loadingSteps: [
        'جاري تحليل فكرة المشروع واستخلاص القيمة التنافسية...',
        'توليد مراحل التنفيذ وجدول المهام العملية...',
        'ابتكار أفكار تسويقية غير تقليدية وخطافات إعلانية...',
        'حساب التكاليف ونموذج تحقيق الإيرادات...',
        'وضع اللمسات النهائية على خطة GSE AI الخاصة بك...',
      ],
    },
    skillMatcher: {
      badge: 'مستكشف المشاريع المخصصة الذكي',
      titleMain: 'لا تملك فكرة بعد؟',
      titleHighlight: 'دعنا نجد المشروع الأنسب لك',
      subtitle: 'حدد مهاراتك وميزانيتك والوقت المتاح لديك، وسيقوم محرك GSE AI باقتراح أفضل المشاريع الواقعية ذات العائد المرتفع مع خطوات بدء واضحة.',
      skillsLabel: '1. ما هي المهارات أو الخبرات التي تتقنها أو تفضلها؟',
      skillsHint: 'اختر واحدة أو أكثر',
      commonSkills: [
        'التصميم والجرافيك',
        'صناعة وتعديل الفيديو (مونتاج)',
        'التسويق الرقمي والسوشيال ميديا',
        'الكتابة وصناعة المحتوى',
        'البرمجة وبناء المواقع',
        'الطبخ وصنع المأكولات والمشروبات',
        'الحرف والمنتجات اليدوية',
        'التدريس والشرح وتقديم الاستشارات',
        'المبيعات وخدمة العملاء',
        'التصوير الفوتوغرافي',
        'إدارة المشاريع والتنظيم',
        'اللياقة البدنية والصحة',
      ],
      customSkillPlaceholder: 'مهارة أو اهتمام آخر غير مذكور؟ اكتبه هنا...',
      budgetLabel: '2. ما الميزانية التقريبية التي تستطيع البدء بها الآن؟',
      budgetOptions: [
        { label: 'صفر ريال (بدون رأس مال إطلاقاً)', value: 'صفر ريال / بدون رأس مال' },
        { label: 'منخفضة جداً (100 - 500 ريال / حتى 150$)', value: '100 إلى 500 ريال' },
        { label: 'متوسطة (1,000 - 3,000 ريال / حتى 800$)', value: '1,000 إلى 3,000 ريال' },
        { label: 'استثمارية (5,000+ ريال فأكثر)', value: '5,000 ريال فأكثر' },
      ],
      timeLabel: '3. كم ساعة تستطيع تخصيصها أسبوعياً للمشروع؟',
      timeOptions: [
        'أقل من 10 ساعات أسبوعياً (عمل جانبي)',
        '10 إلى 20 ساعة أسبوعياً (دوام جزئي)',
        'تفرغ كامل (أكثر من 30 ساعة أسبوعياً)',
      ],
      interestsLabel: '4. ما هي المجالات التي تشد اهتمامك أو شغفك؟ (اختياري)',
      interestsPlaceholder: 'مثال: التجارة الإلكترونية، الرياضة، التعليم، الذكاء الاصطناعي، الموضة...',
      discoverBtn: 'اكتشف أفضل المشاريع المناسبة لي الآن',
      discoveringBtn: 'جاري مطابقة مهاراتك مع أفضل الفرص السوقية...',
      validationError: 'يرجى اختيار مهارة واحدة على الأقل أو كتابة نبذة عن خبراتك.',
      resultsTitle: 'المشاريع الأكثر توافقاً مع مهاراتك وميزانيتك',
      resultsSubtitle: 'اختر أي مشروع لتحويله فوراً إلى خطة تنفيذ وتسويق متكاملة',
      matchScore: 'نسبة التوافق',
      requiredBudget: 'الميزانية المطلوبة',
      howToProfit: 'طريقة الربح المباشرة',
      pricingModel: 'نموذج التسعير',
      profitMargin: 'هامش الربح المتوقع',
      difficulty: 'مستوى الصعوبة',
      timeline: 'العائد المتوقع',
      initialSteps: 'خطوات البدء اليوم:',
      turnIntoFullPlan: 'توليد خطة عمل كاملة لهذا المشروع',
      convertingToPlan: 'جاري إنشاء خطة العمل الكاملة...',
    },
    planOverview: {
      createdOn: 'تاريخ الإنشاء:',
      executiveSummary: 'الملخص التنفيذي ورؤية المشروع',
      uspTitle: 'الميزة التنافسية والقيمة الفريدة (Unique Selling Proposition)',
      monetizationTitle: 'طريقة الربح من هذا المشروع وكيف تكسب منه المال 💰',
      monetizationBadge: 'نموذج الدخل',
      monetizationSubtitle: 'الاستراتيجية المباشرة لتحويل الفكرة إلى تدفقات مالية حقيقية وأرباح مجزية',
      profitMarginEst: 'هامش الربح التقديري',
      primaryMethod: 'طريقة الربح الأساسية بالتفصيل',
      pricingStrategy: 'استراتيجية التسعير المقترحة',
      recurringRevenue: 'إمكانية الدخل المتكرر المستمر',
      howToMaximize: 'طريقة مضاعفة الأرباح وزيادة قيمة الطلب',
      targetAudienceTitle: 'الجمهور المستهدف ونقاط الألم',
      targetAudienceSubtitle: 'من هم عملاؤك المثاليون وما المشاكل الحقيقية التي تحلها لهم',
      keySegments: 'شرائح العملاء الأساسية',
      painPoints: 'أبرز نقاط الألم والمشاكل المحلولة',
      valueDelivered: 'القيمة الجوهرية المتلقاة',
      quickWinTitle: 'أول إنجاز سريع تبدأ به اليوم (خلال 24 ساعة) ⚡',
      quickWinSubtitle: 'خطوة عملية محددة يمكنك تنفيذها فوراً لكسر حاجز التردد والبدء اليوم',
      quickWinTag: 'انطلاقة سريعة',
      translateAction: 'ترجمة الخطة إلى الإنجليزية',
      translatingAction: 'جاري ترجمة الخطة...',
      currentPlanLanguage: 'لغة محتوى الخطة:',
    },
    leanCanvas: {
      title: 'مخطط نموذج العمل التجاري المرن (Lean Canvas)',
      subtitle: 'النموذج المعتمد عالمياً لتقييم واختبار صلاحية المشاريع الريادية في صفحة واحدة',
      copyCanvas: 'نسخ المخطط',
      problemTitle: '1. المشكلة (Problem)',
      problemDesc: 'أهم 3 مشاكل يعاني منها العميل في السوق الحالي',
      solutionTitle: '2. الحل (Solution)',
      solutionDesc: 'أهم 3 ميزات مباشرة تعالج المشاكل',
      uvpTitle: '3. القيمة الفريدة (UVP)',
      uvpDesc: 'رسالة واضحة وجذابة تشرح سبب تميزك',
      unfairAdvantageTitle: '4. الميزة المحصنة (Unfair Advantage)',
      unfairAdvantageDesc: 'عنصر يصعب شراؤه أو تقليده بسهولة',
      customerSegmentsTitle: '5. شرائح العملاء (Customer Segments)',
      customerSegmentsDesc: 'المستخدمون المستهدفون والمتبنون الأوائل',
      keyMetricsTitle: '6. المقاييس الأساسية (Key Metrics)',
      keyMetricsDesc: 'المؤشرات الرقمية التي تقيس نمو المشروع',
      channelsTitle: '7. القنوات (Channels)',
      channelsDesc: 'مسارات الوصول والتوزيع والبيع للعملاء',
      costStructureTitle: '8. هيكل التكاليف (Cost Structure)',
      costStructureDesc: 'أهم النفقات التأسيسية والتشغيلية',
      revenueStreamsTitle: '9. مصادر الإيرادات (Revenue Streams)',
      revenueStreamsDesc: 'كيفية كسب المال ونموذج التسعير والهامش',
    },
    pitchDeck: {
      title: 'عرض المستثمرين والشركاء (Pitch Deck)',
      subtitle: 'شرائح تقديمية احترافية جاهزة لعرض فكرة مشروعك على المستثمرين، الشركاء أو العملاء',
      slide: 'شريحة',
      of: 'من',
      speakerNotes: 'ملاحظات المتحدث الموصى بها (Speaker Notes):',
      prevSlide: 'السابق',
      nextSlide: 'التالي',
      copyPresentation: 'نسخ نص العرض',
      copiedPresentation: 'تم نسخ العرض',
      slides: {
        cover: 'الغلاف والرؤية',
        problem: 'المشكلة والفرصة',
        solution: 'الحل والقيمة المضافة',
        persona: 'العميل المثالي',
        monetization: 'نموذج الربح والتسعير',
        unitEconomics: 'اقتصاديات الوحدة',
        execution: 'خارطة طريق التنفيذ',
        marketing: 'استراتيجية النمو',
        swot: 'الميزة التنافسية و SWOT',
        cta: 'الدعوة لاتخاذ إجراء',
      },
    },
    strategic: {
      northStarLabel: 'المؤشر النجمي الأساسي للنجاح (North Star Metric)',
      swotTitle: 'التحليل الاستراتيجي ومصفوفة SWOT',
      swotSubtitle: 'رؤية عميقة حول نقاط القوة والضعف الداخلية، والفرص والتهديدات الخارجية',
      strengths: 'نقاط القوة (Strengths)',
      strengthsDesc: 'المزايا التنافسية والقدرات الداخلية للمشروع',
      weaknesses: 'نقاط الضعف (Weaknesses)',
      weaknessesDesc: 'القيود والتحديات الداخلية الواجب معالجتها',
      opportunities: 'الفرص السوقية (Opportunities)',
      opportunitiesDesc: 'تغيرات السوق والاتجاهات التي يمكن استغلالها',
      threats: 'التهديدات الخارجية (Threats)',
      threatsDesc: 'المنافسة والمخاطر الخارجية وكيفية التحوط منها',
      personaTitle: 'شخصية العميل المثالي (Target Persona)',
      personaSubtitle: 'تحليل دقيق لسلوك العميل ودوافعه الحقيقية للشراء',
      coreProblem: 'أكبر مشكلة أو إحباط يعاني منه:',
      buyingTrigger: 'المحفز الحاسم للشراء الفوري:',
      objectionHandling: 'أكبر اعتراض محتمل وطريقة تجاوزه:',
      kpiTitle: 'مؤشرات الأداء والأهداف الرقمية (Strategic KPIs)',
      kpiSubtitle: 'أهداف رقمية واضحة وقابلة للقياس لكل مرحلة نمو',
      month1Goal: 'هدف الشهر الأول',
      month3Goal: 'هدف الشهر الثالث',
      month6Goal: 'هدف الشهر السادس',
    },
    calculator: {
      title: 'حاسبة الجدوى الاقتصادية واقتصاديات الوحدة (Unit Economics)',
      subtitle: 'أداة تفاعلية لحساب نقطة التعادل، هامش الربح، والعائد على الاستثمار الإعلاني لكل وحدة بيع',
      unitPrice: 'سعر بيع الوحدة المقترح',
      variableCost: 'التكلفة المتغيرة لكل وحدة',
      monthlyFixedCost: 'التكاليف الثابتة الشهرية',
      cacLabel: 'تكلفة اكتساب العميل (CAC)',
      targetUnitsLabel: 'عدد المبيعات الشهرية المستهدفة',
      scenariosLabel: 'السيناريوهات الجاهزة:',
      conservative: 'متحفظ',
      realistic: 'واقعي',
      scale: 'توسعي',
      contributionMargin: 'هامش المساهمة للوحدة',
      breakEvenUnits: 'نقطة التعادل (بدون إعلانات)',
      breakEvenWithCAC: 'نقطة التعادل (شاملة الإعلانات)',
      monthlyRevenue: 'الإيراد الشهري المتوقع',
      monthlyCosts: 'إجمالي التكاليف الشهرية',
      netProfit: 'صافي الربح الشهري المتوقع',
      netMargin: 'هامش الربح الصافي',
      roas: 'مضاعف العائد الإعلاني (ROAS)',
      interactiveNotice: 'حرك المؤشرات لتجربة سيناريوهات تسعير مختلفة فورياً',
      currencySymbol: 'ر.س',
      resetDefaults: 'إعادة ضبط القيم الافتراضية',
    },
    roadmap: {
      title: 'خارطة خطوات التنفيذ والمهام',
      subtitle: 'مراحل مرتبة زمنياً لنقل الفكرة من التخطيط إلى أرض الواقع',
      progress: 'نسبة إنجاز المهام:',
      ofTasks: 'من',
      congratsTitle: 'تهانينا! أكملت 100% من مهام خارطة الطريق!',
      congratsDesc: 'لقد أنجزت كافة المتطلبات الأساسية، مشروعك الآن جاهز تماماً للتشغيل واستقبال أول دفعات العملاء والأرباح.',
      readyForLaunch: 'جاهز للإطلاق 🚀',
      filterLabel: 'تصفية المهام:',
      filterAll: 'الكل',
      filterPending: 'المتبقية',
      filterCompleted: 'المكتملة',
      stageLabel: 'المرحلة',
      priorityHigh: 'عالية',
      priorityMedium: 'متوسطة',
      priorityLow: 'منخفضة',
      estimatedDuration: 'المدة التقديرية',
    },
    marketing: {
      title: 'استراتيجية وأفكار التسويق والترويج',
      subtitle: 'أفكار غير تقليدية، قنوات الوصول، وخطافات إعلانية جاهزة لاكتساب أول العملاء',
      expandAiBtn: 'توليد أفكار وحملات إضافية بالذكاء الاصطناعي',
      expandingAiBtn: 'جاري ابتكار أفكار تسويقية جديدة...',
      guerrillaTitle: 'أفكار تسويقية مبتكرة وغير تقليدية (Guerrilla Marketing)',
      channelsTitle: 'قنوات الترويج المقترحة واستراتيجية التواجد',
      adHooksTitle: 'خطافات إعلانية جاهزة للنسخ والاستخدام (Hooks & CTAs)',
      launchCampaignTitle: 'حملة الإطلاق المقترحة (Launch Campaign)',
      growthTacticsTitle: 'تكتيكات النمو وجذب التوصيات الشفهية (Growth Hacks)',
      whyChannel: 'لماذا هذه القناة؟',
      recommendedAction: 'الإجراء الموصى به:',
      copyHook: 'نسخ الخطاف',
      hookCopied: 'تم النسخ بنجاح',
      extraCampaignsTitle: 'أفكار حملات إعلانية إضافية مبتكرة',
      contentCalendarTitle: 'جدول محتوى الأسبوع الأول للإطلاق (Content Calendar)',
      weekLabel: 'الأسبوع',
      themeLabel: 'الموضوع الأساسي',
    },
    financial: {
      title: 'طريقة الربح والنموذج المالي',
      subtitle: 'التكاليف المقدرة ونموذج تحقيق الأرباح المباشرة وتفادي المخاطر',
      initialEstimate: 'الميزانية التأسيسية التقديرية',
      breakevenTimeline: 'الوصول لنقطة التعادل المتوقعة',
      revenueStreams: 'مصادر الإيرادات المقترحة',
      operationalCosts: 'أهم النفقات التشغيلية الدورية',
      risksTitle: 'إدارة المخاطر والتحديات المحتملة',
      risksSubtitle: 'كيفية تجنب العقبات والتحوط منها قبل حدوثها',
      riskLabel: 'المخاطرة المحتملة',
      solutionLabel: 'طريقة المعالجة والحل',
    },
    advisor: {
      title: 'المستشار الذكي للمشروع (GSE Advisor)',
      subtitle: 'اطرح أي سؤال متخصص حول الخطة والتنفيذ واستراتيجيات البيع والتسويق',
      quickQuestionsLabel: 'أسئلة شائعة سريعة:',
      quickQuestions: [
        'كيف أصل لأول 10 عملاء بأسرع وقت؟',
        'ما هو سيناريو فيديو تيك توك المقترح لإطلاق هذا المشروع؟',
        'كيف أضمن أسعاراً تنافسية تحقق أرباحاً جيدة؟',
      ],
      inputPlaceholder: 'اسأل المستشار الذكي عن أي تفصيل في الخطة...',
      sendBtn: 'إرسال',
      initialGreeting: (projectName: string) =>
        `مرحباً بك! أنا مستشارك الذكي في GSE AI الخاص بمشروع "${projectName}". يمكنك سؤالي عن أي تفصيل في الخطة، مثل التسعير، استراتيجيات المحتوى، التراخيص، أو كيفية تنفيذ أي خطوة.`,
      errorMsg: 'عذراً، حدث خطأ أثناء الاتصال بالمستشار الذكي. يرجى المحاولة مرة أخرى.',
    },
    savedModal: {
      title: 'سجل خطط المشاريع المحفوظة',
      countSubtitle: (count: number) =>
        `لديك ${count} خطط محفوظة محلياً يمكنك العودة إليها في أي وقت`,
      emptyTitle: 'لا توجد خطط محفوظة بعد',
      emptyDesc: 'عند توليد أي خطة مشروع جديدة، سيتم حفظها هنا تلقائياً.',
      tasksProgress: 'المهام المنجزة:',
      viewPlan: 'عرض الخطة',
      deletePlan: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف هذه الخطة؟',
    },
    footer: {
      desc: 'نظام الذكاء الاصطناعي لتحويل الأفكار إلى خطط عمل وخطوات تنفيذ وأفكار تسويق',
      poweredBy: 'مدعوم بنماذج Gemini 3.8 Flash المتطورة',
    },
  },

  en: {
    common: {
      appName: 'GSE AI',
      tagline: 'Venture & Marketing Planner',
      subTagline: 'Transform any idea into an actionable roadmap and smart marketing strategy',
      loading: 'Loading...',
      error: 'Error',
      close: 'Close',
      copied: 'Copied',
      copy: 'Copy',
      print: 'Export / Print',
      exportMarkdown: 'Download Report (MD)',
      delete: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      currency: 'USD',
      days: 'days',
      weeks: 'weeks',
      months: 'months',
    },
    header: {
      badge: 'Venture & Marketing Planner',
      subtitle: 'Transform any idea into an actionable execution roadmap and smart marketing plan',
      savedPlans: 'Saved Plans',
      newPlan: 'New Plan',
      switchLanguage: 'العربية',
      currentLanguageName: 'English',
      copySummary: 'Copy Summary',
      downloadReport: 'Download Report (MD)',
      printPdf: 'Export / Print',
      skillMatcherNav: 'Suggest Project by Skills',
      translateToOtherLang: 'Translate Plan to Arabic',
      translatingPlan: 'Translating plan with AI...',
    },
    modeSwitcher: {
      convertIdea: 'Convert an Idea',
      skillBudget: 'Suggest by Skills',
      newBadge: 'NEW ✨',
    },
    tabs: {
      all: 'Full Plan Overview',
      canvas: 'Lean Canvas Model',
      pitch: 'Pitch Deck Slides',
      strategy: 'Strategic Analysis & SWOT',
      calculator: 'Unit Economics Calculator',
      execution: 'Execution Roadmap',
      marketing: 'Marketing Tactics',
      financial: 'Monetization & Financials',
      advisor: 'AI Advisor',
      interactive: 'Interactive',
    },
    ideaForm: {
      title: 'Turn Your Idea into a Realistic Business Plan',
      subtitle: 'Describe your idea casually and freely. GSE AI will generate a structured roadmap, innovative marketing hacks, and a clear monetization model.',
      placeholder: 'E.g., A subscription specialty coffee box curated by taste profile, or an on-demand peer-to-peer equipment rental app...',
      sampleIdeasLabel: 'Or explore trending concept ideas:',
      sampleIdeas: [
        'Curated specialty coffee monthly subscription box customized to user preferences',
        'Mobile app for organizing neighborhood padel tournaments and court reservations',
        'Digital agency providing AI customer support automation for small Shopify stores',
        'Interactive platform connecting skilled artisans and craftsmen with corporate clients',
        'Cloud kitchen delivering high-protein, macro-balanced meals for athletes and professionals',
      ],
      advancedToggle: 'Customize details (Budget, Industry, Launch Timeframe)',
      hideAdvanced: 'Hide advanced options',
      fieldLabel: 'Target Industry / Field',
      fieldPlaceholder: 'E.g., E-commerce, SaaS, Health & Fitness...',
      industries: [
        'E-commerce & Retail',
        'Tech Apps & SaaS Platforms',
        'Services & Freelance Agency',
        'Food & Beverage / Cloud Kitchen',
        'Health, Fitness & Sports',
        'Education, Coaching & Consulting',
        'Content Creation & Digital Media',
      ],
      budgetLabel: 'Estimated Available Starting Budget',
      budgetLevels: [
        { label: 'Very Low / Bootstrapped (< $150)', value: 'منخفضة جداً / صفرية' },
        { label: 'Moderate ($300 - $1,500)', value: 'متوسطة' },
        { label: 'Funded / Growth (> $3,000)', value: 'مرتفعة / استثمارية' },
      ],
      timeframeLabel: 'Target Launch Timeframe',
      timeframes: [
        { label: '2 Weeks (Rapid MVP Launch)', value: 'أسبوعين (إطلاق سريع)' },
        { label: '1 to 3 Months', value: 'شهر إلى 3 أشهر' },
        { label: '6 Months or More', value: '6 أشهر فأكثر' },
      ],
      targetMarketLabel: 'Target Audience or Market (Optional)',
      targetMarketPlaceholder: 'E.g., College students, boutique coffee shops, remote tech workers...',
      generateBtn: 'Generate Smart Venture & Marketing Plan',
      generatingBtn: 'Building Comprehensive Plan...',
      voiceActive: 'Listening... speak now',
      voiceInactive: 'Voice Input',
      voiceUnsupported: 'Speech recognition is not supported in this browser. Please type your idea.',
      switchPrompt: "Don't have a clear idea yet?",
      switchBtn: 'Discover the best project suited for your skills and budget',
      loadingSteps: [
        'Analyzing business concept and extracting competitive USP...',
        'Generating execution stages and structured task roadmap...',
        'Formulating guerrilla marketing tactics and viral ad hooks...',
        'Calculating unit economics and monetization projections...',
        'Finalizing your customized GSE AI venture plan...',
      ],
    },
    skillMatcher: {
      badge: 'Smart Personalized Venture Finder',
      titleMain: "Don't Have an Idea Yet?",
      titleHighlight: "Let's find your ideal business",
      subtitle: 'Select your core skills, starting budget, and weekly availability. The GSE AI engine will suggest high-yield, realistic business ventures with step-by-step launch guidelines.',
      skillsLabel: '1. What are your key skills or preferred domains?',
      skillsHint: 'Select one or more',
      commonSkills: [
        'Graphic Design & Branding',
        'Video Editing & Motion Graphics',
        'Digital Marketing & Social Media',
        'Copywriting & Content Creation',
        'Coding & Web Development',
        'Cooking, Baking & Beverages',
        'Handcrafts & Handmade Goods',
        'Teaching, Coaching & Consulting',
        'Sales & Customer Support',
        'Photography & Visual Production',
        'Project Management & Operations',
        'Fitness, Wellness & Health',
      ],
      customSkillPlaceholder: 'Other skill or passion? Type it here...',
      budgetLabel: '2. What is your realistic starting budget right now?',
      budgetOptions: [
        { label: '$0 (Zero capital / Sweat equity)', value: 'صفر ريال / بدون رأس مال' },
        { label: 'Very Low ($50 - $200)', value: '100 إلى 500 ريال' },
        { label: 'Moderate ($300 - $1,000)', value: '1,000 إلى 3,000 ريال' },
        { label: 'Investment ($1,500+ or more)', value: '5,000 ريال فأكثر' },
      ],
      timeLabel: '3. How many hours per week can you commit?',
      timeOptions: [
        '< 10 hours/week (Side hustle)',
        '10 to 20 hours/week (Part-time focus)',
        'Full-time (> 30 hours/week)',
      ],
      interestsLabel: '4. Any specific fields that excite you? (Optional)',
      interestsPlaceholder: 'E.g., E-commerce, AI tools, fitness, education, sustainable living...',
      discoverBtn: 'Find the Best Projects for Me Now',
      discoveringBtn: 'Matching skills with lucrative market opportunities...',
      validationError: 'Please select at least one skill or write a brief background.',
      resultsTitle: 'Highest-Match Projects for Your Profile',
      resultsSubtitle: 'Pick any project to instantly convert it into a full execution and marketing roadmap',
      matchScore: 'Match Score',
      requiredBudget: 'Required Budget',
      howToProfit: 'Monetization Model',
      pricingModel: 'Pricing Strategy',
      profitMargin: 'Expected Margin',
      difficulty: 'Difficulty',
      timeline: 'First Revenue',
      initialSteps: 'Immediate Steps for Today:',
      turnIntoFullPlan: 'Generate Full Business Plan for this Project',
      convertingToPlan: 'Generating Full Plan...',
    },
    planOverview: {
      createdOn: 'Created:',
      executiveSummary: 'Executive Summary & Vision',
      uspTitle: 'Unique Selling Proposition (USP)',
      monetizationTitle: 'Monetization Strategy & How to Make Money 💰',
      monetizationBadge: 'Revenue Model',
      monetizationSubtitle: 'The direct strategy to convert this concept into viable cash flows and sustainable profits',
      profitMarginEst: 'Estimated Profit Margin',
      primaryMethod: 'Primary Monetization Method',
      pricingStrategy: 'Recommended Pricing Model',
      recurringRevenue: 'Recurring Revenue Potential',
      howToMaximize: 'Profit Maximization & Upsells',
      targetAudienceTitle: 'Target Audience & Pain Points',
      targetAudienceSubtitle: 'Who your ideal buyers are and the critical problems this business solves',
      keySegments: 'Core Customer Segments',
      painPoints: 'Key Pain Points Solved',
      valueDelivered: 'Core Value Delivered',
      quickWinTitle: 'Your Quick Win for Today (First 24 Hours) ⚡',
      quickWinSubtitle: 'A concrete action you can take right now to break inertia and validate demand today',
      quickWinTag: 'Quick Start',
      translateAction: 'Translate Plan to Arabic',
      translatingAction: 'Translating Plan...',
      currentPlanLanguage: 'Plan Content Language:',
    },
    leanCanvas: {
      title: 'Lean Business Model Canvas',
      subtitle: 'The gold-standard single-page framework to evaluate, de-risk, and validate startup feasibility',
      copyCanvas: 'Copy Canvas',
      problemTitle: '1. Problem',
      problemDesc: 'Top 3 customer pain points in the market',
      solutionTitle: '2. Solution',
      solutionDesc: 'Top 3 direct features addressing the problem',
      uvpTitle: '3. Unique Value Proposition',
      uvpDesc: 'Clear, compelling message explaining why you stand out',
      unfairAdvantageTitle: '4. Unfair Advantage',
      unfairAdvantageDesc: 'Moat that cannot be easily copied or bought',
      customerSegmentsTitle: '5. Customer Segments',
      customerSegmentsDesc: 'Target buyers and primary early adopters',
      keyMetricsTitle: '6. Key Metrics',
      keyMetricsDesc: 'Quantifiable drivers tracking traction and growth',
      channelsTitle: '7. Channels',
      channelsDesc: 'Pathways to acquire, engage, and convert customers',
      costStructureTitle: '8. Cost Structure',
      costStructureDesc: 'Major fixed and variable operating costs',
      revenueStreamsTitle: '9. Revenue Streams',
      revenueStreamsDesc: 'How money is generated, margins, and pricing',
    },
    pitchDeck: {
      title: 'Investor & Partner Pitch Deck',
      subtitle: 'Presentation slides ready to showcase your startup concept to investors, partners, or customers',
      slide: 'Slide',
      of: 'of',
      speakerNotes: 'Recommended Speaker Notes:',
      prevSlide: 'Previous',
      nextSlide: 'Next',
      copyPresentation: 'Copy Slide Deck',
      copiedPresentation: 'Deck Copied',
      slides: {
        cover: 'Cover & Vision',
        problem: 'Problem & Opportunity',
        solution: 'Solution & Value',
        persona: 'Target Persona',
        monetization: 'Monetization Model',
        unitEconomics: 'Unit Economics',
        execution: 'Execution Roadmap',
        marketing: 'Growth Strategy',
        swot: 'SWOT & Moat',
        cta: 'Call to Action',
      },
    },
    strategic: {
      northStarLabel: 'Primary North Star Metric',
      swotTitle: 'Strategic SWOT Analysis Matrix',
      swotSubtitle: 'Deep breakdown of internal strengths & weaknesses, and external market opportunities & threats',
      strengths: 'Strengths',
      strengthsDesc: 'Internal competitive advantages and core capabilities',
      weaknesses: 'Weaknesses',
      weaknessesDesc: 'Internal limitations and early operational constraints',
      opportunities: 'Opportunities',
      opportunitiesDesc: 'Market trends and tailwinds ready to be captured',
      threats: 'Threats',
      threatsDesc: 'External risks, competition, and hedging tactics',
      personaTitle: 'Target Customer Persona (ICP)',
      personaSubtitle: 'Behavioral profile, core purchase drivers, and sales objection handling',
      coreProblem: 'Core Frustration & Bottleneck:',
      buyingTrigger: 'Immediate Purchase Trigger:',
      objectionHandling: 'Key Sales Objection & Rebuttal:',
      kpiTitle: 'Strategic KPIs & Numerical Milestones',
      kpiSubtitle: 'Quantifiable, time-bound milestones for each growth phase',
      month1Goal: 'Month 1 Milestone',
      month3Goal: 'Month 3 Milestone',
      month6Goal: 'Month 6 Milestone',
    },
    calculator: {
      title: 'Unit Economics & Feasibility Calculator',
      subtitle: 'Interactive financial simulator for break-even sales, contribution margins, and ROAS per unit',
      unitPrice: 'Suggested Selling Price per Unit',
      variableCost: 'Estimated Variable Cost per Unit',
      monthlyFixedCost: 'Estimated Monthly Fixed Costs',
      cacLabel: 'Customer Acquisition Cost (CAC)',
      targetUnitsLabel: 'Target Monthly Sales Units',
      scenariosLabel: 'Preset Growth Scenarios:',
      conservative: 'Conservative',
      realistic: 'Realistic',
      scale: 'Scale Mode',
      contributionMargin: 'Unit Contribution Margin',
      breakEvenUnits: 'Break-Even Units (Organic)',
      breakEvenWithCAC: 'Break-Even Units (With CAC)',
      monthlyRevenue: 'Projected Monthly Revenue',
      monthlyCosts: 'Total Projected Costs',
      netProfit: 'Projected Net Monthly Profit',
      netMargin: 'Net Profit Margin',
      roas: 'Return on Ad Spend (ROAS)',
      interactiveNotice: 'Adjust sliders to simulate live pricing and margin models',
      currencySymbol: '$',
      resetDefaults: 'Reset to Defaults',
    },
    roadmap: {
      title: 'Execution Roadmap & Task Checklist',
      subtitle: 'Chronologically phased milestones to turn the concept into an operational business',
      progress: 'Roadmap Completion:',
      ofTasks: 'of',
      congratsTitle: 'Congratulations! 100% of Roadmap Tasks Completed!',
      congratsDesc: 'You have executed all foundational and launch requirements. Your venture is primed for live operations and revenue generation.',
      readyForLaunch: 'Launch Ready 🚀',
      filterLabel: 'Filter Tasks:',
      filterAll: 'All',
      filterPending: 'Pending',
      filterCompleted: 'Completed',
      stageLabel: 'Phase',
      priorityHigh: 'High',
      priorityMedium: 'Medium',
      priorityLow: 'Low',
      estimatedDuration: 'Est. Duration',
    },
    marketing: {
      title: 'Marketing Strategy & Growth Tactics',
      subtitle: 'Unconventional guerrilla ideas, recommended channels, and plug-and-play ad hooks',
      expandAiBtn: 'Generate Additional Campaigns with AI',
      expandingAiBtn: 'Crafting New Marketing Ideas...',
      guerrillaTitle: 'Guerrilla Marketing & Zero-Cost Growth Hacks',
      channelsTitle: 'Recommended Promotion Channels & Channel Strategy',
      adHooksTitle: 'Plug-and-Play Ad Hooks & Calls to Action',
      launchCampaignTitle: 'Flagship Launch Campaign Concept',
      growthTacticsTitle: 'Long-Term Growth & Word-of-Mouth Tactics',
      whyChannel: 'Why This Channel?',
      recommendedAction: 'Recommended Action:',
      copyHook: 'Copy Hook',
      hookCopied: 'Hook Copied',
      extraCampaignsTitle: 'Creative Additional Ad Campaigns',
      contentCalendarTitle: 'Launch Week 1 Content Calendar',
      weekLabel: 'Week',
      themeLabel: 'Core Theme',
    },
    financial: {
      title: 'Monetization Strategy & Financial Model',
      subtitle: 'Projected startup capital, break-even timelines, and proactive risk management',
      initialEstimate: 'Estimated Startup Capital',
      breakevenTimeline: 'Estimated Break-Even Timeline',
      revenueStreams: 'Proposed Revenue Streams',
      operationalCosts: 'Key Recurring Operating Expenses',
      risksTitle: 'Risk Management & Mitigation Strategy',
      risksSubtitle: 'Pre-empting common operational hurdles with battle-tested countermeasures',
      riskLabel: 'Potential Risk / Bottleneck',
      solutionLabel: 'Actionable Mitigation',
    },
    advisor: {
      title: 'AI Venture Advisor (GSE Advisor)',
      subtitle: 'Ask any specific question about pricing, legal considerations, marketing hooks, or next steps',
      quickQuestionsLabel: 'Quick Questions:',
      quickQuestions: [
        'How do I acquire my first 10 paying customers fastest?',
        'What is a high-converting TikTok/Reels script for this launch?',
        'How should I structure tiered pricing to maximize margins?',
      ],
      inputPlaceholder: 'Ask your advisor anything about this plan...',
      sendBtn: 'Send',
      initialGreeting: (projectName: string) =>
        `Hello! I'm your dedicated GSE AI advisor for "${projectName}". Ask me anything about execution, pricing tiers, customer acquisition, or overcoming obstacles.`,
      errorMsg: 'Sorry, an error occurred while connecting with the advisor. Please try again.',
    },
    savedModal: {
      title: 'Saved Venture Plans',
      countSubtitle: (count: number) =>
        `You have ${count} saved plans stored locally that you can access at any time`,
      emptyTitle: 'No Saved Plans Yet',
      emptyDesc: 'Whenever you generate a new plan, it will be automatically saved here.',
      tasksProgress: 'Completed Tasks:',
      viewPlan: 'Open Plan',
      deletePlan: 'Delete',
      confirmDelete: 'Are you sure you want to delete this plan?',
    },
    footer: {
      desc: 'AI-powered platform to convert ideas into actionable business roadmaps, execution steps, and marketing strategies',
      poweredBy: 'Powered by Gemini 3.8 Flash',
    },
  },
};
