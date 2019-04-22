import {
    NOTE_CREATED,
    NOTE_UPDATED,
    NOTE_LOADED,
    NOTE_DELETED,
    ERROR,
    TOGGLE_EDITOR_MODAL,
    SET_CURRENT_NOTE,
    UPDATE_CURRENT_NOTE_TITLE, UPDATE_CURRENT_NOTE_CONTENT
} from '../constants/action-types';
import axios from 'axios';

export function loadNotes() {
    return dispatch => {
        axios.get('http://localhost:8090/notes')
            .then(response => {
                dispatch({ type: NOTE_LOADED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
}

export function createNote(note) {
    return dispatch => {
        axios.post('http://localhost:8090/notes', note)
            .then(response => {
                dispatch({ type: NOTE_CREATED, payload: response.data });
            })
            .catch(error => {
                dispatch( { type: ERROR, payload: error } );
            });
    };
}

export function updateNote(note) {
    return dispatch => {
        axios.put('http://localhost:8090/notes', note)
            .then(response => {
                dispatch({ type: NOTE_UPDATED, payload: response.data });
            })
            .catch(error => {
                dispatch( { type: ERROR, payload: error } );
            });
    };
}

export function deleteNote(note) {
    return dispatch => {
        axios.delete(`http://localhost:8090/notes/${note.id}`)
            .then(() => {
                dispatch({ type: NOTE_DELETED, payload: note.id });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: error });
            });
    };
}

export function toggleEditorModal() {
    return { type: TOGGLE_EDITOR_MODAL };
}

export function setCurrentNote(note) {
    return { type: SET_CURRENT_NOTE, payload: note }
}

export function updateCurrentNoteTitle(title) {
    return { type: UPDATE_CURRENT_NOTE_TITLE, payload: title };
}

export function updateCurrentNoteContent(content) {
    return { type: UPDATE_CURRENT_NOTE_CONTENT, payload: content };
}