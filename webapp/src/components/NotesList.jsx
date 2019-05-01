import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Avatar, Button, Icon, List, Popconfirm} from 'antd';
import {deleteNote, loadNotes, toggleEditorModal, setCurrentNote} from '../redux/actions';
import COLORS from '../redux/constants/colors';
import NoteEditorModal from './NoteEditorModal';

const mapStateToProps = state => {
    return { notes: state.notes }
};

const mapDispatchToProps = dispatch => {
    return {
        loadNotes:  () => dispatch(loadNotes()),
        deleteNote: note => dispatch(deleteNote(note)),
        toggleEditorModal: () => dispatch(toggleEditorModal()),
        setCurrentNote: note => dispatch(setCurrentNote(note)),
    };
};

class NotesListView extends Component {
    constructor(props) {
        super(props);

        this.openEditor = this.openEditor.bind(this);
    }

    componentDidMount() {
        this.props.loadNotes();
    }

    openEditor(note) {
        this.props.setCurrentNote(note);
        this.props.toggleEditorModal();
    }

    render() {
        return (
            <div>
                <List
                    style={{ overflowY: 'auto' }}
                    dataSource={this.props.notes}
                    renderItem={ item => (
                        <List.Item actions={[
                            <Button shape={'circle'} icon={'edit'} onClick={ () => this.openEditor(item) }/>,
                            <Popconfirm
                                title={'Are you sure you want to delete this note?'}
                                okText={'Yes'}
                                icon={<Icon type='exclamation-circle' style={{ color: 'red' }}/>}
                                onConfirm={ () => this.props.deleteNote(item) }>
                                <Button type={'danger'} shape={'circle'} icon={'delete'}/>
                            </Popconfirm>,
                        ]}>
                            <List.Item.Meta
                                avatar={<Avatar style={{backgroundColor: COLORS[item.color]}}/>}
                                title={item.title}
                            />
                        </List.Item>
                    )}/>
                    <NoteEditorModal/>
            </div>
        );
    }
}

const NotesList = connect(mapStateToProps, mapDispatchToProps)(NotesListView);

export default NotesList;