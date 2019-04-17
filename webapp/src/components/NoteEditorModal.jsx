import React, {Component} from 'react';
import EditorJS from '@editorjs/editorjs';
import {Modal} from "antd";

class NoteEditorModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.props.content = this.props.content ? this.props.content : {};
    }

    render() {
        const editor = new EditorJS({
            holderId: 'editor-mounting-point',
            data: this.props.content,
        });

        return (
            <Modal centered title={this.props.title} visible={this.props.visible}>
                <div id={'editor-mounting-point'}/>
            </Modal>
        );
    }
}

export default NoteEditorModal;