// src/components/VoiceAssistant.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products'; // Assuming products data is available

function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);
  const { addToCart, showModal } = useCart();

  useEffect(() => {
    // Check for Web Speech API compatibility
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
    const speechSynthesis = window.speechSynthesis;

    if (!SpeechRecognition || !SpeechSynthesisUtterance || !speechSynthesis) {
      setResponse("Voice assistant not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Listen for a single phrase
    recognition.interimResults = false; // Only return final results
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setResponse("Listening...");
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      processCommand(currentTranscript);
      setIsListening(false);
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
  }, []); // Empty dependency array means this runs once on mount

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

  const processCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let assistantReply = "I'm sorry, I'm not sure how to help with that.";

    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      assistantReply = "Hello! How can I help you with your order?";
    } else if (lowerCommand.includes('add to cart')) {
      const productNameMatch = products.find(p => lowerCommand.includes(p.name.toLowerCase()));
      if (productNameMatch) {
        addToCart(productNameMatch);
        assistantReply = `${productNameMatch.name} added to your cart.`;
      } else {
        assistantReply = "Which item would you like to add to the cart?";
      }
    } else if (lowerCommand.includes('show my cart')) {
      assistantReply = "I can show you your cart. Please go to the cart page.";
    } else if (lowerCommand.includes('what are my options')) {
      assistantReply = "You can ask me to add items to your cart, or tell me to show your cart.";
    } else if (lowerCommand.includes('thank you') || lowerCommand.includes('thanks')) {
      assistantReply = "You're welcome! Is there anything else?";
    } else if (lowerCommand.includes('clear cart')) {
      // Assuming you have a clearCart function in CartContext
      // clearCart(); // Uncomment if you add clearCart to context and pass it here
      assistantReply = "Your cart has been cleared. (This is a mock action)";
    } else if (lowerCommand.includes('place order')) {
      assistantReply = "To place your order, please proceed to the cart page and click 'Place Order'.";
    }

    setResponse(assistantReply);
    speak(assistantReply);
  };

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