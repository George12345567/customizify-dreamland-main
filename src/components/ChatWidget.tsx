import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { gsap } from 'gsap';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can we help you today?',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Animation for opening/closing chat
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        chatBoxRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(chatBoxRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  // Animation for chat button
  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        y: -5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate support response after 1 second
    setTimeout(() => {
      const supportResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message. Our team will get back to you soon.',
        sender: 'support',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-roma-purple text-white rounded-full p-4 shadow-lg hover:bg-roma-purple/90 transition-all duration-300 hover:shadow-xl"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        className={`fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${isMinimized ? 'h-12' : 'h-96'}`}
      >
        {/* Chat Header */}
        <div className="bg-roma-purple text-white p-3 flex justify-between items-center">
          <h3 className="font-medium">Chat with Us</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        {!isMinimized && (
          <>
            <div className="h-64 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-roma-purple text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-roma-purple/30"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-roma-purple text-white p-2 rounded-r-lg hover:bg-roma-purple/90 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatWidget; 