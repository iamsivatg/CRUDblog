import React from 'react';
import { Form, Input, Button, } from 'antd';
import axios from 'axios';

class CustomForm extends React.Component {

        handleFormSubmit = (event, requestType, ArticleID) =>{
            const title = event.target.elements.title.value;
            const content = event.target.elements.content.value;
// eslint-disable-next-line
            switch ( requestType ){
                case 'post':
                  return axios.post('http://127.0.0.1:8000/api/',{
                        title : title,
                        content : content
                    })
                    .then(res =>console.log(res))
                    .catch(error => console.err(error));
// eslint-disable-next-line
                case 'put': 
                   return axios.put(`http://127.0.0.1:8000/api/${ArticleID}/`,{
                    title : title,
                    content : content
                })
                .then(res =>console.log(res))
                .catch(error => console.err(error));
            }
         }

        render() {

            return (
            <div>
                <Form onSubmit={(event)=>this.handleFormSubmit (event, this.props.requestType,
                    this.props.ArticleID)}>
                <Form.Item label="Title" >
                    <Input name = "title" placeholder="Put a Title here" />
                </Form.Item>
                <Form.Item label="Content" >
                    <Input name = "content" placeholder="Enter your Content" />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                </Form.Item>
                </Form>
            </div>
    );
  }
}

export default CustomForm;
