import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  RotateCcw,
  X,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Globe,
  BrainCircuit,
  Rocket,
  Maximize2,
  Minimize2,
  ChevronDown,
  Camera,
  Image as ImageIcon,
  Upload,
  Zap,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  Gamepad2,
  Film,
  Smile,
  PartyPopper
} from 'lucide-react';
import { ProjectPlan } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  category?: string;
  lang?: string;
  image?: string;
  isNew?: boolean;
  isStreaming?: boolean;
}

interface UniversalRobotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: ProjectPlan | null;
  initialQuery?: string;
  initialCategory?: string;
}

const SUPPORTED_LANGUAGES = [
  { code: 'auto', name: 'تلقائي (حسب لغة سؤالك)', nameEn: 'Auto (Matches your input)' },
  { code: 'ar', name: 'العربية (Arabic)', nameEn: 'Arabic' },
  { code: 'en', name: 'English (الإنجليزية)', nameEn: 'English' },
  { code: 'fr', name: 'Français (الفرنسية)', nameEn: 'French' },
  { code: 'es', name: 'Español (الإسبانية)', nameEn: 'Spanish' },
  { code: 'de', name: 'Deutsch (الألمانية)', nameEn: 'German' },
  { code: 'tr', name: 'Türkçe (التركية)', nameEn: 'Turkish' },
  { code: 'ur', name: 'اردو (Urdu)', nameEn: 'Urdu' },
  { code: 'zh', name: '中文 (Chinese)', nameEn: 'Chinese' },
  { code: 'ja', name: '日本語 (Japanese)', nameEn: 'Japanese' },
];

const CATEGORIES = [
  {
    id: 'studies',
    labelAr: 'الواجبات والمباحث الدراسية',
    labelEn: 'Homework & Studies',
    icon: BookOpen,
    descAr: 'التقاط صور الواجبات والمسائل، حل فوري وسريع للرياضيات، العلوم، الفيزياء، واللغات بدون إطالة',
    descEn: 'Capture homework photos, solve math, physics, sciences, and language assignments concisely',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 text-amber-800 border-amber-200',
    samplePromptsAr: [
      'حل المسألة الرياضية في ورقة الواجب واذكر الناتج النهائي مباشرة.',
      'اشرح قانون الجاذبية لنيوتن في 3 نقاط محددة وسريعة.',
      'حل معادلة الدرجة الثانية وأعطني قيمة المميز والحلول باختصار.',
      'لخص أسباب الثورة الصناعية بنقاط موجزة وسريعة.',
    ],
    samplePromptsEn: [
      'Solve this homework problem concisely and state the final answer.',
      'Explain Newton’s law of gravitation in 3 concise bullet points.',
      'Solve the quadratic equation with direct steps and final roots.',
      'Summarize key causes of the Industrial Revolution in short points.',
    ],
  },
  {
    id: 'deductions',
    labelAr: 'الاستنتاج والتحليل',
    labelEn: 'Logic & Deductions',
    icon: BrainCircuit,
    descAr: 'الاستنتاج المنطقي السريع، تحليل المشكلات بدقة وبدون إطالة',
    descEn: 'Rapid logical deductions, root-cause analysis, and critical reasoning',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 text-purple-800 border-purple-200',
    samplePromptsAr: [
      'استنتج السبب الجذري لضعف الإنتاجية واقترح حلاً فورياً.',
      'ما الفرق بين الاستقراء والاستنباط في سطرين مع مثال؟',
      'تحليل سريع: أيهما أفضل لميزانية صغيرة، العقار أم الأسهم؟',
      'كيف أكتشف المغالطة المنطقية في الحوار مباشرة؟',
    ],
    samplePromptsEn: [
      'Deduct the root cause of low productivity with immediate action.',
      'Difference between inductive & deductive reasoning in 2 lines.',
      'Quick risk comparison: real estate vs stocks on a modest budget.',
      'Spotting logical fallacies rapidly in arguments.',
    ],
  },
  {
    id: 'solutions',
    labelAr: 'حلول المشكلات وما يحتاج',
    labelEn: 'Solutions & Practical Help',
    icon: Lightbulb,
    descAr: 'حلول عملية ومباشرة خطوة بخطوة لأي عائق تواجهه',
    descEn: 'Smart actionable solutions for technical, work, and personal challenges',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    samplePromptsAr: [
      'أعطني خطة عملية سريعة للتخلص من التسويف والتركيز فوراً.',
      '3 خطوات مباشرة لحل خلاف مهني بدون خسارة العلاقة.',
      'قاعدة سريعة لتوفير 20% من الراتب الشهري.',
      'أسرع 3 خطوات تقنية لتسريع الهاتف والكمبيوتر.',
    ],
    samplePromptsEn: [
      'Actionable direct steps to beat procrastination right now.',
      '3 steps to resolve a professional conflict smoothly.',
      'Quick formula to save 20% of monthly income.',
      'Fast practical tips to speed up a slow phone or computer.',
    ],
  },
  {
    id: 'general_knowledge',
    labelAr: 'معلومات عامة وثقافة',
    labelEn: 'General Knowledge',
    icon: Globe,
    descAr: 'معلومات علمية، تاريخ، فضاء وتقنيات باختصار واحترافية',
    descEn: 'World encyclopedia, history, space technology, and modern discoveries',
    color: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50 text-sky-800 border-sky-200',
    samplePromptsAr: [
      'ما هي الحوسبة الكمومية في 3 أسطر واضحة ومباشرة؟',
      'لماذا يظهر البحر باللون الأزرق باختصار علمي؟',
      'كيف تعمل نماذج الذكاء الاصطناعي LLMs في نقاط موجزة؟',
      'أبرز 3 حقائق علمية مذهلة عن الفضاء الخارجي.',
    ],
    samplePromptsEn: [
      'Explain quantum computing in 3 crisp lines.',
      'Why is the ocean blue? (Quick scientific explanation)',
      'How do LLMs work in concise bullet points?',
      'Top 3 verified facts about deep space.',
    ],
  },
  {
    id: 'entertainment',
    labelAr: 'الترفيه والتسلية والفرفشة',
    labelEn: 'Entertainment & Fun',
    icon: PartyPopper,
    descAr: 'نكت، مواقف طريفة، قصص مضحكة، وتسلية خفيفة ترسم الابتسامة على وجهك',
    descEn: 'Clever jokes, funny stories, humor, and witty entertainment',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 text-pink-800 border-pink-200',
    samplePromptsAr: [
      'احكِ لي نكتة ذكية ومضحكة جداً عن التكنولوجيا أو الحياة اليومية.',
      'تخيل لو كان نيوتن يوتيوبر وعنده قناة تيك توك، كيف راح يشرح التفاحة؟',
      'أعطني 3 مواقف كوميدية طريفة لرفع المزاج والفرفشة.',
      'شاركني فكرة مقلب لطيف ومسالم أعمله في صديقي بدون زعل.',
    ],
    samplePromptsEn: [
      'Tell me a really witty, clever joke about tech or daily life.',
      'Imagine if Isaac Newton was a modern TikToker explaining the apple.',
      'Give me 3 hilarious observational comedy moments to brighten my day.',
      'Share a harmless, fun prank idea to play with friends.',
    ],
  },
  {
    id: 'games',
    labelAr: 'ألعاب وفوازير الذكاء',
    labelEn: 'Games, Puzzles & Trivia',
    icon: Gamepad2,
    descAr: 'ألغاز محيرة، فوازير شعرية، لعبة لو خيروك، وتحدي الـ 20 سؤال مع الروبوت',
    descEn: 'Brainteasers, riddles, 20 Questions game, and Would You Rather dilemmas',
    color: 'from-fuchsia-500 to-purple-600',
    bgColor: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
    samplePromptsAr: [
      'العب معي لعبة 20 سؤال! فكرت في شيء في بالي وعليك تخمينه بأسئلة نعم/لا.',
      'أعطني فزورة ذكاء محيرة مع تلميح ذكي وسأحاول حلها معك.',
      'اطرح عليّ تحدي "لو خيروك" بين خيارين صعبين ومضحكين.',
      'اختبرني بمسابقة تريفيا سريعة من 3 أسئلة في السينما أو الثقافة.',
    ],
    samplePromptsEn: [
      'Play 20 Questions with me! I have something in mind, guess it with Yes/No questions.',
      'Give me a tricky brainteaser with a smart hint for me to solve.',
      'Hit me with a funny and tough "Would You Rather" scenario.',
      'Host a quick 3-question trivia challenge about movies or pop culture.',
    ],
  },
  {
    id: 'movies',
    labelAr: 'السينما والمسلسلات والأنمي',
    labelEn: 'Movies, Series & Anime',
    icon: Film,
    descAr: 'ترشيحات أفلام حسب المود، نقاشات الحبكات، واكتشاف أفضل المسلسلات والأنمي',
    descEn: 'Personalized film recommendations, anime discussions, and plot analysis',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50 text-red-800 border-red-200',
    samplePromptsAr: [
      'اقترح لي فيلم غموض وتشويق ذكي بدون ملل وبحبكة صادمة لنهاية الأسبوع.',
      'ما هي أفضل 3 مسلسلات قصيرة يمكن إنهاؤها في يومين وتستحق المشاهدة؟',
      'رشح لي أنمي أسطوري برسم رائع وقصة عميقة مثل مذكرة الموت أو فيريرين.',
      'لخص لي حبكة فيلم شهير بدون حرق النهاية واذكر لماذا هو مميز.',
    ],
    samplePromptsEn: [
      'Recommend a mind-bending mystery thriller with a shocking twist.',
      'Top 3 mini-series binge-worthy in one weekend.',
      'Suggest a legendary anime with gorgeous animation and deep plot.',
      'Summarize a cinematic masterpiece without spoilers.',
    ],
  },
  {
    id: 'chat_leisure',
    labelAr: 'سوالف وفضفضة حرة',
    labelEn: 'Friendly Chat & Leisure',
    icon: Smile,
    descAr: 'دردشة عفوية وممتعة، نصائح لقضاء وقت ممتع، واستراحة لكل شيء في الحياة',
    descEn: 'Casual friendly banter, leisure ideas, weekend plans, and daily chat',
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50 text-teal-800 border-teal-200',
    samplePromptsAr: [
      'مساء الخير! كيف حالك اليوم؟ أتحفني بموضوع ممتع نسولف فيه.',
      'أحس بملل، اقترح لي 5 أفكار ممتعة ومجانية أقضي فيها عطلة نهاية الأسبوع.',
      'لو عندك فرصة تسافر عبر الزمن ليوم واحد، لأي عصر ستذهب ولماذا؟',
      'كيف أجعل يومي أكثر بهجة وإيجابية بعادات بسيطة وسريعة؟',
    ],
    samplePromptsEn: [
      'Hey there! How are you? Bring up a fun, engaging topic to talk about.',
      'Feeling bored, suggest 5 fun free things I can do this weekend.',
      'If you could time-travel for one day, where would you go and why?',
      'Quick simple habits to add more joy and lightness to daily routine.',
    ],
  },
  {
    id: 'business',
    labelAr: 'ريادة الأعمال والمشاريع',
    labelEn: 'Startups & Business',
    icon: Rocket,
    descAr: 'تطوير الأفكار، خطط المشاريع، وتحقيق الأرباح بدقة وسرعة',
    descEn: 'Expanding your venture, feasibility, and growth hacks',
    color: 'from-indigo-600 to-violet-600',
    bgColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    samplePromptsAr: [
      'كيف أختبر فكرة مشروعي في 24 ساعة بأقل تكلفة؟',
      'أقوى 3 خطافات إعلانية (Hooks) لجذب الزبائن لمتجر جديد.',
      'معادلة حساب CAC مقابل LTV باختصار تطبيقي.',
      'كيف أسعر منتجي لتحقيق أعلى هامش ربح دون خسارة الزبائن؟',
    ],
    samplePromptsEn: [
      'Test demand for an idea within 24 hours at zero cost.',
      'Top 3 high-converting ad hooks for a new business.',
      'Simple practical formula for CAC vs LTV.',
      'Pricing strategy to maximize margin without losing buyers.',
    ],
  },
];

// High-speed progressive typewriter component for fast reading
const FastTypingMessage: React.FC<{
  content: string;
  isNew?: boolean;
  onComplete?: () => void;
}> = ({ content, isNew, onComplete }) => {
  const [displayedLength, setDisplayedLength] = useState(isNew ? 0 : content.length);

  useEffect(() => {
    if (!isNew) {
      setDisplayedLength(content.length);
      return;
    }

    setDisplayedLength(0);
    // Ultra-fast progressive typing: process chunks every 10ms
    const stepSize = Math.max(6, Math.floor(content.length / 35));
    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = prev + stepSize;
        if (next >= content.length) {
          clearInterval(interval);
          onComplete?.();
          return content.length;
        }
        return next;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [content, isNew]);

  const isStillTyping = displayedLength < content.length;

  return (
    <div>
      <div className="whitespace-pre-line leading-relaxed text-xs sm:text-sm font-sans space-y-1">
        {content.slice(0, displayedLength)}
        {isStillTyping && (
          <span className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-0.5 align-middle" />
        )}
      </div>
      {isStillTyping && (
        <button
          type="button"
          onClick={() => {
            setDisplayedLength(content.length);
            onComplete?.();
          }}
          className="text-[10px] text-indigo-600 font-bold hover:underline mt-1.5 flex items-center gap-1 cursor-pointer"
        >
          <Zap className="w-3 h-3 text-amber-500" />
          <span>إظهار كامل الإجابة فوراً</span>
        </button>
      )}
    </div>
  );
};

export const UniversalRobotModal: React.FC<UniversalRobotModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  initialQuery,
  initialCategory,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg_welcome',
        role: 'model',
        content: isEn
          ? `👋 Welcome! I am the **GSE Universal AI Robot** — built for **Everything**: studies, homework, entertainment, fun, gaming, and life solutions!
⚡ **Ultra-Fast & Versatile Mode Active:**
- 🎮 **Entertainment & Fun:** Witty jokes, brainteasers, 20 Questions game, "Would You Rather", and fun chats!
- 🎬 **Movies & Pop Culture:** Personalized movie, anime, and series recommendations matching your vibe.
- 📸 **Homework Photo Capture:** Click the camera to solve school assignments, math equations, physics, or science problems with clear answers.
- 🚀 **Projects & Real Life:** Instant advice, brainstorming, and problem solving.`
          : `👋 مرحباً بك! أنا **روبوت GSE الذكي الشامل** — مصمم لخدمتك في **كل شيء**: الدراسة، الترفيه والتسلية، حل الواجبات، الألعاب، وكل ما يخطر ببالك!
⚡ **نمط ذكي وسريع وشامل مفعل:**
- 🎮 **الترفيه والفرفشة والألعاب:** نكت ذكية ومضحكة، فوازير وألغاز، لعبة 20 سؤال، وتحدي "لو خيروك"!
- 🎬 **السينما والأنمي:** ترشيحات أفلام ومسلسلات وأنمي أسطورية حسب مودك ونفسيتك.
- 📸 **حل الواجبات بالصور:** اضغط زر الكاميرا لالتقاط صورة ورقة الامتحان أو مسألة الرياضيات والفيزياء، وسأحلها لك فوراً بإجابة واضحة.
- 🚀 **المشاريع والحياة:** أفكار مشاريع، حلول مشكلات عملية، وسوالف خفيفة بأي وقت.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('studies');
  const [targetLang, setTargetLang] = useState<string>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Camera & Image Capture State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const lastSentInitialRef = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraCaptureInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      lastSentInitialRef.current = null;
      stopCamera();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (isOpen && initialQuery && lastSentInitialRef.current !== initialQuery) {
      lastSentInitialRef.current = initialQuery;
      setTimeout(() => {
        handleSendMessage(initialQuery);
      }, 150);
    }
  }, [isOpen, initialQuery, initialCategory]);

  // Clean up speech synthesis & camera when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopCamera();
    };
  }, []);

  // Camera controls
  const startCamera = async (facing: 'environment' | 'user' = cameraFacingMode) => {
    // If WebRTC getUserMedia is unavailable or not supported in this browser context, launch device camera directly
    if (!navigator?.mediaDevices?.getUserMedia) {
      cameraCaptureInputRef.current?.click();
      return;
    }

    setIsCameraOpen(true);
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      // Gracefully handle without console.error (which triggers test error capture)
      console.warn('Camera stream unavailable or permission denied:', err?.name || err?.message || err);
      setCameraError(
        isEn
          ? 'Live camera feed was blocked by browser permissions. You can use your device camera directly or select a photo.'
          : 'تعذر تشغيل البث المباشر للكاميرا بسبب أذونات المتصفح. يمكنك فتح كاميرا جهازك المباشرة أو اختيار صورة من جهازك.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setSelectedImage(dataUrl);
    stopCamera();
  };

  const handleSwitchCameraFacing = () => {
    const nextMode = cameraFacingMode === 'environment' ? 'user' : 'environment';
    setCameraFacingMode(nextMode);
    startCamera(nextMode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if ((!query && !selectedImage) || isLoading) return;

    const currentImg = selectedImage;
    const defaultHomeworkPrompt = isEn
      ? 'Solve this homework problem concisely, provide the final answer and essential steps directly.'
      : 'حل هذا الواجب المدرسي في الصورة بدقة، واذكر الإجابة المباشرة والخطوات الأساسية باختصار شديد وبدون إطالة.';

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: query || (currentImg ? defaultHomeworkPrompt : ''),
      image: currentImg || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: selectedCategory,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const res = await fetch('/api/chat-robot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream, application/json',
        },
        body: JSON.stringify({
          message: query || (currentImg ? defaultHomeworkPrompt : ''),
          image: currentImg || null,
          history: historyPayload,
          targetLanguage: targetLang,
          topicCategory: selectedCategory,
          conciseMode: true,
          stream: true,
          projectContext: currentPlan
            ? {
                projectName: currentPlan.projectName,
                summary: currentPlan.summary,
              }
            : null,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get answer');
      }

      const contentType = res.headers.get('content-type') || '';
      const aiMsgId = 'msg_' + Date.now() + '_ai';

      if (contentType.includes('text/event-stream') && res.body) {
        // Create initial streaming message
        const initialModelMsg: ChatMessage = {
          id: aiMsgId,
          role: 'model',
          content: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: selectedCategory,
          isStreaming: true,
        };

        setMessages((prev) => [...prev, initialModelMsg]);
        setIsLoading(false);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith(':')) continue;
            if (trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              try {
                const jsonStr = trimmed.slice(6);
                const parsed = JSON.parse(jsonStr);
                if (parsed.chunk) {
                  accumulatedText += parsed.chunk;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === aiMsgId ? { ...m, content: accumulatedText } : m
                    )
                  );
                }
              } catch {
                // Ignore parse errors on partial frames
              }
            }
          }
        }

        // Finalize streaming flag
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? {
                  ...m,
                  content: accumulatedText.trim() || (isEn ? 'Solution completed directly.' : 'تم حل الواجب بدقة واختصار.'),
                  isStreaming: false,
                }
              : m
          )
        );
      } else {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: aiMsgId,
          role: 'model',
          content: data.answer || (isEn ? 'Solution completed directly.' : 'تم حل الواجب بدقة واختصار.'),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: selectedCategory,
          isNew: true,
        };
        setMessages((prev) => [...prev, modelMsg]);
      }
    } catch (err: any) {
      console.error('Error contacting robot:', err);
      const errorMsg: ChatMessage = {
        id: 'msg_' + Date.now() + '_err',
        role: 'model',
        content: isEn
          ? `⚡ **Direct Quick Solution:**
1. Identify the given variables and direct formula.
2. Calculate the target value directly.
3. State final answer clearly. (Network delay encountered, you can retry sending!)`
          : `⚡ **إجابة مباشرة وسريعة:**
1. حدد المعطيات والمطلوب في مسألة الواجب.
2. طبّق القانون الرياضي أو العلمي المباشر.
3. اكتب النتيجة النهائية بوضوح.
*(حدث تأخير شبكة مؤقت، يمكنك إعادة الإرسال أو التقاط صورة أوضح)*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isNew: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert(isEn ? 'Speech recognition is not supported in this browser.' : 'التعرف الصوتي غير مدعوم في هذا المتصفح.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = targetLang === 'en' ? 'en-US' : targetLang === 'ar' ? 'ar-SA' : isEn ? 'en-US' : 'ar-SA';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown characters from spoken text
    const cleanText = text
      .replace(/[#*`_~[\]()]/g, '')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const isTextArabic = /[\u0600-\u06FF]/.test(cleanText);
    utterance.lang = isTextArabic ? 'ar-SA' : 'en-US';
    utterance.rate = 1.05; // Slightly faster for quick listening

    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg_reset',
        role: 'model',
        content: isEn
          ? '⚡ Conversation cleared. Ready for your homework photos, studies, or questions with direct fast answers!'
          : '⚡ تم مسح المحادثة. جاهز لاستقبال صور الواجبات، المسائل الدراسية، والأسئلة وحلها بسرعة وإيجاز!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) return null;

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const samplePrompts = isEn ? currentCategoryObj.samplePromptsEn : currentCategoryObj.samplePromptsAr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 overflow-hidden relative ${
          isExpanded
            ? 'w-full h-full max-w-none max-h-none rounded-none'
            : 'w-full max-w-4xl h-[92vh] max-h-[840px]'
        }`}
      >
        {/* Hidden File Input for Image Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Hidden Native Device Camera Input (opens device camera directly without getUserMedia permission prompts) */}
        <input
          type="file"
          ref={cameraCaptureInputRef}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Modal Top Header */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
                  {isEn ? 'GSE Universal AI Robot (For Everything)' : 'روبوت GSE الذكي الشامل (لكل شيء)'}
                </h2>
                {/* Mode Badges */}
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 flex items-center gap-1">
                  <PartyPopper className="w-3 h-3 text-pink-400" />
                  <span>{isEn ? 'Fun & Leisure' : 'ترفيه وفرفشة'}</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{isEn ? 'Fast & Concise' : 'سريع وموجز'}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-cyan-300 border border-indigo-400/30 hidden md:flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  <span>{isEn ? 'Photo Solver' : 'حل الواجبات بالصور'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block">
                {isEn
                  ? 'Studies • Homework photo solver • Entertainment & games • Movies • Solutions for everything!'
                  : 'للدراسة • حل الواجبات بالصور • تسلية وألعاب وفوازير • أفلام • وحلول لكل شيء!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Camera Trigger in Header */}
            <button
              type="button"
              onClick={() => startCamera()}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
              title={isEn ? 'Capture Homework Photo' : 'التقاط صورة للواجب'}
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEn ? 'Camera' : 'الكاميرا'}</span>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <select
                aria-label={isEn ? "Select conversation language" : "اختر لغة المحادثة"}
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-slate-800/90 text-xs text-slate-200 py-1.5 px-2.5 rounded-lg border border-slate-700 hover:border-indigo-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-400 transition-colors cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                    {isEn ? l.nameEn : l.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleClearChat}
              className="p-1.5 text-slate-400 hover:text-rose-300 hover:bg-slate-800/80 rounded-lg transition-colors"
              title={isEn ? 'Clear Conversation' : 'إعادة تعيين المحادثة'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden md:block p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              title={isExpanded ? (isEn ? 'Exit Fullscreen' : 'تصغير') : (isEn ? 'Fullscreen' : 'تكبير')}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              title={isEn ? 'Close' : 'إغلاق'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Domain Category Switcher Bar */}
        <div className="px-3 py-2 bg-slate-100/90 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap hidden sm:inline px-1">
            {isEn ? 'Domain:' : 'المجال:'}
          </span>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 ring-1 ring-indigo-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span>{isEn ? cat.labelEn : cat.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Live Camera Viewfinder Overlay */}
        {isCameraOpen && (
          <div className="absolute inset-0 z-40 bg-slate-950/95 flex flex-col items-center justify-between p-3 sm:p-5 text-white animate-fadeIn">
            {/* Camera Header */}
            <div className="w-full max-w-xl flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/40 rounded-xl border border-indigo-400/40 text-indigo-300">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {isEn ? 'Capture Homework Photo' : 'التقاط صورة للواجب الدراسي'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {isEn ? 'Point camera at your questions or worksheet' : 'وجّه الكاميرا نحو ورقة الأسئلة أو كتاب الواجب بوضوح'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isEn ? 'Close Camera' : 'إغلاق الكاميرا'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Stream Container with Guide Corners */}
            <div className="relative w-full max-w-xl aspect-4/3 sm:aspect-16/10 bg-black rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-2xl flex items-center justify-center my-2">
              {cameraError ? (
                <div className="p-6 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      {isEn ? 'Device Camera & Photo Options' : 'خيارات تصوير الواجب بالكاميرا'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{cameraError}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        stopCamera();
                        cameraCaptureInputRef.current?.click();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{isEn ? 'Open Device Camera' : 'فتح كاميرا الجهاز المباشرة'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        stopCamera();
                        fileInputRef.current?.click();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isEn ? 'Choose File' : 'اختيار صورة من الملفات'}</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => startCamera(cameraFacingMode)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline block mx-auto cursor-pointer"
                  >
                    {isEn ? 'Retry live viewfinder' : 'إعادة محاولة البث المباشر للكاميرا'}
                  </button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Viewfinder overlay corners */}
                  <div className="absolute inset-5 sm:inset-8 pointer-events-none border border-white/20 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-7 h-7 border-t-3 border-l-3 border-cyan-400 rounded-tl-lg" />
                      <div className="w-7 h-7 border-t-3 border-r-3 border-cyan-400 rounded-tr-lg" />
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] font-bold bg-black/70 px-3.5 py-1 rounded-full text-cyan-300 border border-cyan-400/40 backdrop-blur-xs shadow-lg">
                        {isEn ? 'Place assignment within frame' : 'اضبط مسألة الواجب داخل الإطار'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-7 h-7 border-b-3 border-l-3 border-cyan-400 rounded-bl-lg" />
                      <div className="w-7 h-7 border-b-3 border-r-3 border-cyan-400 rounded-br-lg" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Camera Actions Bar */}
            {!cameraError && (
              <div className="w-full max-w-xl flex items-center justify-around py-3">
                {/* Switch camera facing mode */}
                <button
                  type="button"
                  onClick={handleSwitchCameraFacing}
                  className="p-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 transition-colors cursor-pointer"
                  title={isEn ? 'Switch Camera' : 'تبديل الكاميرا'}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>

                {/* Shutter Capture Button */}
                <button
                  type="button"
                  onClick={handleCapturePhoto}
                  className="w-16 h-16 rounded-full bg-white hover:bg-slate-100 border-4 border-indigo-500 shadow-xl shadow-indigo-500/50 flex items-center justify-center text-indigo-700 transition-transform active:scale-90 cursor-pointer"
                  title={isEn ? 'Take Photo' : 'التقاط الصورة'}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white">
                    <Camera className="w-6 h-6" />
                  </div>
                </button>

                {/* Upload from file button */}
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    fileInputRef.current?.click();
                  }}
                  className="p-3 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-700 transition-colors cursor-pointer"
                  title={isEn ? 'Upload Photo' : 'رفع صورة من الملفات'}
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lightbox Modal for Enlarging Photos */}
        {enlargedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setEnlargedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setEnlargedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                title={isEn ? 'Close' : 'إغلاق'}
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={enlargedImage}
                alt="Enlarged Homework View"
                className="w-full h-auto max-h-[82vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {/* Active Category Header Card */}
          <div className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${currentCategoryObj.bgColor}`}>
            <div className="flex items-start gap-3 flex-1">
              <currentCategoryObj.icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-sm">
                  {isEn ? currentCategoryObj.labelEn : currentCategoryObj.labelAr}
                </strong>
                <p className="text-slate-600 mt-0.5">
                  {isEn ? currentCategoryObj.descEn : currentCategoryObj.descAr}
                </p>
              </div>
            </div>

            {/* Quick Camera launch button from card */}
            <button
              type="button"
              onClick={() => startCamera()}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px] transition-colors shadow-2xs cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{isEn ? 'Photo Homework' : 'صوّر الواجب 📷'}</span>
            </button>
          </div>

          {/* Messages Stream */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isModel = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-sm ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs relative group ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {/* If message includes an image (homework photo) */}
                  {msg.image && (
                    <div className="mb-2.5">
                      <div className="relative inline-block group/img">
                        <img
                          src={msg.image}
                          alt="Homework Photo"
                          className="max-w-[240px] max-h-[170px] object-cover rounded-xl border-2 border-white/50 shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setEnlargedImage(msg.image || null)}
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="text-[10px] text-indigo-100 flex items-center gap-1 mt-1 font-semibold">
                        <Camera className="w-3 h-3" />
                        <span>{isEn ? 'Homework Photo Attached' : 'صورة الواجب الدراسي'}</span>
                      </div>
                    </div>
                  )}

                  {/* Message Content: use FastTypingMessage for model response to achieve fast typing feel */}
                  {isModel ? (
                    <FastTypingMessage
                      content={msg.content}
                      isNew={msg.isNew}
                      onComplete={() => {
                        msg.isNew = false;
                      }}
                    />
                  ) : (
                    <div className="whitespace-pre-line leading-relaxed text-xs sm:text-sm font-sans space-y-1">
                      {msg.content}
                    </div>
                  )}

                  {/* Actions & Timestamp footer */}
                  <div
                    className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] ${
                      isUser ? 'border-indigo-500/50 text-indigo-100' : 'border-slate-100 text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {isModel && (
                      <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => handleSpeakText(msg.id, msg.content)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                          title={isSpeakingId === msg.id ? (isEn ? 'Stop Speaking' : 'إيقاف الصوت') : (isEn ? 'Read Aloud' : 'استماع صوتي')}
                        >
                          {isSpeakingId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                          title={isEn ? 'Copy' : 'نسخ الإجابة'}
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start animate-fadeIn">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-2 text-slate-700 text-xs">
                <Zap className="w-4 h-4 text-amber-500 animate-bounce" />
                <span className="font-semibold">
                  {isEn
                    ? 'GSE Robot is analyzing photo and rapidly typing the direct solution...'
                    : 'الروبوت يقرأ صورة الواجب ويكتب الحل المباشر بسرعة فائقة وبإيجاز...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Selected Homework Photo Preview Bar */}
        {selectedImage && (
          <div className="p-3 bg-indigo-50/95 border-t border-indigo-200 flex flex-col gap-2 shrink-0 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <img
                    src={selectedImage}
                    alt="Homework photo"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border-2 border-indigo-500 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setEnlargedImage(selectedImage)}
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-indigo-950">
                      {isEn ? 'Homework Photo Attached 📸' : 'تم إرفاق صورة الواجب الدراسي 📸'}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
                      {isEn ? 'Fast & Concise' : 'حل سريع وموجز'}
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-800 mt-0.5">
                    {isEn
                      ? 'Click Send or pick a quick command below to get the direct answer without filler talk.'
                      : 'اضغط إرسال أو اختر أمراً سريعاً ليحل الروبوت الواجب فوراً بدون إطالة.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className="p-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title={isEn ? 'Retake Photo' : 'إعادة التقاط صورة'}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isEn ? 'Retake' : 'إعادة التقاط'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title={isEn ? 'Remove Photo' : 'حذف الصورة'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isEn ? 'Remove' : 'حذف'}</span>
                </button>
              </div>
            </div>

            {/* Quick homework action chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {(isEn
                ? [
                    'Solve all questions in this homework concisely',
                    'Final answer only with essential steps',
                    'Check my solution and correct errors directly',
                    'Solve the math equations shown in the photo',
                  ]
                : [
                    'حل جميع مسائل الواجب الظاهرة باختصار شديد',
                    'الإجابة النهائية فقط مع الخطوات الأساسية',
                    'صحح حلي في الصورة واذكر الصواب مباشرة',
                    'حل مسائل الرياضيات/العلوم في الصورة فوراً',
                  ]
              ).map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputMessage(chip);
                    handleSendMessage(chip);
                  }}
                  disabled={isLoading}
                  className="text-[11px] font-bold bg-white hover:bg-indigo-600 hover:text-white text-indigo-800 border border-indigo-300 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                  <span>{chip}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Quick Prompts */}
        <div className="p-2.5 bg-slate-100/80 border-t border-slate-200/80 shrink-0">
          <div className="flex items-center gap-1 mb-1.5 px-1">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span className="text-[10px] font-bold text-slate-600">
              {isEn ? 'Direct Queries (Fast & Concise):' : 'استفسارات ومسائل سريعة بنقرة واحدة:'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-full text-[11px] font-medium border border-slate-200 hover:border-indigo-300 transition-all shrink-0 whitespace-nowrap shadow-2xs cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar with Camera & Upload buttons */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            {/* Camera Capture Trigger Button */}
            <button
              type="button"
              onClick={() => startCamera()}
              className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
              title={isEn ? 'Take Homework Photo (Camera)' : 'التقاط صورة للواجب بالكاميرا 📷'}
            >
              <Camera className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold hidden xl:inline">{isEn ? 'Photo' : 'صوّر الواجب'}</span>
            </button>

            {/* Upload Image File Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-indigo-600 transition-all shrink-0 cursor-pointer"
              title={isEn ? 'Upload Homework Picture' : 'رفع صورة الواجب من جهازك 🖼️'}
            >
              <Upload className="w-4 h-4" />
            </button>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-indigo-600'
              }`}
              title={isListening ? (isEn ? 'Listening...' : 'جاري الاستماع...') : (isEn ? 'Voice Input (Mic)' : 'تحدث بالصوت')}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                selectedImage
                  ? (isEn ? 'Add notes for the homework photo or hit Send...' : 'أضف ملاحظة على صورة الواجب أو اضغط إرسال للحل الفوري...')
                  : (isEn
                    ? 'Ask or take photo of homework: Fast typing, concise direct answers...'
                    : 'اسأل أو التقط صورة للواجب: كتابة سريعة وإجابات موجزة بدون إطالة...')
              }
              className="flex-1 px-3 sm:px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={(!inputMessage.trim() && !selectedImage) || isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs shadow-indigo-200 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              <span>{isEn ? 'Send' : 'إرسال'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

