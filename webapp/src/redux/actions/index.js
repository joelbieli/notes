import {
    NOTE_CREATED,
    NOTE_UPDATED,
    NOTE_LOADED,
    NOTE_DELETED,
    ERROR,
    TOGGLE_EDITOR_MODAL,
    SET_CURRENT_NOTE,
    UPDATE_CURRENT_NOTE_TITLE, UPDATE_CURRENT_NOTE_CONTENT, LOGIN
} from '../constants/action-types';
import axios from 'axios';

export function loadNotes() {
    return dispatch => {
        axios.get('http://localhost:8090/notes')
            .then(response => {
                dispatch({ type: NOTE_LOADED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while loading your notes' } });
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
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while creating a note' } });
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
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while updating a note' } });
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
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while deleting a note' }});
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

export function registerNewUser(user) {
    return dispatch => {
        axios.post('http://localhost:8090/users', user)
            .then(() => { login(user) })
            .catch(error => {
                dispatch({type: ERROR, payload: {error, message: 'A problem occurred while registering a new user'}});
            });
    }
}

export function login(user) {
    const userData = new URLSearchParams();
    userData.append('username', user.username);
    userData.append('password', user.password);

    return dispatch => {
        axios.post('http://localhost:8090/login', userData)
            .then(response => {
                dispatch({type: LOGIN, payload: response.data});
            })
            .catch(error => {
                dispatch({type: ERROR, payload: {error, message: 'A problem occurred while logging in'}});
            });
    }
}