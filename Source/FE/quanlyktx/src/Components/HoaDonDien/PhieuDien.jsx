import React, { useState, useEffect } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, Tag, message } from 'antd';


import { GetAllPhieuDienService } from '../../ApiServices/HoaDonAPI/PhieuDien/GetAllHoaDon';
import { XoaPhieuDienService } from '../../ApiServices/HoaDonAPI/PhieuDien/XoaPhieuDien';

import ThemPhieuDien from '../FormInputs/FormBangGiaDien/ThemPhieuDien';
import SuaPhieuDien from '../FormInputs/FormBangGiaDien/SuaPhieuDien';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';

export const PhieuDien = () => {
  const { XoaPhieuDienResponse, XoaPhieuDienIsLoading, XoaPhieuDienError, callXoaPhieuDienRefetch } = XoaPhieuDienService();
  const { GetAllPhieuDienResponse, GetAllPhieuDienLoading, GetPhieuDienError, GetAllPhieuDienRefetch } = GetAllPhieuDienService();
  const [toggle, setToggle] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [dataSua, setDataSua] = useState();
  const [toggleXoa, setToggleXoa] = useState(false);
  const [idXoa, setIdXoa] = useState();

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

  const HandleThem = () => {
    setToggle(true);
  }
  const handleSua = (id) => {
    setDataSua(GetAllPhieuDienResponse.find((item) => item.id === id))
    setToggleSua(true);
  };
  const handleXoa = (id) => {
    setToggleXoa(true);
    setIdXoa(id);
  };

  const actionXoa = () => {
    callXoaPhieuDienRefetch(idXoa);
  }
  useEffect(() => {
    if (XoaPhieuDienResponse) {
      if (XoaPhieuDienResponse.message === "Xóa phiếu điện thành công") {
        setToggleXoa(false);
        GetAllPhieuDienRefetch();
        success(XoaPhieuDienResponse.message);
      } else {
        setToggleXoa(false);
        error(XoaPhieuDienResponse.message);
      }
    }
    if (XoaPhieuDienError) {
      setToggleXoa(false);
      error('Đã có lỗi xảy ra');
    }
  }, [XoaPhieuDienResponse, XoaPhieuDienError]);

  const columns = [
    {
      title: 'Mã Phiếu điện',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
      render: (_, record) => (
        <Space size="middle">
          {record?.room?.roomName}
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Số điện',
      dataIndex: 'electricNumber',
      key: 'electricNumber',
    },
    {
      title: 'Thành tiền',
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
          <Button onClick={() => handleSua(record.id)}>Sửa phiếu </Button>
          <Button danger onClick={() => handleXoa(record.id)}>Xóa </Button>

        </Space>
      ),
    },

  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom handleOnclickThem={HandleThem} title={'phiếu điện'} columns={columns} data={GetAllPhieuDienResponse ? GetAllPhieuDienResponse : ''} />
      {
        toggle ? <ThemPhieuDien error={error} success={success} GetHoaDonByIDSVRefetch={GetAllPhieuDienRefetch} setToggle={setToggle} /> : ''
      }
      {
        toggleSua ? <SuaPhieuDien dataSua={dataSua} error={error} success={success} GetHoaDonByIDSVRefetch={GetAllPhieuDienRefetch} setToggle={setToggleSua} /> : ''
      }
      {
        toggleXoa ? <FormXacNhan message='Bạn chắc chắn xóa phiếu điện này chứ?' setToggle={setToggleXoa} action={actionXoa} /> : ''
      }
    </div>
  )
}
