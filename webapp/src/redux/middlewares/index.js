import {ERROR, NOTE_CREATED} from '../constants/action-types';
import {message} from 'antd';

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
                message.error(action.payload.message);
                console.log(`[ERROR]: ${action.payload.error}`);
            }
            return next(action);
        };
    };
}