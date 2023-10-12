import React, { useState, useEffect } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, Tag, message } from 'antd';


import { GetAllGetAllBangGiaDienService } from '../../ApiServices/HoaDonAPI/GetAllBangGiaDien';
import { XoaBangGiaService } from '../../ApiServices/HoaDonAPI/XoaBangGiaDien';

import ThemBangGiaDien from '../FormInputs/FormBangGiaDien/ThemBangGiaDien';
import SuaBangGiaDien from '../FormInputs/FormBangGiaDien/SuaBangGiaDien';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';

export const HoaDonDien = () => {
  const { GetAllGetAllBangGiaDienResponse, GetAllGetAllBangGiaDienLoading, GetGetAllBangGiaDienError, GetAllGetAllBangGiaDienRefetch } = GetAllGetAllBangGiaDienService();
  const { XoaBangGiaResponse, XoaBangGiaIsLoading, XoaBangGiaError, callXoaBangGiaRefetch } = XoaBangGiaService();

  const [toggle, setToggle] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [toggleXoa, setToggleXoa] = useState(false);
  const [idXoa, setIdXoa] = useState();

  const [dataSua, setDataSua] = useState();

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

  const HandleThem = (id) => {
    setToggle(true);
    localStorage.setItem('idHoaDon', id);
  }
  const handleSua = (id) => {
    setDataSua(GetAllGetAllBangGiaDienResponse.find((item) => item.id === id))
    setToggleSua(true);
  };

  const handleXoa = (id) => {
    setToggleXoa(true);
    setIdXoa(id);
  };

  const actionXoa = () => {
    callXoaBangGiaRefetch(idXoa);
  }

  useEffect(() => {
    if (XoaBangGiaResponse) {
      if (XoaBangGiaResponse.message === "Xóa bảng giá điện thành công") {
        setToggleXoa(false);
        GetAllGetAllBangGiaDienRefetch();
        success(XoaBangGiaResponse.message);
      } else {
        error(XoaBangGiaResponse.message);
        setToggleXoa(false);
      }
    }
    if (XoaBangGiaError) {
      error('Đã có lỗi xảy ra');
      setToggleXoa(false);

    }
  }, [XoaBangGiaResponse, XoaBangGiaError]);

  const columns = [
    {
      title: 'Mã Bảng giá',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tháng áp dụng',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Năm áp dụng',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Giá điện',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Chỉnh sửa',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleSua(record.id)}>Sửa bảng giá </Button>
          <Button danger onClick={() => handleXoa(record.id)}>Xóa </Button>

        </Space>
      ),
    },

  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom handleOnclickThem={HandleThem} title={'Bảng giá điện mới'} columns={columns} data={GetAllGetAllBangGiaDienResponse ? GetAllGetAllBangGiaDienResponse : ''} />
      {
        toggle ? <ThemBangGiaDien error={error} success={success} GetHoaDonByIDSVRefetch={GetAllGetAllBangGiaDienRefetch} setToggle={setToggle} /> : ''
      }
      {
        toggleSua ? <SuaBangGiaDien dataSua={dataSua} success={success} GetHoaDonByIDSVRefetch={GetAllGetAllBangGiaDienRefetch} setToggle={setToggleSua} /> : ''
      }
      {
        toggleXoa ? <FormXacNhan message='Bạn chắc chắn xóa Giá điện này chứ?' setToggle={setToggleXoa} action={actionXoa} /> : ''
      }
    </div>
  )
}
