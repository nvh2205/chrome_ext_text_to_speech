import React from 'react';
import { render } from 'react-dom';

import Popup from './components/Popup.js';
import store from './redux/store';
import { Provider } from 'react-redux'

render(<Provider store={store}><Popup /></Provider>, document.querySelector('#popup'));
