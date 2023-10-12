import React, { useState } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, Tag, message } from 'antd';
import { GetHoaDonByIDSVService } from '../../ApiServices/HoaDonAPI/GetAllHoaDonByIDSV';
import ThanhToan from '../FormInputs/FormThanhToan/ThanhToan';
import Item from 'antd/es/list/Item';
import ChiTietHoaDonSinhVien from '../FormInputs/FormChiTietHoaDonSinhVien/ChiTietHoaDonSinhVien';

export const HoaDonSinhVien = () => {
  const { GetHoaDonSVResponse, GetHoaDonSVLoading, GetHoaDonSVError, GetHoaDonByIDSVRefetch } = GetHoaDonByIDSVService();
  const [toggleCT, setToggleCT] = useState(false);
  const [dataCT, setDataCT] = useState();

  const [toggle, setToggle] = useState(false);
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

  const HandleThanhToan = (id) => {
    setToggle(true);
    localStorage.setItem('idHoaDon', id);
  }
  const HandleChiTiet = (id) => {
    setToggleCT(true);
    setDataCT(GetHoaDonSVResponse.find((item) => item.id === id))
  };

  const columns = [
    {
      title: 'Mã Hóa Đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Họ Tên SV',
      key: 'HoTen',
      render: (_, record) => (
        <Space size="middle">
          <span>{record.contract.studentName}</span>
        </Space>
      ),
    },
    {
      title: 'Phòng đăng ký',
      key: 'room',
      render: (_, record) => (
        <Space size="middle">
          <span>{record.contract.roomName}</span>
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <Space size="middle">
          <span>{record.price} </span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Space size="middle">
          <Tag style={record.status === 0 ? { color: 'red' } : { color: 'green' }}>{record.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'} </Tag>
        </Space>
      ),
    },

    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => HandleChiTiet(record.id)}>Chi tiết</Button>
          <Button disabled={record.status === 0 ? false : true} onClick={() => HandleThanhToan(record.id)}>Thanh toán</Button>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom columns={columns} data={GetHoaDonSVResponse ? GetHoaDonSVResponse : ''} />
      {
        toggle ? <ThanhToan error={error} success={success} GetHoaDonByIDSVRefetch={GetHoaDonByIDSVRefetch} setToggle={setToggle} /> : ''
      }
      {
        toggleCT ? <ChiTietHoaDonSinhVien dataCT={dataCT} setToggleSua={setToggleCT} />
          : ''
      }
    </div>
  )
}
