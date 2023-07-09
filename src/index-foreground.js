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

    // const headerHttpPococy = document.createElement('meta');
    // headerHttpPococy.setAttribute("http-equiv","Content-Security-Policy");
    // headerHttpPococy.setAttribute("content","default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;")
    // // const tagPermission = `<meta http-equiv="Content-Security-Policy" content="">`
    // document.head.appendChild(headerHttpPococy)
    document.getElementsByTagName('head')[0].innerHTML += `<meta http-equiv="Content-Security-Policy" content="media-src https://tts-app.site/static/out_audio ;">   `;
    // const metaCspTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    // // Retrieve the current value of the content attribute
    // const currentCsp = metaCspTag.getAttribute('content');

    // // Concatenate the new value to the current value
    // const newCsp = currentCsp + ' ; media-src https://tts-app.site/*';

    // // Set the content attribute to the new value
    // metaCspTag.setAttribute('content', newCsp);
    // document.head.appendChild(metaCspTag);
    appContainer.setAttribute('id', 'tts-app-id');
    document.body.appendChild(appContainer)

    appContainer.attachShadow({mode:'open'})
    const target = document.getElementById('tts-app-id').shadowRoot;
    const reactRoot = document.createElement('div');
    reactRoot.setAttribute('id', 'react-root');
    target.appendChild(reactRoot);

    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(target)
    root.render(<Provider store={store}><Foreground /></Provider>);
}

init();


// import React from 'react';
// import { render } from 'react-dom';

// import Foreground from './components/Foreground';
// import store from './redux/store';
// import { Provider } from 'react-redux'

// render(<Provider store={store}><Foreground /></Provider>, document.querySelector('#foreground'));