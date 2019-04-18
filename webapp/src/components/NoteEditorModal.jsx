import React, {Component} from 'react';
import EditorJS from '@editorjs/editorjs';
import {Modal} from "antd";
import {connect} from "react-redux";
import {toggleEditorModal} from "../redux/actions";

const mapStateToProps = state => {
    return {
        visible: state.editorModalVisible,
        title: state.currentNote.title,
        content: state.currentNote.content,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleEditorModal: () => dispatch(toggleEditorModal()),
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

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.content !== nextProps.content) {
            if (this.state.editor)
                this.state.editor.destroy();

            this.setState({
                editor: new EditorJS({
                    holderId: 'editor-mounting-point',
                    data: nextProps.content,
                })
            });
        }
    }

    render() {
        return (
            <Modal
                centered
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.cancelHandler}
                okText={'Save & Exit'}
                onOk={this.okHandler}>
                <div id={'editor-mounting-point'}/>
            </Modal>
        );
    }
}

const NoteEditorModal = connect(mapStateToProps, mapDispatchToProps)(NoteEditorModalComponent);

export default NoteEditorModal;