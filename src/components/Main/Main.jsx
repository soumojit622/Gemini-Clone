import React, { useContext } from 'react';
import './Main.css'; // Importing CSS file assuming it exists in the same directory
import { assets } from '../../assets/assets'; // Importing assets object assuming it's exported correctly
import { Context } from '../../context/Context';

// Main component definition
const Main = () => {
    // Destructuring required functions and data from context
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    // JSX structure for main component
    return (
        <div className='main'>
            {/* Navigation bar */}
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            {/* Main content area */}
            <div className="main-container">
                {/* Render greeting and options if result is not shown */}
                {!showResult
                    ? <>
                        {/* Greeting message */}
                        <div className="greet">
                            <p><span>Hello, family.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        {/* Options/cards for different prompts */}
                        <div className="cards">
                            {/* Card for suggesting beautiful places */}
                            <div className="card">
                                <p>Suggests beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="Compass Icon" />
                            </div>
                            {/* Card for summarizing a concept */}
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="Light Bulb Icon" />
                            </div>
                            {/* Card for brainstorming team bonding activities */}
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="Message Icon" />
                            </div>
                            {/* Card for improving code readability */}
                            <div className="card">
                                <p>Improve readability of the following code</p>
                                <img src={assets.code_icon} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                    : // Render result if showResult is true
                    <div className='result'>
                        {/* Result title */}
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        {/* Result data with loading animation if loading */}
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? // Show loader if data is loading
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : // Show result data
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }
                {/* Bottom section with search box and information */}
                <div className="main-bottom">
                    {/* Search box */}
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        {/* Icons for gallery, microphone, and send */}
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Microphone Icon" />
                            {/* Send icon active only when input is not empty */}
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" /> : null}
                        </div>
                    </div>
                    {/* Information about Gemini and privacy */}
                    <p className="bottom-info">
                        Gemini may display inaccurate information, including about people, so double-check its responses.
                        <a href="https://support.google.com/gemini/answer/13594961?visit_id=638453200336802822-3687608632&p=privacy_notice&rd=1#privacy_notice">Your privacy and Gemini apps</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Export Main component as default
export default Main;
