import React, { createContext, useState } from 'react';
import runChat from "../config/gemini"; // Importing the function to interact with Gemini API

// Creating a context object
export const Context = createContext({});

// ContextProvider component definition
const ContextProvider = (props) => {
    // State variables for managing input, recent prompt, previous prompts, result display, loading state, and result data
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState(""); // State variable to hold the most recent prompt
    const [prevPrompts, setPrevPrompts] = useState([]); // State variable to hold previous prompts
    const [showResult, setShowResult] = useState(false); // State variable to control result display
    const [loading, setLoading] = useState(false); // State variable to manage loading state
    const [resultData, setResultData] = useState(""); // State variable to hold result data

    // Function to delay the display of result text
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    // Function to reset states for a new chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    // Function to handle sending prompts and receiving responses
    const onSent = async (prompt) => {
        setResultData(""); // Clear previous result data
        setLoading(true); // Set loading state to true
        setShowResult(true); // Show result section
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt); // Send provided prompt to Gemini API
            setRecentPrompt(prompt); // Update recent prompt
        } else {
            setPrevPrompts((prev) => [...prev, input]); // Add input to previous prompts
            setRecentPrompt(input); // Update recent prompt
            response = await runChat(input); // Send input to Gemini API
        }
        // Process response for formatting
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 === 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        // Display response with delayed word-by-word animation
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false); // Set loading state to false
        setInput(""); // Clear input field
    };

    // Context value object containing state variables and functions
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt, // Corrected spelling of recentPrompt
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    // Providing context value to children components
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
