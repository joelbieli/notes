import React, { Component } from 'react';
import { connect } from "react-redux";
import { createNote } from "../redux/actions";
import {Button, Form, Input, Radio, Row, Col} from "antd";

const mapDispatchToProps = dispatch => {
    return { createNote: note => dispatch(createNote(note)) };
};

class NewNoteFormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const { title } = this.state;
        this.props.createNote({ title });
        this.setState({ title: "" });
    }

    render() {
        const { title } = this.state;

        return (
            <Row type={"flex"} justify={"center"}>
                <Col>
                    <Form
                        layout={"inline"}
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Item>
                            <Input
                                id={"title"}
                                type={"text"}
                                value={title}
                                placeholder={"Title..."}
                                onChange={this.handleChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Radio.Group onChange={this.handleChange} defaultValue={"text"}>
                                <Radio.Button value={"list"}>List Note</Radio.Button>
                                <Radio.Button value={"text"}>Text Note</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item style={{ right: 0 }}>
                            <Button icon={"check"} htmlType={"submit"}>Create</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const NewNoteForm = connect(null, mapDispatchToProps)(NewNoteFormView);

export default NewNoteForm;