import {NOTE_CREATED, NOTE_LOADED, NOTE_UPDATED} from "../constants/action-types";

const initialState = {
    notes: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case NOTE_LOADED || NOTE_CREATED: {
            return Object.assign({}, state, { notes: state.notes.concat(action.payload) });
        }
        case NOTE_UPDATED: {
            return Object.assign({}, state, {
                    notes: state.notes
                        .slice()
                        .splice(state.notes.findIndex(note => note.id === action.payload.id), 1, action.payload)
                });
        }
        default: return state;
    }
}

export default rootReducer;