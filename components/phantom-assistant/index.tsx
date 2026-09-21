"use client";

import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, MinusIcon, SendIcon } from "@/components/icons";
import { greeting, suggestedQuestions } from "@/lib/chatbot/knowledge-base";
import { cx } from "@/lib/utils";
import type { ChatMessage } from "./types";

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function PhantomAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", content: greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { id: makeId(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong.");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "assistant", content: data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          isError: true,
          content:
            "Phantom Assistant couldn't reach the server. Please check your connection and try again, or reach CodePhantom via the Contact page.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
          setIsMinimized(false);
        }}
        aria-label={isOpen ? "Close Phantom Assistant" : "Open Phantom Assistant"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cx(
          "fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-phantom-gradient text-white shadow-glow transition-transform duration-300 hover:scale-105 focus-visible:outline-none md:bottom-8 md:right-8",
          isOpen && "rotate-0"
        )}
      >
        {isOpen ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Phantom Assistant chat"
          className={cx(
            "fixed z-[59] flex flex-col overflow-hidden border border-metallic-silver/15 bg-midnight-navy shadow-2xl transition-all duration-300",
            "inset-0 md:inset-auto md:bottom-24 md:right-8 md:h-[34rem] md:w-[23rem] md:rounded-2xl",
            isMinimized && "md:h-14"
          )}
        >
          <div className="flex items-center justify-between border-b border-metallic-silver/10 bg-surface/80 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-phantom-gradient/20 text-cyber-blue">
                <ChatIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ghost-white">
                  Phantom Assistant
                </p>
                <p className="text-xs text-muted-text">CodePhantom Technologies</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized((v) => !v)}
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                className="hidden h-8 w-8 items-center justify-center rounded-full text-muted-text hover:bg-white/5 hover:text-ghost-white md:flex"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-text hover:bg-white/5 hover:text-ghost-white"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cx("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cx(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-phantom-gradient text-white rounded-br-sm"
                          : m.isError
                          ? "border border-red-500/30 bg-red-500/10 text-red-200 rounded-bl-sm"
                          : "glass-panel text-ghost-white rounded-bl-sm"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="glass-panel flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-4 py-3">
                      <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-cyber-blue" />
                      <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-cyber-blue [animation-delay:0.15s]" />
                      <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-cyber-blue [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}

                {messages.length <= 1 && !isLoading && (
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-text">
                      Try asking
                    </p>
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-xl border border-metallic-silver/15 px-3 py-2 text-left text-xs text-metallic-silver transition-colors hover:border-cyber-blue/40 hover:text-ghost-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 border-t border-metallic-silver/10 bg-surface/60 p-3"
              >
                <label htmlFor="phantom-assistant-input" className="sr-only">
                  Message Phantom Assistant
                </label>
                <input
                  id="phantom-assistant-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about CodePhantom..."
                  maxLength={500}
                  className="flex-1 rounded-full border border-metallic-silver/15 bg-phantom-black/60 px-4 py-2.5 text-sm text-ghost-white placeholder:text-muted-text/70 focus-visible:outline-none focus-visible:border-cyber-blue"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-phantom-gradient text-white disabled:opacity-40"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
