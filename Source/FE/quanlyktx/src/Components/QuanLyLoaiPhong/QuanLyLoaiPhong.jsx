import React, { useState, useEffect } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, message } from 'antd';

import { GetAllLoaiPhongService } from '../../ApiServices/LoaiPhong/GetAllLoaiPhong';
import { XoaLoaiPhongService } from '../../ApiServices/LoaiPhong/XoaLoaiPhong';

import ThemLoaiPhong from '../FormInputs/FormLoaiPhong/ThemLoaiPhong';
import SuaLoaiPhong from '../FormInputs/FormLoaiPhong/SuaLoaiPhong';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';


export const QuanLyLoaiPhong = () => {
  const { GetAllLoaiNPhongesponse, GetAllLoaiPhongRefetch } = GetAllLoaiPhongService();
  const { XoaLoaiPhongResponse, XoaLoaiPhongError, callXoaLoaiPhongRefetch } = XoaLoaiPhongService();

  const [toggleThem, setToggleThem] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [toggleXoa, setToggleXoa] = useState(false);
  const [IdXoa, setIdXoa] = useState();


  const [dataLoaiPhongSua, setdataLoaiPhongSua] = useState({});


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
    localStorage.setItem('idLoaiPhong', id);

    setdataLoaiPhongSua(GetAllLoaiNPhongesponse.find((item) => {
      return item.id === id;
    }));

    setToggleSua(true);
  }
  const handleOnclickXoa = (id) => {
    setIdXoa(id);
    setToggleXoa(true);
  }
  const actionXoa = () => {
    callXoaLoaiPhongRefetch(IdXoa);

  };

  useEffect(() => {
    if (XoaLoaiPhongError) {
      error('Loại phòng này đã có phòng!');
    }
    if (XoaLoaiPhongResponse) {
      if (XoaLoaiPhongResponse.message === "Loại phòng đã có phòng. Không thể xóa") {
        setToggleXoa(false);
        error(XoaLoaiPhongResponse.message);
      }
      else {
        setToggleXoa(false);
        success('Xóa loại phòng thành công!')
        GetAllLoaiPhongRefetch();
      }
    }

  }, [XoaLoaiPhongError, XoaLoaiPhongResponse]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên Loại Phòng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phân loại ',
      dataIndex: 'roomGender',
      key: 'roomGender',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
      <TableCustom handleOnclickThem={handleOnclickThem} title={'Loại Phòng'} columns={columns} data={GetAllLoaiNPhongesponse ? GetAllLoaiNPhongesponse : ''} />
      {
        toggleThem ? <ThemLoaiPhong success={success} GetAllLoaiPhongRefetch={GetAllLoaiPhongRefetch} setToggleThem={setToggleThem} /> : ''
      }
      {
        toggleSua ? <SuaLoaiPhong dataLoaiPhongSua={dataLoaiPhongSua} success={success} GetAllLoaiPhongRefetch={GetAllLoaiPhongRefetch} setToggleSua={setToggleSua} /> : ''
      }
      {
        toggleXoa ? <FormXacNhan message={'Bạn chắc chắn xóa chứ?'} setToggle={setToggleXoa} action={actionXoa} /> : ''
      }
    </div>
  )
}
