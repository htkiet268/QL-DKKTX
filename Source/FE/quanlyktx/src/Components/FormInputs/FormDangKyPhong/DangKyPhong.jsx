import React, { useEffect, useState } from 'react';
import { Button, message, Form, Input, Select } from 'antd';

import { ThemPhongService } from '../../../ApiServices/PhongAPI/ThemPhong';
import { DangKyKTXService } from '../../../ApiServices/HopDong/DangKyKTX';


const DangKyPhong = ({ GetAllPhongRefetch, success, card, setToggleThem }) => {
  const { DangKyKTXResponse, DangKyKTXIsLoading, DangKyKTXError, callDangKyKTXRefetch } = DangKyKTXService();
  const [tongTien, setTongTien] = useState({ totalprice: 0 });

  const [messageApi, contextHolder] = message.useMessage();
  
  const error = (mes) => {
    messageApi.open({
      type: 'error',
      content: mes,
    });
  };

  useEffect(() => {
    if (DangKyKTXResponse) {
      if (DangKyKTXResponse.message === "Đăng ký phòng thành công") {
        setToggleThem(false);
        GetAllPhongRefetch();
        success(DangKyKTXResponse.message);
      } else {
        error(DangKyKTXResponse.message);
      }
    }
    if (DangKyKTXError) {
      error('Lỗi thêm phòng');
    }
  }, [DangKyKTXResponse, DangKyKTXError]);



  const onFinish = (values) => {
    let today = new Date();
    let createAt = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + today.getDate();
    var startDate = new Date(values.dateStart);
    let dateEnd = new Date(startDate);
    dateEnd.setMonth(startDate.getMonth() + values.leaseDuration);
    let idSV = localStorage.getItem('idNV');
    const dataThem = {
      contractId: 1,//
      createAt: createAt,
      price: card.price * values.leaseDuration,
      status: 0,
      dateStart: values.dateStart,
      leaseDuration: values.leaseDuration,
      dateEnd: dateEnd.toISOString().split('T')[0],
      staffId: null,
      studentId: +idSV,
      roomId: card.id,
    }
    callDangKyKTXRefetch(dataThem);
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center' }}>Đăng ký Phòng KTX</h2>


        <Form.Item
          label="Ngày vào ở"
          name="dateStart"
          rules={[
            {
              required: true,
              message: 'Vui lòng Ngày vào ở',
            },
          ]}
        >
          <Input type='date' />
        </Form.Item>


        <Form.Item
          label="Gói thời gian"
          name="leaseDuration"
          rules={[
            {
              required: true,
              message: 'Vui lòng gói thời gian!',
            },
          ]}
        >
          <Select onSelect={(e) => {
            setTongTien(() => {
              return ({
                totalprice: card.price * e
              })
            })
          }}>
            <Select.Option key={3} value={3}>3 tháng</Select.Option>
            <Select.Option key={6} value={6}>6 tháng</Select.Option>
            <Select.Option key={12} value={12}>12 tháng</Select.Option>

          </Select>
        </Form.Item>
        <Form.Item
          label="Tổng tiền"
        >
          <div>{tongTien.totalprice + ' đồng'}</div>
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
export default DangKyPhong;