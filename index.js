/* eslint-disable react/react-in-jsx-scope */
import {AppRegistry} from 'react-native';
import App from './App';
import * as React from 'react';
import {name as appName} from './app.json';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import gameReducer from './App/Reducers/gameReducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
//store require the reducer and state, here i just pass the reducer name.
const allReducer = combineReducers({
  gameR: gameReducer,
});

const store = createStore(allReducer, applyMiddleware(thunk));
//store ko provide karna padta he jiski wajah se app usase interact kar sake.
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
