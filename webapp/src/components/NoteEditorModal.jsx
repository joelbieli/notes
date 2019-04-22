import React, {Component} from 'react';
import EditorJS from '@editorjs/editorjs';
import {Button, Input, Modal} from "antd";
import {connect} from "react-redux";
import {toggleEditorModal, updateCurrentNoteContent, updateCurrentNoteTitle, updateNote} from "../redux/actions";
import {ERROR} from "../redux/constants/action-types";
import Checklist from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Raw from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';

const mapStateToProps = state => {
    return {
        visible: state.editorModalVisible,
        currentNote: state.currentNote,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleEditorModal: () => dispatch(toggleEditorModal()),
        updateCurrentNoteTitle: title => dispatch(updateCurrentNoteTitle(title)),
        updateCurrentNoteContent: content => dispatch(updateCurrentNoteContent(content)),
        updateNote: note => dispatch(updateNote(note)),
    };
};

class NoteEditorModalComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: null,
        };

        this.cancelHandler = this.cancelHandler.bind(this);
        this.okHandler = this.okHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.printData = this.printData.bind(this);
    }

    cancelHandler() {
        const exit = this.props.toggleEditorModal;
        Modal.confirm({
            title: 'You are about to exit without saving, do you want to proceed?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                exit();
            },
            onCancel() {}
        });
    }

    okHandler({ dispatch }) {
        this.state.editor.save()
            .then(content => {
                console.log(content);
                this.props.updateNote({
                    ...this.props.currentNote,
                    content: content,
                });
                this.props.updateCurrentNoteContent(content)
            })
            .catch(error => dispatch({ type: ERROR, payload: error }));
        this.props.toggleEditorModal();
    }

    titleChangeHandler(event) {
        this.props.updateCurrentNoteTitle(event.target.value);
    }

    printData({dispatch}) {
        this.state.editor.save()
            .then(content => {
                console.log(content);
            })
            .catch(error => dispatch({ type: ERROR, payload: error }));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.currentNote.id !== nextProps.currentNote.id || this.props.currentNote.content !== nextProps.currentNote.content) {
            if (this.state.editor)
                this.state.editor.destroy();

            this.setState({
                editor: new EditorJS({
                    holderId: 'editor-mounting-point',
                    data: nextProps.currentNote.content,
                    tools: {
                        checklist: Checklist,
                        code: Code,
                        delimiter: Delimiter,
                        embed: Embed,
                        header: Header,
                        inlineCode: InlineCode,
                        link: Link,
                        list: List,
                        marker: Marker,
                        paragraph: Paragraph,
                        quote: Quote,
                        raw: Raw,
                        simpleImage: SimpleImage,
                        table: Table,
                        warning: Warning,
                    }
                })
            });
        }
    }

    render() {
        return (
            <Modal
                centered
                title={<Input defaultValue={this.props.currentNote.title} onChange={event => this.titleChangeHandler(event)}/>}
                visible={this.props.visible}
                onCancel={this.cancelHandler}
                okText={'Save & Exit'}
                onOk={this.okHandler}
                closable={false}
                maskClosable={false}>
                <div id={'editor-mounting-point'}/>
                <Button onClick={this.printData}>Print Data</Button>
            </Modal>
        );
    }
}

const NoteEditorModal = connect(mapStateToProps, mapDispatchToProps)(NoteEditorModalComponent);

export default NoteEditorModal;