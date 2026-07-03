'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/i18n/translations';

type Msg = { role: 'user' | 'assistant'; content: string };

// Localized UI labels for the four supported site languages.
const UI: Record<Language, {
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  send: string;
  error: string;
  open: string;
}> = {
  en: {
    title: 'Investment Assistant',
    subtitle: 'Ask about Bekabad investing',
    greeting: 'Hello! I can answer questions about the Bekabad SEZ, Oybek Free Trade Zone, tax incentives, and how to invest. How can I help?',
    placeholder: 'Type your question…',
    send: 'Send',
    error: 'Sorry, something went wrong. Please try again or use the Contact page.',
    open: 'Ask the assistant',
  },
  ru: {
    title: 'Инвестиционный ассистент',
    subtitle: 'Вопросы об инвестициях в Бекабад',
    greeting: 'Здравствуйте! Я отвечу на вопросы о СЭЗ Бекабад, зоне свободной торговли «Ойбек», налоговых льготах и порядке инвестирования. Чем помочь?',
    placeholder: 'Введите ваш вопрос…',
    send: 'Отправить',
    error: 'Извините, произошла ошибка. Попробуйте ещё раз или напишите через страницу «Контакты».',
    open: 'Спросить ассистента',
  },
  uz: {
    title: 'Investitsiya yordamchisi',
    subtitle: 'Bekobodga investitsiya haqida savollar',
    greeting: 'Assalomu alaykum! Bekobod MIZ, "Oybek" erkin savdo zonasi, soliq imtiyozlari va investitsiya tartibi bo‘yicha savollarga javob beraman. Qanday yordam bera olaman?',
    placeholder: 'Savolingizni yozing…',
    send: 'Yuborish',
    error: 'Kechirasiz, xatolik yuz berdi. Qayta urinib ko‘ring yoki "Kontaktlar" sahifasidan foydalaning.',
    open: 'Yordamchidan so‘rash',
  },
  zh: {
    title: '投资助手',
    subtitle: '咨询别卡巴德投资事宜',
    greeting: '您好！我可以解答关于别卡巴德经济特区、奥伊别克自由贸易区、税收优惠以及投资流程的问题。请问有什么可以帮您？',
    placeholder: '请输入您的问题…',
    send: '发送',
    error: '抱歉，出现了错误。请重试或使用联系页面。',
    open: '咨询助手',
  },
};

export default function ChatAssistant() {
  const { language } = useLanguage();
  const ui = UI[language] ?? UI.en;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: ui.error }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: ui.error }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // Messages shown in the panel: a greeting plus the live conversation.
  const shown: Msg[] = [{ role: 'assistant', content: ui.greeting }, ...messages];

  return (
    <>
      {/* Floating launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={ui.open}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#1a2744] px-5 py-3.5 text-white shadow-xl transition-transform hover:scale-105 hover:bg-[#243660]"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.83l-5 1.66 1.66-4.34A8.66 8.66 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="hidden text-sm font-semibold sm:inline">{ui.open}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[560px] max-h-[calc(100vh-2.5rem)] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-br from-[#1a2744] to-[#243660] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.83l-5 1.66 1.66-4.34A8.66 8.66 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">{ui.title}</p>
                <p className="text-xs text-white/70 leading-tight">{ui.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {shown.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-[#1a2744] text-white'
                      : 'rounded-bl-md border border-gray-200 bg-white text-gray-800'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={ui.placeholder}
              className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#4a9c4e] focus:ring-1 focus:ring-[#4a9c4e]"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label={ui.send}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4a9c4e] text-white transition-colors hover:bg-[#3d8341] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
