import { NOTE_CREATED, NOTE_UPDATED, NOTE_LOADED, ERROR } from "../constants/action-types";
import axios from 'axios';

export function loadNotes() {
    return function(dispatch) {
        axios.get("http://localhost:8090/textnotes").then(notes => {
            dispatch({ type: NOTE_LOADED, payload: notes });
        }).catch(error => { console.log(error) });
        axios.get("http://localhost:8090/listnotes").then(notes => {
            dispatch({ type: NOTE_LOADED, payload: notes });
        }).catch(error => {
            dispatch({ type: ERROR, payload: error });
        });
    };
}

export function createNote(note) {
    return dispatch => {
        axios.post("http://localhost:8090/textnotes", note).then(note => {
            dispatch({ type: NOTE_CREATED, payload: note });
        }).catch(error => {
            dispatch( { type: ERROR, payload: error } );
        });
    };
}

export function updateNote(note) {
    return dispatch => {
        axios.put("http://localhost:8090/textnotes", note).then(note => {
            dispatch({ type: NOTE_UPDATED, payload: note });
        }).catch(error => {
            dispatch({ type: ERROR, payload: error });
        });
    };
}