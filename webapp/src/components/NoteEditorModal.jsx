import React, {Component} from 'react';
import EditorJS from '@editorjs/editorjs';
import {Button, Col, Input, Modal, Popover, Row} from 'antd';
import {connect} from 'react-redux';
import {
    dispatchError,
    setEditorReady,
    toggleEditorModal,
    updateNote
} from '../redux/actions';
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
        editorReady: state.editorReady
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleEditorModal: () => dispatch(toggleEditorModal()),
        setEditorReady: isReady => dispatch(setEditorReady(isReady)),
        updateNote: note => dispatch(updateNote(note)),
        dispatchError: (error, message) => dispatch(dispatchError(error, message))
    };
};

class NoteEditorModalComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: null,
            editorReady: true,
            currentNote: {}
        };

        this.cancelHandler = this.cancelHandler.bind(this);
        this.okHandler = this.okHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.colorChangeHandler = this.colorChangeHandler.bind(this);
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

    okHandler() {
        const _this = this;
        this.props.setEditorReady(false);

        this.state.editor.save()
            .then(content => {
                _this.setState({
                    ..._this.state,
                    currentNote: {
                        ..._this.state.currentNote,
                        content
                    }
                });

                _this.props.updateNote({
                        ..._this.state.currentNote,
                        content
                });

                setTimeout(() => _this.props.setEditorReady(true), 1000, 1000)
            })
            .catch(error => {
                _this.props.dispatchError(error, 'A problem occurred while saving the note');
            });

        _this.props.toggleEditorModal();
    }

    titleChangeHandler(event) {
        this.setState({
            ...this.state,
            currentNote: {
                ...this.state.currentNote,
                title: event.target.value
            }
        });
    }

    colorChangeHandler(color) {
        this.setState({
            ...this.state,
            currentNote: {
                ...this.state.currentNote,
                color: color
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const _this = this;

        if ((nextProps.currentNote.id !== this.state.currentNote.id ||
            JSON.stringify(nextProps.currentNote.content.blocks) !== JSON.stringify(this.state.currentNote.content.blocks) ||
            nextProps.currentNote.color !== this.state.currentNote.color ||
            nextProps.currentNote.title !== this.state.currentNote.title
        ) && nextProps.editorReady) {
            this.setState({
                ...this.state,
                currentNote: nextProps.currentNote
            });

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
                    },
                    onReady() {
                        _this.props.setEditorReady(true);
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
                            <Input value={this.state.currentNote.title} onChange={event => this.titleChangeHandler(event)}/>
                        </Col>
                        <Col style={{marginLeft: '5px'}}>
                            <Popover
                                placement="bottomRight"
                                title={null}
                                content={
                                    <div style={{height: 40}}>
                                        {Object.keys(COLORS).map(key => {
                                            return (
                                                <label key={key} className={'radio-container'} onClick={() => this.colorChangeHandler(key)}>
                                                    <input checked={this.state.currentNote.color === key} type={'radio'} name={'color'}/>
                                                    <span style={{backgroundColor: COLORS[key]}} className={'circle'}>
                                                        <span className={'overlay'}/>
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                }
                                trigger="click">
                                <Button icon={'bg-colors'}/>
                            </Popover>
                        </Col>
                    </Row>
                }
                visible={this.props.visible}
                onCancel={this.cancelHandler}
                okText={'Save & Exit'}
                onOk={this.okHandler}
                okButtonProps={{ disabled: !this.props.editorReady }}
                closable={false}
                maskClosable={false}>
                <div id={'editor-mounting-point'}/>
            </Modal>
        );
    }
}

const NoteEditorModal = connect(mapStateToProps, mapDispatchToProps)(NoteEditorModalComponent);

export default NoteEditorModal;