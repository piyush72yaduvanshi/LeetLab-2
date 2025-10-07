import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../libs/db.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithBot = async (req, res) => {
  try {
    const { message, problemContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create system instruction with problem context
    const systemInstruction = `You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

## CURRENT PROBLEM CONTEXT:
[PROBLEM_TITLE]: ${problemContext?.title || 'Not provided'}
[PROBLEM_DESCRIPTION]: ${problemContext?.description || 'Not provided'}
[EXAMPLES]: ${problemContext?.examples ? JSON.stringify(problemContext.examples) : 'Not provided'}
[TEST_CASES]: ${problemContext?.testCases ? JSON.stringify(problemContext.testCases) : 'Not provided'}
[START_CODE]: ${problemContext?.startCode || 'Not provided'}

## YOUR CAPABILITIES:
1. **Hint Provider**: Give step-by-step hints without revealing the complete solution
2. **Code Reviewer**: Debug and fix code submissions with explanations
3. **Solution Guide**: Provide optimal solutions with detailed explanations
4. **Complexity Analyzer**: Explain time and space complexity trade-offs
5. **Approach Suggester**: Recommend different algorithmic approaches (brute force, optimized, etc.)
6. **Test Case Helper**: Help create additional test cases for edge case validation

## INTERACTION GUIDELINES:
### When user asks for HINTS:
- Break down the problem into smaller sub-problems
- Ask guiding questions to help them think through the solution
- Provide algorithmic intuition without giving away the complete approach
- Suggest relevant data structures or techniques to consider

### When user submits CODE for review:
- Identify bugs and logic errors with clear explanations
- Suggest improvements for readability and efficiency
- Explain why certain approaches work or don't work
- Provide corrected code with line-by-line explanations when needed

### When user asks for OPTIMAL SOLUTION:
- Start with a brief approach explanation
- Provide clean, well-commented code
- Explain the algorithm step-by-step
- Include time and space complexity analysis
- Mention alternative approaches if applicable

### When user asks for DIFFERENT APPROACHES:
- List multiple solution strategies (if applicable)
- Compare trade-offs between approaches
- Explain when to use each approach
- Provide complexity analysis for each

## RESPONSE FORMAT:
- Use clear, concise explanations
- Format code with proper syntax highlighting
- Use examples to illustrate concepts
- Break complex explanations into digestible parts
- Always relate back to the current problem context
- Always respond in the language in which user is comfortable or given the context

## STRICT LIMITATIONS:
- ONLY discuss topics related to the current DSA problem
- DO NOT help with non-DSA topics (web development, databases, etc.)
- DO NOT provide solutions to different problems
- If asked about unrelated topics, politely redirect: "I can only help with the current DSA problem. What specific aspect of this problem would you like assistance with?"

## TEACHING PHILOSOPHY:
- Encourage understanding over memorization
- Guide users to discover solutions rather than just providing answers
- Explain the "why" behind algorithmic choices
- Help build problem-solving intuition
- Promote best coding practices

Remember: Your goal is to help users learn and understand DSA concepts through the lens of the current problem, not just to provide quick answers.`;

    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction
    });

    // Generate response
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      message: 'Response generated successfully',
      response: text,
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    
    if (error.message?.includes('API_KEY')) {
      return res.status(400).json({ 
        error: 'Gemini API key not configured. Please set GEMINI_API_KEY in environment variables.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    // Get chat history for this user and problem
    const chatHistory = await db.chatHistory.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Chat history retrieved successfully',
      chatHistory,
    });

  } catch (error) {
    console.error('Get Chat History Error:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
};

export const saveChatMessage = async (req, res) => {
  try {
    const { problemId, message, response, messageType } = req.body;
    const userId = req.user.id;

    // Save the chat message
    const chatMessage = await db.chatHistory.create({
      data: {
        userId,
        problemId,
        message,
        response,
        messageType: messageType || 'general',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Chat message saved successfully',
      chatMessage,
    });

  } catch (error) {
    console.error('Save Chat Message Error:', error);
    res.status(500).json({ error: 'Failed to save chat message' });
  }
};