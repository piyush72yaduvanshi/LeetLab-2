import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export const useChatbotStore = create((set, get) => ({
  isLoading: false,
  messages: [],
  chatHistory: [],

  // Send message to chatbot
  sendMessage: async (message, problemContext) => {
    try {
      set({ isLoading: true });
      
      // Add user message to local state immediately
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date(),
      };
      
      set(state => ({
        messages: [...state.messages, userMessage]
      }));

      // Send to backend
      const res = await axiosInstance.post("/chatbot/chat", {
        message,
        problemContext
      });

      // Add bot response to local state
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: res.data.response,
        timestamp: new Date(),
      };

      set(state => ({
        messages: [...state.messages, botMessage]
      }));

      // Optionally save to database
      if (problemContext?.id) {
        await axiosInstance.post("/chatbot/save", {
          problemId: problemContext.id,
          message,
          response: res.data.response,
          messageType: 'general'
        });
      }

    } catch (error) {
      console.log("Error sending message to chatbot", error);
      toast.error("Error communicating with AI assistant");
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 2,
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      
      set(state => ({
        messages: [...state.messages, errorMessage]
      }));
    } finally {
      set({ isLoading: false });
    }
  },

  // Get chat history for a problem
  getChatHistory: async (problemId) => {
    try {
      const res = await axiosInstance.get(`/chatbot/history/${problemId}`);
      
      // Convert to message format
      const messages = res.data.chatHistory.flatMap(chat => [
        {
          id: `${chat.id}-user`,
          type: 'user',
          content: chat.message,
          timestamp: new Date(chat.createdAt),
        },
        {
          id: `${chat.id}-bot`,
          type: 'bot',
          content: chat.response,
          timestamp: new Date(chat.createdAt),
        }
      ]);

      set({ messages, chatHistory: res.data.chatHistory });
    } catch (error) {
      console.log("Error getting chat history", error);
      // Don't show error toast for history, just log it
    }
  },

  // Clear current chat
  clearChat: () => {
    set({ messages: [], chatHistory: [] });
  },

  // Add quick action messages
  sendQuickAction: async (action, problemContext, userCode = '') => {
    const quickMessages = {
      hint: "Can you give me a hint for solving this problem?",
      approach: "What are the different approaches to solve this problem?",
      complexity: "Can you explain the time and space complexity of the optimal solution?",
      review: `Can you review my code and suggest improvements?\n\n\`\`\`\n${userCode}\n\`\`\``,
      solution: "Can you provide the optimal solution with explanation?",
      testcases: "Can you help me create additional test cases for edge cases?"
    };

    const message = quickMessages[action];
    if (message) {
      await get().sendMessage(message, problemContext);
    }
  }
}));