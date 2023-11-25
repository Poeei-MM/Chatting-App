// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
    chat: chatReducer,
});

export default rootReducer;
