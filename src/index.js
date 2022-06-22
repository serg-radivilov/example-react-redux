/** NOTE - Initialization classic react application */

// libraries
import React    from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// components
import App from './app';

// store
import store from "./store";

// styles
import "./styles/index.css";


// create react DOM
const root = ReactDOM.createRoot(document.getElementById('root'));


// render
root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App/>
        </Provider>
    </React.StrictMode>
);