import React from 'react'; // Importing React library
import ReactDOM from 'react-dom/client'; // Importing ReactDOM client-side library
import App from './App.jsx'; // Importing the main App component
import './index.css'; // Importing CSS file for styling
import ContextProvider from './context/Context.jsx'; // Importing the ContextProvider component

const rootElement = document.getElementById('root'); // Getting the root element from the DOM

if (rootElement) { // Checking if the root element exists
  // Rendering the App component wrapped in the ContextProvider component using ReactDOM.createRoot
  ReactDOM.createRoot(rootElement).render(
    <ContextProvider>
      <App />
    </ContextProvider>
  );
} else {
  // Handle the case where the element is not found (e.g., display an error message)
  console.error('Element with ID "root" not found in the DOM');
}
