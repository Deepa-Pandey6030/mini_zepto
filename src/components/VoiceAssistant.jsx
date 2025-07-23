// src/components/VoiceAssistant.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products'; 

function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);
  const { addToCart, showModal } = useCart(); // Assuming addToCart and showModal are from context

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    const speechSynthesis = window.speechSynthesis;

    if (!SpeechRecognition || !SpeechSynthesisUtterance || !speechSynthesis) {
      setResponse("Voice assistant not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setResponse("Listening...");
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      setIsListening(false);
      // Process command with LLM
      processCommandWithLLM(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setResponse(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Recognition already started or other error:", e);
        setResponse("Please wait, still processing previous command or restart.");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // --- NEW FUNCTION: Process command using an LLM ---
  const processCommandWithLLM = async (command) => {
    setResponse("Thinking...");
    speak("Thinking...");

    try {
      let chatHistory = [];
      // You can add context to the prompt for better responses
      const prompt = `You are a helpful food delivery app assistant named JHUPTO.
      User request: "${command}"

      Based on the user's request, perform an action or provide a relevant response.
      If the user asks to add an item to the cart, identify the item from the following list:
      ${products.map(p => p.name).join(', ')}.
      If an item is identified, respond with "ACTION: ADD_TO_CART: [item_name]".
      If the user asks to show their cart, respond with "ACTION: SHOW_CART".
      If the user asks to clear their cart, respond with "ACTION: CLEAR_CART".
      Otherwise, provide a friendly and concise textual response.
      `;

      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime. DO NOT put your actual key here.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await apiResponse.json();

      let llmTextResponse = "I couldn't get a clear response. Please try again.";
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        llmTextResponse = result.candidates[0].content.parts[0].text;
      }

      // Check for specific actions from LLM response
      if (llmTextResponse.startsWith("ACTION: ADD_TO_CART:")) {
        const itemName = llmTextResponse.replace("ACTION: ADD_TO_CART:", "").trim();
        const productToAdd = products.find(p => p.name.toLowerCase() === itemName.toLowerCase());
        if (productToAdd) {
          addToCart(productToAdd);
          const reply = `${productToAdd.name} has been added to your cart.`;
          setResponse(reply);
          speak(reply);
        } else {
          const reply = `I found "${itemName}" but it's not in our product list.`;
          setResponse(reply);
          speak(reply);
        }
      } else if (llmTextResponse.startsWith("ACTION: SHOW_CART")) {
        // In a real app, you'd navigate or show cart details
        const reply = "Navigating you to the cart page now.";
        setResponse(reply);
        speak(reply);
        // navigate('/cart'); // Uncomment if you import useNavigate and use it
      } else if (llmTextResponse.startsWith("ACTION: CLEAR_CART")) {
        // clearCart(); // Uncomment if you pass clearCart via context
        const reply = "Your cart has been cleared. (Mock action)";
        setResponse(reply);
        speak(reply);
      }
      else {
        // General conversational response from LLM
        setResponse(llmTextResponse);
        speak(llmTextResponse);
      }

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage = "I'm having trouble connecting right now. Please try again later.";
      setResponse(errorMessage);
      speak(errorMessage);
    }
  };
  // --- END NEW FUNCTION ---

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Voice Assistant</h2>
      <p className="text-gray-600 mb-4">
        Click the button and speak your command. Try "Add Margherita Pizza to cart" or "Hello".
      </p>
      <div className="mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`py-3 px-8 rounded-full text-white font-semibold text-lg transition-all duration-300 ease-in-out shadow-md ${
            isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-primary hover:bg-orange-600'
          }`}
        >
          {isListening ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Listening...
            </>
          ) : (
            'Start Voice Command'
          )}
        </button>
      </div>
      {transcript && (
        <p className="text-gray-700 text-md mb-2">
          <span className="font-semibold">You said:</span> "{transcript}"
        </p>
      )}
      {response && (
        <p className="text-gray-800 text-lg font-medium">
          <span className="font-semibold">Assistant:</span> "{response}"
        </p>
      )}
      <p className="text-sm text-gray-500 mt-4">
        (Note: Browser support for voice recognition varies. Microphone access required.)
      </p>
    </div>
  );
}

export default VoiceAssistant;