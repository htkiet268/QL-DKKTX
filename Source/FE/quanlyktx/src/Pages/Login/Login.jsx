import React, { useCallback, useEffect } from 'react';
import { Form, Button, Input } from 'antd'
import { message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import { DangNhapService } from '../../ApiServices/Auth/Dangnhap';


const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  const error = (mess) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };
  const { DangNhapResponse, DangNhapIsLoading, DangNhapError, callDangNhapRefetch } = DangNhapService();


  const { search } = useLocation();
  const params = new URLSearchParams(search);

  let dangky = params.get('message');

  const dangkythanhcong = useCallback(()=>{
    if (dangky === 'success') {
      success('Đăng ký tài khoản thành công! Vui lòng kiểm tra email của bạn');
    }
  },[])
  
  useEffect(dangkythanhcong,[dangkythanhcong]);

  useEffect(() => {
    if (DangNhapResponse) {
      localStorage.setItem('token', DangNhapResponse.accessToken);
      localStorage.setItem('role', DangNhapResponse.roles[0].authority);
      localStorage.setItem('username', DangNhapResponse.username);
      localStorage.setItem('idNV', DangNhapResponse.id);

      navigate('/home')
    }
    if (DangNhapError) {
      error('Tên đăng nhập hoặc mật khẩu không đúng!')
    }
  }, [DangNhapResponse, DangNhapError]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
    }
  })

  const onFinish = (values) => {
    callDangNhapRefetch(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='backgroundLogin'>
      {contextHolder}
      <div className='FormLoginCustom'>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <h1>Đăng nhập <a href='/DangKy' style={{ opacity: 0.6, fontSize: '20px' }}>/ Đăng ký</a></h1>
          <hr style={{ marginBottom: '20px' }} />
          <Form.Item
            label="Tên đăng nhập"
            name="usernameOrEmail"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập!',
              },
            ]}
          >
            <Input type="text" placeholder="Nhập Username hoặc Email" />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item style={{ textAlign: "end", padding: '0 10px' }}>
            <a href="">Quên mật khẩu</a>
          </Form.Item>

          <hr />

          <Button type="primary" htmlType="submit">Đăng nhập</Button>
        </Form>
      </div>
    </div>
  )
}

export default Login;