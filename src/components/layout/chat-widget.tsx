"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, X, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CustomLink } from "@/components/mdx/preview-link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  id: "welcome-message",
  role: "assistant",
  content:
    "Hey, I'm Ian. I'm a full-stack developer currently studying at Holy Angel University. What are you working on, or what would you like to know about my experience?",
};

const MAX_CHARS = 500;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setInputValue("");
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch AI response");
      }

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "" },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg,
            ),
          );
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Looks like my server connection just dropped. Even AI needs a break sometimes. Give it a moment and try asking again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex fixed bottom-6 right-6 h-12 px-5 rounded-full z-50 transition-all hover:-translate-y-1 items-center gap-2.5 bg-foreground text-background font-medium hover:bg-foreground/90 border border-border group overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      >
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
          <div className="relative h-full w-8 bg-background/20" />
        </div>
        <Bot className="h-5 w-5 text-background" />
        <span>Chat with AI</span>
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 lg:inset-auto lg:bottom-6 lg:right-6 lg:w-[400px] lg:rounded-2xl lg:border bg-background lg:bg-background/90 lg:backdrop-blur-sm lg:supports-[backdrop-filter]:bg-background/80 p-4 lg:p-0 shadow-2xl transition-all z-50 flex flex-col h-[100dvh] lg:h-[600px] overscroll-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4 pt-4 px-4 mt-2 lg:mt-0 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage
              src="/about/ian-macabulos-2026.webp"
              alt="Ian Macabulos"
              className="object-cover"
            />
            <AvatarFallback className="bg-foreground/10 text-foreground text-xs font-medium">
              IM
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm leading-none mb-1 text-foreground">
              Ian Macabulos
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-50"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-foreground"></span>
              </span>
              <p className="text-[11px] text-muted-foreground leading-none">
                Online
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
        >
          <X className="h-5 w-5 lg:h-4 lg:w-4" />
        </Button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`inline-block rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-foreground text-background rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm border border-border/50"
              }`}
            >
              <div
                className="prose prose-sm dark:prose-invert max-w-none break-words
                  prose-p:leading-relaxed prose-p:my-1 
                  prose-a:text-foreground hover:prose-a:text-foreground/80 prose-a:underline prose-a:underline-offset-4 prose-a:font-semibold transition-colors
                  prose-code:bg-background/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-background/50 prose-pre:p-3 prose-pre:rounded-lg prose-pre:border prose-pre:border-border/50"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, href, children, ...props }) => {
                      if (!href) return <a {...props}>{children}</a>;
                      // Use CustomLink instead of PreviewLink
                      return <CustomLink href={href}>{children}</CustomLink>;
                    },
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-muted border border-border/50 text-muted-foreground rounded-2xl rounded-bl-sm px-4 py-3.5 max-w-[85%] flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-1 shrink-0 pt-3 pb-4 px-4 border-t border-border/50 pb-safe bg-background/50"
      >
        <div className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="pr-12 py-6 rounded-xl bg-muted/30 border-border focus-visible:border-foreground focus-visible:ring-0 transition-all text-base lg:text-sm"
            maxLength={MAX_CHARS}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg transition-all bg-foreground text-background hover:bg-foreground/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer Text & Character Counter */}
        <div className="flex justify-between items-center px-1 pt-1">
          <span className="text-[10px] text-muted-foreground/70 tracking-wide">
            AI-generated. May contain inaccuracies.
          </span>
          <span
            className={`text-[10px] font-medium transition-colors ${inputValue.length >= MAX_CHARS ? "text-destructive" : "text-muted-foreground/70"}`}
          >
            {inputValue.length} / {MAX_CHARS}
          </span>
        </div>
      </form>
    </div>
  );
}
