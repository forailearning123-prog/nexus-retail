"use client";

import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't understand that. Please contact support.";
      const lowerInput = userMsg.toLowerCase();
      
      if (lowerInput.includes("return") || lowerInput.includes("refund")) {
        botResponse = "We offer a 7-day return policy. You can initiate a return from the Returns portal in the footer.";
      } else if (lowerInput.includes("shipping") || lowerInput.includes("delivery")) {
        botResponse = "We offer standard (3-5 days) and express (1-2 days) shipping. Free shipping on orders over $50!";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = "Hello there! Let me know if you have any questions about our products.";
      }

      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? "close" : "chat"}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-surface border border-outline-variant rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden">
          <div className="bg-primary text-on-primary p-4 flex items-center gap-2">
            <span className="material-symbols-outlined">support_agent</span>
            <span className="font-headline-sm text-lg font-bold">NexusRetail Support</span>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-surface-container-lowest">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user" ? "bg-primary text-on-primary rounded-tr-sm" : "bg-surface-container-high text-on-surface rounded-tl-sm"}`}>
                  <p className="text-body-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-outline-variant bg-surface flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded-full text-body-sm focus:ring-1 focus:ring-primary outline-none"
            />
            <button type="submit" className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
