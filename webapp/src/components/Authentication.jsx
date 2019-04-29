import React, {Component} from 'react';
import {Button, Card, Col, Form, Icon, Input, Row, Tabs} from "antd";
import {login, registerNewUser} from "../redux/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const mapDispatchToProps = dispatch => {
    return {
        registerNewUser: user => dispatch(registerNewUser(user)),
        login: user => dispatch(login(user)),
    };
};

const mapStateToProps = state => {
    return {
        authToken: state.authToken
    };
};

class AuthenticationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'login',
            tabsContent: {
                'login':
                    <Form>
                        <Form.Item>
                            <Input
                                prefix={<Icon type={'user'}/>}
                                placeholder={'Username'}/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                prefix={<Icon type={'lock'}/>}
                                placeholder={'Password'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={'submit'}>Login</Button>
                        </Form.Item>
                    </Form>,
                'register':
                    <Form>
                        <Form.Item>
                            <Input
                                prefix={<Icon type={'user'}/>}
                                placeholder={'Username'}/>
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                prefix={<Icon type={'lock'}/>}
                                placeholder={'Password'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType={'submit'}>Register</Button>
                        </Form.Item>
                    </Form>,
            }
        };

        this.switchTab = this.switchTab.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        this.props.form.validateFields(['username_login', 'password_login'], (error, values) => {
            if (!error) {
                this.props.login({
                    username: values['username_login'],
                    password: values['password_login'],
                });
            }
        });
    }

    handleRegister(event) {
        event.preventDefault();
        this.props.form.validateFields(['username_register', 'password_register'], (error, values) => {
            if (!error) {
                this.props.registerNewUser({
                    username: values['username_register'],
                    password: values['password_register'],
                });
            }
        });
    }

    switchTab(key) {
        this.setState({
            ...this.state,
            currentTab: key
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        if (this.props.authToken) return <Redirect to={'/'}/>;

        return (
            <Row type={'flex'} align={'middle'} justify={'center'} style={{height: '100vh'}}>
                <Col span={6}>
                    <Card style={{width: '100%'}} hoverable>
                        <Tabs
                            tabBarStyle={{textAlign: 'center'}}
                            defaultActiveKey={'login'}
                            size={'large'}>
                            <Tabs.TabPane key={'login'} tab={'Login'}>
                                <Form onSubmit={this.handleLogin}>
                                    <Form.Item>
                                        {getFieldDecorator('username_login', {
                                            rules: [{ required: true, message: 'Please input your username' }],
                                        })(
                                            <Input prefix={<Icon type={'user'}/>} placeholder={'Username'}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password_login', {
                                            rules: [{ required: true, message: 'Please input your password' }],
                                        })(
                                            <Input.Password prefix={<Icon type={'lock'}/>} placeholder={'Password'}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType={'submit'}>Login</Button>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={'register'} tab={'Register'}>
                                <Form onSubmit={this.handleRegister}>
                                    <Form.Item>
                                        {getFieldDecorator('username_register', {
                                            rules: [{ required: true, message: 'Please input your username' }],
                                        })(
                                            <Input prefix={<Icon type={'user'}/>} placeholder={'Username'}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password_register', {
                                            rules: [{ required: true, message: 'Please input your password' }],
                                        })(
                                            <Input.Password prefix={<Icon type={'lock'}/>} placeholder={'Password'}/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType={'submit'}>Register</Button>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const AuthenticationForm = Form.create({ name: '' })(AuthenticationComponent);

const Authentication = connect(mapStateToProps, mapDispatchToProps)(AuthenticationForm);

export default Authentication;