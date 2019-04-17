import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Avatar, Button, Icon, List, Popconfirm} from 'antd';
import {deleteNote, loadNotes} from '../redux/actions';

const mapStateToProps = state => {
    return { notes: state.notes }
};

const mapDispatchToProps = dispatch => {
    return {
        loadNotes:  () => dispatch(loadNotes()),
        deleteNote: note => dispatch(deleteNote(note)),
    };
};

class NotesListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalStatus: {}
        };
    }

    componentDidMount() {
        this.props.loadNotes();
        const initialModalStatus = {};
        this.props.notes.forEach(note => initialModalStatus[note.id] = false);
        this.setState(Object.assign({}, this.state, {
            modalStatus: initialModalStatus
        }));
    }

    toggleStatus(id) {
        this.setState({
            ...this.state,
            modalStatus: {
                ...this.state.modalStatus,
                [id]: !this.state.modalStatus[id]
            }
        });
    }

    render() {
        const { notes } = this.props;

        return (
            <List
                style={{ overflowY: 'auto' }}
                dataSource={notes}
                renderItem={ item => (
                    <List.Item actions={[
                        <Button shape={'circle'} icon={'edit'} onClick={() => this.toggleStatus(item.id) }/>,
                        <Popconfirm
                            title={"Are you sure you want to delete this note?"}
                            okText={"Yes"}
                            icon={<Icon type="exclamation-circle" style={{ color: 'red' }}/>}
                            onConfirm={ () => this.props.deleteNote(item) }>
                            <Button type={'danger'} shape={'circle'} icon={'delete'}/>
                        </Popconfirm>,
                    ]}>
                        <List.Item.Meta
                            avatar={<Avatar icon={ item.type === 'TEXT' ? 'align-center' : 'bars' }/>}
                            title={item.title}
                        />
                    </List.Item>
                )}/>
        );
    }
}

const NotesList = connect(mapStateToProps, mapDispatchToProps)(NotesListView);

export default NotesList;