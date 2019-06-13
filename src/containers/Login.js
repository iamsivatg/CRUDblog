import React from "react";
import { Form, Icon, Input, Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
      }
    });
    this.props.histoty.push("/");
  };

  render() {
    let errormessage = null;
    if (this.props.errormessgae){
        errormessage = (<p>this.props.error.message</p>);
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            {errormessage}
            {
                this.props.loading ?
                <Spin indicator={antIcon} />
                :
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>

                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>

                    <Form.Item>
                    <Button type = "primary" htmlType="submit" style ={{marginRight:'10px'}}>
                    Login
                    </Button>
                    or
                    <NavLink 
                    style ={{marginRight:'10px'}} 
                    to='/signup/'> Signup
                    </NavLink>
                    </Form.Item>
            </Form>
            }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state) =>{
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatcgToProps = dispatch =>{
    return {
        onAuth:(username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps,mapDispatcgToProps)(WrappedNormalLoginForm);

