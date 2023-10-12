import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';

import { ThemBangGiaDienService } from '../../../ApiServices/HoaDonAPI/ThemBangGiaNuoc';


const ThemBangGiaDien = ({ success, GetHoaDonByIDSVRefetch, setToggle }) => {
  const { ThemBangGiaDienResponse, ThemBangGiaDienIsLoading, ThemBangGiaDienError, callThemBangGiaDienRefetch } = ThemBangGiaDienService();
  const [messageApi, contextHolder] = message.useMessage();
  
  const error = (mess) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };
  useEffect(() => {
    if (ThemBangGiaDienResponse) {
      if (ThemBangGiaDienResponse.message === "Thêm mới bảng giá nước thành công") {
        success(ThemBangGiaDienResponse.message);
        setToggle(false);
        GetHoaDonByIDSVRefetch();
      } else {
        error(ThemBangGiaDienResponse.message);

      }
    }
    if (ThemBangGiaDienError) {
      error('Thanh toán thất bại');
    }
  }, [ThemBangGiaDienResponse, ThemBangGiaDienError]);



  const onFinish = (values) => {
    let data = {
      month: +values.month,
      year: +values.year,
      price: +values.price,
    }
    callThemBangGiaDienRefetch(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='modal'>
      {contextHolder}
      <Form
        className='FormCustom'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center' }}>Thêm bảng giá nước</h2>
        <Form.Item
          label="Giá nước mới"
          name="price"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giá nước mới!',
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Nhập tháng áp dụng"
          name="month"
          rules={[
            {
              required: true,
              message: 'Vui lòng Nhập tháng áp dụng',
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label="Nhập năm áp dụng"
          name="year"
          rules={[
            {
              required: true,
              message: 'Vui lòng Nhập năm áp dụng',
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{ marginRight: 20 + 'px' }} type="primary" danger onClick={() => setToggle(false)}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default ThemBangGiaDien;