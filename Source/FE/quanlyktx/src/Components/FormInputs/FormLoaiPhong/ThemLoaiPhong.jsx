import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';

import { ThemLoaiPhongService } from '../../../ApiServices/LoaiPhong/ThemLoaiPhong';


const ThemLoaiPhong = ({ success, GetAllLoaiPhongRefetch, setToggleThem }) => {
  const { ThemLoaiPhongResponse, ThemLoaiPhongIsLoading, ThemLoaiPhongError, callThemLoaiPhongRefetch } = ThemLoaiPhongService()

  useEffect(() => {
    if (ThemLoaiPhongResponse) {
      setToggleThem(false);
      GetAllLoaiPhongRefetch();
      success('Thêm Loại Phòng Thành Công');
    }
    if (ThemLoaiPhongError) {
      console.log(ThemLoaiPhongError);
    }
  }, [ThemLoaiPhongResponse, ThemLoaiPhongError]);



  const onFinish = (values) => {
    const dataThem = {
      linkImg: "",
      bedNumber: 0,
      image: values.image,
      price: values.price,
      name: values.name,
      roomGender: values.roomGender,
      description: values.description,
    }
    callThemLoaiPhongRefetch(dataThem);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='modal'>
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
        <h2 style={{ textAlign: 'center' }}>Thêm Loại Phòng KTX</h2>
        <Form.Item
          label="Tên Loại Phòng"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên loại phòng!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Mức giá"
          name="price"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền mức giá!',
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền mô tả!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phân loại"
          name="roomGender"
          rules={[
            {
              required: true,
              message: 'Vui lòng Chọn phân loại phòng!',
            },
          ]}
        >
          <Select >
            <Select.Option key={1} value={'Nam'}>Nam</Select.Option>
            <Select.Option key={2} value={'Nữ'}>Nữ</Select.Option>

          </Select>
        </Form.Item>




        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{ marginRight: 20 + 'px' }} type="primary" danger onClick={() => setToggleThem(false)}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default ThemLoaiPhong;