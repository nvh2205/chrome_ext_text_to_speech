import React from 'react';

import './header.css'

const Header = () => {
    return (
        <header className='flex-header'>
            <div className='flex-logo'>
                <img src="../../text_to_speech.png" alt="" />
                <h1>Text To Speech</h1>
            </div>
        </header>
    );
};

export default Header;