import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';

import { SuaPhieuDienService } from '../../../ApiServices/HoaDonAPI/PhieuNuoc/SuaPhieuDien';
import { GetAllPhongService } from '../../../ApiServices/PhongAPI/GetAllPhong';
import { GetAllGetAllBangGiaDienService } from '../../../ApiServices/HoaDonAPI/GetAllBangGiaNuoc';


const SuaPhieuDien = ({ dataSua, error, success, GetHoaDonByIDSVRefetch, setToggle }) => {
  const { SuaPhieuDienResponse, SuaPhieuDienIsLoading, SuaPhieuDienError, callSuaPhieuDienRefetch } = SuaPhieuDienService();
  const { GetAllNPhongesponse, GetAllNhPhongLoading, GetAPhongenError, GetAllPhongRefetch } = GetAllPhongService();
  const { GetAllGetAllBangGiaDienResponse, GetAllGetAllBangGiaDienLoading, GetGetAllBangGiaDienError, GetAllGetAllBangGiaDienRefetch } = GetAllGetAllBangGiaDienService();
  const [GiaDien, SetGiaDien] = useState();
  const [ThanhTien, SetThanhTien] = useState(dataSua.price);


  useEffect(() => {
    if (SuaPhieuDienResponse) {
      if (SuaPhieuDienResponse.message === "Cập nhật hóa đơn thành công") {
        setToggle(false);
        GetHoaDonByIDSVRefetch();
        success(SuaPhieuDienResponse.message);
      } else {
        error(SuaPhieuDienResponse.message);
      }
    }
    if (SuaPhieuDienError) {
      error('Đã có lỗi xảy ra trong quá trình xử lý');
    }
  }, [SuaPhieuDienResponse, SuaPhieuDienError]);



  const onFinish = (values) => {
    let data = {
      waterNumber: +values.waterNumber,
      price: ThanhTien,
      room: {
        id: dataSua.room.id,
      },
      waterTariffId: dataSua.waterTariffId
    }
    callSuaPhieuDienRefetch(data, dataSua.id);
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
        <h2 style={{ textAlign: 'center' }}>Sửa phiếu nước</h2>
        <Form.Item
          label="Phòng"
          name="room"

        >
          <div>{dataSua.room.roomName}</div>

        </Form.Item>

        <Form.Item
          label="Nhập số nước"
          name="waterNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng Nhập số nước',
            },
          ]}
        >
          <Input defaultValue={dataSua.waterNumber} onChange={(e) => SetThanhTien(e.target.value * GiaDien?.price)} type='number' />
        </Form.Item>

        <Form.Item
          label="Giá nước"
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
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default SuaPhieuDien;