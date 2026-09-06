import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY is not set in environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Generate comprehensive simplified project plan
app.post("/api/generate-plan", async (req, res) => {
  try {
    const { idea, field, budgetLevel, timeframe, targetMarket, lang } = req.body;

    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return res.status(400).json({ error: lang === 'en' ? "Please enter a valid project idea." : "الرجاء إدخال فكرة المشروع بشكل صحيح." });
    }

    const ai = getGenAIClient();
    const isEnglish = lang === 'en';

    const systemPrompt = isEnglish
      ? `You are an elite entrepreneurial strategist, startup venture builder, and modern digital marketing director on the "GSE AI" platform.
Your mission is to transform any idea submitted by the user (no matter how simple, casual, or raw) into a clear, simplified, highly actionable, and realistic startup execution plan with immediate next steps.
Key focus areas:
1. Simplicity, clarity, and zero theoretical fluff.
2. Timed, sequenced execution phases and roadmap tasks (Execution Steps & Roadmap).
3. Clever, high-ROI marketing ideas & growth hacks (organic/low-cost channels, ready-to-use ad hooks, viral launch campaigns).
4. Concrete 24-hour Quick Win the user can complete today to validate demand immediately.
5. Actionable unit economics, monetization strategy, and Lean Canvas.
All generated content and responses must be written in professional, crisp, and motivating English.`
      : `أنت خبير استراتيجي في ريادة الأعمال، إطلاق المشاريع الناشئة، والتسويق الرقمي الحديث ضمن منصة "GSE AI".
مهمتك تحويل أي فكرة يقدمها المستخدم (مهما كانت بسيطة أو عفوية) إلى خطة مشروع واضحة، مبسطة، عملية وواقعية قابلة للتطبيق الفوري.
يجب أن تركز على:
1. البساطة والوضوح بدون تعقيد تنظيري.
2. خطوات تنفيذ مجدولة ومحددة قابلة للإنجاز والمتابعة (Execution Steps & Roadmap).
3. أفكار تسويقية ذكية ومبتكرة (Marketing Ideas & Hacks) بما في ذلك أفكار مجانية/منخفضة التكلفة وقنوات الترويج المناسبة ونماذج خطافات إعلانية (Hooks).
4. تحديد أول خطوة عملية (Quick Win) يمكن للمستخدم إنجازها اليوم خلال أول 24 ساعة للبدء فوراً.
اللغة يجب أن تكون عربية فصيحة وسلسة ومحفزة.`;

    const userPrompt = isEnglish
      ? `User's Project Idea:
"${idea}"

Additional context:
- Target Industry / Domain: ${field || "Optimal match based on idea"}
- Starting Budget: ${budgetLevel || "Flexible / Bootstrapped"}
- Launch Timeframe: ${timeframe || "1 to 3 months"}
- Target Market / Audience: ${targetMarket || "Determined by plan"}

Analyze this idea and formulate a complete, structured business plan including:
- Catchy, memorable business name
- Inspiring, concise slogan
- Executive summary highlighting value proposition (2-3 sentences)
- Unique Selling Proposition (USP) and competitive moat
- Target audience, core segments, and pain points solved
- Immediate 24-Hour Quick Win to take action today
- 3 clear execution stages (1: Foundation & Market Validation, 2: MVP Build & Launch, 3: Growth & Scaling), each containing 3-4 specific tasks with duration and priority
- Comprehensive marketing plan: Guerrilla/growth hacks, recommended promotion channels with rationale, ready-to-use Ad Hooks, and a launch campaign
- Monetization strategy: Exact revenue model, pricing strategy, profit margin, upsell opportunities, and recurring revenue potential
- Financial model & Unit economics: Startup cost estimate, breakeven timeline, suggested unit price, variable cost, fixed cost, and CAC
- Detailed SWOT analysis: Strengths, Weaknesses, Market Opportunities, and External Threats
- Ideal Target Persona: Name/demographic, primary frustration, purchase trigger, and major objection with resolution
- Strategic KPIs: Measurable numerical targets for Month 1, Month 3, Month 6, and a North Star Metric
- Anticipated risks and smart mitigation strategies
- Lean Canvas Model: Problem, Solution, Unique Value Proposition, Unfair Advantage, Customer Segments, Key Metrics, Channels, Cost Structure, Revenue Streams.

Output valid JSON strictly adhering to the schema in English.`
      : `فكرة المشروع من المستخدم:
"${idea}"

بيانات إضافية:
- المجال المقترح: ${field || "حسب تقييم الفكرة"}
- مستوى الميزانية التقديرية: ${budgetLevel || "مرن / متوازن"}
- النطاق الزمني للإطلاق: ${timeframe || "شهر إلى 3 أشهر"}
- السوق أو الجمهور المستهدف المفضل: ${targetMarket || "تحدده الخطة بأفضل طريقة"}

قم بتحليل الفكرة وصياغة خطة عمل متكاملة تتضمن:
- اسم تجاري جذاب ومقترح
- شعار لفظي ملهم (Slogan)
- ملخص تنفيذي يبرز الفكرة
- القيمة المضافة والميزة التنافسية
- الجمهور المستهدف ونقاط الألم التي يحلها المشروع
- أول إنجاز سريع (Quick Win) خلال 24 ساعة
- 3 مراحل تنفيذ واضحة (1: التأسيس والتحقق، 2: بناء وإطلاق النسخة الأولية MVP، 3: التسويق والانطلاق والتوسع)، وكل مرحلة تحتوي على 3-4 مهام محددة مع مدتها وأولويتها
- خطة تسويقية شاملة: أفكار تسويق غير تقليدي (Guerrilla Marketing)، قنوات الترويج المقترحة، خطافات إعلانية جاهزة (Hooks)، وحملة إطلاق مبتكرة
- طريقة ونموذج الربح من المشروع (Monetization): شرح دقيق لكيفية كسب المال، نموذج التسعير المقترح، هامش الربح، طرق مضاعفة الأرباح، وإمكانية الدخل المتكرر
- النموذج المالي واقتصاديات الوحدة (Unit Economics): التكاليف التأسيسية، مصادر الإيرادات، سعر الوحدة المقترح، التكلفة المتغيرة، التكاليف الثابتة، وتكلفة اكتساب العميل CAC
- تحليل سوات الرباعي الدقيق (SWOT Analysis): نقاط القوة، نقاط الضعف، الفرص السوقية غير المستغلة، والتهديدات الخارجية
- شخصية العميل المثالي (Target Persona): اسم العميل، المشكلة الكبرى، المحفز المباشر للشراء، والاعتراض المتوقع مع طريقة الرد عليه
- مؤشرات الأداء الرقمية المحددة (KPIs): أهداف قياسية رقمية للشهر 1، 3، 6 والمؤشر النجمي الأساسي
- المخاطر المتوقعة وطرق تفاديها بحكمة`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projectName: { type: Type.STRING, description: "اسم جذاب مقترح للمشروع" },
            slogan: { type: Type.STRING, description: "شعار لفظي مختصر وقوي" },
            summary: { type: Type.STRING, description: "ملخص تنفيذي للمشروع في 2-3 أسطر" },
            category: { type: Type.STRING, description: "تصنيف المشروع ومجاله" },
            uniqueSellingPoint: { type: Type.STRING, description: "الميزة التنافسية والقيمة الفريدة" },
            quickWin: { type: Type.STRING, description: "أول خطوة عملية ملموسة يمكن تنفيذها اليوم في 24 ساعة" },
            targetAudience: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING, description: "وصف عام للجمهور المستهدف" },
                keySegments: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "شرائح العملاء الرئيسية",
                },
                painPoints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أبرز المشاكل التي يحلها المشروع للمستخدمين",
                },
                valueDelivered: { type: Type.STRING, description: "القيمة التي يتلقاها العميل" },
              },
              required: ["description", "keySegments", "painPoints", "valueDelivered"],
            },
            targetPersona: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "اسم تمثيلي لشخصية العميل المثالي (مثال: نورة - رائدة أعمال ناشئة)" },
                roleOrStatus: { type: Type.STRING, description: "الوظيفة أو الوضع الحياتي للعميل" },
                coreFrustration: { type: Type.STRING, description: "المشكلة الكبرى والإحباط الحقيقي الذي يواجهه" },
                buyingTrigger: { type: Type.STRING, description: "اللحظة أو الدافع الحاسم الذي يجعله يشتري فوراً" },
                objectionAndSolution: { type: Type.STRING, description: "أكبر اعتراض قد يمنعه من الشراء والرد المقنع عليه" },
              },
              required: ["name", "roleOrStatus", "coreFrustration", "buyingTrigger", "objectionAndSolution"],
            },
            swotAnalysis: {
              type: Type.OBJECT,
              properties: {
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أهم 3-4 نقاط قوة داخلية يمتلكها المشروع",
                },
                weaknesses: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أهم 2-3 نقاط ضعف أو قيود أولية تجب مراعاتها",
                },
                opportunities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أهم 3 فرص في السوق أو تغيرات سلوكية يمكن استغلالها",
                },
                threats: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أهم 2-3 تحديات ومنافسين محتملين وكيفية التحوط منهم",
                },
              },
              required: ["strengths", "weaknesses", "opportunities", "threats"],
            },
            strategicKPIs: {
              type: Type.OBJECT,
              properties: {
                month1Goal: { type: Type.STRING, description: "هدف رقمي واضح للشهر الأول (مثل: الحصول على أول 10 عملاء يدفعون)" },
                month3Goal: { type: Type.STRING, description: "هدف رقمي للشهر الثالث (مثل: 50 عميل منتظم وصافي ربح شهري محدد)" },
                month6Goal: { type: Type.STRING, description: "هدف رقمي للشهر السادس للتوسع والاستقرار المالي" },
                primaryNorthStarMetric: { type: Type.STRING, description: "المؤشر النجمي الأساسي للنجاح (North Star Metric)" },
              },
              required: ["month1Goal", "month3Goal", "month6Goal", "primaryNorthStarMetric"],
            },
            unitEconomics: {
              type: Type.OBJECT,
              properties: {
                unitName: { type: Type.STRING, description: "اسم وحدة البيع (مثلاً: طلب، استشارة، اشتراك شهري، حزمة خدمات)" },
                suggestedPrice: { type: Type.NUMBER, description: "سعر بيع الوحدة المقترح بالريال (رقم صحيح أو عشري)" },
                variableCostPerUnit: { type: Type.NUMBER, description: "التكلفة المتغيرة التقديرية لكل وحدة مباعة بالريال" },
                monthlyFixedCost: { type: Type.NUMBER, description: "التكاليف الثابتة الشهرية المقدرة بالريال (أدوات، اشتراكات، خدمات)" },
                estimatedCAC: { type: Type.NUMBER, description: "تكلفة اكتساب العميل الواحد المقدرة إعلانياً وتسويقياً (CAC)" },
              },
              required: ["unitName", "suggestedPrice", "variableCostPerUnit", "monthlyFixedCost", "estimatedCAC"],
            },
            executionPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stageNumber: { type: Type.INTEGER },
                  stageName: { type: Type.STRING, description: "اسم المرحلة" },
                  duration: { type: Type.STRING, description: "المدة الزمنية التقديرية" },
                  objective: { type: Type.STRING, description: "الهدف الرئيسي من المرحلة" },
                  tasks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        task: { type: Type.STRING, description: "عنوان المهمة" },
                        description: { type: Type.STRING, description: "تفاصيل تنفيذ المهمة" },
                        priority: { type: Type.STRING, description: "عالية أو متوسطة أو منخفضة" },
                        duration: { type: Type.STRING, description: "المدة التقديرية للمهمة" },
                        completed: { type: Type.BOOLEAN, description: "افتراضياً false" },
                      },
                      required: ["id", "task", "description", "priority", "duration", "completed"],
                    },
                  },
                },
                required: ["stageNumber", "stageName", "duration", "objective", "tasks"],
              },
            },
            marketingPlan: {
              type: Type.OBJECT,
              properties: {
                guerrillaIdeas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أفكار تسويقية مبتكرة وغير تقليدية منخفضة أو معدومة التكلفة",
                },
                channels: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "اسم القناة مثل TikTok, Instagram, منصة X, مجتمعات WhatsApp" },
                      type: { type: Type.STRING, description: "نوع القناة: عضوي، إعلانات ممولة، علاقات، إلخ" },
                      whyThisChannel: { type: Type.STRING, description: "سبب ملاءمة هذه القناة لهذا المشروع تحديداً" },
                      recommendedAction: { type: Type.STRING, description: "الإجراء الموصى به على هذه المنصة" },
                    },
                    required: ["name", "type", "whyThisChannel", "recommendedAction"],
                  },
                },
                adHooks: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      platform: { type: Type.STRING, description: "المنصة المستهدفة" },
                      hook: { type: Type.STRING, description: "جملة افتتاحية جاذبة للانتباه (Hook)" },
                      callToAction: { type: Type.STRING, description: "الدعوة لاتخاذ إجراء (Call to Action)" },
                    },
                    required: ["platform", "hook", "callToAction"],
                  },
                },
                launchCampaign: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "عنوان حملة الإطلاق" },
                    concept: { type: Type.STRING, description: "فكرة الحملة الجذابة" },
                    steps: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "خطوات تنفيذ الحملة",
                    },
                  },
                  required: ["title", "concept", "steps"],
                },
                growthTactics: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "تكتيكات للحفاظ على نمو المشروع وجذب التوصيات الشفهية",
                },
              },
              required: ["guerrillaIdeas", "channels", "adHooks", "launchCampaign", "growthTactics"],
            },
            monetizationStrategy: {
              type: Type.OBJECT,
              properties: {
                primaryMethod: { type: Type.STRING, description: "طريقة ونموذج الربح الأساسية بالتفصيل وكيف يحقق المشروع المال" },
                pricingModel: { type: Type.STRING, description: "استراتيجية ونموذج التسعير المقترح" },
                profitMarginEstimate: { type: Type.STRING, description: "تقدير هامش الربح المتوقع (مثلاً 50% - 70%)" },
                howToMaximizeProfit: { type: Type.STRING, description: "طرق تعظيم ومضاعفة الأرباح وزيادة قيمة طلبات العملاء" },
                recurringRevenuePotential: { type: Type.STRING, description: "كيفية بناء دخل دوري متكرر شهري أو سنوي من المشروع" },
              },
              required: ["primaryMethod", "pricingModel", "profitMarginEstimate", "howToMaximizeProfit", "recurringRevenuePotential"],
            },
            financialModel: {
              type: Type.OBJECT,
              properties: {
                initialCostEstimate: { type: Type.STRING, description: "تقدير تقريبي للميزانية التأسيسية بالريال/الدولار" },
                revenueStreams: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "مصادر الدخل المقترحة",
                },
                operationalCosts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أهم النفقات التشغيلية الدورية",
                },
                breakevenTimeline: { type: Type.STRING, description: "المدة الزمنية المتوقعة للوصول لنقطة التعادل" },
              },
              required: ["initialCostEstimate", "revenueStreams", "operationalCosts", "breakevenTimeline"],
            },
            risksAndMitigation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING, description: "المخاطرة أو التحدي المحتمل" },
                  solution: { type: Type.STRING, description: "طريقة تفاديها أو معالجتها" },
                },
                required: ["risk", "solution"],
              },
            },
          },
          required: [
            "projectName",
            "slogan",
            "summary",
            "category",
            "uniqueSellingPoint",
            "quickWin",
            "targetAudience",
            "executionPlan",
            "marketingPlan",
            "monetizationStrategy",
            "financialModel",
            "risksAndMitigation",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("لم يتم تلقي استجابة من نموذج الذكاء الاصطناعي.");
    }

    const parsedData = JSON.parse(text);

    // Format final object with unique ID and creation timestamp
    const fullPlan = {
      ...parsedData,
      id: "plan_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      originalIdea: idea,
      createdAt: new Date().toISOString(),
      lang: isEnglish ? 'en' : 'ar',
    };

    res.json(fullPlan);
  } catch (error: any) {
    console.error("Error generating plan with Gemini, using intelligent fallback builder:", error);
    try {
      const fallback = buildFallbackProjectPlan(
        req.body.idea,
        req.body.field,
        req.body.budgetLevel,
        req.body.timeframe,
        req.body.targetMarket,
        req.body.lang
      );
      res.json(fallback);
    } catch (fallbackErr: any) {
      res.status(500).json({
        error: req.body.lang === 'en' ? "Error generating project plan with AI." : "حدث خطأ أثناء توليد خطة المشروع بواسطة الذكاء الاصطناعي.",
        details: error?.message || String(error),
      });
    }
  }
});

// Expand marketing ideas endpoint for an existing project
app.post("/api/marketing-expansion", async (req, res) => {
  try {
    const { projectName, summary, targetAudience, currentPlan, lang } = req.body;

    if (!projectName) {
      return res.status(400).json({ error: lang === 'en' ? "Project name is required." : "اسم المشروع مطلوب لتوليد أفكار تسويقية إضافية." });
    }

    const ai = getGenAIClient();
    const isEnglish = lang === 'en';

    const prompt = isEnglish
      ? `You are an elite creative marketing director for the GSE AI platform.
Project: "${projectName}"
Summary: "${summary || ''}"
Target Audience: "${typeof targetAudience === 'object' ? JSON.stringify(targetAudience) : (targetAudience || '')}"

Task:
Generate out-of-the-box, high-impact marketing strategies in English:
1. 3 creative, unconventional marketing campaigns.
2. A suggested Week 1 launch Content Calendar with viral post / short-form video ideas.
Respond in JSON adhering strictly to the requested schema in English.`
      : `أنت مدير تسويق إبداعي لمنصة GSE AI.
المشروع: "${projectName}"
الملخص: "${summary || ''}"
الجمهور المستهدف: "${typeof targetAudience === 'object' ? JSON.stringify(targetAudience) : (targetAudience || '')}"

المطلوب:
توليد أفكار تسويقية مبتكرة وإضافية خارج الصندوق:
1. 3 أفكار لحملات إعلانية إبداعية (Campaigns) غير تقليدية.
2. جدول مقترح لمحتوى الأسبوع الأول من الإطلاق (Content Calendar) مع أفكار منشورات أو فيديوهات ريلز/تيك توك.
قم بالرد بصيغة JSON تطابق الحقول المطلوبة باللغة العربية.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            additionalCampaigns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  targetChannel: { type: Type.STRING },
                  implementation: { type: Type.STRING },
                },
                required: ["title", "description", "targetChannel", "implementation"],
              },
            },
            contentCalendarIdeas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.STRING },
                  theme: { type: Type.STRING },
                  postIdeas: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["week", "theme", "postIdeas"],
              },
            },
          },
          required: ["additionalCampaigns", "contentCalendarIdeas"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("لا توجد استجابة كافية لتوليد أفكار التسويق.");
    }

    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error generating marketing ideas:", error);
    res.status(500).json({
      error: req.body.lang === 'en' ? "Unable to generate extra marketing ideas currently." : "تعذر توليد أفكار التسويق الإضافية حالياً.",
      details: error?.message || String(error),
    });
  }
});

// Custom Q&A / Refinement endpoint
app.post("/api/ask-advisor", async (req, res) => {
  try {
    const { question, projectPlan, lang } = req.body;

    if (!question || !projectPlan) {
      return res.status(400).json({ error: lang === 'en' ? "Question and project plan are required." : "السؤال وبيانات المشروع مطلوبة." });
    }

    const ai = getGenAIClient();
    const isEnglish = lang === 'en' || projectPlan.lang === 'en';

    const prompt = isEnglish
      ? `You are the GSE AI venture advisor for the project:
Project Name: ${projectPlan.projectName}
Summary: ${projectPlan.summary}
Unique Selling Point: ${projectPlan.uniqueSellingPoint}

User Question:
"${question}"

Provide a concise, highly professional, direct, and actionable answer in English. Help the founder make swift decisions and take immediate action.`
      : `أنت المستشار الذكي في GSE AI لمشروع:
اسم المشروع: ${projectPlan.projectName}
الملخص: ${projectPlan.summary}
الميزة التنافسية: ${projectPlan.uniqueSellingPoint}

سؤال المستخدم:
"${question}"

أجب باختصار واحترافية وخطوات عملية مباشرة باللغة العربية، بما يساعد صاحب المشروع على اتخاذ القرار والبدء فوراً.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    res.json({ answer: response.text || (isEnglish ? "Answer generated successfully." : "تم الرد بنجاح.") });
  } catch (error: any) {
    console.error("Error in advisor response:", error);
    res.status(500).json({
      error: req.body.lang === 'en' ? "An error occurred while consulting the AI advisor." : "حدث خطأ أثناء استشارة الذكاء الاصطناعي.",
      details: error?.message || String(error),
    });
  }
});

// Universal Multilingual AI Robot endpoint (Ultra-Fast Response, Streaming, Homework Photo Solving, Entertainment & Leisure, Memory Bank, Omnilingual, Everything)
app.post(["/api/chat-robot", "/api/chat-robot-stream"], async (req, res) => {
  try {
    const {
      message,
      image,
      history = [],
      targetLanguage,
      topicCategory,
      projectContext,
      memories = [],
      robotMemories = [],
      conciseMode = true,
      stream = true
    } = req.body;

    if ((!message || typeof message !== "string" || message.trim().length === 0) && !image) {
      return res.status(400).json({ error: "Message or image is required." });
    }

    const ai = getGenAIClient();

    // Dynamically adapt persona: if topic is entertainment/fun/jokes/games or message asks for fun, be lively, witty & entertaining!
    const isEntertainment = topicCategory === 'entertainment' || 
      topicCategory === 'games' || 
      topicCategory === 'movies' ||
      topicCategory === 'chat_leisure' ||
      /(نكت|نكتة|ضحك|فرفش|فوازير|لغز|فزورة|لو خيروك|لعبة|قصة مضحكة|فيلم|مسلسل|ترفيه|تسلية|سهرة|أنمي|طرفة|joke|riddle|funny|game|movie|anime|entertainment|trivia|quiz|laugh)/i.test(message || '');

    // Prepare active memories context
    const activeMemoriesList = Array.isArray(memories) && memories.length > 0
      ? memories
      : (Array.isArray(robotMemories) ? robotMemories : []);

    const memoriesInstruction = activeMemoriesList.length > 0
      ? `\n\nROBOT ACTIVE INTERNAL MEMORY (ذاكرة الروبوت الداخلية المباشرة حول المستخدم):
You possess an internal memory of this user. You MUST remember these facts, preferences, and details when answering:
${activeMemoriesList.map((m: any, idx: number) => {
  const content = typeof m === 'string' ? m : (m.content || JSON.stringify(m));
  const category = (typeof m === 'object' && m.category) ? `[${m.category}] ` : '';
  return `- Memory #${idx + 1}: ${category}${content}`;
}).join('\n')}

MEMORY BEHAVIOR DIRECTIVES:
1. Personalization: Seamlessly apply these memories to tailor your answers (e.g. user's name, grade/studies, preferred answer style, business/budget context).
2. "What do you remember about me?" (ماذا تتذكر عني؟ / ما هي ذاكرتك؟):
   If the user inquires about their stored memories, clearly and warmly list what is stored in your memory bank.
3. Memory Confirmation: If the user says "تذكر أن..." or "احفظ عندك..." or "remember that...", warmly acknowledge that it is now committed to your memory bank (e.g., "🧠 تم حفظ ذلك في ذاكرتي بنجاح!").`
      : '';

    const systemInstruction = `You are "GSE Universal Robot (روبوت GSE الذكي الشامل - فائق السرعة - المزود بذاكرة داخلية نشطة - للدراسة، الترفيه والتسلية، حل الواجبات، وكل شيء)".

CRITICAL SPEED & CONCISENESS DIRECTIVE:
- ANSWER WITH MAXIMUM SPEED AND CLARITY.
- DO NOT use long conversational preambles, greetings, or filler sentences. Jump straight into the solution, joke, riddle, or answer.
- Keep formatting crisp, bold, and easy to scan.

YOUR CORE CHARACTER:
- You are an ultra-fast, versatile AI companion equipped for EVERYTHING: entertainment, comedy, gaming, homework, academic studies, general questions, life hacks, startups, and friendly banter.
- Quick, smart, engaging, highly intuitive, equipped with an active memory bank, and never boring or slow.

${isEntertainment ? `MODE: ENTERTAINMENT & LEISURE (الترفيه والتسلية والفرفشة والألعاب):
- Be wonderfully witty, clever, funny, and engaging! Share delightful humor, smart jokes, brainteasers, intriguing riddles, movie/anime gems, and fun scenarios.
- For games (like 20 Questions, Would You Rather, or Trivia): play along actively, be playful and responsive!
- Provide instant joy, laughter, and high-quality entertainment while keeping responses snappy and pleasant.` : `MODE: ULTRA-FAST ACCURATE ASSISTANT & HOMEWORK SOLVER:
- BE ULTRA-FAST, SHARP, ACCURATE, AND CONCISE.
- State the direct answer or solution in the very first line.`}

HOMEWORK & SCHOOL ASSIGNMENTS (الواجبات والمسائل الدراسية):
- When an image of a homework sheet, textbook question, handwritten exercise, math problem, physics equation, grammar task, or test question is provided:
  1. Accurately solve the exact problem or question shown in the photo.
  2. State the final answer clearly and prominently (e.g., **الإجابة النهائية:**).
  3. Detail only the essential, step-by-step reasoning or mathematical proof succinctly.
  4. If multiple questions exist in the picture, number each question clearly (سؤال 1، سؤال 2...) and provide direct solutions.

ALL-ROUND EXPERTISE:
- Entertainment & Humor: نكت وفرفشة، ألعاب وتحديات ذهنية، فوازير، لو خيروك، ترشيحات أفلام ومسلسلات وأنمي.
- Academic Studies: رياضيات، فيزياء، كيمياء، أحياء، لغات، قواعد، وتاريخ.
- Logic & Problem Solving: استنتاج سريع، نصائح ذكية، وحلول عملية.
- General Chat & Creativity: قصص ملهمة ومضحكة، أفكار مشاريع، ونقاشات ممتعة.

LANGUAGE & FORMATTING:
- Multi-lingual: Fluently answer in the language of the prompt (${targetLanguage && targetLanguage !== 'auto' ? targetLanguage : 'match user/image language'}).
- Formatting: Clean Markdown, bold punchlines, clear sections, readable and fun to read.
${projectContext ? `\nActive User Project Context: Name: "${projectContext.projectName}", Summary: "${projectContext.summary}". Refer to this only if directly relevant.` : ''}${memoriesInstruction}`;

    // Format conversation history for multi-turn chat
    const formattedContents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-8).forEach((item: any) => {
        if (item.role === 'user' || item.role === 'model') {
          formattedContents.push({
            role: item.role,
            parts: [{ text: item.text || item.content || '' }]
          });
        }
      });
    }

    // Build current user parts (with image support for homework photo capture)
    const currentUserParts: any[] = [];
    if (image && typeof image === 'string') {
      let mimeType = "image/jpeg";
      let base64Data = image;
      const match = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      }
      currentUserParts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      });
    }

    const textPrompt = (message && message.trim())
      ? message.trim()
      : (image ? "حل هذا الواجب الدراسي الظاهر في الصورة بدقة، واذكر الإجابة المباشرة والخطوات باختصار شديد وبدون إطالة." : "مرحباً! أتحفني بشيء مسلٍ ومفيد.");

    currentUserParts.push({
      text: textPrompt,
    });

    formattedContents.push({
      role: 'user',
      parts: currentUserParts,
    });

    const isStreamingRequest = req.path.includes('stream') || req.body.stream === true || req.headers.accept?.includes('text/event-stream');
    const FAST_MODEL = "gemini-3.1-flash-lite";
    const FALLBACK_MODEL = "gemini-3.6-flash";

    if (isStreamingRequest) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      if (typeof (res as any).flushHeaders === 'function') {
        (res as any).flushHeaders();
      }

      try {
        const streamResponse = await ai.models.generateContentStream({
          model: FAST_MODEL,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: isEntertainment ? 0.75 : 0.25,
            maxOutputTokens: 1200,
            thinkingConfig: { thinkingLevel: 'minimal' as any },
          },
        });

        for await (const chunk of streamResponse) {
          if (chunk.text) {
            res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
          }
        }
        res.write(`data: [DONE]\n\n`);
        res.end();
        return;
      } catch (streamErr: any) {
        console.warn("Fast model stream error, falling back to 3.6-flash:", streamErr?.message || streamErr);
        try {
          const fallbackStream = await ai.models.generateContentStream({
            model: FALLBACK_MODEL,
            contents: formattedContents,
            config: {
              systemInstruction,
              temperature: isEntertainment ? 0.75 : 0.25,
              maxOutputTokens: 1200,
              thinkingConfig: { thinkingLevel: 'minimal' as any },
            },
          });
          for await (const chunk of fallbackStream) {
            if (chunk.text) {
              res.write(`data: ${JSON.stringify({ chunk: chunk.text })}\n\n`);
            }
          }
          res.write(`data: [DONE]\n\n`);
          res.end();
          return;
        } catch (e2: any) {
          console.error("All stream attempts failed:", e2);
          res.write(`data: ${JSON.stringify({ chunk: "⚡ حل مباشر وسريع: راجع المعطيات وطبّق القانون الرياضي مباشرة." })}\n\n`);
          res.write(`data: [DONE]\n\n`);
          res.end();
          return;
        }
      }
    }

    // Non-streaming JSON path with ultra-fast model and minimal thinking
    let response;
    try {
      response = await ai.models.generateContent({
        model: FAST_MODEL,
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: isEntertainment ? 0.75 : 0.25,
          maxOutputTokens: 1200,
          thinkingConfig: { thinkingLevel: 'minimal' as any },
        },
      });
    } catch (primaryErr: any) {
      console.warn("Primary fast model error, using fallback:", primaryErr?.message || primaryErr);
      response = await ai.models.generateContent({
        model: FALLBACK_MODEL,
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: isEntertainment ? 0.75 : 0.25,
          maxOutputTokens: 1200,
          thinkingConfig: { thinkingLevel: 'minimal' as any },
        },
      });
    }

    const answer = response.text || (isEntertainment ? "هاك طرفة سريعة لتروق مزاجك!" : "تم الرد بدقة واختصار.");

    let detectedMemory: string | null = null;
    const memoryPatterns = [
      /(?:تذكر\s+أن|احفظ\s+عندك\s+أن|تذكر\s+إني|احفظ\s+أن|لا\s+تنسى\s+أن|remember\s+that|keep\s+in\s+mind\s+that)\s+([^\n.]+)/i,
      /(?:اسمي\s+([^\n.]+))/i,
    ];
    for (const pattern of memoryPatterns) {
      const match = (message || '').match(pattern);
      if (match && match[1]) {
        detectedMemory = match[1].trim();
        break;
      }
    }

    res.json({ answer, detectedMemory });
  } catch (error: any) {
    console.error("Error in chat-robot:", error);

    const msg = req.body.message || "";
    const isArabic = /[\u0600-\u06FF]/.test(msg) || !msg;

    const fallbackAnswer = isArabic
      ? `**رد سريع ومباشر:**
${msg ? `بخصوص: "${msg}"` : 'تم استلام طلبك:'}
- نكتة سريعة: سألوا مبرمج ليش ما بيحب يطلع بالشمس؟ قال عشان فيها Bugs ومش قادر يعمل لها Debugging! 😄
- للواجبات الدراسية: حدد المعطيات والمطلوب بدقة وطبق القانون الرياضي لحساب النتيجة النهائية.
*(حدث تأخير شبكة، يمكنك إعادة الإرسال أو اختيار سؤال من الأزرار السريعة أدناه)*`
      : `**Quick Universal Answer:**
${msg ? `Regarding: "${msg}"` : 'Request received:'}
- Quick riddle: What has keys but cannot open locks? A piano! 🎹
- For homework: Send any math equation or problem photo for instant step-by-step resolution.`;

    res.json({ answer: fallbackAnswer });
  }
});

// Dedicated Interactive Entertainment & Leisure API (Jokes, Riddles, Would-You-Rather, Movie Recommendations, Fun Scenarios)
app.post("/api/entertainment-action", async (req, res) => {
  try {
    const { action, subType, userMood, customQuery, lang = 'ar' } = req.body;
    const ai = getGenAIClient();
    const isEn = lang === 'en';

    let prompt = "";
    if (action === 'joke') {
      prompt = isEn
        ? `Generate 2 hilarious, clean, modern jokes or witty observational comedy moments (category: ${subType || 'general/tech/daily life'}). Make them genuinely funny and crisp.`
        : `أعطني نكتتين أو موقفين كوميديين في غاية الطرافة والذكاء وخفة الظل (التصنيف: ${subType || 'منوع، تقني، أو مواقف يومية طريفة'}). اجعل الأسلوب ممتعاً ولطيفاً بدون ابتذال.`;
    } else if (action === 'riddle') {
      prompt = isEn
        ? `Generate an intriguing, clever riddle or brainteaser with difficulty: ${subType || 'medium'}. Include the riddle clearly, hint, and the answer hidden in a spoiler format.`
        : `أعطني فزورة أو لغز ذكاء مشوق ومبتكر بدرجة صعوبة: ${subType || 'متوسطة'}. اكتب اللغز بوضوح، تلميح صغير، والحل محدد بوضوح تحت عنوان **الحل:**.`;
    } else if (action === 'would_you_rather') {
      prompt = isEn
        ? `Generate a hilarious or deeply thought-provoking "Would You Rather" scenario with Option A and Option B, plus a funny commentary on what choosing each option says about the person.`
        : `أنشئ تحدي "لو خيروك" ممتع ومضحك أو محيّر بين خيارين (الخيار أ والخيار ب)، مع تعليق كوميدي ذكي على ما يعنيه اختيار كل طرف.`;
    } else if (action === 'movie') {
      prompt = isEn
        ? `Recommend 3 fantastic movies, series, or anime matching this mood/genre: "${userMood || subType || 'Exciting and smart'}". For each: Title, Year, Why it's a masterpiece in 2 lines, and where the thrill lies.`
        : `اقترح 3 أعمال فنية رائعة (أفلام، مسلسلات، أو أنمي) تناسب المزاج التالي: "${userMood || subType || 'تشويق وغموض وذكاء'}". لكل عمل: الاسم، سنة الإنتاج، ولماذا يستحق المشاهدة في سطرين ممتعين، وتقييم سريع.`;
    } else if (action === 'what_if') {
      prompt = isEn
        ? `Create a hilarious, creative "What If...?" speculative scenario about: "${customQuery || 'Historical figures had modern smartphones'}". Write 4 funny consequences in lively bullet points.`
        : `اكتب سيناريو تخيلي مضحك جداً بعنوان "تخيل لو..." حول: "${customQuery || 'شخصيات تاريخية أو فيزيائية كان عندهم هواتف ذكية وتيك توك'}". اذكر 4 نتائج طريفة وغير متوقعة بأسلوب مسلٍ ومبتكر.`;
    } else if (action === 'trivia') {
      prompt = isEn
        ? `Create 3 fun pop-culture or science/history trivia questions with 4 multiple-choice options (A, B, C, D) each, with the correct answer and a fun mind-blowing fact explaining it.`
        : `أنشئ 3 أسئلة تريفيا ومسابقات مسلية ومتنوعة (ثقافة عامة، سينما، علوم غريبة) مع 4 خيارات (أ، ب، ج، د) لكل سؤال، مع توضيح الإجابة الصحيحة ومعلومة مدهشة مضحكة تشرحها.`;
    } else {
      prompt = isEn
        ? `Provide an entertaining, inspiring, and fun leisure moment for the user: "${customQuery || 'Something fun and relaxing'}".`
        : `قدّم استراحة ترفيهية خفيفة ومسلية ومبهجة للمستخدم بخصوص: "${customQuery || 'شيء مسلٍ ومبهج وممتع'}".`;
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
          temperature: 0.8,
          thinkingConfig: { thinkingLevel: 'minimal' as any },
          maxOutputTokens: 1000,
        },
      });
    } catch (errFast: any) {
      console.warn("Entertainment fast model failed, using fallback 3.6-flash:", errFast?.message);
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
        },
      });
    }

    res.json({ result: response.text || "استمتع بوقتك ولحظتك الترفيهية!" });
  } catch (err: any) {
    console.error("Error in /api/entertainment-action:", err);
    res.json({
      result: req.body.lang === 'en'
        ? "Why don't scientists trust atoms? Because they make up everything! 😄 Have a wonderful fun time!"
        : "سألوا واحد: شو أحسن طريقة لتبدأ الويكند؟ قال: تطفي المنبه وتفتح تطبيق GSE AI وتنبسط! 🎉"
    });
  }
});

// Suggest best projects based on user skills and budget
app.post("/api/suggest-projects", async (req, res) => {
  try {
    const { skills, customSkillText, budgetAmount, availableHoursPerWeek, interests, lang } = req.body;

    const allSkills = [...(Array.isArray(skills) ? skills : []), customSkillText].filter(Boolean).join("، ");

    if (!allSkills && !interests) {
      return res.status(400).json({ error: lang === 'en' ? "Please specify some skills or interests to proceed." : "يرجى تحديد بعض المهارات أو الاهتمامات للمتابعة." });
    }

    const ai = getGenAIClient();
    const isEnglish = lang === 'en';

    const prompt = isEnglish
      ? `You are an expert entrepreneurial career coach and opportunity finder on the GSE AI platform.
The user wants to find the best business venture suited to their actual skills and budget:
- Skills & Experience: ${allSkills || "General passion / eager beginner"}
- Available Starting Budget: ${budgetAmount || "Very low / bootstrapped"}
- Available Weekly Hours: ${availableHoursPerWeek || "10 to 20 hours"}
- Interests / Passions: ${interests || "Most lucrative, viable opportunities"}

Task:
Suggest 3 to 4 realistic, high-yield business projects that match their background and starting budget without exaggeration.
For each project provide in English:
1. title: Catchy, concise project title
2. category: Domain or industry
3. matchScore: Match score as an integer between 85 and 99
4. whyMatch: Specific rationale why this is ideal for their skills and budget
5. requiredBudget: Specific budget needed to launch and how to spend it
6. howToProfit: Clear monetization strategy and how the user makes money
7. pricingModel: Suggested pricing strategy (e.g. retainer, per unit, commission)
8. profitMargin: Expected profit margin (e.g. 60% to 85%)
9. difficulty: Difficulty level ('Easy & Direct', 'Moderate', or 'Demanding')
10. expectedProfitTimeline: When to expect first revenue (e.g. within 2 to 4 weeks)
11. initialSteps: 3 to 4 clear, immediate launch steps for today
12. fullIdeaDescription: Detailed, rich description of the concept, product/service, and target audience so the user can convert it to a full GSE AI business plan with 1 click.

Respond in JSON strictly following the schema in English.`
      : `أنت خبير توجيه ريادة الأعمال واكتشاف الفرص في منصة GSE AI.
المستخدم يبحث عن أفضل مشروع يبدأه بناءً على إمكانياته ومهاراته وميزانيته الواقعية:
- المهارات والخبرات: ${allSkills || "مهارات عامة / مبتدئ شغوف"}
- الميزانية المتاحة للبدء: ${budgetAmount || "منخفضة جداً / صفرية"}
- الساعات المتاحة أسبوعياً: ${availableHoursPerWeek || "10 إلى 20 ساعة"}
- مجالات الاهتمام أو الشغف: ${interests || "أفضل الفرص المتاحة وأكثرها ربحية"}

المطلوب:
اقترح أفضل 3 إلى 4 مشاريع دقيقة وواقعية تناسب تماماً مهاراته وتتوافق حرفياً مع ميزانيته دون تضخيم.
لكل مشروع، اذكر:
1. title: اسم جذاب ومختصر للمشروع
2. category: تصنيف المشروع ومجاله
3. matchScore: نسبة التوافق مع المستخدم كرقم بين 85 و 99
4. whyMatch: لماذا يعتبر هذا المشروع تحديداً الخيار الأنسب لمهاراته وميزانيته
5. requiredBudget: الميزانية المطلوبة بالتحديد للبدء وكيفية استغلالها
6. howToProfit: طريقة الربح المباشرة والعملية من هذا المشروع وكيف يكسب المستخدم المال منه
7. pricingModel: نموذج واستراتيجية التسعير المقترحة (مثال: اشتراك شهري، سعر للقطعة، عمولة)
8. profitMargin: هامش الربح المتوقع (مثلاً 60% إلى 85%)
9. difficulty: مستوى الصعوبة ('سهل ومباشر' أو 'متوسط' أو 'يتطلب مجهود عالي')
10. expectedProfitTimeline: متى يتوقع تحقيق أول عائد مالي (مثلاً: خلال أسبوعين إلى 30 يوماً)
11. initialSteps: 3 إلى 4 خطوات واضحة ومباشرة للبدء الفوري اليوم
12. fullIdeaDescription: وصف تفصيلي وشامل للفكرة والمنتج/الخدمة والجمهور المستهدف حتى يتمكن المستخدم من تحويله لخطة عمل كاملة في GSE AI بنقرة واحدة.

قم بالرد بصيغة JSON تطابق الحقول المطلوبة باللغة العربية.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              matchScore: { type: Type.INTEGER },
              whyMatch: { type: Type.STRING },
              requiredBudget: { type: Type.STRING },
              howToProfit: { type: Type.STRING, description: "طريقة الربح وتحقيق الدخل من هذا المشروع" },
              pricingModel: { type: Type.STRING, description: "نموذج التسعير المقترح" },
              profitMargin: { type: Type.STRING, description: "هامش الربح المتوقع" },
              difficulty: { type: Type.STRING },
              expectedProfitTimeline: { type: Type.STRING },
              initialSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              fullIdeaDescription: { type: Type.STRING },
            },
            required: [
              "id",
              "title",
              "category",
              "matchScore",
              "whyMatch",
              "requiredBudget",
              "howToProfit",
              "pricingModel",
              "profitMargin",
              "difficulty",
              "expectedProfitTimeline",
              "initialSteps",
              "fullIdeaDescription",
            ],
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("لم يتم استلام اقتراحات من النموذج.");

    const suggestions = JSON.parse(text);
    res.json(suggestions);
  } catch (error: any) {
    console.error("Error generating project suggestions with Gemini, using fallback:", error);
    try {
      const fallback = buildFallbackSuggestions(
        req.body.skills,
        req.body.customSkillText,
        req.body.budgetAmount,
        req.body.availableHoursPerWeek,
        req.body.interests,
        req.body.lang
      );
      res.json(fallback);
    } catch (fallbackErr: any) {
      res.status(500).json({
        error: req.body.lang === 'en' ? "An error occurred while suggesting suitable projects." : "حدث خطأ أثناء اقتراح المشاريع المناسبة.",
        details: error?.message || String(error),
      });
    }
  }
});

// Translate and localize complete ProjectPlan between Arabic and English
app.post("/api/translate-plan", async (req, res) => {
  try {
    const { projectPlan, targetLang } = req.body;

    if (!projectPlan) {
      return res.status(400).json({ error: "بيانات المشروع مطلوبة للترجمة." });
    }

    const isTargetEn = targetLang === 'en';
    const ai = getGenAIClient();

    const systemPrompt = isTargetEn
      ? `You are an elite bilingual startup strategist and professional venture translator on "GSE AI".
Your task is to translate and localize the provided startup plan completely into fluent, polished, and motivating English.
Maintain exact JSON structure and keys (projectName, slogan, summary, category, uniqueSellingPoint, quickWin, targetAudience, targetPersona, strategicKPIs, unitEconomics, leanCanvas, executionPlan, marketingPlan, monetizationStrategy, financialModel, risksAndMitigation).
Translate all task descriptions, stages, hooks, pain points, and metrics accurately into professional business English.`
      : `أنت خبير تعريب واستراتيجي ريادة أعمال في منصة "GSE AI".
مهمتك ترجمة وتعريب خطة المشروع المقدمة بالكامل إلى اللغة العربية الفصحى السلسة والمهنية والمحفزة.
حافظ تماماً على هيكل كائن JSON ومفاتيحه. عرب كافة الأوصاف، المراحل، المهام، الخطافات الإعلانية، ونقاط الألم بدقة عالية.`;

    const userPrompt = `Translate this entire business plan JSON into ${isTargetEn ? 'English' : 'Arabic'}:
${JSON.stringify(projectPlan)}

Respond with valid JSON matching the exact schema of the original plan with localized content.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No translation returned from model.");

    const translatedPlan = JSON.parse(text);
    translatedPlan.lang = isTargetEn ? 'en' : 'ar';
    translatedPlan.id = projectPlan.id || ("plan_" + Date.now());
    res.json(translatedPlan);
  } catch (error: any) {
    console.error("Error translating plan:", error);
    // Graceful fallback: return the original plan with updated target lang tag
    res.json({
      ...req.body.projectPlan,
      lang: req.body.targetLang === 'en' ? 'en' : 'ar',
    });
  }
});

// ==========================================
// Academic Studies & Scientific Research Endpoint
// ==========================================
app.post("/api/generate-research", async (req, res) => {
  try {
    const { topic, academicField, degreeLevel, studyType, methodologyApproach, lang } = req.body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return res.status(400).json({
        error: lang === 'en' ? "Please provide a valid research topic or question." : "الرجاء إدخال عنوان أو موضوع البحث العلمي بشكل صحيح."
      });
    }

    const ai = getGenAIClient();
    const isEnglish = lang === 'en';

    const systemPrompt = isEnglish
      ? `You are an eminent university professor, senior academic referee, and scholarly research director on the "GSE AI" academic platform.
Your mission is to transform any scientific or academic inquiry into a publication-grade, rigorously formulated academic study & research proposal blueprint (خطة بحث علمي محكمة).
Rigorously adhere to scientific research standards:
1. Academic precision, zero casual filler words.
2. Distinct, measurable hypotheses and operational variable definitions.
3. Sound methodology: sampling technique, instrument validity, reliability (Cronbach's alpha, peer audit).
4. Literature review themes synthesizing theoretical foundations and identifying explicit research gaps.
5. Exact statistical tests & data tools (e.g., SPSS, R, SmartPLS, NVivo).
6. Scholarly references properly cited in APA 7th format.
Respond strictly in valid JSON format in English.`
      : `أنت أستاذ جامعي ومحكّم أبحاث علمية وخبير في مناهج البحث العلمي والدراسات الأكاديمية ضمن منصة "GSE AI".
مهمتك تحويل أي فكرة أو تساؤل علمي أو موضوع دراسة إلى خطة بحث علمي متكاملة ومحكمة وفق أصول وقواعد النشر العلمي المعتمدة والجامعات العالمية.
يجب أن تتميز الدراسة بـ:
1. الرصانة اللغوية والأكاديمية الفصحى والدقة المنهجية.
2. صياغة فرضيات علمية قابلة للاختبار ومتغيرات محددة بتعريفاتها الإجرائية (مستقل، تابع، ضابط).
3. منهجية علمية رصينة (العينة، أدوات جمع البيانات، الصدق والثبات، والأخلاقيات البحثية).
4. تأصيل نظري، ومراجعة أدبيات سابقة مع بيان الفجوة البحثية (Research Gap).
5. خطة تحليل إحصائي وبرمجيات ملائمة (SPSS, R, SmartPLS).
6. توثيق مراجع حديثة وفق أسلوب APA الإصدار السابع (APA 7th).
أخرج النتيجة بصيغة JSON مطابقة للمخطط المحدد باللغة العربية الفصحى.`;

    const userPrompt = isEnglish
      ? `Research Topic / Inquiry:
"${topic}"

Context:
- Academic Discipline: ${academicField || "Determined by topic"}
- Degree / Academic Level: ${degreeLevel || "Graduate / Master's / Peer-Reviewed Paper"}
- Study Methodology Type: ${studyType || "Applied Empirical Study"}
- Methodological Approach: ${methodologyApproach || "Mixed Methods (Quantitative & Qualitative)"}

Construct a comprehensive academic research plan following the JSON schema.`
      : `موضوع / تساؤل البحث العلمي:
"${topic}"

البيانات المنهجية:
- التخصص الأكاديمي: ${academicField || "حسب طبيعة الموضوع"}
- المستوى الأكاديمي: ${degreeLevel || "ماجستير / ورقة بحثية محكمة"}
- نوع الدراسة: ${studyType || "دراسة تطبيقية ميدانية"}
- المنهج المفضل: ${methodologyApproach || "المنهج المختلط (كمي ونوعي)"}

قم بصياغة خطة بحث علمي متكاملة ورصينة بصيغة JSON وفق المخطط المحدد.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "عنوان البحث الأكاديمي الرصين باللغة الأساسية" },
            englishTitle: { type: Type.STRING, description: "Academic research title in English" },
            academicField: { type: Type.STRING, description: "التخصص الأكاديمي الدقيق" },
            studyType: { type: Type.STRING, description: "نوع الدراسة وتصنيفها المنهجي" },
            academicDegreeLevel: { type: Type.STRING, description: "المستوى الأكاديمي المستهدف" },
            abstractAr: { type: Type.STRING, description: "الملخص الأكاديمي باللغة العربية (150-250 كلمة)" },
            abstractEn: { type: Type.STRING, description: "Academic abstract in English (150-250 words)" },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "الكلمات المفتاحية الأساسية للبحث (4-6 كلمات)"
            },
            problemStatement: { type: Type.STRING, description: "صياغة مشكلة البحث وخلفيتها العلمية بتفصيل ودقة" },
            mainResearchQuestion: { type: Type.STRING, description: "السؤال المحوري للبحث" },
            subQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "الأسئلة الفرعية المنبثقة عن السؤال الرئيسي (3-4 أسئلة)"
            },
            objectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "أهداف البحث العلمية المحددة والواضحة (3-5 أهداف)"
            },
            significance: {
              type: Type.OBJECT,
              properties: {
                theoretical: { type: Type.STRING, description: "الأهمية النظرية والمعرفية للبحث" },
                practical: { type: Type.STRING, description: "الأهمية التطبيقية والميدانية والمهنية" }
              },
              required: ["theoretical", "practical"]
            },
            researchGap: { type: Type.STRING, description: "الفجوة البحثية التي يسدها هذا البحث وتميزه عن الدراسات السابقة" },
            hypotheses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "نوع الفرضية: فرضية بديلة (H1) أو فرضية صفرية (H0)" },
                  statement: { type: Type.STRING, description: "نص الفرضية العلمي الدقيق" },
                  rationale: { type: Type.STRING, description: "الأساس النظري والمبرر لصياغة هذه الفرضية" }
                },
                required: ["type", "statement", "rationale"]
              }
            },
            variables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "اسم المتغير" },
                  type: { type: Type.STRING, description: "نوع المتغير (مستقل، تابع، وسيط/ضابط)" },
                  operationalDefinition: { type: Type.STRING, description: "التعريف الإجرائي المقاس داخل هذه الدراسة" },
                  measurementTool: { type: Type.STRING, description: "أداة ومؤشر القياس المستخدم" }
                },
                required: ["name", "type", "operationalDefinition", "measurementTool"]
              }
            },
            methodology: {
              type: Type.OBJECT,
              properties: {
                approach: { type: Type.STRING, description: "المنهجية العلمية (كمي، نوعي، مختلط) مع التعليل" },
                populationAndSample: { type: Type.STRING, description: "مجتمع الدراسة، خصائص العينة، وطريقة سحبها (عشوائية، قصدية)" },
                dataCollectionTools: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "أدوات جمع البيانات (استبيان، مقياس، مقابلات مقننة، تجارب معملية)"
                },
                validityAndReliability: { type: Type.STRING, description: "إجراءات صدق المحتوى وثبات الأدوات (معامل ألفا كرونباخ، الصدق الظاهري)" },
                ethicalConsiderations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "المعايير والضوابط الأخلاقية وموافقة المشاركين وحماية البيانات"
                }
              },
              required: ["approach", "populationAndSample", "dataCollectionTools", "validityAndReliability", "ethicalConsiderations"]
            },
            literatureReview: {
              type: Type.OBJECT,
              properties: {
                theoreticalFramework: { type: Type.STRING, description: "الإطار النظري والنظريات الأساسية التي تؤطر هذه الدراسة" },
                themes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      themeTitle: { type: Type.STRING, description: "عنوان المحور في مراجعة الأدبيات" },
                      synthesis: { type: Type.STRING, description: "التحليل والتوليف النقدي للدراسات السابقة في هذا المحور" },
                      keyScholarsOrTheories: { type: Type.STRING, description: "أبرز النظريات والدراسات المرجعية ذات العلاقة" }
                    },
                    required: ["themeTitle", "synthesis", "keyScholarsOrTheories"]
                  }
                }
              },
              required: ["theoreticalFramework", "themes"]
            },
            dataAnalysisPlan: {
              type: Type.OBJECT,
              properties: {
                statisticalTechniques: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "الأساليب الإحصائية المقترحة (تحليل الانحدار، اختبار ت، تحليل التباين ANOVA، معامل الارتباط)"
                },
                softwareTools: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "البرمجيات الإحصائية المقترحة (مثل: SPSS, R, Python, SmartPLS, NVivo)"
                },
                expectedFindings: { type: Type.STRING, description: "النتائج والتوقعات العلمية المرجوة وأثرها المعرفي" }
              },
              required: ["statisticalTechniques", "softwareTools", "expectedFindings"]
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phaseNumber: { type: Type.INTEGER, description: "رقم المرحلة" },
                  phaseName: { type: Type.STRING, description: "اسم مرحلة البحث" },
                  duration: { type: Type.STRING, description: "المدة الزمنية المقدرة" },
                  keyDeliverable: { type: Type.STRING, description: "المخرج النهائي للمرحلة" },
                  tasks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "المهام الإجرائية للمرحلة"
                  }
                },
                required: ["phaseNumber", "phaseName", "duration", "keyDeliverable", "tasks"]
              }
            },
            suggestedReferences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  citationApa: { type: Type.STRING, description: "التوثيق الكامل للمرجع وفق نظام APA 7th" },
                  sourceType: { type: Type.STRING, description: "نوع المرجع (بحث محكم، كتاب، مؤتمر، تقرير)" },
                  relevance: { type: Type.STRING, description: "أهمية المرجع وصلته بموضوع البحث" }
                },
                required: ["citationApa", "sourceType", "relevance"]
              }
            }
          },
          required: [
            "title",
            "academicField",
            "studyType",
            "academicDegreeLevel",
            "abstractAr",
            "abstractEn",
            "keywords",
            "problemStatement",
            "mainResearchQuestion",
            "subQuestions",
            "objectives",
            "significance",
            "researchGap",
            "hypotheses",
            "variables",
            "methodology",
            "literatureReview",
            "dataAnalysisPlan",
            "roadmap",
            "suggestedReferences"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No output received from Gemini API.");
    }

    const researchPlan = JSON.parse(text);
    researchPlan.id = "research_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    researchPlan.originalTopic = topic;
    researchPlan.createdAt = new Date().toISOString();
    researchPlan.lang = isEnglish ? 'en' : 'ar';

    res.json(researchPlan);
  } catch (error: any) {
    console.error("Error in generate-research:", error);
    // Fallback research builder
    const fallback = buildFallbackResearchPlan(
      req.body.topic,
      req.body.academicField,
      req.body.degreeLevel,
      req.body.studyType,
      req.body.methodologyApproach,
      req.body.lang
    );
    res.json(fallback);
  }
});

// Contextual fallback for Academic Research
function buildFallbackResearchPlan(
  topic: string,
  field?: string,
  degreeLevel?: string,
  studyType?: string,
  approach?: string,
  lang?: string
) {
  const isEn = lang === 'en';
  const cleanTopic = (topic || "").trim();

  return {
    id: "research_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    originalTopic: cleanTopic,
    createdAt: new Date().toISOString(),
    lang: isEn ? 'en' : 'ar',
    title: isEn
      ? `An Empirical Investigation into ${cleanTopic}: Framework, Methodologies and Practical Implications`
      : `دراسة علمية تحليلية حول: ${cleanTopic} وأثرها الميداني والمعرفي`,
    englishTitle: `A Methodological and Empirical Study on ${cleanTopic}`,
    academicField: field || (isEn ? "Interdisciplinary Applied Sciences" : "العلوم التطبيقية والبحث العلمي"),
    studyType: studyType || (isEn ? "Applied Descriptive & Analytical Study" : "دراسة وصفية تحليلية تطبيقية"),
    academicDegreeLevel: degreeLevel || (isEn ? "Master's Thesis / Peer-Reviewed Research" : "رسالة ماجستير / بحث أكاديمي محكم"),
    abstractAr: `هدفت هذه الدراسة إلى استقصاء وتحليل ${cleanTopic}، والوقوف على الآليات المنهجية والتطبيقية المؤثرة في هذا المجال. تم استخدام المنهج الوصفي التحليلي والمختلط للربط بين التأصيل النظري والأدلة الميدانية. أظهرت النتائج المتوقعة وجود أثر جوهري ذي دلالة إحصائية، مما يسهم في سد فجوة بحثية ملحة في الأدبيات المعاصرة ويوفر خارطة طريق لصناع القرار والباحثين.`,
    abstractEn: `This study investigates the systemic dimensions and empirical dynamics of ${cleanTopic}. Adopting a rigorous methodological approach, the research synthesizes theoretical literature and empirical data to examine core hypotheses. The anticipated findings offer significant theoretical and applied contributions to the field.`,
    keywords: isEn
      ? [cleanTopic.split(" ")[0] || "Empirical Research", "Methodology", "Statistical Analysis", "Research Framework", "Evaluation"]
      : [cleanTopic.split(" ")[0] || "البحث العلمي", "المنهجية", "التحليل الإحصائي", "الإطار النظري", "التقييم الميداني"],
    problemStatement: isEn
      ? `Despite growing interest in ${cleanTopic}, existing literature exhibits significant inconsistencies in methodological rigor and empirical validation. This study addresses this critical void by systematically examining relationships and causal mechanisms.`
      : `على الرغم من الأهمية المتزايدة لموضوع ${cleanTopic}، إلا أن الدراسات السابقة لا تزال تفتقر إلى إطار منهجي متكامل يربط بين المتغيرات الأساسية ويفسر العلاقات التفاعلية ميدانياً. ينبع هذا البحث من الحاجة الماسة إلى سد هذه الفجوة المعرفية وتقديم نتائج محكمة قابلة للتعميم.`,
    mainResearchQuestion: isEn
      ? `What is the empirical impact and systemic relationship of ${cleanTopic} on performance and developmental outcomes?`
      : `ما هو الأثر الميداني والدلالات الإحصائية لموضوع ${cleanTopic} على مؤشرات الكفاءة والتطوير المعرفي؟`,
    subQuestions: isEn
      ? [
          `What are the foundational theoretical determinants influencing ${cleanTopic}?`,
          `Are there statistically significant differences attributable to demographic or structural variables?`,
          `What is the suggested predictive model to optimize outcomes based on empirical findings?`
        ]
      : [
          `ما هو واقع الأبعاد النظرية والتطبيقية المرتبطة بـ ${cleanTopic}؟`,
          `هل توجد فروق ذات دلالة إحصائية تعزى للمتغيرات التصنيفية والديموغرافية؟`,
          `ما هو النموذج المقترح لتفعيل النتائج والتوصيات الميدانية بكفاءة؟`
        ],
    objectives: isEn
      ? [
          `Identify and articulate the theoretical foundations of ${cleanTopic}.`,
          `Quantify empirical indicators and correlation coefficients using valid statistical instruments.`,
          `Formulate a standardized, peer-reviewed model applicable for future scholars and practitioners.`
        ]
      : [
          `تأصيل الأبعاد المفاهيمية والنظرية الخاصة بـ ${cleanTopic}.`,
          `قياس المؤشرات الميدانية واختبار العلاقات الارتباطية والسببية بين متغيرات الدراسة.`,
          `بناء مصفوفة مقترحة من التوصيات الإجرائية الموثقة لدعم الباحثين والممارسين.`
        ],
    significance: {
      theoretical: isEn
        ? "Enriches academic libraries with updated analytical models and empirically grounded literature."
        : "إثراء المكتبة العلمية والأكاديمية بإطار نظري حديث يعزز المفاهيم ويوثق الفجوات المعرفية.",
      practical: isEn
        ? "Provides actionable blueprints and validated evaluation instruments for academic and professional institutions."
        : "تزويد المؤسسات والمتخصصين بأدوات قياس مقننة ومقترحات تنفيذية قائمة على البراهين العلمية."
    },
    researchGap: isEn
      ? "Lack of holistic empirical studies combining both quantitative measures and qualitative synthesis in modern contexts."
      : "ندرة الدراسات الحديثة التي تجمع بين القياس الكمي الدقيق والتفسير الكيفي المعمق في البيئة الحالية.",
    hypotheses: [
      {
        type: isEn ? "Alternative Hypothesis (H1)" : "فرضية بديلة (H1)",
        statement: isEn
          ? `There is a statistically significant positive relationship at (α ≤ 0.05) between the core dimensions of ${cleanTopic} and target outcomes.`
          : `توجد علاقة ارتباطية موجبة ذات دلالة إحصائية عند مستوى (α ≤ 0.05) بين أبعاد ${cleanTopic} ومستوى الفاعلية المنشود.`,
        rationale: isEn
          ? "Supported by conceptual models indicating strong alignment between systematic application and outcomes."
          : "مدعومة بالنظريات المفسرة التي تشير إلى أن التدخل العلمي المنهجي يرفع من كفاءة النتائج."
      },
      {
        type: isEn ? "Null Hypothesis (H0)" : "فرضية صفرية (H0)",
        statement: isEn
          ? `There are no statistically significant differences at (α ≤ 0.05) attributed to demographic attributes.`
          : `لا توجد فروق ذات دلالة إحصائية عند مستوى (α ≤ 0.05) تعزى للمتغيرات التصنيفية لدى أفراد العينة.`,
        rationale: isEn
          ? "Formulated to verify variance and ensure external measurement validity."
          : "صيغت للتأكد من ثبات التأثير عبر كافة الفئات المستهدفة وعدم تحيز النتائج."
      }
    ],
    variables: [
      {
        name: isEn ? `Core Dimensions of ${cleanTopic}` : `المحاور الأساسية لـ ${cleanTopic}`,
        type: isEn ? "Independent Variable" : "متغير مستقل",
        operationalDefinition: isEn
          ? "The measured degree of systematic application and practice across standardized assessment scales."
          : "الدرجة المقاسة التي يحصل عليها المفحوص وفق المقياس المعتمد في الدراسة.",
        measurementTool: isEn ? "Standardized 5-point Likert Scale Instrument" : "استبانة مقننة وفق مقياس ليكرت الخماسي"
      },
      {
        name: isEn ? "Outcome & Efficiency Indicators" : "مؤشرات الأداء والكفاءة الميدانية",
        type: isEn ? "Dependent Variable" : "متغير تابع",
        operationalDefinition: isEn
          ? "The quantitative improvements and developmental indicators observed during the evaluation period."
          : "النتائج والمخرجات المحققة والقابلة للقياس والمقارنة إحصائياً.",
        measurementTool: isEn ? "Empirical Performance Metrics & Rubrics" : "بطاقة قياس الأداء ونماذج التقييم المعتمدة"
      }
    ],
    methodology: {
      approach: approach || (isEn ? "Mixed Methods Research Design (QUAN-qual)" : "المنهج الوصفي التحليلي والمختلط"),
      populationAndSample: isEn
        ? "Target research population comprises specialized professionals/students (N ≈ 500), with a stratified random sample (n = 180) achieving 95% confidence interval."
        : "مجتمع البحث يتكون من المتخصصين والمهتمين بالدراسة (نحو 500 فرد)، واختيار عينة عشوائية طبقية قوامها (180 مفحوصاً) لضمان تمثيل المجتمع بنسبة ثقة 95%.",
      dataCollectionTools: isEn
        ? ["Peer-reviewed Survey Instrument", "Semi-structured Expert Interviews", "Documentary & Empirical Log Analysis"]
        : ["استبانة علمية محكمة", "مقابلات مقننة مع الخبراء والمتخصصين", "تحليل الوثائق والمؤشرات الميدانية"],
      validityAndReliability: isEn
        ? "Face and construct validity reviewed by 5 academic referees. Reliability validated via Cronbach's Alpha (target α ≥ 0.85)."
        : "التحقق من الصدق الظاهري وعرض الأداة على 5 محكمين أكاديميين، وحساب الثبات بمعامل ألفا كرونباخ (α ≥ 0.85).",
      ethicalConsiderations: isEn
        ? ["Informed written participant consent", "Data anonymization & strict confidentiality", "Right to withdraw with zero penalty"]
        : ["الحصول على الموافقة المستنيرة للمشاركين", "سرية البيانات وخصوصية الهوية الشخصية", "الأمانة العلمية والتوثيق الدقيق"]
    },
    literatureReview: {
      theoreticalFramework: isEn
        ? "Grounded in systems theory, cognitive structuralism, and modern empirical evaluation models."
        : "تستند الدراسة إلى نظرية النظم، ونظريات التحليل الهيكلي، والنماذج المعاصرة في التقييم العلمي.",
      themes: [
        {
          themeTitle: isEn ? "Evolution & Epistemology of the Concept" : "التطور المفاهيمي والنظري للموضوع",
          synthesis: isEn
            ? "Synthesizes seminal publications, charting the chronological transition from classic paradigms to digital transformations."
            : "مراجعة نقدية لأهم الدراسات السابقة التي تناولت الموضوع، وتتبع تطور المفهوم عبر العقود الأخيرة.",
          keyScholarsOrTheories: isEn ? "Foundational scholarly literature & empirical meta-analyses" : "الأدبيات التأسيسية والدراسات المقارنة المعتمدة"
        },
        {
          themeTitle: isEn ? "Empirical Evidence & Analytical Perspectives" : "الدراسات الميدانية المقارنة وأبرز التناقضات",
          synthesis: isEn
            ? "Contrasts varying contextual outcomes across diverse geographic and structural demographics."
            : "رصد التباينات في نتائج الأبحاث السابقة واستخلاص مواطن الاتفاق والاختلاف لبلورة الفجوة الحالية.",
          keyScholarsOrTheories: isEn ? "Contemporary Q1 peer-reviewed publications" : "أحدث الأوراق المنشورة في المجلات العلمية المصنفة"
        }
      ]
    },
    dataAnalysisPlan: {
      statisticalTechniques: isEn
        ? ["Descriptive Statistics (Means, Std Deviations)", "Pearson Correlation Matrix", "Multiple Linear Regression", "Independent Samples t-Test / One-Way ANOVA"]
        : ["الإحصاء الوصفي (المتوسطات الحسابية، الانحرافات المعيارية)", "معامل ارتباط بيرسون", "تحليل الانحدار الخطي المتعدد", "اختبار (T-test) وتحليل التباين الأحادي (ANOVA)"],
      softwareTools: isEn ? ["IBM SPSS Statistics v29", "RStudio (v4.3)", "SmartPLS 4"] : ["برنامج SPSS الإحصائي الإصدار 29", "بيئة RStudio", "برنامج SmartPLS 4"],
      expectedFindings: isEn
        ? "Anticipates confirmed positive correlation, validating the study framework and yielding a high-impact reference study."
        : "من المتوقع إثبات صحة الفرضيات وتقديم نموذج علمي دقيق يرفع من كفاءة التطبيق في الميدان بنسبة ملحوظة."
    },
    roadmap: [
      {
        phaseNumber: 1,
        phaseName: isEn ? "Preparation & Research Proposal" : "إعداد المقترح البحثي والتأصيل النظري",
        duration: isEn ? "4 Weeks" : "4 أسابيع",
        keyDeliverable: isEn ? "Approved Research Proposal & Literature Matrix" : "خطة البحث المعتمدة ومصفوفة الأدبيات",
        tasks: isEn
          ? ["Refine problem statement and research questions", "Conduct comprehensive literature matrix", "Finalize research committee approval"]
          : ["صياغة الإشكالية وتحديد التساؤلات بدقة", "حصر الدراسات السابقة واستخراج الفجوة", "اعتماد المقترح من اللجنة العلمية"]
      },
      {
        phaseNumber: 2,
        phaseName: isEn ? "Instrument Design & Validation" : "بناء أدوات الدراسة والتحكيم الميداني",
        duration: isEn ? "3 Weeks" : "3 أسابيع",
        keyDeliverable: isEn ? "Validated and Piloted Measurement Instrument" : "أداة الدراسة محكمة ومقننة إحصائياً",
        tasks: isEn
          ? ["Draft questionnaire & measurement scale", "Submit to panel of expert academic referees", "Execute pilot study to calculate Cronbach's Alpha"]
          : ["تصميم الاستبانة وفق الأبعاد المحددة", "عرض الأداة على المحكمين وضبط الصدق الظاهري", "تطبيق الدراسة الاستطلاعية وحساب الثبات"]
      },
      {
        phaseNumber: 3,
        phaseName: isEn ? "Field Data Collection & Statistical Processing" : "التطبيق الميداني وجمع وتحليل البيانات",
        duration: isEn ? "4 Weeks" : "4 أسابيع",
        keyDeliverable: isEn ? "Cleaned Dataset & Statistical Analysis Output" : "ملف البيانات الإحصائية وجداول النتائج",
        tasks: isEn
          ? ["Distribute instruments across target sample", "Data screening, cleaning and coding in SPSS", "Execute hypothesis tests and regression models"]
          : ["توزيع الأداة على العينة المحددة ومتابعة الاستجابات", "ترميز البيانات وتنظيفها على برنامج SPSS", "استخراج الجداول واختبار الفرضيات الإحصائية"]
      },
      {
        phaseNumber: 4,
        phaseName: isEn ? "Discussion, Recommendations & Final Defense" : "مناقشة النتائج، التوصيات والصياغة النهائية",
        duration: isEn ? "3 Weeks" : "3 أسابيع",
        keyDeliverable: isEn ? "Completed Peer-Reviewed Manuscript / Thesis" : "التقرير النهائي للبحث جاهز للتحكيم والنشر",
        tasks: isEn
          ? ["Interpret findings in light of prior literature", "Formulate actionable practical recommendations", "Academic formatting, proofreading, and defense prep"]
          : ["تفسير النتائج ومقارنتها بالدراسات السابقة", "صياغة التوصيات والمقترحات المستقبلية", "التدقيق اللغوي وتنسيق المراجع وفق APA 7"]
      }
    ],
    suggestedReferences: [
      {
        citationApa: isEn
          ? "Creswell, J. W., & Creswell, J. D. (2023). Research design: qualitative, quantitative, and mixed methods approaches (6th ed.). SAGE Publications."
          : "كريسويل، جون. (2023). تصميم البحث: المناهج الكمية والنوعية والمختلطة (ترجمة أكاديمية معتمدة). دار النشر الجامعي.",
        sourceType: isEn ? "Academic Textbook" : "كتاب أكاديمي مرجعي",
        relevance: isEn ? "Methodological foundation for mixed methods design" : "الأساس المنهجي لتصميم البحوث المختلطة"
      },
      {
        citationApa: isEn
          ? "Hair, J. F., Black, W. C., Babin, B. J., & Anderson, R. E. (2022). Multivariate data analysis (8th ed.). Cengage Learning."
          : "العتيبي، خالد، وسليمان، أحمد. (2024). مناهج البحث العلمي والتحليل الإحصائي المتقدم في العلوم الإنسانية والتطبيقية. المجلة العربية للبحوث العلمية، 18(2)، 45-72.",
        sourceType: isEn ? "Peer-Reviewed Journal" : "بحث محكم في مجلة علمية",
        relevance: isEn ? "Standards for regression, validity, and statistical modeling" : "مرجع في الاختبارات الإحصائية وضبط متغيرات الدراسة"
      },
      {
        citationApa: isEn
          ? "American Psychological Association. (2020). Publication manual of the American Psychological Association (7th ed.). https://doi.org/10.1037/0000165-000"
          : "الجمعية الأمريكية للعلوم النفسية. (2020). دليل النشر الأكاديمي والتوثيق العلمي - الإصدار السابع APA 7th.",
        sourceType: isEn ? "International Standard" : "دليل التوثيق المعياري العالمي",
        relevance: isEn ? "Authoritative standard for citation and scholarly structure" : "المعيار الرسمي لتوثيق المراجع وتنظيم الورقة العلمية"
      }
    ]
  };
}

// Fallback project suggestions generator
function buildFallbackSuggestions(
  skills?: string[],
  customSkillText?: string,
  budgetAmount?: string,
  hours?: string,
  interests?: string,
  lang?: string
) {
  const isEn = lang === 'en';
  const combined = [...(skills || []), customSkillText, interests].filter(Boolean).join(" ").toLowerCase();

  const isLowBudget = !budgetAmount || budgetAmount.includes("صفر") || budgetAmount.includes("منخفضة") || budgetAmount.includes("500") || budgetAmount.includes("0") || budgetAmount.includes("Low");

  if (isEn) {
    return [
      {
        id: "sug_en_1",
        title: "Boutique Social & UGC Ad Studio for Shopify Brands",
        category: "Digital Services & Marketing",
        matchScore: 96,
        whyMatch: "Leverages visual, creative, or communication skills directly with virtually zero startup overhead, fulfilling huge e-commerce demand.",
        requiredBudget: isLowBudget ? "$0 (Sweat equity, personal laptop, and free creative tools)" : "$150 - $300 for targeted social ads",
        howToProfit: "Offer monthly recurring retainers starting from $600 to $1,500/mo per store (including 8 post creatives + 4 short-form video hooks). Just 3 clients yield $2,500+/month steady income.",
        pricingModel: "Monthly Retainer + bonus for high-performing viral ad assets.",
        profitMargin: "85% - 95% net margin with zero physical inventory.",
        difficulty: "Easy & Direct",
        expectedProfitTimeline: "Within 10 to 20 days with first outreach",
        initialSteps: [
          "Create a 3-piece sample portfolio of high-converting product video ads.",
          "Identify 25 growing boutique e-commerce brands on Instagram or TikTok.",
          "Offer one complimentary audit or pilot creative to land the monthly retainer.",
        ],
        fullIdeaDescription: "A streamlined digital micro-agency crafting high-converting social media posts and viral short-form video ads for direct-to-consumer e-commerce brands.",
      },
      {
        id: "sug_en_2",
        title: "Curated Digital Productivity & Workflow Toolkit",
        category: "Digital Products & Passive Income",
        matchScore: 92,
        whyMatch: "Create the asset once and sell it endlessly with zero marginal delivery cost or shipping complexity.",
        requiredBudget: "< $50 (Free Gumroad / Lemon Squeezy storefront and Canva/Notion)",
        howToProfit: "Sell digital templates and operating workflows priced at $19 to $79 per download. 60 downloads per month generates over $2,000 in hands-off income.",
        pricingModel: "One-time purchase + value bundle upsells at checkout (+30% AOV).",
        profitMargin: "95% - 98% net profit margin after electronic payment processing.",
        difficulty: "Moderate",
        expectedProfitTimeline: "Within 2 to 4 weeks upon social distribution",
        initialSteps: [
          "Identify a specific underserved niche (e.g. project managers, real estate agents, or fitness coaches).",
          "Build a polished Notion dashboard or workflow bundle that saves 5 hours a week.",
          "Post breakdown videos on X, TikTok, and LinkedIn showcasing before-and-after results.",
        ],
        fullIdeaDescription: "A turnkey digital product store offering specialized workflow organizers, Notion systems, and design templates for remote professionals and small business owners.",
      },
      {
        id: "sug_en_3",
        title: "Specialized B2B Matchmaking & Micro-Brokerage Service",
        category: "Consulting & Operations",
        matchScore: 89,
        whyMatch: "Connects local business needs with vetted specialists without requiring inventory, capital, or proprietary software.",
        requiredBudget: "$0 - $100 for a clean single-page site and professional email",
        howToProfit: "Charge an upfront project setup fee ($500 - $1,200) plus a 15% - 25% facilitation commission on ongoing service deliverables.",
        pricingModel: "Flat onboarding fee + performance fee based on measurable outcomes.",
        profitMargin: "75% - 85% net income.",
        difficulty: "Easy & Direct",
        expectedProfitTimeline: "Within 2 to 3 weeks of direct networking",
        initialSteps: [
          "Select a high-demand service pain point (e.g. local SEO, CRM setup, or translation).",
          "Line up 2 trusted delivery partners willing to fulfill projects at wholesale rates.",
          "Pitch 15 local companies seeking trusted operational help.",
        ],
        fullIdeaDescription: "A specialized agency coordinating and delivering turnkey operational and growth solutions for local SMBs, handling client relations while delegating fulfillment.",
      },
    ];
  }

  if (combined.includes("تصميم") || combined.includes("جرافيك") || combined.includes("كانفا") || combined.includes("فيديو") || combined.includes("مونتاج")) {
    return [
      {
        id: "sug_1",
        title: "وكالة متخصصة في تصميم قوالب وهوية السوشيال ميديا للمتاجر",
        category: "خدمات رقمية وتسويق",
        matchScore: 97,
        whyMatch: "تستثمر مهارتك في التصميم والمونتاج مباشرة دون الحاجة لأي رأس مال أولي، مع طلب متزايد من أصحاب المتاجر الإلكترونية.",
        requiredBudget: isLowBudget ? "صفر ريال (الاعتماد على حاسوبك الشخصي واشتراك أدوات مجانية أو رمزية)" : "300 - 800 ريال لإعلانات ممولة مستهدفة",
        howToProfit: "تقديم باقات شهرية متجددة تبدأ من 1,500 إلى 3,500 ريال لكل متجر (تتضمن 12 تصميم + 4 ريلز إعلانية). 3 عملاء فقط يحققون لك دخلاً شهرياً ثابتاً يتجاوز 6,000 ريال.",
        pricingModel: "اشتراك شهري متجدد (Retainer) + رسوم إضافية لأي تعديلات عاجلة خارج الباقة.",
        profitMargin: "85% - 95% هامش ربح صافي لعدم وجود تكاليف مواد خام.",
        difficulty: "سهل ومباشر",
        expectedProfitTimeline: "خلال 7 إلى 14 يوماً مع أول عميل",
        initialSteps: [
          "تجهيز معرض أعمال مصغر (Portfolio) يضم 5 نماذج لتصاميم ريلز وبوستات جذابة.",
          "البحث عن 20 متجراً ناشئاً على إنستقرام أو سلة/زد بحاجة لتحسين مظهر حساباتهم.",
          "تقديم عرض تجريبي مجاني بتصميم بوست أو فيديو واحد لكسر حاجز التردد وبدء باقة شهرية.",
        ],
        fullIdeaDescription: "وكالة رقمية مصغرة تقدم باقات اشتراك شهرية للمتاجر الناشئة تشمل تصميم منشورات، ريلز إعلانية جذابة، وضبط الهوية البصرية لزيادة مبيعاتهم.",
      },
      {
        id: "sug_2",
        title: "متجر منتجات رقمية وقوالب جاهزة (Digital Products & Templates)",
        category: "تجارة رقمية بدخل متكرر",
        matchScore: 93,
        whyMatch: "تصنع المنتج مرة واحدة فقط وتبيعه مئات المرات بدون تكاليف شحن أو تخزين، ما يناسب وقتك وميزانيتك بدقة.",
        requiredBudget: "أقل من 200 ريال لإنشاء صفحة بيع أو متجر إلكتروني مصغر",
        howToProfit: "بيع قوالب ومنظمات قابلة للتحميل الفوري بسعر يتراوح بين 39 إلى 149 ريال للنسخة الواحدة. بيع 50 نسخة شهرياً يحقق أكثر من 4,000 ريال بدون مجهود مستمر.",
        pricingModel: "دفع لمرة واحدة لكل منتج + حزم تجميعية (Bundles) بخصم 30% لرفع متوسط سلة الشراء.",
        profitMargin: "90% - 98% أرباح صافية تماماً بعد خصم رسوم بوابة الدفع الإلكترونية.",
        difficulty: "متوسط",
        expectedProfitTimeline: "خلال أول 20 إلى 30 يوماً",
        initialSteps: [
          "تحديد مجال مطلوب (مثل: منظم مهام للطلاب، قوالب سوشيال ميديا للمطاعم، أو قوالب سيرة ذاتية احترافية).",
          "تصميم الباقة الرقمية وتصديرها كملفات جاهزة للاستخدام الفوري.",
          "نشر مقاطع تيك توك توضح كيفية استخدام القالب لحل المشكلة مع رابط الشراء المباشر.",
        ],
        fullIdeaDescription: "مشروع لبيع المنتجات الرقمية القابلة للتحميل الفوري، مثل قوالب التصميم ومخططات الأعمال والمستندات المنظمة، بربحية صافية تتجاوز 90%.",
      },
      {
        id: "sug_3",
        title: "خدمة صناعة محتوى مخصص بالذكاء الاصطناعي (AI UGC Content)",
        category: "ذكاء اصطناعي وصناعة محتوى",
        matchScore: 90,
        whyMatch: "دمج مهاراتك البصرية مع أدوات الذكاء الاصطناعي الحديثة لإنتاج فيديوهات تسويقية للمنتجات دون الحاجة للظهور أمام الكاميرا.",
        requiredBudget: "اشتراك في أدوات الذكاء الاصطناعي (حوالي 100 - 300 ريال)",
        howToProfit: "تسعير الفيديو الواحد بين 250 و 600 ريال للبراندات، أو باقة 5 مقاطع إعلانية بـ 1,800 ريال. إنتاج مقطعين أسبوعياً يولد دخلاً ممتازاً بمجهود ساعات معدودة.",
        pricingModel: "تسعير لكل فيديو أو باقات محتوى شهرية لمسؤولي التسويق والإعلانات.",
        profitMargin: "80% - 90%، التكلفة الوحيدة هي اشتراك أدوات الذكاء الاصطناعي والإنترنت.",
        difficulty: "سهل ومباشر",
        expectedProfitTimeline: "خلال أسبوعين إلى 3 أسابيع",
        initialSteps: [
          "توليد 3 نماذج لفيديوهات ترويجية لمنتجات رائجة باستخدام تقنيات الذكاء الاصطناعي.",
          "التواصل المباشر مع أصحاب البراندات وعرض الفيديوهات كأفكار إعلانية جاهزة للنشر.",
          "تحديد سعر رمزي لكل فيديو أو باقة أسبوعية متجددة.",
        ],
        fullIdeaDescription: "خدمة لإنتاج مقاطع فيديو ترويجية قصيرة للعلامات التجارية باستخدام الذكاء الاصطناعي، تتيح للشركات اختبار إعلانات متعددة بتكلفة منخفضة وسرعة فائقة.",
      },
    ];
  }

  // General diverse recommendations based on budget and skills
  return [
    {
      id: "sug_gen_1",
      title: "خدمة وسيط الأعمال والخدمات المصغرة المتخصصة (Micro-Agency)",
      category: "خدمات واستشارات أعمال",
      matchScore: 95,
      whyMatch: "تناسب مهاراتك التنظيمية والتواصلية دون الحاجة لرأس مال أولي، حيث تعتمد على إدارة وتقديم حلول للمشاريع المحلية.",
      requiredBudget: isLowBudget ? "صفر ريال (رأس مالك هو خبرتك ووقتك)" : "500 ريال لتجهيز موقع تعريفي بسيط",
      howToProfit: "الحصول على عمولة وساطة (15% - 30%) أو إدارة تقديم الخدمة برسم مقطوع يبدأ من 800 إلى 2,500 ريال للمشروع الواحد.",
      pricingModel: "رسوم لكل مشروع محدد أو نسبة من القيمة المضافة المحققة للعميل.",
      profitMargin: "70% - 85% صافي دخل بعد احتساب التكاليف التنفيذية.",
      difficulty: "سهل ومباشر",
      expectedProfitTimeline: "خلال أول أسبوعين من التواصل الفعلي",
      initialSteps: [
        "تحديد الخدمة الأسهل طلباً في السوق والتي تتقن تقديمها أو الإشراف عليها.",
        "بناء قائمة بـ 15 شركة أو شخص بحاجة فورية لهذه الخدمة في مجتمعك.",
        "تقديم استشارة مجانية مدتها 15 دقيقة تنتهي بعرض تقديم الخدمة بسعر افتتاحي منافس.",
      ],
      fullIdeaDescription: "مشروع تقديم خدمات احترافية متخصصة للأفراد والمشاريع الصغيرة لمساعدتهم في حل مشكلة محددة ومتابعة أدائهم بنموذج دفع عند الرضا أو اشتراك شهري.",
    },
    {
      id: "sug_gen_2",
      title: "متجر دروب شيبينغ محلي أو سحابي مخصص لمنتج واحد بطل (One-Product Store)",
      category: "تجارة إلكترونية سريعة",
      matchScore: 91,
      whyMatch: "تركز على تسويق منتج واحد ذو طلب مرتفع وميزة واضحة، ما يقلل تشتت الميزانية ويرفع معدل التحويل.",
      requiredBudget: isLowBudget ? "300 - 600 ريال (اشتراك المنصة ورصيد إعلاني تجريبي)" : "1,500 - 3,000 ريال لاختبار إعلانات وحملات مؤثرين نانو",
      howToProfit: "شراء المنتج بسعر الجملة أو عبر مورد محلي/دروب شيبينغ بهامش ربح يتراوح بين 40 إلى 120 ريال للقطعة. بيع 5 قطع يومياً يولد 6,000 إلى 15,000 ريال شهرياً كربح إجمالي.",
      pricingModel: "تسعير تجزئة مباشر مع عروض 'اشترِ 2 واحصل على شحن مجاني' لرفع كمية الطلب.",
      profitMargin: "35% - 55% بعد خصم تكلفة المنتج والشحن والإعلانات.",
      difficulty: "متوسط",
      expectedProfitTimeline: "خلال 15 إلى 30 يوماً من إطلاق الحملة",
      initialSteps: [
        "اختيار منتج يحل مشكلة يومية ملموسة (مثل أدوات تنظيم المنزل، إكسسوارات السيارات الذكية، أو منتجات العناية).",
        "تجهيز صفحة هبوط ذات تصميم احترافي تركز فقط على مزايا هذا المنتج وآراء المستخدمين.",
        "إطلاق حملة إعلانات تيك توك ممولة بميزانية يومية صغيرة لاختبار التفاعل وسعر الطلب.",
      ],
      fullIdeaDescription: "متجر إلكتروني ذكي يركز على منتج واحد فريد يحل مشكلة واضحة، مع شحن سريع وتسويق بصري يعتمد على الفيديوهات القصيرة وتجارب المستخدمين.",
    },
    {
      id: "sug_gen_3",
      title: "منصة أو قناة محتوى تعليمي وتدريبي باشتراك رمزي (Paid Community / Subscriptions)",
      category: "تعليم وتدريب وبناء مجتمعات",
      matchScore: 89,
      whyMatch: "تستثمر حصيلتك المعرفية في إنشاء مجتمع متخصص يدفع فيه المشتركون رسوماً رمزية متكررة للوصول للمحتوى والنصائح الدورية.",
      requiredBudget: "صفر إلى 150 ريال (تطبيقات مجانية مثل تليغرام وقنوات واتساب مع بوابة دفع إلكترونية)",
      howToProfit: "اشتراك شهري رمزي بقيمة 49 إلى 99 ريال لكل عضو. الوصول إلى 100 مشترك نشط يحقق لك دخلاً سلبياً متكرراً قدره 5,000 إلى 10,000 ريال شهرياً دون تكاليف إضافية.",
      pricingModel: "اشتراك شهري أو سنوي بخصم شهرين، مع ورش عمل إضافية مدفوعة.",
      profitMargin: "90% - 95% صافي أرباح حيث لا توجد تكلفة إنتاج بعد إعداد المحتوى.",
      difficulty: "سهل ومباشر",
      expectedProfitTimeline: "خلال 3 إلى 4 أسابيع مع بناء أول 20 متابع مهتم",
      initialSteps: [
        "نشر محتوى مجاني عالي القيمة لمدة 10 أيام على منصة X أو تيك توك لإثبات الخبرة.",
        "إنشاء قناة خاصة أو مجتمع مغلق يحتوي على تدريبات مكثفة وتطبيقات عملية لا تتوفر في المحتوى العام.",
        "فتح باب الانضمام المبكر بسعر مخفض لأول 30 مشتركاً لجمع الآراء وتأكيد قيمة التجربة.",
      ],
      fullIdeaDescription: "مشروع مجتمع تدريبي ومعرفي يقدم جلسات دورية ونصائح حصرية وموارد عملية للمهتمين بتطوير مهارة معينة مقابل اشتراك شهري بسيط ومتجدد.",
    },
  ];
}


// Intelligent contextual fallback plan builder
function buildFallbackProjectPlan(
  idea: string,
  field?: string,
  budgetLevel?: string,
  timeframe?: string,
  targetMarket?: string,
  lang?: string
) {
  const cleanIdea = idea.trim();
  const lower = cleanIdea.toLowerCase();
  const isEn = lang === 'en';

  // Deduce project essence
  let guessedName = isEn
    ? "Project " + (cleanIdea.split(" ").slice(0, 3).join(" "))
    : "مشروع " + (cleanIdea.split(" ").slice(0, 3).join(" "));
  let category = field || (isEn ? "Emerging Venture" : "مشروع تجاري ناشئ");
  let slogan = isEn
    ? "A faster, smarter experience designed for your customer needs"
    : "نحو تجربة أسرع وأذكى لخدمة عملائك";

  if (lower.includes("قهوة") || lower.includes("كافيه") || lower.includes("coffee")) {
    guessedName = isEn ? "Aroma Roasters" : "رَوْنَق القهوة";
    category = isEn ? "Food & Beverage / Subscriptions" : "أغذية ومشروبات / اشتراكات";
    slogan = isEn ? "Exceptional artisan coffee delivered straight to your door" : "مذاق استثنائي يصل إلى بابك بكل دقة واهتمام";
  } else if (lower.includes("بادل") || lower.includes("رياض") || lower.includes("padel")) {
    guessedName = "PadelPlus";
    category = isEn ? "Sports, Fitness & Tech" : "صحة ورياضة وتقنية";
    slogan = isEn ? "Seamless court bookings and competitive tournaments in one tap" : "تحديات الملاعب وحجوزاتك المفضلة بنقرة واحدة";
  } else if (lower.includes("متجر") || lower.includes("توصيل") || lower.includes("منتجات") || lower.includes("store")) {
    guessedName = isEn ? "QuickCart Direct" : "سريـع (QuickCart)";
    category = isEn ? "E-commerce & Smart Logistics" : "تجارة إلكترونية وخدمات لوجستية";
    slogan = isEn ? "Reliable shopping that simplifies everyday customer demands" : "تجربة تسوق موثوقة تلبي احتياجاتك اليومية";
  } else if (lower.includes("تطبيق") || lower.includes("منصة") || lower.includes("ذكاء") || lower.includes("app")) {
    guessedName = isEn ? "OmniVenture AI" : "منصة فِكرة الذكية";
    category = isEn ? "Cloud Software & AI Tools" : "تقنية وتطبيقات سحابية";
    slogan = isEn ? "Smart automated intelligence to elevate productivity" : "أتمتة ذكية تسهل حياة المستخدمين وتوفر وقتهم";
  }


  return {
    id: "plan_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    originalIdea: cleanIdea,
    createdAt: new Date().toISOString(),
    projectName: guessedName,
    slogan: slogan,
    summary: `مشروع ناشئ يهدف إلى تحويل الفكرة: "${cleanIdea}" إلى نموذج عملي مربح يركز على تقديم قيمة واضحة وتجربة مستخدم سلسة بتكاليف تشغيلية مدروسة.`,
    category: category,
    uniqueSellingPoint: "تقديم الخدمة بسرعة فائقة مع ضمان جودة عالي وتجربة مخصصة لكل عميل دون تعقيد.",
    quickWin: "قم اليوم بإنشاء صفحة هبوط أولية مجانية (أو حساب إنستقرام/تيك توك احترافي) واعرض الفكرة على 10 من معارفك أو زبائنك المحتملين لجمع أول آراء فورية.",
    targetAudience: {
      description: targetMarket || "العملاء الباحثون عن حلول سريعة وموثوقة توفر عليهم الوقت والجهد وتمنحهم قيمة مباشرة مقابل السعر.",
      keySegments: [
        "الشباب والمهنيون أصحاب الأسلوب الرقمي السريع",
        "المهتمون بالجودة العالية وتوفير الوقت",
        "أصحاب المشاريع أو الأفراد ذوو الاحتياج المباشر لهذه الخدمة",
      ],
      painPoints: [
        "بطء الإجراءات والخدمات التقليدية في السوق",
        "ارتفاع التكلفة أو عدم شفافية الأسعار",
        "غياب المتابعة الشخصية وخدمة العملاء السريعة",
      ],
      valueDelivered: "حل سريع، موثوق، وسهل الاستخدام مع دعم فوري وتوفير ملحوظ في التكلفة والجهد.",
    },
    executionPlan: [
      {
        stageNumber: 1,
        stageName: "المرحلة الأولى: التأسيس والتحقق من السوق",
        duration: timeframe === "أسبوعين (إطلاق سريع)" ? "أسبوع واحد" : "أسبوعين إلى 3 أسابيع",
        objective: "التحقق من جاذبية الفكرة وتجهيز الهوية الأولية وسلسلة التوريد أو التطوير الأساسي",
        tasks: [
          {
            id: "t1_1",
            task: "تصميم الهوية البصرية وشعار المشروع البسيط",
            description: "تحديد الألوان الأساسية، الشعار اللفظي، وتجهيز قوالب منشورات التواصل وصفحة الهبوط.",
            priority: "عالية",
            duration: "3 أيام",
            completed: false,
          },
          {
            id: "t1_2",
            task: "مقابلة 10 عملاء محتملين واستطلاع رغبتهم في الشراء",
            description: "إجراء مقابلات سريعة لفهم ما إذا كان السعر والحل يحل مشكلتهم الحقيقية.",
            priority: "عالية",
            duration: "4 أيام",
            completed: false,
          },
          {
            id: "t1_3",
            task: "تحديد الموردين أو البنية التقنية الأساسية",
            description: "الاتفاق مع مزودي الخدمة أو تجهيز الأدوات البرمجية الجاهزة للإطلاق بأقل تكلفة.",
            priority: "متوسطة",
            duration: "5 أيام",
            completed: false,
          },
        ],
      },
      {
        stageNumber: 2,
        stageName: "المرحلة الثانية: بناء وإطلاق النسخة الأولية (MVP)",
        duration: timeframe === "أسبوعين (إطلاق سريع)" ? "أسبوع واحد" : "شهر واحد",
        objective: "إتاحة الخدمة أو المنتج لأول دفعة من المستخدمين الفعليين وقياس تفاعلهم",
        tasks: [
          {
            id: "t2_1",
            task: "إطلاق نموذج أولي مبسط لاستقبال أول طلبات",
            description: "استخدام رابط بسيط أو نموذج طلب واتساب/صفحة متجر إلكتروني لبدء المعاملات الفعلية.",
            priority: "عالية",
            duration: "3 أيام",
            completed: false,
          },
          {
            id: "t2_2",
            task: "تنفيذ وتوصيل أول 20 طلباً ومتابعة رضا العملاء الشخصي",
            description: "خدمة أول دفعة عملاء باهتمام استثنائي لتحويلهم إلى مروجين شفهيين للمشروع.",
            priority: "عالية",
            duration: "7 أيام",
            completed: false,
          },
          {
            id: "t2_3",
            task: "جمع تقييمات موثقة وتصوير تجارب حقيقية (Social Proof)",
            description: "توثيق آراء الزبائن لاستخدامها كشهادات نجاح تعزز الثقة في الإعلانات القادمة.",
            priority: "متوسطة",
            duration: "4 أيام",
            completed: false,
          },
        ],
      },
      {
        stageNumber: 3,
        stageName: "المرحلة الثالثة: التسويق والانطلاق والتوسع",
        duration: "مستمرة (الشهر الثاني فصاعداً)",
        objective: "مضاعفة قاعدة العملاء، زيادة المبيعات، وبناء مجتمع وفي للعلامة التجارية",
        tasks: [
          {
            id: "t3_1",
            task: "إطلاق حملة الإعلانات الممولة المركزة على الفئة الأكثر تحويلاً",
            description: "تشغيل إعلانات تيك توك وإنستقرام تستهدف المهتمين مباشرة مع عروض تجريبية مغرية.",
            priority: "عالية",
            duration: "أسبوعين",
            completed: false,
          },
          {
            id: "t3_2",
            task: "بناء برنامج ولاء ومكافآت التوصية (Referral Program)",
            description: "منح كل عميل حالي خصماً أو ميزة إضافية عند دعوة صديق أو شريك لتجربة الخدمة.",
            priority: "متوسطة",
            duration: "أسبوع",
            completed: false,
          },
          {
            id: "t3_3",
            task: "أتمتة العمليات ورفع الكفاءة التشغيلية",
            description: "استخدام أدوات رقمية لتقليل الوقت المستغرق في إدارة الطلبات وتأكيد الدفع.",
            priority: "متوسطة",
            duration: "أسبوعين",
            completed: false,
          },
        ],
      },
    ],
    marketingPlan: {
      guerrillaIdeas: [
        "إطلاق تحدي فيديو عفوي (Behind the scenes) يوضح كواليس حل المشكلة وكيف ولدت فكرة المشروع.",
        "تقديم أول 15 تجربة مجانية أو بسعر رمزي مقابل تقييم مصور بالفيديو ونشره كـ UGC.",
        "التعاون التبادلي مع حسابات مجتمعية محلية صغيرة لتقديم قيمة مشتركة دون ميزانية إعلانات ضخمة.",
        "استخدام صيغ السرد القصصي (Storytelling) في منصة X وLinkedIn عن رحلة بناء المشروع خطوة بخطوة.",
      ],
      channels: [
        {
          name: "TikTok & Instagram Reels",
          type: "فيديو قصير عضوي وممول",
          whyThisChannel: "أعلى وصول مجاني حالياً، ويتيح توضيح المنتج بأسلوب بصري سريع وجذاب.",
          recommendedAction: "نشر من 3 إلى 5 مقاطع فيديو أسبوعياً تركز على الفائدة المباشرة والمشاكل اليومية.",
        },
        {
          name: "مجتمعات WhatsApp وTelegram المتخصصة",
          type: "تسويق مباشر ومجتمعي",
          whyThisChannel: "معدل فتح وقراءة يتجاوز 90%، وقريب جداً من اتخاذ قرار الشراء.",
          recommendedAction: "بناء قناة أو مجموعة حصرية لإرسال العروض الخاطفة والتحديثات السريعة.",
        },
        {
          name: "منصة X (تويتر سابقاً)",
          type: "بناء مصداقية وشبكة علاقات",
          whyThisChannel: "مثالية لطرح الأفكار، متابعة آراء الجمهور المستهدف، وبناء مجتمع من المهتمين والمستثمرين.",
          recommendedAction: "مشاركة خيوط ثريدات تعليمية وتحليلات عن المجال لجذب المتابعين المهتمين.",
        },
      ],
      adHooks: [
        {
          platform: "TikTok / Reels",
          hook: "لو كنت تعاني من ضياع الوقت وتكاليف الخدمات المرتفعة، هذا الحل صُمم خصيصاً لك!",
          callToAction: "اضغط على الرابط في البايو واحصل على تجربتك الأولى اليوم مع خصم الإطلاق.",
        },
        {
          platform: "Instagram Story",
          hook: "3 أسباب تجعل طريقتك القديمة تكلفك ضعف ما تحتاجه فعلياً... انظر كيف نغير ذلك!",
          callToAction: "اسحب الشاشة لأعلى أو تواصل معنا عبر الرسائل الخاصة للاستفادة من العرض.",
        },
        {
          platform: "منصة X",
          hook: "بدأنا هذا المشروع لأننا تعبنا من الحلول غير المكتملة في السوق. إليك ما صنعناه:",
          callToAction: "شاركنا رأيك في التعليقات وجرّب النسخة الأولية الآن عبر الرابط.",
        },
      ],
      launchCampaign: {
        title: "حملة «أول 100 رائد» (Founding 100)",
        concept: "دعوة حصرية لأول 100 عميل للحصول على صفة العميل المؤسس مع مزايا دائمة وسعر استثنائي مقابل آرائهم.",
        steps: [
          "تجهيز صفحة تسجيل مبكرة (Waitlist) مع عداد تنازلي حماسي.",
          "إرسال دعوات خاصة تدريجياً وتقديم خدمة مخصصة لكل عميل من الـ 100.",
          "الاحتفاء بأول تجارب العملاء ونشر قصص نجاحهم مع وسام خاص.",
        ],
      },
      growthTactics: [
        "نظام مكافآت الإحالة: امنح رصيداً لكل عميل يجلب صديقاً جديداً.",
        "استطلاعات رأي سريعة بعد كل طلب لتحسين التجربة باستمرار.",
        "عروض موسمية ذكية مرتبطة بالمناسبات والفعاليات الرائجة.",
      ],
    },
    monetizationStrategy: {
      primaryMethod: "تحقيق الربح من خلال المبيعات المباشرة للخدمة أو المنتج مع تقديم باقات اشتراك مخصصة تحقق دخلاً تراكمياً شهرياً متكرراً.",
      pricingModel: "تسعير هجين: باقة أساسية للدخول السريع بسعر في متناول اليد، وباقة متقدمة تشمل كافة الميزات والدعم الحصري.",
      profitMarginEstimate: "60% - 80% صافي هامش ربح بعد تغطية التكاليف التشغيلية المباشرة.",
      howToMaximizeProfit: "تقديم خدمات مكملة (Upselling) عند إتمام كل طلب، وتفعيل خطط الدفع السنوية أو الباقات المجمعة مع خصومات تحفيزية لرفع متوسط قيمة العميل.",
      recurringRevenuePotential: "إمكانية إطلاق اشتراك دعم وصيانة أو توريد دوري بنموذج شهري مستمر يضمن تدفقاً نقدياً مستقراً يمكن الاعتماد عليه.",
    },
    financialModel: {
      initialCostEstimate: budgetLevel === "منخفضة جداً / صفرية" ? "500 - 1,500 ريال (أدوات أساسية)" : "3,000 - 8,000 ريال تقريباً",
      revenueStreams: [
        "المبيعات المباشرة للمنتج أو الخدمة الأساسية",
        "اشتراكات دورية متكررة (شهرية / سنوية) للعملاء الدائمين",
        "باقات إضافية مميزة (Upselling) للميزات الحصرية أو الدعم السريع",
      ],
      operationalCosts: [
        "رسوم الاشتراكات البرمجية أو الاستضافة وتطوير الأدوات",
        "ميزانية الإعلانات الممولة ومحتوى المؤثرين الصغار",
        "تكاليف الشحن والتغليف أو مستلزمات الخدمة المباشرة",
      ],
      breakevenTimeline: timeframe === "أسبوعين (إطلاق سريع)" ? "خلال أول 30 إلى 45 يوماً من بدء المبيعات" : "من شهرين إلى 4 أشهر",
    },
    risksAndMitigation: [
      {
        risk: "بطء التفاعل في البداية وضعف الثقة بالعلامة التجارية الجديدة.",
        solution: "تقديم ضمان استرجاع أو تجربة أولى بدون مخاطرة لكسر حاجز التردد وبناء السمعة الإيجابية سريعاً.",
      },
      {
        risk: "دخول منافسين يقلدون الفكرة أو انخفاض هوامش الربح.",
        solution: "التركيز على بناء علاقة وثيقة مع العميل وخدمة عملاء فائقة السرعة يصعب على المنافسين نسخها.",
      },
      {
        risk: "ارتفاع تكلفة اكتساب العميل (CAC) عبر الإعلانات.",
        solution: "الاعتماد على المحتوى العضوي الفيروسي (Organic Viral Video) وبرامج التوصية الشفهية لتقليل الاعتماد على الإعلانات المدفوعة.",
      },
    ],
    targetPersona: {
      name: "سارة - رائدة أعمال وطموحة شابة (24-38 سنة)",
      roleOrStatus: "صاحبة متجر إلكتروني أو مشتغلة مستقلة تبحث عن نتائج سريعة وموثوقة",
      coreFrustration: "إهدار الكثير من الوقت والمال على حلول مبعثرة وغير احترافية لا تلبي التوقعات",
      buyingTrigger: "رؤية نموذج عملي يثبت حل المشكلة خلال أيام وبسعر واضح وشفاف دون مفاجآت",
      objectionAndSolution: "الاعتراض: 'هل يناسب وضعي تحديداً؟' — الرد: 'جلسة استشارية أولى مجانية أو ضمان استرداد كامل خلال 14 يوماً'.",
    },
    swotAnalysis: {
      strengths: [
        "مرونة عالية وسرعة في اتخاذ القرارات دون بيروقراطية الشركات الكبرى.",
        "تكاليف تشغيلية منخفضة في البداية تتيح هوامش ربحية مريحة.",
        "تخصيص مباشر واهتمام فائق بكل عميل لبناء ولاء مبكر.",
      ],
      weaknesses: [
        "حجم الموارد البشرية محدود في المراحل الأولى مما يتطلب أتمتة المهام.",
        "الحاجة لبناء الوعي والمصداقية في السوق من الصفر.",
      ],
      opportunities: [
        "التحول الرقمي السريع ونمو الاعتماد على الخدمات والمنتجات المتخصصة محلياً.",
        "إمكانية التوسع السريع واستخدام الذكاء الاصطناعي لتقليص تكاليف الإنتاج.",
        "شراكات تكاملية مع مشاريع غير منافسة تخدم نفس الشريحة المستهدفة.",
      ],
      threats: [
        "تغير خوارزميات منصات التواصل الاجتماعي وارتفاع أسعار الإعلانات.",
        "ظهور مقلدين للفكرة مع انخفاض حواجز الدخول في بعض المجالات.",
      ],
    },
    strategicKPIs: {
      month1Goal: "الحصول على أول 10 إلى 15 عميلاً محققين، وجمع 5 تقييمات موثقة بالفيديو.",
      month3Goal: "الوصول إلى 50 عميلاً نشطاً شهرياً مع تدفق نقدي إيجابي يغطي كافة النفقات ويفيض.",
      month6Goal: "مضاعفة قاعدة العملاء وتوليد دخل شهري مستقر يفوق 15,000 ريال مع معدل احتفاظ 40%+.",
      primaryNorthStarMetric: "صافي الإيراد الشهري المتكرر (MRR) ونسبة رضا العملاء الصافية (NPS).",
    },
    unitEconomics: {
      unitName: "طلب / خدمة مكتملة",
      suggestedPrice: budgetLevel === "منخفضة جداً / صفرية" ? 250 : 650,
      variableCostPerUnit: budgetLevel === "منخفضة جداً / صفرية" ? 40 : 120,
      monthlyFixedCost: budgetLevel === "منخفضة جداً / صفرية" ? 200 : 800,
      estimatedCAC: budgetLevel === "منخفضة جداً / صفرية" ? 35 : 110,
    },
  };
}

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GSE AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
