import React, {Component} from 'react';
import EditorJS from '@editorjs/editorjs';
import {Button, Col, Icon, Input, Modal, Popover, Radio, Row} from 'antd';
import {connect} from 'react-redux';
import {
    toggleEditorModal,
    updateCurrentNoteColor,
    updateCurrentNoteContent,
    updateCurrentNoteTitle,
    updateNote
} from '../redux/actions';
import {ERROR} from '../redux/constants/action-types';
import COLORS from '../redux/constants/colors';
import '../style/colorpicker.css';
import Checklist from '@editorjs/checklist';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import InlineCode from '@editorjs/inline-code';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
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
        updateCurrentNoteColor: color => dispatch(updateCurrentNoteColor(color)),
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
            .catch(error => dispatch({type: ERROR, payload: {error, message: 'A problem occurred while saving the note'}}));
        this.props.toggleEditorModal();
    }

    titleChangeHandler(event) {
        this.props.updateCurrentNoteTitle(event.target.value);
    }

    colorChangeHandler(color) {
        this.props.updateCurrentNoteColor(color);
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
                        code: Code,
                        delimiter: Delimiter,
                        embed: Embed,
                        header: Header,
                        inlineCode: InlineCode,
                        marker: Marker,
                        quote: Quote,
                        raw: Raw,
                        simpleImage: SimpleImage,
                        table: Table,
                        warning: Warning,
                        list: {
                            class: List,
                            inlineToolbar: true,
                        },
                        checklist: {
                            class: Checklist,
                            inlineToolbar: true,
                        },
                    }
                })
            });
        }
    }

    render() {
        return (
            <Modal
                centered
                title={
                    <Row type={'flex'} align={'middle'}>
                        <Col span={22}>
                            <Input value={this.props.currentNote.title} onChange={event => this.titleChangeHandler(event)}/>
                        </Col>
                        <Col style={{marginLeft: '5px'}}>
                            <Popover
                                placement="bottomRight"
                                title={null}
                                content={
                                    <div style={{height: 40}}>
                                        {Object.keys(COLORS).map(key => {
                                            return (
                                                <label className={'radio-container'} onClick={() => this.colorChangeHandler(key)}>
                                                    <input checked={this.props.currentNote.color === key} type={'radio'} name={'color'}/>
                                                    <span style={{backgroundColor: COLORS[key]}} className={'circle'}>
                                                        <span className={'overlay'}/>
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                }
                                trigger="click">
                                <Button icon={'more'}/>
                            </Popover>
                        </Col>
                    </Row>
                }
                visible={this.props.visible}
                onCancel={this.cancelHandler}
                okText={'Save & Exit'}
                onOk={this.okHandler}
                closable={false}
                maskClosable={false}>
                <div id={'editor-mounting-point'}/>
            </Modal>
        );
    }
}

const NoteEditorModal = connect(mapStateToProps, mapDispatchToProps)(NoteEditorModalComponent);

export default NoteEditorModal;