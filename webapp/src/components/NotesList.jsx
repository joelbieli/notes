import React, {Component} from 'react';
import { connect } from "react-redux";
import {Avatar, List} from "antd";
import { loadNotes } from "../redux/actions";

const mapStateToProps = state => {
    return { notes: state.notes }
};

class NotesListView extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        loadNotes();
    }

    render() {
        const { notes } = this.state;

        return () => (
            <List
                dataSource={notes}
                renderItem={ item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={"align-center"}/>}
                            title={item.title}
                        />
                    </List.Item>
                )}/>
        );
    }
}

const NotesList = connect(mapStateToProps)(NotesListView);

export default NotesList;