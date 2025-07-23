// src/pages/IngredientInfoChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products'; // Import your products data

function IngredientInfoChat() {
  const { cartItems, showModal } = useCart();
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const newUserMessage = { role: 'user', text: userInput };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      await fetchIngredientInfo(userInput);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: 'model', text: "Oops! I'm having trouble understanding right now. Please try again." },
      ]);
      showModal("Chatbot error. Please check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIngredientInfo = async (query) => {
    let currentCartInfo = "No items in cart.";
    if (cartItems.length > 0) {
      currentCartInfo = "Current items in cart: " + cartItems.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ') + ".";
    }

    const prompt = `You are an ingredient and nutrition information chatbot for JHUPTO food delivery.
    Your primary goal is to provide helpful details about food items, especially those in the user's cart, and general food-related information.
    When answering general food or health-related questions, provide neutral, factual information and explicitly state that it is general knowledge, not personalized advice.

    ${currentCartInfo}

    Here is the list of available products with their nutritional information (calories, protein, carbs, fat):
    ${products.map(p => {
      if (p.nutrition) {
        return `- ${p.name} (Category: ${p.category}, Type: ${p.type}): Calories: ${p.nutrition.calories}, Protein: ${p.nutrition.protein}g, Carbs: ${p.nutrition.carbs}g, Fat: ${p.nutrition.fat}g.`;
      }
      return `- ${p.name} (Category: ${p.category}, Type: ${p.type}): Nutritional info not available.`;
    }).join('\n')}

    User asks: "${query}"

    Based on the user's question and the provided product/cart information:
    1. If the user asks for ingredients or nutrition of a specific food item from the 'products' list:
       - Provide its nutritional information. If nutrition is null, state that info is not available for that item.
    2. If the user asks a general question about the cart (e.g., "What's in my cart?"):
       - Summarize the items currently in their cart.
    3. If the user asks a general food or health-related question (like "is palm oil good for health?") that is NOT directly about a product in the list:
       - Provide a concise, informative, and neutral answer based on general knowledge. Always add a disclaimer that this is general information and not personalized dietary or medical advice.
    4. If the item mentioned is NOT in the 'products' list and it's not a general question:
       - Politely state that you don't have information for that specific item in the store's inventory.
    5. Keep all responses friendly and concise.
    `;

    let chatHistoryForLLM = [{ role: "user", parts: [{ text: prompt }] }];

    const payload = { contents: chatHistoryForLLM };
    const apiKey = "AIzaSyCcLU4DQf-i0eIjlfNOhwV_TebIP1GC6aE";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("Gemini API Raw Result:", result); // Log the full result for debugging

      let llmResponseText = "I'm sorry, I couldn't process that request.";

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        llmResponseText = result.candidates[0].content.parts[0].text;
      } else if (result.promptFeedback && result.promptFeedback.blockReason) {
         // This block handles responses that were blocked by safety filters
         llmResponseText = `I cannot provide information on that topic due to content policy guidelines. Please ask something else. (Block reason: ${result.promptFeedback.blockReason})`;
         console.warn("Prompt blocked by safety settings:", result.promptFeedback.blockReason);
      } else if (result.error) {
          // Handle other API errors
          llmResponseText = `An API error occurred: ${result.error.message}. Please try again.`;
          console.error("Gemini API error:", result.error);
      }


      setChatHistory((prev) => [...prev, { role: 'model', text: llmResponseText }]);

    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: 'model', text: "I'm having trouble connecting to my knowledge base right now. Please try again later." },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Ingredient Info Chatbot</h1>

      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-3 border border-gray-200 rounded-lg mb-3 bg-gray-50 custom-scrollbar"
      >
        {chatHistory.length === 0 ? (
          <p className="text-center text-gray-500 italic text-sm">Ask me about ingredients or nutrition of items in your cart!</p>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-primary text-white ml-auto rounded-br-none'
                  : 'bg-gray-200 text-gray-800 mr-auto rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center justify-center p-2">
            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-2 text-gray-500 text-sm">Thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-primary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-sm"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default IngredientInfoChat;