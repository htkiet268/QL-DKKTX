import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';

import { SuaBangGiaDienService } from '../../../ApiServices/HoaDonAPI/SuaBangGiaNuoc';


const SuaBangGiaDien = ({ dataSua, success, GetHoaDonByIDSVRefetch, setToggle }) => {
  const { SuaBangGiaDienResponse, SuaBangGiaDienIsLoading, SuaBangGiaDienError, callSuaBangGiaDienRefetch } = SuaBangGiaDienService();
  const [messageApi, contextHolder] = message.useMessage();
  const error = (mess) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };
  useEffect(() => {
    if (SuaBangGiaDienResponse) {
      if (SuaBangGiaDienResponse.message === "Sửa bảng giá nước thành công") {
        setToggle(false);
        GetHoaDonByIDSVRefetch();
        success(SuaBangGiaDienResponse.message);
      }
      else {
        error(SuaBangGiaDienResponse.message)
      }
    }
    if (SuaBangGiaDienError) {
      error('Có lỗi xảy ra trong quá trình xử lý');
    }
  }, [SuaBangGiaDienResponse, SuaBangGiaDienError]);



  const onFinish = (values) => {
    let data = {
      month: +values.month,
      year: +values.year,
      price: +values.price,
    }
    callSuaBangGiaDienRefetch(data,dataSua.id);
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
        initialValues={dataSua}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center' }}>Sửa bảng giá nước</h2>
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
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default SuaBangGiaDien;