import React, { useState } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, Tag } from 'antd';
import { GetAllHoaDonService } from '../../ApiServices/HoaDonAPI/GetAllHoaDon';
import ChiTietHoaDon from '../FormInputs/FormChiTietHoaDon/ChiTietHoaDon';

export const QuanLyHoaDon = () => {
  const { GetAllHoaDonResponse, GetAllLoaiNhPhongLoading, GetLoaiPhongenError, GetAllHoaDonRefetch } = GetAllHoaDonService();
  const [toggle, setToggle] = useState(false);
  const [dataCT, setdataCT] = useState();
  

  const handleChiTiet = (data) => {
    setdataCT(data);
    setToggle(true);
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
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
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
      title: 'Chỉnh sửa',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleChiTiet(record)}>Chi tiết </Button>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ position: 'relative' }}>
      <TableCustom columns={columns} data={GetAllHoaDonResponse ? GetAllHoaDonResponse : ''} />
    {
      toggle ? <ChiTietHoaDon dataCT={dataCT} setToggleSua={setToggle}/>
      :''
    }
    </div>
  )
}
