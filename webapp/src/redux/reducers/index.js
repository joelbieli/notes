import {NOTE_CREATED, NOTE_DELETED, NOTE_LOADED, NOTE_UPDATED} from '../constants/action-types';

const initialState = {
    notes: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case NOTE_CREATED:
        case NOTE_LOADED: {
            return Object.assign({}, state, { notes: state.notes.concat(action.payload) });
        }
        case NOTE_UPDATED: {
            return Object.assign({}, state, {
                notes: [
                    ...state.notes.slice(0, state.notes.findIndex(note => note.id === action.payload)),
                    action.payload,
                    ...state.notes.slice(state.notes.findIndex(note => note.id === action.payload) + 1),
                ]
                });
        }
        case NOTE_DELETED: {
            return Object.assign({}, state, {
                notes: [
                    ...state.notes.slice(0, state.notes.findIndex(note => note.id === action.payload)),
                    ...state.notes.slice(state.notes.findIndex(note => note.id === action.payload) + 1),
                ]
            });
        }
        default: return state;
    }
}

export default rootReducer;