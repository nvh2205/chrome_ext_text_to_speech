import React from 'react';
import { render } from 'react-dom';
import { createRoot } from "react-dom/client";
import Foreground from './components/Foreground';
import store from './redux/store';
import { Provider } from 'react-redux'

function init() {
    const appContainer = document.createElement('div')
    const header = document.createElement('meta');
    header.setAttribute('charset', 'utf8');
    document.head.appendChild(header)
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    root.render(<Provider store={store}><Foreground /></Provider>);
}

init();


// import React from 'react';
// import { render } from 'react-dom';

// import Foreground from './components/Foreground';
// import store from './redux/store';
// import { Provider } from 'react-redux'

// render(<Provider store={store}><Foreground /></Provider>, document.querySelector('#foreground'));