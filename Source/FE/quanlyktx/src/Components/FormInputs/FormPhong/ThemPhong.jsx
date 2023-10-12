import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select,message } from 'antd';

import { ThemPhongService } from '../../../ApiServices/PhongAPI/ThemPhong';
import { GetAllLoaiPhongService } from '../../../ApiServices/LoaiPhong/GetAllLoaiPhong';


const ThemPhong = ({ success, GetAllPhongRefetch, setToggleThem }) => {
  const { ThemPhongResponse, ThemPhongIsLoading, ThemPhongError, callThemPhongRefetch } = ThemPhongService();
  const { GetAllLoaiNPhongesponse, GetAllLoaiNhPhongLoading, GetAPhongenError, GetAllLoaiPhongRefetch } = GetAllLoaiPhongService();
  const [messageApi, contextHolder] = message.useMessage();

  const error = (mess) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };

  useEffect(() => {
    if (ThemPhongResponse) {
      if (ThemPhongResponse.message === "Thêm phòng thành công") {
        setToggleThem(false);
        GetAllPhongRefetch();
        success(ThemPhongResponse.message);
      }
      else{
        error(ThemPhongResponse.message);
      }
    }
    if (ThemPhongError) {
      error('Đã có lỗi trong quá trình xử lý');
    }
  }, [ThemPhongResponse, ThemPhongError]);



  const onFinish = (values) => {
    const dataThem = {
      contracts: [],
      linkImg: "",
      status: 1,
      roomName: values.roomName,
      totalCapacity: +values.totalCapacity,
      availableCapacity: +values.totalCapacity,
      roomType: { id: values.roomType },
    }
    callThemPhongRefetch(dataThem);
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
        <h2 style={{ textAlign: 'center' }}>Thêm Phòng KTX</h2>
        <Form.Item
          label="Tên Phòng"
          name="roomName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Mã nhân viên!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tổng số giường"
          name="totalCapacity"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số giường',
            },
          ]}
        >
          <Input type='number' min={0} />
        </Form.Item>


        <Form.Item
          label="Loại Phòng"
          name="roomType"
          rules={[
            {
              required: true,
              message: 'Vui lòng Chọn loại phòng!',
            },
          ]}
        >
          <Select >
            {GetAllLoaiNPhongesponse ? GetAllLoaiNPhongesponse.map((value) => {
              return <Select.Option key={value.id} value={value.id}>{value.name}</Select.Option>
            }) : ''}
            
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
export default ThemPhong;