import React, { useState } from 'react'
import TableCustom from '../../Table/Table';
import { Space, Tag, Button } from 'antd';

import { GetHopDongByIDSVService } from '../../../ApiServices/HopDong/GetAllHopDongByIDSV';
import HoaDonPhong from '../../FormInputs/FormHoaDonPhong/HoaDonPhong';

export const HopDongByIDSV = () => {
  const [toggle, setToggle] = useState(false);
  const { GetHopDongSVResponse, GetHopDongSVLoading, GetHopDongSVError, GetHopDongByIDSVRefetch } = GetHopDongByIDSVService();
  const [dataHoaDon, setDataHoaDon] = useState();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'Sinh viên thuê',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    },
    {
      title: 'Nhân viên duyệt',
      dataIndex: 'staffName',
      key: 'staffName',
    },
    {
      title: 'Giá tiền $',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <Space size="middle">
          <span>{record.price}</span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Space size="middle">
          <Tag style={record.status === 0 ? { color: 'brown' } : (record.status === 1 ? { color: 'blue' } : (record.status === 2 ? { color: 'red' } : { color: 'green' }))}>{record.status === 0 ? 'Chưa duyệt' : (record.status === 1 ? 'Đã duyệt' : (record.status === 2 ? 'Hủy' : 'Hoàn thành'))} </Tag>
        </Space>
      ),
    },
    {
      title: 'Thời hạn',
      key: 'expiryStatus',
      render: (_, record) => (
        <Space size="middle">
          <Tag style={record.expiryStatus === 1 ? { color: 'red' } : { color: 'green' }}> {record.expiryStatus === 1 ? 'Hết hạn' : 'Còn hạn'}</Tag>
        </Space>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
          disabled = {record.status === 3 ? false : true}  
          onClick={() => {
            localStorage.setItem('idHoaDon', record.id);
            setToggle(true)
          }}>Xem hóa đơn</Button>
        </Space>
      ),
    },

  ];


  return (
    <div style={{ position: 'relative' }}>
      <TableCustom columns={columns} data={GetHopDongSVResponse ? GetHopDongSVResponse : ''} />
      {
        toggle ? <HoaDonPhong dataCT={dataHoaDon} setToggleSua={setToggle} />
          : ''
      }
    </div>
  )
}
