import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';

import { ThanhToanService } from '../../../ApiServices/HoaDonAPI/ThanhToan';
import { ThanhToanPhieuDienService } from '../../../ApiServices/HoaDonAPI/PhieuDien/ThanhToanPhieuDien';
import { ThanhToanPhieuNuocService } from '../../../ApiServices/HoaDonAPI/PhieuNuoc/ThanhToanPhieuNuoc';


const ThanhToan = ({ HoaDonNuoc, HoaDonDien, error, success, GetHoaDonByIDSVRefetch, setToggle }) => {
  const { ThanhToanResponse, ThanhToanIsLoading, ThanhToanError, callThanhToanRefetch } = ThanhToanService();
  const { ThanhToanPhieuDienResponse, ThanhToanPhieuDienError, callThanhToanPhieuDienRefetch } = ThanhToanPhieuDienService();
  const { ThanhToanPhieuNuocResponse, ThanhToanPhieuNuocError, callThanhToanPhieuNuocRefetch } = ThanhToanPhieuNuocService();
  useEffect(() => {
    if (ThanhToanResponse) {
      if (ThanhToanResponse.message === "Thanh toán hóa đơn thành công") {
        setToggle(false);
        GetHoaDonByIDSVRefetch();
        success(ThanhToanResponse.message);
      }
      else {
        setToggle(false);
        error(ThanhToanResponse.message)
      }
    }
    if (ThanhToanError) {
      error('Thanh toán thất bại');
    }
  }, [ThanhToanResponse, ThanhToanError]);

  useEffect(() => {
    if (ThanhToanPhieuDienResponse) {
      if (ThanhToanPhieuDienResponse.message === "Thanh toán hóa đơn thành công") {
        setToggle(false);
        GetHoaDonByIDSVRefetch();
        success(ThanhToanPhieuDienResponse.message);
      }
      else {
        setToggle(false);
        error(ThanhToanPhieuDienResponse.message)
      }
    }
    if (ThanhToanPhieuDienError) {
      error('Thanh toán thất bại');
    }
  }, [ThanhToanPhieuDienResponse, ThanhToanPhieuDienError]);

  useEffect(() => {
    if (ThanhToanPhieuNuocResponse) {
      if (ThanhToanPhieuNuocResponse.message === "Thanh toán hóa đơn thành công") {
        setToggle(false);
        GetHoaDonByIDSVRefetch();
        success(ThanhToanPhieuNuocResponse.message);
      }
      else {
        setToggle(false);
        error(ThanhToanPhieuNuocResponse.message)
      }
    }
    if (ThanhToanPhieuNuocError) {
      error('Thanh toán thất bại');
    }
  }, [ThanhToanPhieuNuocResponse, ThanhToanPhieuNuocError]);

  const onFinish = (values) => {
    if (HoaDonDien) {
      callThanhToanPhieuDienRefetch();
    }
    else if (HoaDonNuoc) {
      callThanhToanPhieuNuocRefetch()
    }
    else {
      callThanhToanRefetch();

    }
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
        <h2 style={{ textAlign: 'center' }}>Thanh toán hóa đơn</h2>
        <Form.Item
          label="Nhập Số thẻ"
          name="soThe"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Số thẻ!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nhập ngày phát hành"
          name="ngayPhatHanh"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Ngày phát hành',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nhập tên chủ thẻ"
          name="ChuThe"
          rules={[
            {
              required: true,
              message: 'Vui lòng Nhập tên chủ thẻ',
            },
          ]}
        >
          <Input />
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
            Thanh toán
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default ThanhToan;