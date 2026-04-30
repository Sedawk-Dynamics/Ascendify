"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickReplies = [
  "What courses do you offer?",
  "How much do courses cost?",
  "How do I enroll?",
  "Talk to a counsellor",
];

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase();

  if (
    lower.includes("course") ||
    lower.includes("program") ||
    lower.includes("offer")
  ) {
    return "We offer industry-led live cohorts in:\n\n• Certified Financial Modeling & Business Valuations\n• Investment Banking & Equity Research\n• Management Consulting & Strategy\n• Corporate Finance & M&A\n• CFA Level 1 Preparation\n• Financial Planning & Wealth Management\n\nWould you like to know more about any specific course?";
  }
  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("fee") ||
    lower.includes("how much")
  ) {
    return "Our courses range from ₹14,999 to ₹24,999 (incl. all taxes). Each course includes live project-based learning, mentorship, and certification.\n\nWould you like details on a specific course?";
  }
  if (
    lower.includes("enroll") ||
    lower.includes("join") ||
    lower.includes("register") ||
    lower.includes("sign up")
  ) {
    return "You can enroll in 2 easy steps:\n\n1. Visit our Courses page and click 'Pay & Enroll'\n2. Complete the payment via Razorpay\n\nOr click 'Talk to a counsellor' and we'll guide you personally!";
  }
  if (
    lower.includes("counsellor") ||
    lower.includes("talk") ||
    lower.includes("contact") ||
    lower.includes("call")
  ) {
    return "You can reach our team at:\n\n📧 Email: info@ascendify.in\n📞 WhatsApp: Click the green button below\n\nOr fill out the 'Talk with our team' form on our homepage and we'll get back to you within 24 hours!";
  }
  if (
    lower.includes("placement") ||
    lower.includes("job") ||
    lower.includes("career")
  ) {
    return "We have a 95% placement rate! Our students are placed at top firms. We provide:\n\n• Interview-focused training\n• Resume & portfolio building\n• Corporate connect partnerships\n• Placement assistance with 35+ hiring partners";
  }
  if (
    lower.includes("duration") ||
    lower.includes("long") ||
    lower.includes("month") ||
    lower.includes("week")
  ) {
    return "Our courses range from 3 to 6 months of live project-based learning. Most popular courses are 3-4 months long with weekend & evening batches available.";
  }
  if (
    lower.includes("hello") ||
    lower.includes("hi") ||
    lower.includes("hey")
  ) {
    return "Hello! Welcome to Ascendify. I'm here to help you with information about our finance & consulting courses. What would you like to know?";
  }
  if (lower.includes("thank")) {
    return "You're welcome! Feel free to ask if you have any other questions. We're here to help you build your dream career in finance!";
  }

  return "I appreciate your question! Unfortunately, I don't have information on that topic right now.\n\nYou can continue this conversation on WhatsApp where our team can assist you personally! 👇\n\n[WHATSAPP_CTA]";
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm shadow-sm px-5 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm the Ascendify Assistant. I can help you with course information, pricing, enrollment, and more.\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply: Message = { role: "bot", text: getBotReply(text) };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-[200px] right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[calc(100vh-220px)] bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]">
      {/* Header */}
      <div className="relative overflow-hidden shrink-0">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-[15px] tracking-tight">
                Ascendify Assistant
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                <p className="text-white/60 text-xs">Online now</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-[#FAFBFD] min-h-[250px] max-h-[320px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "bot" && (
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center mr-2 mt-1 shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 text-[13px] leading-[1.7] whitespace-pre-line ${
                msg.role === "user"
                  ? "gradient-primary text-white rounded-2xl rounded-br-sm shadow-md"
                  : "bg-white text-gray-700 border border-gray-100 rounded-2xl rounded-bl-sm shadow-sm"
              }`}
            >
              {msg.text.includes("[WHATSAPP_CTA]") ? (
                <>
                  {msg.text.replace("[WHATSAPP_CTA]", "")}
                  <a
                    href="https://wa.me/918697009762"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1ebe57] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                </>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-5 py-3 flex flex-wrap gap-2 bg-[#FAFBFD] border-t border-gray-50">
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => sendMessage(qr)}
              className="text-xs px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-indigo hover:text-indigo hover:shadow-sm transition-all cursor-pointer font-medium"
            >
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-4 border-t border-gray-100 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-indigo/25 transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Send size={16} className="translate-x-[1px]" />
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-2.5">
          Powered by Ascendify
        </p>
      </div>
    </div>
  );
}

export default function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* Chatbot button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
            chatOpen
              ? "bg-gray-700 hover:bg-gray-800"
              : "bg-orange-500 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
          }`}
          title="Chat with us"
        >
          {chatOpen ? <X size={22} /> : <Bot size={26} />}
        </button>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/918697009762"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Logo2 */}
        <div className="hover:scale-105 transition-all duration-300 cursor-pointer">
          <Image
            src="/logo2.jpg"
            alt="BGTFS"
            width={66}
            height={38}
            className="object-contain w-auto h-auto rounded-[3px]"
          />
        </div>
      </div>
    </>
  );
}
