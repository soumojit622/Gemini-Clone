import React from 'react'; // Importing React library for defining React components
import Sidebar from './components/Sidebar/Sidebar'; // Importing Sidebar component
import Main from './components/Main/Main'; // Importing Main component

// Definition of the root component of the application
const App = () => {
  return (
    <>
      <Sidebar/> {/* Rendering Sidebar component */}
      <Main/> {/* Rendering Main component */}
    </>
  );
}

export default App; // Exporting the App component as the default export
