import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Code, 
  Clock, 
  CheckCircle, 
  FileText,
  TestTube,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useChatbotStore } from '../store/useChatbotStore';

const Chatbot = ({ problem, userCode = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const { messages, isLoading, sendMessage, sendQuickAction, clearChat, getChatHistory } = useChatbotStore();

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history when problem changes
  useEffect(() => {
    if (problem?.id && isOpen) {
      getChatHistory(problem.id);
    }
  }, [problem?.id, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const problemContext = {
      id: problem?.id,
      title: problem?.title,
      description: problem?.description,
      examples: problem?.examples,
      testCases: problem?.testCases,
      startCode: userCode
    };

    await sendMessage(inputMessage, problemContext);
    setInputMessage('');
  };

  const handleQuickAction = async (action) => {
    const problemContext = {
      id: problem?.id,
      title: problem?.title,
      description: problem?.description,
      examples: problem?.examples,
      testCases: problem?.testCases,
      startCode: userCode
    };

    await sendQuickAction(action, problemContext, userCode);
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-base-300 p-3 rounded-lg overflow-x-auto"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-base-300 px-1 rounded">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 btn btn-primary btn-circle btn-lg shadow-lg z-50 hover:scale-110 transition-transform"
      >
        <Bot className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="card bg-base-100 shadow-2xl border border-base-300 h-full flex flex-col">
        {/* Header */}
        <div className="card-body p-4 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-sm">DSA Assistant</h3>
              <div className="badge badge-success badge-xs">Online</div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="btn btn-ghost btn-xs btn-square"
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-xs btn-square"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => handleQuickAction('hint')}
                  className="btn btn-xs btn-outline gap-1"
                  disabled={isLoading}
                >
                  <Lightbulb className="w-3 h-3" />
                  Hint
                </button>
                <button
                  onClick={() => handleQuickAction('approach')}
                  className="btn btn-xs btn-outline gap-1"
                  disabled={isLoading}
                >
                  <FileText className="w-3 h-3" />
                  Approach
                </button>
                <button
                  onClick={() => handleQuickAction('complexity')}
                  className="btn btn-xs btn-outline gap-1"
                  disabled={isLoading}
                >
                  <Clock className="w-3 h-3" />
                  Complexity
                </button>
                <button
                  onClick={() => handleQuickAction('review')}
                  className="btn btn-xs btn-outline gap-1"
                  disabled={isLoading || !userCode.trim()}
                >
                  <Code className="w-3 h-3" />
                  Review
                </button>
                <button
                  onClick={() => handleQuickAction('solution')}
                  className="btn btn-xs btn-outline gap-1"
                  disabled={isLoading}
                >
                  <CheckCircle className="w-3 h-3" />
                  Solution
                </button>
                <button
                  onClick={() => handleQuickAction('testcases')}
                  className="btn btn-xs btn-outline gap-1"
                  disabled={isLoading}
                >
                  <TestTube className="w-3 h-3" />
                  Tests
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-base-content/60 py-8">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-primary/50" />
                  <p className="text-sm">Hi! I'm your DSA assistant.</p>
                  <p className="text-xs">Ask me for hints, code reviews, or explanations!</p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-content ml-auto'
                        : message.type === 'error'
                        ? 'bg-error/10 text-error border border-error/20'
                        : 'bg-base-200 text-base-content'
                    }`}
                  >
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: formatMessage(message.content) 
                      }} 
                    />
                  </div>

                  {message.type === 'user' && (
                    <div className="avatar">
                      <div className="w-6 h-6 rounded-full bg-base-300 flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="avatar">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  <div className="bg-base-200 p-3 rounded-lg">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 pt-2 flex-shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about this problem..."
                  className="input input-bordered input-sm flex-1 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm btn-square"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="btn btn-ghost btn-xs mt-2 w-full"
                  disabled={isLoading}
                >
                  Clear Chat
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;