import React from 'react';
import { render } from 'react-dom';

import Foreground from './components/Foreground';
import store from './redux/store';
import { Provider } from 'react-redux'

render(<Provider store={store}><Foreground /></Provider>, document.querySelector('#foreground'));