import {
    NOTE_CREATED,
    NOTE_DELETED,
    NOTE_LOADED,
    NOTE_UPDATED,
    REMOVE_AUTH_TOKEN,
    SET_AUTH_TOKEN,
    SET_CURRENT_NOTE,
    TOGGLE_EDITOR_MODAL,
    UPDATE_CURRENT_NOTE_COLOR,
    UPDATE_CURRENT_NOTE_CONTENT,
    UPDATE_CURRENT_NOTE_TITLE
} from '../constants/action-types';

const initialState = {
    notes: [],
    currentNote: {},
    editorModalVisible: false,
    authToken: null
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case NOTE_CREATED:
        case NOTE_LOADED: {
            return {
                ...state,
                notes: state.notes
                    .concat(action.payload)
                    .sort((note1, note2) => new Date(note2.lastEdit) - new Date(note1.lastEdit)),
            };
        }
        case NOTE_UPDATED: {
            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, state.notes.findIndex(note => note.id === action.payload.id)),
                    action.payload,
                    ...state.notes.slice(state.notes.findIndex(note => note.id === action.payload.id) + 1),
                ].sort((note1, note2) => new Date(note2.lastEdit) - new Date(note1.lastEdit)),
            };
        }
        case NOTE_DELETED: {
            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, state.notes.findIndex(note => note.id === action.payload)),
                    ...state.notes.slice(state.notes.findIndex(note => note.id === action.payload) + 1),
                ].sort((note1, note2) => new Date(note2.lastEdit) - new Date(note1.lastEdit)),
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
        case UPDATE_CURRENT_NOTE_COLOR: {
            return {
                ...state,
                currentNote: {
                    ...state.currentNote,
                    color: action.payload
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
        case SET_AUTH_TOKEN: {
            window.localStorage.setItem('authToken', action.payload);
            return  {
                ...state,
                authToken: action.payload
            };
        }
        case REMOVE_AUTH_TOKEN: {
            window.localStorage.removeItem('authToken');
            return {
                ...initialState
            }
        }
        default: return state;
    }
}

export default rootReducer;