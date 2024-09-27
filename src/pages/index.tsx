import React, { useState, useRef, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Copy, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const CustomModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const generateRandomString = (length: number) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: messages.length,
        content: inputValue,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);

      // 模拟AI回复
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 1,
          content: generateRandomString(50), // 生成50个随机字符
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }, 1000);

      setInputValue('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-800/60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 flex h-[90vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-2xl bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <button className="mr-2">←</button>
                <h2 className="text-lg font-semibold">Ask AI</h2>
                <span className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs">
                  Q&A Beta
                </span>
              </div>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            {/* Chat Content */}
            <div className="grow overflow-y-auto pb-4">
              <div className="flex flex-col space-y-4">
                {messages.map((message, index) => (
                  <React.Fragment key={message.id}>
                    {index === 0 ||
                    message.timestamp.toDateString() !==
                      messages[index - 1].timestamp.toDateString() ? (
                      <div className="text-center text-sm text-gray-500">
                        {message.timestamp.toLocaleDateString()}
                      </div>
                    ) : null}
                    <div
                      className={`flex ${message.isUser ? 'justify-end' : 'items-start space-x-4'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg ${message.isUser ? 'bg-gray-100' : 'border border-gray-300 shadow'} p-3`}
                      >
                        <div>{message.content}</div>
                      </div>
                      {!message.isUser && (
                        <div className="mb-2 flex gap-2 self-end">
                          <button className="text-gray-400 hover:text-gray-600">
                            <ThumbsUp size={18} />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <ThumbsDown size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} /> {/* 添加这个空的div作为滚动目标 */}
              </div>
            </div>

            {/* Search Results */}
            <div className="mb-4">
              <div className="mb-2 text-sm text-gray-500">3 pages found</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="mr-2">🚙</span>
                  <span>Workback plan @Yesterday</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌟</span>
                  <span>Website weekly sync @Last Friday</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🚀</span>
                  <span className="">Product development process</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-4 flex space-x-2">
              <button className="flex items-center rounded-3xl border border-gray-300 px-5 py-2">
                <Copy size={16} className="mr-1" />
                Copy
              </button>
              <button className="flex items-center rounded-3xl border border-gray-300 px-5 py-2">
                <RotateCw size={16} className="mr-1" />
                Try again
              </button>
            </div>

            {/* Input */}
            <div className="relative h-12">
              <input
                type="text"
                placeholder="Ask a question..."
                className="h-full w-full rounded-3xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-100 p-1 text-gray-400"
                onClick={handleSendMessage}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12L12 7M12 7L17 12M12 7V18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CustomModal;
