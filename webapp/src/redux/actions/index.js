import {NOTE_CREATED, NOTE_UPDATED, NOTE_LOADED, NOTE_DELETED, ERROR} from '../constants/action-types';
import axios from 'axios';

export function loadNotes() {
    return function(dispatch) {
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
                dispatch({ type: ERROR, payload: error });
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