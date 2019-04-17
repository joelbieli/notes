import React from 'react';
import {
    PageHeader,
    Col,
    Row,
    Button
} from 'antd';
import NotesList from './NotesList';
import NewNoteForm from './NewNoteForm';


const App = () => (
    <div>
        <PageHeader
            title={'Overview'}
            extra={[
                <Button htmlType={'button'} size={'default'} shape={'circle'} icon={'setting'}/>
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

export default App;