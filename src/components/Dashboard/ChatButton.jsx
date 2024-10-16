"use client"


import { useState, useEffect } from 'react';

const ChatButton = () => {
    const [chatVisible, setChatVisible] = useState(false);

    const loadVoiceflowChat = () => {
        if (!window.voiceflow) {
            (function (d, t) {
                const v = d.createElement(t),
                    s = d.getElementsByTagName(t)[0];
                v.onload = function () {
                    window.voiceflow.chat.load({
                        verify: { projectID: '670ec6be0799867cf9b2abdb' },
                        url: 'https://general-runtime.voiceflow.com',
                        versionID: 'production'
                    });
                };
                v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
                v.type = "text/javascript";
                s.parentNode.insertBefore(v, s);
            })(document, 'script');
        }
    };

    const handleClick = () => {
        setChatVisible(!chatVisible);
        if (!chatVisible) {
            loadVoiceflowChat();
        }
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#68D391',
                    color: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                onClick={handleClick}
            >
                💬
            </div>
        </>
    );
};

export default ChatButton;
