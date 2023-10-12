import React, { useState, useEffect } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, Tag, message } from 'antd';

import { GetHoaDonDienService } from '../../ApiServices/HoaDonAPI/PhieuDien/GetHoaDonDien';
import { GetHoaDonNuocBySVService } from '../../ApiServices/HoaDonAPI/PhieuNuoc/GetHoaDonNuocBySV';

import ThanhToan from '../FormInputs/FormThanhToan/ThanhToan';

export const HoaDonDienNuoc = () => {
  const { GetHoaDonDienResponse, GetHoaDonDienLoading, GetPhieuDienError, GetHoaDonDienRefetch } = GetHoaDonDienService();
  const { GetHoaDonNuocBySVResponse, GetHoaDonNuocBySVLoading, GetPhieuNuocBySVError, GetHoaDonNuocBySVRefetch } = GetHoaDonNuocBySVService();
  const [dataDien, setDataDien] = useState([]);
  const [dataNuoc, setDataNuoc] = useState([]);


  console.log(GetHoaDonDienResponse);
  useEffect(() => {
    if (GetHoaDonDienResponse) {
      if (GetHoaDonDienResponse.length != 0) {
        setDataDien(
          GetHoaDonDienResponse
        );
      }
    }
  }, [GetHoaDonDienResponse]);
  useEffect(() => {
    if (GetHoaDonNuocBySVResponse) {
      if (GetHoaDonNuocBySVResponse.length != 0) {
        setDataNuoc(
          GetHoaDonNuocBySVResponse
        );
      }
    }
  }, [GetHoaDonNuocBySVResponse]);

  const [toggle, setToggle] = useState(false);
  const [toggleNuoc, setToggleNuoc] = useState(false);


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

  const HandleThanhToan = (hoadon) => {
    if (hoadon.waterNumber) {
      setToggleNuoc(true);
      localStorage.setItem('idPhieuNuoc', hoadon.id);
    }
    else if (hoadon.electricNumber) {
      setToggle(true);
      localStorage.setItem('idPhieuDien', hoadon.id);
    }
  }

  const columns = [
    {
      title: 'Loại Hóa Đơn',
      render: (_, record) => (
        <Space size="middle">
          <span>{record.waterNumber ? 'Hóa đơn nước' : 'Hóa đơn điện'}</span>
        </Space>
      ),
      key: 'loaiHoaDon',
    },
    {
      title: 'Phòng',
      key: 'HoTen',
      render: (_, record) => (
        <Space size="middle">
          <span>{record?.room?.roomName}</span>
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      render: (_, record) => (
        <Space size="middle">
          <span>{record?.createAt}</span>
        </Space>
      ),
      key: 'createAt',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <Space size="middle">
          <span>{record?.price}</span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Space size="middle">
          <Tag style={record?.status === 0 ? { color: 'red' } : { color: 'green' }}>{record?.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'} </Tag>
        </Space>
      ),
    },

    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button disabled={record?.status === 0 ? false : true} onClick={() => HandleThanhToan(record)}>Thanh toán</Button>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom columns={columns} data={dataNuoc.concat(dataDien)} />
      {
        toggle ? <ThanhToan HoaDonDien={'Điện'} error={error} success={success} GetHoaDonByIDSVRefetch={GetHoaDonDienRefetch} setToggle={setToggle} /> : ''
      }
      {
        toggleNuoc ? <ThanhToan HoaDonNuoc={'Nước'} error={error} success={success} GetHoaDonByIDSVRefetch={GetHoaDonNuocBySVRefetch} setToggle={setToggleNuoc} /> : ''
      }
    </div>
  )
}
