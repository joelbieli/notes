import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';
import Authentication from "./components/Authentication";
import 'antd/dist/antd.css';
import {BrowserRouter, Route} from "react-router-dom";

render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path={'/'} component={App}/>
            <Route exact path={'/auth'} component={Authentication}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);