import React, { useEffect } from 'react';
import { Form, Button, Input,message } from 'antd'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DangKyService } from '../../ApiServices/Auth/DangKy';


const DangKy = () => {
const { DangKyResponse, DangKyIsLoading, DangKyError, callDangKyRefetch } = DangKyService();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

  //Call API Login 
  // const { loginResponse, loginIsLoading, loginError, callLoginRefetch } = LoginService();
  useEffect(() => {
      if (DangKyResponse) {
          if (DangKyResponse.message === 'success') {
            navigate('/?message=success');
          }else{
            error(DangKyResponse.message);
          }
      }
      if(DangKyError){
        error('Mật khẩu tối thiểu 8 ký tự');
      }

  }, [DangKyResponse,DangKyError])

  const onFinish = (values) => {
    callDangKyRefetch(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='backgroundDangky'>
      {contextHolder}
      <div className='FormLoginCustom'>
        <Form 
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
          <h1>Đăng ký<a href='/' style={{opacity:0.6,fontSize:'20px'}}> / Đăng nhập</a></h1>
          <hr style={{marginBottom:'20px'}} />
          <Form.Item
            label="Nhập Email "
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Email xác thực!',
              },
            ]}
          >
            <Input type="text" placeholder="Nhập Email xác thực" />
          </Form.Item>
          
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập!',
              },
            ]}
          >
            <Input type="text" placeholder="Nhập Mã sinh viên của bạn" />
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
            <Input name='password' type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Nhập lại Mật Khẩu"
            name="matchingPassword"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu!',
              },
            ]}
          >
            <Input name='password' type="password" placeholder="Nhập lại Mật khẩu" />
          </Form.Item>
          
          <hr style={{marginTop:'40px'}} />
         
          <Button type="primary" htmlType="submit">Đăng Ký</Button>
        </Form>
      </div>
    </div>
  )
}

export default DangKy;