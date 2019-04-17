import {ERROR, NOTE_CREATED} from '../constants/action-types';

export function emptyTitleMiddleware({ dispatch }) {
    return next => {
        return action => {
            if (action.type === NOTE_CREATED) {
                if (!action.payload.title) {
                    return dispatch({ type: 'EMPTY_TITLE' })
                }
            }
            return next(action);
        };
    };
}

export function logError() {
    return next => {
        return action => {
            if (action.type === ERROR) {
                console.log(`[ERROR]: ${action.payload}`);
            }
            return next(action);
        };
    };
}