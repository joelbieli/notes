import {
    ERROR,
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
import fileDownload from 'js-file-download';
import axios from 'axios';

export function loadNotes() {
    return (dispatch, getState) => {
        axios.get('http://localhost:8090/notes', {headers: {'Authorization': `Bearer ${getState().authToken}`}})
            .then(response => {
                dispatch({ type: NOTE_LOADED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while loading your notes' } });
            });
    };
}

export function createNote(note) {
    return (dispatch, getState) => {
        axios.post('http://localhost:8090/notes', note, {headers: {'Authorization': `Bearer ${getState().authToken}`}})
            .then(response => {
                dispatch({ type: NOTE_CREATED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while creating a note' } });
            });
    };
}

export function updateNote(note) {
    return (dispatch, getState) => {
        axios.put('http://localhost:8090/notes', note, {headers: {'Authorization': `Bearer ${getState().authToken}`}})
            .then(response => {
                dispatch({ type: NOTE_UPDATED, payload: response.data });
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while updating a note' } });
            });
    };
}

export function deleteNote(note) {
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8090/notes/${note.id}`, {headers: {'Authorization': `Bearer ${getState().authToken}`}})
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

export function updateCurrentNoteColor(color) {
    return { type: UPDATE_CURRENT_NOTE_COLOR, payload: color };
}

export function updateCurrentNoteContent(content) {
    return { type: UPDATE_CURRENT_NOTE_CONTENT, payload: content };
}

export function registerNewUser(user) {
    return dispatch => {
        axios.post('http://localhost:8090/users', user)
            .then(() => dispatch(login(user)))
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
                dispatch({type: SET_AUTH_TOKEN, payload: response.data});
            })
            .catch(error => {
                dispatch({type: ERROR, payload: {error, message: 'A problem occurred while logging in'}});
            });
    }
}

export function logout() {
    return {type: REMOVE_AUTH_TOKEN};
}

export function loadJWT() {
    return dispatch => {
        let token;
        if ((token = window.localStorage.getItem('authToken'))) {
            dispatch({type: SET_AUTH_TOKEN, payload: token});
        }
    };
}

export function exportNotes() {
    return (dispatch, getState) => {
        axios.get('http://localhost:8090/notes', {headers: {'Authorization': `Bearer ${getState().authToken}`}})
            .then(response => {
                fileDownload(JSON.stringify(response.data), 'notes-export.json', 'application/json');
            })
            .catch(error => {
                dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while exporting your notes' } });
            });
    };
}

export function importNotes(file) {
    const fileReader = new FileReader();

    return (dispatch, getState) => {
        fileReader.readAsText(file);
        fileReader.onload = (event) => {
            axios.post(
                'http://localhost:8090/notes/import',
                JSON.parse(event.target.result),
                {headers: {'Authorization': `Bearer ${getState().authToken}`}}
                ).then(() => dispatch(loadNotes()))
                .catch(error => {
                    dispatch({ type: ERROR, payload: { error, message: 'A problem occurred while importing your notes' } });
                });
        };
    };
}