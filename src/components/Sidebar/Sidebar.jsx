import React, { useContext, useState } from 'react';
import './sidebar.css';

import { assets } from './../../assets/assets';
import { Context } from '../../context/Context';

// Sidebar component definition
const Sidebar = () => {
    // State management for sidebar extension
    const [extended, setExtended] = useState(false);
    // Destructuring required functions and data from context
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    // Function to load a prompt and update recent prompt
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Update recent prompt
        await onSent(prompt); // Trigger action related to sending the prompt
    };

    // JSX structure for sidebar component
    return (
        <div className='sidebar'>
            <div className="top">
                {/* Button to toggle sidebar extension */}
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                {/* Button to initiate a new chat */}
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {/* Show "New Chat" text when sidebar is extended */}
                    {extended ? <p>New Chat</p> : null}
                </div>
                {/* Render recent prompts when sidebar is extended */}
                {extended &&
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {/* Map through previous prompts to display them */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
            {/* Bottom section of sidebar with additional options */}
            <div className="bottom">
                {/* Help option */}
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {/* Show "Help" text when sidebar is extended */}
                    {extended ? <p>Help</p> : null}
                </div>
                {/* Activity option */}
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {/* Show "Activity" text when sidebar is extended */}
                    {extended ? <p>Activity</p> : null}
                </div>
                {/* Settings option */}
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {/* Show "Settings" text when sidebar is extended */}
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

// Export Sidebar component as default
export default Sidebar;
