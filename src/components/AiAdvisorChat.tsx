import React, { useState } from 'react';
import { MessageSquareText, Send, Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';
import { ProjectPlan } from '../types';

interface AiAdvisorChatProps {
  plan: ProjectPlan;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const QUICK_QUESTIONS = [
  'كيف أصل لأول 10 عملاء بأسرع وقت؟',
  'ما هو سيناريو فيديو تيك توك المقترح لإطلاق هذا المشروع؟',
  'كيف أضمن أسعاراً تنافسية تحقق أرباحاً جيدة؟',
];

export const AiAdvisorChat: React.FC<AiAdvisorChatProps> = ({ plan }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `مرحباً بك! أنا مستشارك الذكي في GSE AI الخاص بمشروع "${plan.projectName}". يمكنك سؤالي عن أي تفصيل في الخطة، مثل التسعير، استراتيجيات المحتوى، التراخيص، أو كيفية تنفيذ أي خطوة.`,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || isAsking) return;

    // Append user question
    const updatedMessages: ChatMessage[] = [...messages, { sender: 'user', text: q }];
    setMessages(updatedMessages);
    setInputQuestion('');
    setIsAsking(true);

    try {
      const response = await fetch('/api/ask-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          projectPlan: plan,
        }),
      });

      if (!response.ok) {
        throw new Error('تعذر الحصول على إجابة من المستشار الذكي');
      }

      const data = await response.json();
      setMessages([
        ...updatedMessages,
        { sender: 'ai', text: data.answer || 'تم استلام استفسارك بنجاح.' },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages([
        ...updatedMessages,
        {
          sender: 'ai',
          text: 'عذراً، حدث خطأ أثناء الاتصال بالمستشار الذكي. يرجى المحاولة مرة أخرى.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 no-print">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">المستشار الذكي للمشروع (GSE Advisor)</h3>
          <p className="text-xs text-slate-500">
            اطرح أي سؤال متخصص حول الخطة والتنفيذ واستراتيجيات البيع والتسويق
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[11px] font-semibold text-slate-400">أسئلة شائعة سريعة:</span>
        {QUICK_QUESTIONS.map((qq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAsk(qq)}
            disabled={isAsking}
            className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 px-3 py-1 rounded-full border border-slate-200/80 transition-all"
          >
            {qq}
          </button>
        ))}
      </div>

      {/* Message history */}
      <div className="space-y-3.5 max-h-80 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-slate-200 text-indigo-600 shadow-2xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-none shadow-2xs'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isAsking && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>المستشار الذكي يحلل إجابة سؤالك...</span>
            </div>
          </div>
        )}
      </div>

      {/* Question input field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(inputQuestion);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="اكتب سؤالك هنا (مثلاً: كيف أختار الموردين؟ كيف أروّج عبر إنستقرام؟)..."
          disabled={isAsking}
          className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-300 focus:border-indigo-500 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isAsking}
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs disabled:opacity-50 transition-all shrink-0"
          title="إرسال السؤال"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
        </button>
      </form>
    </div>
  );
};
