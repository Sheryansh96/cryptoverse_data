import { render } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './app/store';

import 'antd/dist/antd.css';

ReactDom.render(
<Router>
    <Provider store={store}>
        <App/>
    </Provider>
</Router>
, document.getElementById('root'));