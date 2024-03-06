// Importing required modules from the '@google/generative-ai' package
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

// Constants for model name and API key
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyCp6Jpiz9kdM5KxIRvvPQ2fs_a8m_LosVU";

// Function to run the chat with the provided prompt
async function runChat(prompt) {
  // Initializing a new instance of GoogleGenerativeAI with the provided API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  // Retrieving the generative model for the specified model name
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Configuration for generation
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Safety settings to control harmful content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Starting a chat session with the provided configuration
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  // Sending the prompt to the chat and awaiting the response
  const result = await chat.sendMessage(prompt);
  const response = result.response;

  // Logging the response text and returning it
  console.log(response.text);
  return response.text();
}

// Exporting the runChat function as default
export default runChat;
