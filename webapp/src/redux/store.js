import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import { emptyTitleMiddleware } from './middlewares';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    applyMiddleware(emptyTitleMiddleware, thunk)
);

export default store;