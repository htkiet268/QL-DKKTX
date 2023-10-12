import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';

import { ThemPhieuDienService } from '../../../ApiServices/HoaDonAPI/PhieuDien/ThemPhieuDien';
import { GetAllPhongService } from '../../../ApiServices/PhongAPI/GetAllPhong';
import { GetAllGetAllBangGiaDienService } from '../../../ApiServices/HoaDonAPI/GetAllBangGiaDien';


const ThemPhieuDien = ({ success, GetHoaDonByIDSVRefetch, setToggle }) => {
  const { ThemPhieuDienResponse, ThemPhieuDienIsLoading, ThemPhieuDienError, callThemPhieuDienRefetch } = ThemPhieuDienService();
  const { GetAllNPhongesponse, GetAllNhPhongLoading, GetAPhongenError, GetAllPhongRefetch } = GetAllPhongService();
  const { GetAllGetAllBangGiaDienResponse, GetAllGetAllBangGiaDienLoading, GetGetAllBangGiaDienError, GetAllGetAllBangGiaDienRefetch } = GetAllGetAllBangGiaDienService();
  const [GiaDien, SetGiaDien] = useState();
  const [ThanhTien, SetThanhTien] = useState();

  const [messageApi, contextHolder] = message.useMessage();

  const error = (mess) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };

  useEffect(() => {
    if (ThemPhieuDienResponse) {
      if (ThemPhieuDienResponse.message === "Đã có hóa đơn tháng năm này") {
        error(ThemPhieuDienResponse.message);
      }
      else {
        setToggle(false);
        success('Thêm phiếu Thành Công');
        GetHoaDonByIDSVRefetch();
      }
    }
    if (ThemPhieuDienError) {
      error('Thêm phiếu thất bại');
    }
  }, [ThemPhieuDienResponse, ThemPhieuDienError]);



  const onFinish = (values) => {
    let data = {
      electricNumber: +values.electricNumber,
      price: ThanhTien,
      room: {
        id: values.room,
      },
      electricTariffId: GiaDien.id
    }
    callThemPhieuDienRefetch(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
    if (GetAllGetAllBangGiaDienResponse) {
      let maxMonth = 0;
      let maxYear = 0;
      GetAllGetAllBangGiaDienResponse.map((element) => {
        if (maxYear <= element.year) {
          maxYear = element.year;
        }
      });
      GetAllGetAllBangGiaDienResponse.map((element) => {
        if (maxMonth <= element.month && maxYear <= element.year) {
          maxMonth = element.month;
        }
      });
      SetGiaDien(GetAllGetAllBangGiaDienResponse.find((element) => { return element.month === maxMonth && element.year === maxYear }))
    }
  }, [GetAllGetAllBangGiaDienResponse]);

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
        <h2 style={{ textAlign: 'center' }}>Lập phiếu điện</h2>
        <Form.Item
          label="Chọn phòng"
          name="room"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn phòng!',
            },
          ]}
        >
          <Select>
            {GetAllNPhongesponse?.map((item) => <Select.Option key={item.id} value={item.id}>{item.roomName}</Select.Option>)}

          </Select>

        </Form.Item>

        <Form.Item
          label="Nhập số điện"
          name="electricNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng Nhập số điện',
            },
          ]}
        >
          <Input onChange={(e) => SetThanhTien(e.target.value * GiaDien?.price)} type='number' />
        </Form.Item>

        <Form.Item
          label="Giá điện"
        >
          <div>{GiaDien?.price} đồng</div>
        </Form.Item>

        <Form.Item
          label="Thành tiền"
        >
          <div>{ThanhTien} đồng</div>
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
export default ThemPhieuDien;