import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import viewReducer from './views/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
   viewState: viewReducer,
});

const store = createStore(
   rootReducer,
   composeEnhancer(applyMiddleware(thunk)),
);

export default store;
