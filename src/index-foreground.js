import React from 'react';
import { render } from 'react-dom';
import { createRoot } from "react-dom/client";
import Foreground from './components/Foreground';
import store from './redux/store';
import { Provider } from 'react-redux'
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import * as ReactDOM from "react-dom/client";
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@mui/styles';
import {
    createTheme,
    ThemeProvider
  } from "@mui/material/styles";

function init() {
    const appContainer = document.createElement('div')
    const header = document.createElement('meta');
    header.setAttribute('charset', 'utf8');
    document.head.appendChild(header)


    appContainer.setAttribute('id', 'tts-app-id');

    document.body.appendChild(appContainer)
    const shadowContainer = appContainer.attachShadow({ mode: "open" });
    const emotionRoot = document.createElement("style");
    const shadowRootElement = document.createElement("div");
    shadowContainer.appendChild(emotionRoot);
    shadowContainer.appendChild(shadowRootElement);
    
    const cache = createCache({
    key: "css",
    prepend: true,
    container: emotionRoot
    });

    const shadowTheme = createTheme({
    components: {
        MuiPopover: {
        defaultProps: {
            container: shadowRootElement
        }
        },
        MuiPopper: {
        defaultProps: {
            container: shadowRootElement
        }
        },
        MuiModal: {
        defaultProps: {
            container: shadowRootElement
        }
        }
    }
    });

    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(shadowRootElement)

    root.render(<CacheProvider value={cache}> <ThemeProvider theme={shadowTheme}>
        <Provider store={store}><Foreground /></Provider>
    </ThemeProvider>

    </CacheProvider>);
}

init();

