import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from './reducers';
import {emptyTitleMiddleware, logError} from './middlewares';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            emptyTitleMiddleware,
            logError,
            thunk
        )
    ),
);

export default store;