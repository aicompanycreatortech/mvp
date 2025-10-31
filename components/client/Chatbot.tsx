"use client";

import { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  onSearch: (query: string) => void;
}

export default function Chatbot({ onSearch }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hola, soy tu asistente de búsqueda. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate bot response
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content:
        "Perfecto, entiendo que buscas soluciones relacionadas con tu consulta. Déjame buscar los casos de uso más relevantes para ti...",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setLoading(false);

    // Trigger search
    onSearch(input);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-lg">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Asistente de Búsqueda</h3>
            <p className="text-xs text-gray-500">En línea</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "bot" && (
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
            )}
            <div
              className={`max-w-[75%] min-w-0 rounded-xl p-4 ${
                msg.type === "user"
                  ? "bg-violet-500/20 text-gray-900 rounded-tr-sm"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-400" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-violet-400" />
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-1000 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-1000 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-1000 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-100">
        <div className="flex items-center gap-2">
          <TextField.Root
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escribe tu necesidad en lenguaje natural..."
            className="flex-1"
            size="3"
          />
          <Button size="3" onClick={handleSend} disabled={!input.trim() || loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

