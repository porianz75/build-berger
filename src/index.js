import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './cursor.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order';

// حالت اولیه بدون actioncreator و  middleware
//const store = createStore(reducer);

// اضافه کردن devTolls وقتی از middleware استفاده نکرده باشیم
// const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>
);
serviceWorkerRegistration.register();
