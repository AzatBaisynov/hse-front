import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import login from './reducers/login';
import files from './reducers/files';

const rootReducer = combineReducers({
	login, files
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))