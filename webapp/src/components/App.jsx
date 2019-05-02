import React, {Component} from 'react';
import {Button, Col, Dropdown, Icon, Menu, PageHeader, Row} from 'antd';
import NotesList from './NotesList';
import NewNoteForm from './NewNoteForm';
import {exportNotes, importNotes, logout} from "../redux/actions";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        exportNotes: () => dispatch(exportNotes()),
        importNotes: file => dispatch(importNotes(file))
    };
};

class AppComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsVisible: false
        };

        this.toggleSettings = this.toggleSettings.bind(this);
        this.handleSettingsAction = this.handleSettingsAction.bind(this);
        this.handleImportFileChange = this.handleImportFileChange.bind(this);
    }

    toggleSettings() {
        this.setState({
            settingsVisible: !this.state.settingsVisible,
        });
    }

    handleSettingsAction({key}) {
        switch (key) {
            case 'download': {
                this.props.exportNotes();
                break;
            }
            case 'upload': {
                document.getElementById('import-file-input').click();
                break;
            }
            case 'logout': {
                this.props.logout();
                break;
            }
        }
    }

    handleImportFileChange() {
        this.props.importNotes(document.getElementById('import-file-input').files[0]);
    }

    render() {
        return (
            <div>
                <PageHeader
                    title={'Overview'}
                    extra={[
                        <Dropdown
                            placement="bottomRight"
                            overlay={
                                <Menu onClick={this.handleSettingsAction}>
                                    <Menu.Item key={'download'}><Icon type={'download'}/>Export Notes</Menu.Item>
                                    <Menu.Item key={'upload'}><Icon type={'upload'}/>Import Notes</Menu.Item>
                                    <input onChange={this.handleImportFileChange} type={"file"} id={'import-file-input'} accept={'.json'} style={{display: 'none'}}/>
                                    <Menu.Item key={'logout'} ><Icon type={'logout'}/>Log Out</Menu.Item>
                                </Menu>
                            }>
                            <Button
                                size={'default'}
                                shape={'circle'}
                                icon={'setting'}/>
                        </Dropdown>
                    ]}
                />
                <Row type={'flex'} justify={'center'}>
                    <Col span={12}>
                        <NewNoteForm/>
                        <NotesList/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const App = connect(null, mapDispatchToProps)(AppComponent);

export default App;