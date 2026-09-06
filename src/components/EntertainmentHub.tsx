import React, { useState } from 'react';
import {
  Gamepad2,
  Sparkles,
  Laugh,
  Film,
  HelpCircle,
  Shuffle,
  Volume2,
  Copy,
  Check,
  Bot,
  Flame,
  ArrowRight,
  Lightbulb,
  Coffee,
  RotateCcw,
  Smile,
  PartyPopper,
  Clapperboard,
  Tv,
  CheckCircle2,
  ChevronRight,
  Send,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EntertainmentHubProps {
  onOpenRobotWithQuery?: (query: string, category: string) => void;
  onSwitchToStudies?: () => void;
  onSwitchToProjects?: () => void;
}

const STATIC_JOKES_AR = [
  {
    category: 'مبرمجين وتقنية',
    setup: 'ليش المبرمج بيحب يشرب قهوة وهو لابس نظارة شمسية؟',
    punchline: 'لأنه ما بيتحمل الـ High Contrast في الواقع ويفضل الـ Dark Mode دائماً! 😎☕',
  },
  {
    category: 'دراسة وامتحانات',
    setup: 'طالب دخل الامتحان وكتب في كل ورقة الإجابة: "الله أعلم".',
    punchline: 'الأستاذ صحح الورقة وكتب له: "الله ينجحك، والدرجة صفر"! 😂',
  },
  {
    category: 'مواقف طريفة',
    setup: 'واحد سأل الذكاء الاصطناعي: شو أسرع طريقة أصير فيها غني؟',
    punchline: 'جاوبه: سكّر اللابتوب وقوم اشتغل، أنا مجرد خوارزمية مش علاء الدين! 🤖💸',
  },
  {
    category: 'ذكاء وسرعة بديهة',
    setup: 'سألوا حكيم: ليش الوقت بيمر بسرعة لما نكون مبسوطين؟',
    punchline: 'قال: لأن السعادة ما بتدفع إيجار، بتمر ضيف خفيف وبتودعك! ⏳✨',
  },
];

const STATIC_JOKES_EN = [
  {
    category: 'Tech & Developers',
    setup: 'Why do programmers prefer dark mode?',
    punchline: 'Because light attracts bugs! 🐛💻',
  },
  {
    category: 'School & Exams',
    setup: 'Why did the teacher wear sunglasses to the classroom?',
    punchline: 'Because her students were all so bright! 🕶️📚',
  },
  {
    category: 'AI & Robots',
    setup: 'What did the AI robot say to the human who was procrastinating?',
    punchline: 'Error 404: Motivation not found. Please reboot your willpower! 🤖⚡',
  },
  {
    category: 'Quick Humor',
    setup: 'Why do we tell actors to "break a leg"?',
    punchline: 'Because every play has a cast! 🎭😄',
  },
];

const STATIC_RIDDLES_AR = [
  {
    id: 1,
    question: 'شيء يملك أسناناً كثيرة جداً، ولكنه لا يعض أحداً أبداً، فما هو؟',
    hint: 'تستخدمه كل يوم صباحاً لتصفيف شعرك',
    answer: 'المشط 🪮',
    difficulty: 'سهل',
  },
  {
    id: 2,
    question: 'يمشي بلا أرجل، ويبكي بلا عيون، ويطير بلا أجنحة، فما هو؟',
    hint: 'شيء في السماء يهطل منه المطر',
    answer: 'السحاب / الغيمة ☁️🌧️',
    difficulty: 'متوسط',
  },
  {
    id: 3,
    question: 'كلما أخذت منه كبُر، وكلما وضعت فيه صغُر، فما هو؟',
    hint: 'حفرة في الأرض',
    answer: 'الحفرة 🕳️',
    difficulty: 'ذكي',
  },
  {
    id: 4,
    question: 'ما هو الشيء الذي يكون أمامك دائماً، ولكنك لا تستطيع رؤيته أبداً؟',
    hint: 'يتعلق بالزمن والغد',
    answer: 'المستقبل 🚀🔮',
    difficulty: 'فلسفي',
  },
];

const STATIC_RIDDLES_EN = [
  {
    id: 1,
    question: 'What has many teeth, but cannot bite a thing?',
    hint: 'You use it on your hair every morning',
    answer: 'A comb 🪮',
    difficulty: 'Easy',
  },
  {
    id: 2,
    question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
    hint: 'Heard in valleys and mountains',
    answer: 'An echo 🗣️🏔️',
    difficulty: 'Medium',
  },
  {
    id: 3,
    question: 'The more you take out of me, the bigger I become. What am I?',
    hint: 'Digging in the soil',
    answer: 'A hole 🕳️',
    difficulty: 'Clever',
  },
  {
    id: 4,
    question: 'What is always in front of you but can never be seen?',
    hint: 'It awaits tomorrow',
    answer: 'The future 🚀🔮',
    difficulty: 'Philosophical',
  },
];

const WOULD_YOU_RATHER_AR = [
  {
    optionA: 'أن تكون قادراً على قراءة أفكار أي شخص في العالم',
    optionB: 'أن تكون قادراً على الانتقال اللحظي (Teleportation) لأي مكان مجاناً',
    commentaryA: 'إذا اخترت قراءة الأفكار: أنت فضولي جداً وتبحث عن كشف الأسرار، بس جهز حالك للصدمات! 🧠👀',
    commentaryB: 'إذا اخترت الانتقال اللحظي: أنت عاشق للحرية والسفر وتكره الزحمة وإشارات المرور! ✈️🌍',
  },
  {
    optionA: 'أن تعيش بدون انترنت لمدة سنة في قصر فاخر على جزيرة استوائية',
    optionB: 'أن تعيش حياتك الطبيعية الحالية ولكن مع سرعة انترنت 10 جيجابت مجانية للأبد',
    commentaryA: 'إذا اخترت الجزيرة: أنت محتاج ديتوكس رقمي عاجل وراحة بال حقيقية! 🏝️🥥',
    commentaryB: 'إذا اخترت الانترنت الخارق: أنت مدمن تكنولوجيا وتعتبر فصل الواي فاي انقطاعاً للأكسجين! ⚡💻',
  },
  {
    optionA: 'أن تكون عبقرياً في كل المواد الدراسية لكنك تنام 3 ساعات فقط يومياً',
    optionB: 'أن تكون شخصاً متوسطاً ومرتاحاً ولكنك تستيقظ كل يوم بأعلى طاقة وسعادة',
    commentaryA: 'طموح لا يهدأ، لكن القهوة ستكون شريان حياتك الأبدي! ☕🎓',
    commentaryB: 'حكمة وسعادة نفسية وراحة بال لا تقدر بثمن! ☀️🧘‍♂️',
  },
];

const WOULD_YOU_RATHER_EN = [
  {
    optionA: 'Be able to read anyone’s mind on demand',
    optionB: 'Be able to teleport anywhere in the universe instantly for free',
    commentaryA: 'Mind reader: Highly curious and analytical, but brace yourself for awkward truths! 🧠👀',
    commentaryB: 'Teleporter: You value total freedom and despise traffic jams and airport queues! ✈️🌍',
  },
  {
    optionA: 'Live for 1 year with zero internet in a luxury beachfront mansion',
    optionB: 'Keep your current daily life with free 10Gbps fiber internet forever',
    commentaryA: 'Island lover: You crave a genuine digital detox and inner tranquility! 🏝️🥥',
    commentaryB: 'High-speed addict: You believe Wi-Fi should be officially added to Maslow’s hierarchy of needs! ⚡💻',
  },
];

const MOOD_CATEGORIES = [
  {
    id: 'thriller',
    nameAr: 'تشويق وغموض وذكاء 🕵️‍♂️',
    nameEn: 'Mind-Bending Thrillers 🕵️‍♂️',
    descAr: 'أفلام تلاعب بالعقول وحبكات غير متوقعة',
    descEn: 'Plot twists, psychological suspense, and puzzle plots',
    recommendationsAr: [
      { title: 'Inception (2010)', desc: 'تحفة كريستوفر نولان عن سرقة الأفكار داخل الأحلام المتداخلة.' },
      { title: 'Shutter Island (2010)', desc: 'تحقيق غامض في مصحة نفسية معزولة ينتهي بصدمة سينمائية كبرى.' },
      { title: 'Knives Out (2019)', desc: 'جريمة قتل غامضة وكوميديا سوداء مشوقة تبقيك تفكر حتى اللحظة الأخيرة.' },
    ],
    recommendationsEn: [
      { title: 'Inception (2010)', desc: 'Mind-bending dream-heist masterpiece by Christopher Nolan.' },
      { title: 'Shutter Island (2010)', desc: 'A gripping psychological investigation on an isolated island asylum.' },
      { title: 'Knives Out (2019)', desc: 'Delightful modern whodunit full of witty clues and twists.' },
    ],
  },
  {
    id: 'comedy',
    nameAr: 'ضحك وسعادة وفرفشة 😂',
    nameEn: 'Pure Comedy & Laughs 😂',
    descAr: 'أفلام خفيفة ترفع هرمون السعادة وتنسيك تعب اليوم',
    descEn: 'Feel-good humor, cheerful banter, and mood-lifting comedy',
    recommendationsAr: [
      { title: 'The Grand Budapest Hotel (2014)', desc: 'كوميديا بصرية عبقرية وألوان مبهجة ومغامرات شيقة لا تُنسى.' },
      { title: 'Free Guy (2021)', desc: 'شخصية داخل لعبة فيديو تكتشف وعيها وتعيش مغامرة كوميدية فائقة المتعة.' },
      { title: 'Paddington 2 (2017)', desc: 'من ألطف وأجمل أفلام السينما لرفع المزاج ونشر البهجة.' },
    ],
    recommendationsEn: [
      { title: 'The Grand Budapest Hotel (2014)', desc: 'Visually exquisite, eccentric, and hilarious caper.' },
      { title: 'Free Guy (2021)', desc: 'An NPC gains awareness in a video game with boundless humor.' },
      { title: 'Paddington 2 (2017)', desc: 'Universally acclaimed mood-lifter filled with heart and joy.' },
    ],
  },
  {
    id: 'anime',
    nameAr: 'أنمي أسطوري وملحمي 🎌',
    nameEn: 'Top-Tier Anime & Epic Plots 🎌',
    descAr: 'قصص استثنائية ورسوم مذهلة وحوارات عميقة',
    descEn: 'Iconic anime series with storytelling, emotion, and adrenaline',
    recommendationsAr: [
      { title: 'Death Note (مذكرة الموت)', desc: 'صراع العقول الأسطوري بين لايت والمحقق العبقري إل في 37 حلقة لا تُنسى.' },
      { title: 'Spirited Away (المخطوفة)', desc: 'فيلم استوديو غيبلي الأوسكاري الحالم لعالم الأرواح والغرائب.' },
      { title: 'Frieren: Beyond Journey’s End', desc: 'أنمي رائع وهادئ وفلسفي عن قيمة الوقت والصداقة والذكريات.' },
    ],
    recommendationsEn: [
      { title: 'Death Note', desc: 'Legendary battle of wits between Light and detective L.' },
      { title: 'Spirited Away', desc: 'Studio Ghibli Oscar-winning magical journey into a spirit realm.' },
      { title: 'Frieren: Beyond Journey’s End', desc: 'Poignant, beautifully paced fantasy about the flow of time and memory.' },
    ],
  },
];

export const EntertainmentHub: React.FC<EntertainmentHubProps> = ({
  onOpenRobotWithQuery,
  onSwitchToStudies,
  onSwitchToProjects,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [activeSubTab, setActiveSubTab] = useState<'games' | 'jokes' | 'movies' | 'what_if'>('games');

  // Riddles State
  const riddlesList = isEn ? STATIC_RIDDLES_EN : STATIC_RIDDLES_AR;
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);
  const [aiGeneratedRiddle, setAiGeneratedRiddle] = useState<string | null>(null);
  const [isGeneratingRiddle, setIsGeneratingRiddle] = useState(false);

  // Would You Rather State
  const wyrList = isEn ? WOULD_YOU_RATHER_EN : WOULD_YOU_RATHER_AR;
  const [wyrIndex, setWyrIndex] = useState(0);
  const [chosenOption, setChosenOption] = useState<'A' | 'B' | null>(null);

  // Jokes State
  const jokesList = isEn ? STATIC_JOKES_EN : STATIC_JOKES_AR;
  const [jokeIndex, setJokeIndex] = useState(0);
  const [aiJoke, setAiJoke] = useState<string | null>(null);
  const [isGeneratingJoke, setIsGeneratingJoke] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Movies State
  const [selectedMoodId, setSelectedMoodId] = useState<string>('thriller');
  const [aiCustomMovie, setAiCustomMovie] = useState<string | null>(null);
  const [customMoodInput, setCustomMoodInput] = useState('');
  const [isGeneratingMovie, setIsGeneratingMovie] = useState(false);

  // What If State
  const [whatIfTopic, setWhatIfTopic] = useState('');
  const [whatIfResult, setWhatIfResult] = useState<string | null>(null);
  const [isGeneratingWhatIf, setIsGeneratingWhatIf] = useState(false);

  // Handle Generate Dynamic AI Content
  const handleGenerateAiEntertainment = async (actionType: string, subType?: string, customQuery?: string) => {
    try {
      if (actionType === 'riddle') setIsGeneratingRiddle(true);
      if (actionType === 'joke') setIsGeneratingJoke(true);
      if (actionType === 'movie') setIsGeneratingMovie(true);
      if (actionType === 'what_if') setIsGeneratingWhatIf(true);

      const response = await fetch('/api/entertainment-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          subType: subType,
          userMood: subType,
          customQuery: customQuery,
          lang: language,
        }),
      });

      const data = await response.json();
      if (actionType === 'riddle') {
        setAiGeneratedRiddle(data.result);
      } else if (actionType === 'joke') {
        setAiJoke(data.result);
      } else if (actionType === 'movie') {
        setAiCustomMovie(data.result);
      } else if (actionType === 'what_if') {
        setWhatIfResult(data.result);
      }
    } catch (err) {
      console.warn('Entertainment action failed:', err);
    } finally {
      setIsGeneratingRiddle(false);
      setIsGeneratingJoke(false);
      setIsGeneratingMovie(false);
      setIsGeneratingWhatIf(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const currentRiddle = riddlesList[currentRiddleIndex % riddlesList.length];
  const currentWyr = wyrList[wyrIndex % wyrList.length];
  const currentJoke = jokesList[jokeIndex % jokesList.length];
  const activeMoodObj = MOOD_CATEGORIES.find((m) => m.id === selectedMoodId) || MOOD_CATEGORIES[0];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Banner Header: GSE Entertainment & Leisure World */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-purple-500/30">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-extrabold shadow-inner">
              <PartyPopper className="w-3.5 h-3.5" />
              <span>{isEn ? 'GSE Entertainment & Leisure Hub' : 'عالم التسلية والترفيه والفرفشة'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isEn ? 'Not Just for Study — Fun, Games & Joy for Everything!' : 'مش للدراسة بس — ترفيه، ألعاب، فوازير، وفرفشة لكل شيء! 🎉'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isEn
                ? 'Take a delightful break: solve clever riddles, play "Would You Rather", generate side-splitting humor, discover movie gems, or challenge the AI Robot in playful games!'
                : 'استمتع بوقتك: فوازير وألغاز ذكاء، تحدي "لو خيروك"، نكت ومواقف طريفة، ترشيحات أفلام ومسلسلات حسب مودك، أو تحدث مع الروبوت الذكي في أي موضوع ترفيهي!'}
            </p>
          </div>

          {/* Direct CTA: Launch Universal Robot in Entertainment Mode */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onOpenRobotWithQuery?.('احكي لي نكتة مضحكة وفزورة ذكاء لتروق مزاجي!', 'entertainment')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4 animate-bounce" />
              <span>{isEn ? 'Chat with Fun Robot' : 'افتح روبوت الفرفشة والترفيه 🤖'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenRobotWithQuery?.('العب معي لعبة 20 سؤال! فكر في شخصية أو شيء وسأحاول تخمينه.', 'games')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>{isEn ? 'Play 20-Questions Game' : 'العب معي لعبة 20 سؤال'}</span>
            </button>
          </div>
        </div>

        {/* Quick Mode Switcher Tabs */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSubTab('games')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'games'
                ? 'bg-white text-slate-900 shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-purple-600" />
            <span>{isEn ? 'Brain Puzzles & Games' : 'ألعاب وفوازير الذكاء 🧩'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('jokes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'jokes'
                ? 'bg-white text-slate-900 shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Laugh className="w-4 h-4 text-amber-500" />
            <span>{isEn ? 'Humor & Jokes Generator' : 'استراحة الضحك والنكت 😂'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('movies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'movies'
                ? 'bg-white text-slate-900 shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Film className="w-4 h-4 text-rose-500" />
            <span>{isEn ? 'Movie & Anime Matcher' : 'دليل السهرة والأفلام 🎬'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('what_if')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'what_if'
                ? 'bg-white text-slate-900 shadow-md font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{isEn ? 'Hilarious "What If" Scenarios' : 'تخيل لو... مواقف كوميدية 🔮'}</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: GAMES & RIDDLES & WOULD-YOU-RATHER */}
      {activeSubTab === 'games' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Interactive Brainteaser & Riddle */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isEn ? 'Interactive Riddle of the Day' : 'فزورة الذكاء التفاعلية'}
                    </h3>
                    <span className="text-[10px] text-purple-600 font-bold">
                      {isEn ? `Difficulty: ${currentRiddle.difficulty}` : `مستوى الصعوبة: ${currentRiddle.difficulty}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRiddleAnswer(false);
                      setCurrentRiddleIndex((prev) => prev + 1);
                      setAiGeneratedRiddle(null);
                    }}
                    className="p-1.5 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                    title={isEn ? 'Next Riddle' : 'فزورة تالية'}
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Riddle Content */}
              <div className="bg-purple-50/60 rounded-xl p-4 border border-purple-100 text-slate-800 mb-4 min-h-[110px] flex flex-col justify-center">
                <p className="text-sm font-semibold leading-relaxed">
                  {aiGeneratedRiddle ? aiGeneratedRiddle : currentRiddle.question}
                </p>
                {!aiGeneratedRiddle && (
                  <p className="text-xs text-slate-500 mt-2 italic">
                    💡 {isEn ? `Hint: ${currentRiddle.hint}` : `تلميح: ${currentRiddle.hint}`}
                  </p>
                )}
              </div>

              {/* Answer Reveal Area */}
              {!aiGeneratedRiddle && (
                <div className="mb-4">
                  {showRiddleAnswer ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between">
                      <span>{isEn ? `Answer: ${currentRiddle.answer}` : `الحل هو: ${currentRiddle.answer}`}</span>
                      <button
                        type="button"
                        onClick={() => setShowRiddleAnswer(false)}
                        className="text-[10px] text-emerald-700 underline cursor-pointer"
                      >
                        {isEn ? 'Hide' : 'إخفاء'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowRiddleAnswer(true)}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      {isEn ? 'Click to Reveal Answer 👀' : 'اضغط لكشف الحل ومعرفة الإجابة 👀'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* AI Generator Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={isGeneratingRiddle}
                onClick={() => handleGenerateAiEntertainment('riddle', 'medium')}
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingRiddle ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isEn ? 'Generate Custom AI Riddle' : 'توليد لغز ذكي جديد بالذكاء الاصطناعي'}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenRobotWithQuery?.(
                    `أعطني فزورة شعرية أو لغزاً ذكياً محيراً وسأحاول حله معك!`,
                    'games'
                  )
                }
                className="text-[11px] text-slate-500 hover:text-purple-600 underline cursor-pointer"
              >
                {isEn ? 'Play in Robot Chat' : 'العب مع الروبوت'}
              </button>
            </div>
          </div>

          {/* Card 2: Interactive "Would You Rather" Game */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isEn ? 'Game: Would You Rather?' : 'تحدي: لو خيّروك؟ 🤔'}
                    </h3>
                    <span className="text-[10px] text-pink-600 font-bold">
                      {isEn ? 'Pick your choice and see the fun personality analysis!' : 'اختر أحد الخيارين وشاهد التحليل الكوميدي لشخصيتك!'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setChosenOption(null);
                    setWyrIndex((prev) => prev + 1);
                  }}
                  className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
                  title={isEn ? 'Next Dilemma' : 'سؤال آخر'}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>

              {/* Dilemma Choices */}
              <div className="space-y-3 mb-4">
                <button
                  type="button"
                  onClick={() => setChosenOption('A')}
                  className={`w-full p-3.5 rounded-xl border text-right transition-all cursor-pointer flex items-start gap-2.5 ${
                    chosenOption === 'A'
                      ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-200 text-pink-900 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded-md bg-pink-200 text-pink-800 text-[10px] font-extrabold shrink-0 mt-0.5">
                    الخيار A
                  </span>
                  <span className="text-xs leading-relaxed">{currentWyr.optionA}</span>
                </button>

                <div className="text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  — {isEn ? 'OR' : 'أو'} —
                </div>

                <button
                  type="button"
                  onClick={() => setChosenOption('B')}
                  className={`w-full p-3.5 rounded-xl border text-right transition-all cursor-pointer flex items-start gap-2.5 ${
                    chosenOption === 'B'
                      ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-200 text-purple-900 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="px-2 py-0.5 rounded-md bg-purple-200 text-purple-800 text-[10px] font-extrabold shrink-0 mt-0.5">
                    الخيار B
                  </span>
                  <span className="text-xs leading-relaxed">{currentWyr.optionB}</span>
                </button>
              </div>

              {/* Personality Commentary Result */}
              {chosenOption && (
                <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl text-xs text-slate-800 animate-fadeIn">
                  <p className="font-bold text-pink-700 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Funny Persona Analysis:' : 'التحليل الكوميدي لاختيارك:'}</span>
                  </p>
                  <p className="leading-relaxed">
                    {chosenOption === 'A' ? currentWyr.commentaryA : currentWyr.commentaryB}
                  </p>
                </div>
              )}
            </div>

            {/* Direct Robot Challenge Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() =>
                  onOpenRobotWithQuery?.(
                    `اطرح عليّ 3 أسئلة "لو خيروك" ممتعة ومضحكة جداً وعلق على إجاباتي بأسلوب كوميدي!`,
                    'games'
                  )
                }
                className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Play Full Game in Robot' : 'تحدي كامل مع الروبوت'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setChosenOption(null);
                  setWyrIndex((prev) => prev + 1);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                {isEn ? 'Next Question →' : 'سؤال تالي ←'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: HUMOR & JOKES GENERATOR */}
      {activeSubTab === 'jokes' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Laugh className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isEn ? 'GSE AI Humor & Jokes Lounge' : 'صالة الفرفشة ومولد النكت الذكية'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isEn ? 'Fresh, clever, clean humor to brighten your session' : 'نكت ومواقف طريفة منتقاة بذكاء لإنعاش يومك'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setJokeIndex((prev) => prev + 1);
                  setAiJoke(null);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{isEn ? 'Another Joke' : 'نكتة أخرى'}</span>
              </button>

              <button
                type="button"
                disabled={isGeneratingJoke}
                onClick={() => handleGenerateAiEntertainment('joke', 'general')}
                className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingJoke ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>{isEn ? 'Generate AI Joke' : 'توليد نكتة بالذكاء الاصطناعي'}</span>
              </button>
            </div>
          </div>

          {/* Active Joke Presentation Display */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-yellow-50/60 rounded-2xl border border-amber-200/70 p-6 sm:p-8 text-center space-y-4 shadow-inner">
            {aiJoke ? (
              <div className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line">
                {aiJoke}
              </div>
            ) : (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[11px] font-extrabold">
                  {currentJoke.category}
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  "{currentJoke.setup}"
                </p>
                <div className="p-4 bg-white rounded-xl shadow-xs border border-amber-200/80 text-amber-800 font-extrabold text-sm sm:text-base">
                  {currentJoke.punchline}
                </div>
              </div>
            )}

            {/* Joke actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    aiJoke || `${currentJoke.setup} - ${currentJoke.punchline}`
                  )
                }
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isEn ? 'Copied' : 'تم النسخ'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Copy' : 'نسخ النكتة'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenRobotWithQuery?.(
                    `أعطني 3 نكت ذكية جداً ومضحكة عن التكنولوجيا والامتحانات والحياة اليومية!`,
                    'entertainment'
                  )
                }
                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{isEn ? 'More from Robot' : 'المزيد مع الروبوت'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: MOVIE & ANIME RECOMMENDER */}
      {activeSubTab === 'movies' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isEn ? 'Entertainment & Movie Night Recommender' : 'دليل السهرة السينمائية والأنمي حسب مزاجك'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isEn ? 'Pick your mood or ask for a personalized recommendation' : 'اختر حالتك النفسية واكتشف أفضل الأعمال الفنية لمشاهدتها الليلة'}
                </p>
              </div>
            </div>
          </div>

          {/* Mood Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MOOD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedMoodId(cat.id);
                  setAiCustomMovie(null);
                }}
                className={`p-4 rounded-xl border text-right transition-all cursor-pointer ${
                  selectedMoodId === cat.id
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-200 text-rose-950 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-sm font-bold mb-1">
                  {isEn ? cat.nameEn : cat.nameAr}
                </div>
                <div className="text-[11px] text-slate-500 leading-normal">
                  {isEn ? cat.descEn : cat.descAr}
                </div>
              </button>
            ))}
          </div>

          {/* Recommendations Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isEn ? 'Top Curated Picks for This Mood:' : 'أبرز الترشيحات الاستثنائية لهذا المود:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(isEn ? activeMoodObj.recommendationsEn : activeMoodObj.recommendationsAr).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-rose-300 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                    {item.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Custom Mood Search */}
          <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>{isEn ? 'Ask AI for a Custom Mood Recommendation:' : 'اطلب ترشيحاً مخصصاً حسب ذوقك من الذكاء الاصطناعي:'}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customMoodInput}
                onChange={(e) => setCustomMoodInput(e.target.value)}
                placeholder={
                  isEn
                    ? 'e.g. A fast-paced mystery thriller with detectives and zero horror...'
                    : 'مثال: فيلم غموض ذكي وسريع بدون رعب، أو أنمي قصير من 12 حلقة ممتع...'
                }
                className="flex-1 px-3.5 py-2 text-xs bg-white border border-rose-200 rounded-lg outline-none focus:ring-2 focus:ring-rose-200"
              />
              <button
                type="button"
                disabled={isGeneratingMovie || !customMoodInput.trim()}
                onClick={() =>
                  handleGenerateAiEntertainment('movie', activeMoodObj.nameAr, customMoodInput)
                }
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingMovie ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Film className="w-3.5 h-3.5" />
                )}
                <span>{isEn ? 'Recommend' : 'اقترح لي'}</span>
              </button>
            </div>

            {aiCustomMovie && (
              <div className="p-3 bg-white rounded-lg border border-rose-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line animate-fadeIn">
                {aiCustomMovie}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 4: HILARIOUS "WHAT IF" SCENARIOS */}
      {activeSubTab === 'what_if' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {isEn ? 'Hilarious "What If...?" Fun Scenarios' : 'تخيل لو... سيناريوهات كوميدية وتخيلات ذكية'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn ? 'Type any crazy hypothesis or choose a quick prompt' : 'اكتب أي فكرة مجنونة أو اختر موضوعاً طريفاً لنرى النتيجة المضحكة'}
              </p>
            </div>
          </div>

          {/* Quick Preset Topics */}
          <div className="flex flex-wrap gap-2">
            {[
              isEn ? 'If historical scientists had TikTok accounts' : 'تخيل لو كان نيوتن وأينشتاين يوتيوبرز وعندهم تيك توك',
              isEn ? 'If pets could speak human language for 24 hours' : 'تخيل لو الحيوانات صارت تتكلم عربي لمدة 24 ساعة فقط',
              isEn ? 'If the internet went down worldwide for 1 week' : 'تخيل لو انقطع الانترنت عن العالم فجأة لأسبوع كامل',
              isEn ? 'If coffee was legally classified as official currency' : 'تخيل لو أصبحت القهوة هي العملة الرسمية في العالم',
            ].map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setWhatIfTopic(topic);
                  handleGenerateAiEntertainment('what_if', '', topic);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 rounded-xl text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={whatIfTopic}
              onChange={(e) => setWhatIfTopic(e.target.value)}
              placeholder={isEn ? 'Type a funny "What if..." premise...' : 'اكتب فكرة تخيلية كوميدية مثل: تخيل لو البرمجة صارت بالعربي...'}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:border-cyan-500"
            />
            <button
              type="button"
              disabled={isGeneratingWhatIf || !whatIfTopic.trim()}
              onClick={() => handleGenerateAiEntertainment('what_if', '', whatIfTopic)}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingWhatIf ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{isEn ? 'Imagine' : 'تخيل الآن'}</span>
            </button>
          </div>

          {/* Results display */}
          {whatIfResult && (
            <div className="p-5 bg-gradient-to-br from-cyan-50 via-slate-50 to-indigo-50 border border-cyan-200 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line shadow-inner animate-fadeIn">
              {whatIfResult}
            </div>
          )}
        </div>
      )}

      {/* Bottom Quick Navigation & Transition Hub */}
      <div className="p-4 sm:p-5 bg-slate-100/90 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Coffee className="w-4 h-4 text-amber-600" />
          <span>{isEn ? 'Had enough fun? You can switch back to studies or business anytime!' : 'روّقت واستانست؟ تقدر ترجع للدراسة والواجبات أو ريادة الأعمال بأي وقت!'}</span>
        </div>

        <div className="flex items-center gap-2">
          {onSwitchToStudies && (
            <button
              type="button"
              onClick={onSwitchToStudies}
              className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-slate-200 hover:border-blue-300 transition-all cursor-pointer"
            >
              {isEn ? 'Academic Studies 🎓' : 'الدراسات والأبحاث 🎓'}
            </button>
          )}

          {onSwitchToProjects && (
            <button
              type="button"
              onClick={onSwitchToProjects}
              className="px-3.5 py-1.5 bg-white hover:bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
            >
              {isEn ? 'Startup Plans 🚀' : 'خطط المشاريع 🚀'}
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenRobotWithQuery?.('مرحباً! أتحفني بشيء مسلٍ ومفيد، وسولف معي.', 'entertainment')}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{isEn ? 'Universal Robot' : 'الروبوت الشامل'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
