import {
    NOTE_CREATED,
    NOTE_DELETED,
    NOTE_LOADED,
    NOTE_UPDATED,
    TOGGLE_EDITOR_MODAL,
    SET_CURRENT_NOTE,
    UPDATE_CURRENT_NOTE_TITLE,
    UPDATE_CURRENT_NOTE_CONTENT
} from '../constants/action-types';

const initialState = {
    notes: [],
    currentNote: {},
    editorModalVisible: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case NOTE_CREATED:
        case NOTE_LOADED: {
            return {
                ...state,
                notes: state.notes.concat(action.payload),
            };
        }
        case NOTE_UPDATED: {
            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, state.notes.findIndex(note => note.id === action.payload.id)),
                    action.payload,
                    ...state.notes.slice(state.notes.findIndex(note => note.id === action.payload.id) + 1),
                ],
            };
        }
        case NOTE_DELETED: {
            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, state.notes.findIndex(note => note.id === action.payload)),
                    ...state.notes.slice(state.notes.findIndex(note => note.id === action.payload) + 1),
                ],
            };
        }
        case TOGGLE_EDITOR_MODAL: {
            return {
                ...state,
                editorModalVisible: !state.editorModalVisible,
            };
        }
        case SET_CURRENT_NOTE: {
            return {
                ...state,
                currentNote: action.payload,
            };
        }
        case UPDATE_CURRENT_NOTE_TITLE: {
            return {
                ...state,
                currentNote: {
                    ...state.currentNote,
                    title: action.payload
                },
            };
        }
        case UPDATE_CURRENT_NOTE_CONTENT: {
            return {
                ...state,
                currentNote: {
                    ...state.currentNote,
                    content: action.payload
                },
            };
        }
        default: return state;
    }
}

export default rootReducer;