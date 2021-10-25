import React from 'react';
import { Form, Input, Button, Result } from 'antd';
import showError from '../utils/showError';
import api from '../utils/api';
import { useHistory, useLocation } from 'react-router-dom';

function Login() {
    const history = useHistory();
    const location = useLocation<{ newSignUp?: boolean }>();

    console.log("location", location,);
    

    const onFinish = async (values: any) => {
        try {
            await api.post("/users/login", values);
            history.push("/");
        } catch (error) {
            console.log({error});
            
        }
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', {errorInfo});
        showError(errorInfo);
      };
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>Login</h2>
        {location.state?.newSignUp && (
            <Result
            status="success"
            title="You successfully signed up!"
            subTitle="Please login using your credentials."
        />
        ) }
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}

export default Login;
