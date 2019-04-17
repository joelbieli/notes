import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../redux/actions';
import {Button, Form, Input, Radio, Row, Col} from 'antd';

const mapDispatchToProps = dispatch => {
    return { createNote: note => dispatch(createNote(note)) };
};

class NewNoteFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, target) {
        const data = {};
        data[target] = { value: event.target.value };
        this.setState({ [target]: event.target.value });
        this.props.form.setFields(data);
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields(error => {
            if (!error) {
                this.props.form.resetFields(['title']);
                const { title, type } = this.state;
                this.props.createNote({ title, type });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Row type={'flex'} justify={'center'}>
                <Col>
                    <Form
                        layout={'inline'}
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Item>
                            {getFieldDecorator('title', {
                                initialValue: '',
                                rules: [{
                                    required: true,
                                    message: 'Title must not be empty',
                                }],
                            })(
                                <Input
                                    id={'title'}
                                    type={'text'}
                                    placeholder={'Title'}
                                    onChange={(event) => this.handleChange(event, 'title')}
                                />
                            )}
                        </Form.Item>
                        <Form.Item style={{ right: 0 }}>
                            <Button icon={'check'} htmlType={'submit'}>Create</Button>
                        </Form.Item>
                        <Button icon={"check-circle"}/>
                    </Form>
                </Col>9
            </Row>
        );
    }
}

const WrappedNewNoteForm = Form.create({ name: '' })(NewNoteFormComponent);

const NewNoteForm = connect(null, mapDispatchToProps)(WrappedNewNoteForm);

export default NewNoteForm;