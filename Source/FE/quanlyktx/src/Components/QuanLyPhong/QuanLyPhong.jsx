import React, { useState, useEffect } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, message, Tag } from 'antd';

import { GetAllPhongService } from '../../ApiServices/PhongAPI/GetAllPhong';
import { XoaPhongService } from '../../ApiServices/PhongAPI/XoaPhong';
import { GetAllLoaiPhongService } from '../../ApiServices/LoaiPhong/GetAllLoaiPhong';

import ThemPhong from '../FormInputs/FormPhong/ThemPhong';
import SuaPhong from '../FormInputs/FormPhong/SuaPhong';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';


export const QuanLyPhong = () => {
  const [dataPhongSua, setDataPhongSua] = useState();
  const [idXoa, setIdXoa] = useState();

  const { GetAllNPhongesponse, GetAllPhongRefetch } = GetAllPhongService();
  const { XoaPhongResponse, XoaPhongError, callXoaPhongRefetch } = XoaPhongService();
  const { GetAllLoaiNPhongesponse } = GetAllLoaiPhongService();



  const [toggleThem, setToggleThem] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [toggleXoa, setToggleXoa] = useState(false);


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


  const handleOnclickThem = () => {
    setToggleThem(true);
  }
  const handleOnclickSua = (id) => {
    localStorage.setItem('idPhong', id);

    if (GetAllNPhongesponse) {
      setDataPhongSua(GetAllNPhongesponse.filter((data) => {
        return data.id === id;
      }))
    }
    setToggleSua(true);
  }
  const handleOnclickXoa = (id) => {
    setToggleXoa(true);
    setIdXoa(id);
  }
  const actionXoa = () => {
    callXoaPhongRefetch(idXoa);
  };

  useEffect(() => {
    if (XoaPhongError) {
      setToggleXoa(false);
      error('Đã xảy ra lỗi trong quá trình xử lý');
    }
    if (XoaPhongResponse) {
      if (XoaPhongResponse.message === "Xóa phòng thành công") {
        success(XoaPhongResponse.message)
        setToggleXoa(false);
        GetAllPhongRefetch();
      }
      else {
        setToggleXoa(false);
        error(XoaPhongResponse.message);
      }
    }

  }, [XoaPhongError, XoaPhongResponse]);

  const columns = [
    {
      title: 'Mã Phòng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Tổng Giường',
      dataIndex: 'totalCapacity',
      key: 'totalCapacity',
    },
    {
      title: 'Số Giường Trống',
      dataIndex: 'availableCapacity',
      key: 'availableCapacity',
    },
    {
      title: 'Loại Phòng',
      dataIndex: 'roomTypeId',
      key: 'roomTypeId',
      render: (_, record) => (
        <Space size="middle">
          {(GetAllLoaiNPhongesponse?.find((item) => {
            return item.id === record.roomTypeId;
          }))?.name}
        </Space>
      ),
    },

    {
      title: 'Chỉnh sửa',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleOnclickSua(_.id)}>Sửa </Button>
          <Button danger onClick={() => handleOnclickXoa(_.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom handleOnclickThem={handleOnclickThem} title={'phòng'} columns={columns} data={GetAllNPhongesponse ? GetAllNPhongesponse : ''} />
      {
        toggleThem ? <ThemPhong success={success} GetAllPhongRefetch={GetAllPhongRefetch} setToggleThem={setToggleThem} /> : ''
      }
      {
        toggleSua ? (dataPhongSua ? <SuaPhong dataPhongSua={dataPhongSua[0]} success={success} GetAllPhongRefetch={GetAllPhongRefetch} setToggleSua={setToggleSua} /> : '') : ''
      }
      {
        toggleXoa ? <FormXacNhan message={'Bạn chắc chắn xóa chứ?'} setToggle={setToggleXoa} action={actionXoa} /> : ''
      }
    </div>
  )
}
