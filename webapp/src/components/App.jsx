import React, {Component} from 'react';
import {PageHeader, Col, Row, Button, Dropdown, Menu, Icon} from 'antd';
import NotesList from './NotesList';
import NewNoteForm from './NewNoteForm';
import {logout} from "../redux/actions";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
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
    }

    toggleSettings() {
        this.setState({
            settingsVisible: !this.state.settingsVisible,
        });
    }

    handleSettingsAction({key}) {
        switch (key) {
            case 'download': {

                break;
            }
            case 'upload': {
                break;
            }
            case 'logout': {
                this.props.logout();
                break;
            }
        }
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
                                    <Menu.Item key={'logout'} ><Icon type={'logout'}/>Log Out</Menu.Item>
                                </Menu>
                            }>
                            <Button
                                size={'default'}
                                shape={'circle'}
                                icon={'setting'}/>
                        </Dropdown>
                    ]}/>
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