import React, { useEffect } from 'react';
import { Form, Button, Input, message } from 'antd'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { DangKyService } from '../../ApiServices/Auth/DangKy';
import { XacThucService } from '../../ApiServices/Auth/XacThuc';


const XacThuc = () => {
  const { DangKyResponse, DangKyIsLoading, DangKyError, callDangKyRefetch } = DangKyService();
  const { XacThucResponse, XacThucIsLoading, XacThucError, callXacThucRefetch } = XacThucService();

  const location = useLocation(); // Lấy thông tin về URL từ react-router-dom

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tokenValue = urlParams.get('token');

    if (tokenValue) {
      callXacThucRefetch(tokenValue);
    }

    // Bạn có thể thực hiện các hành động khác với giá trị token tại đây
  }, [location.search]);

  useEffect(() => {
    if (XacThucResponse) {
      if(XacThucResponse.message === "failure") {
        error("Xác thực thất bại");
      }
      else{
        success("Xác thực thành công");
      }
    }
  }, [XacThucResponse]);


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


  const onFinish = (values) => {
    navigate('/');

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
          <h1>Xác thực tài khoản qua Email</h1>
          <hr style={{ marginBottom: '20px' }} />


          <Button type="primary" htmlType="submit">Quay lại trang web</Button>
        </Form>
      </div>
    </div>
  )
}

export default XacThuc;