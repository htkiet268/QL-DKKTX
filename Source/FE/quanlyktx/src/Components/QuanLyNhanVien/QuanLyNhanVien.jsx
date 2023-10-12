import React, { useEffect, useState } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, message } from 'antd';

import { GetAllNhanVienService } from '../../ApiServices/NhanVienAPI/GetAllNhanVien';
import { XoaNhanVienService } from '../../ApiServices/NhanVienAPI/XoaNhanVien';

import ThemNhanVien from '../FormInputs/FormNV/ThemNhanVien';
import SuaNhanVien from '../FormInputs/FormNV/SuaNhanVien';
import CapTaiKhoanNV from '../FormInputs/FormNV/CapTaiKhoanNV';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';


export const QuanLyNhanVien = () => {
  const { GetAllNhanVienResponse, GetAllNhanVienIsLoading, GetAllNhanVienError, GetAllNhanVienRefetch } = GetAllNhanVienService();
  const { XoaNhanVienResponse, XoaNhanVienIsLoading, XoaNhanVienError, callXoaNhanVienRefetch } = XoaNhanVienService();

  const [toggleThem, setToggleThem] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [toggleXoa, setToggleXoa] = useState(false);
  const [idXoa, setIdXoa] = useState();
  const [DataSua, setDataSua] = useState();


  const [toggleThemTK, setToggleThemTK] = useState(false);


  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  const error = (mes) => {
    messageApi.open({
      type: 'error',
      content: mes,
    });
  };

  useEffect(() => {
    if (XoaNhanVienResponse) {
      if (XoaNhanVienResponse.message === "Xóa nhân viên thành công") {
        setToggleXoa(false);
        GetAllNhanVienRefetch();
        success('Xóa Nhân Viên Thành Công');
      } else {
        setToggleXoa(false);
        error(XoaNhanVienResponse.message);
      }
    }
    if (XoaNhanVienError) {
      setToggleXoa(false);
      error('Đã có lỗi xảy ra');
    }
  }, [XoaNhanVienResponse, XoaNhanVienError]);

  const handleOnclickThem = () => {
    setToggleThem(true);
  };
  const handleClickXoa = (id) => {
    setIdXoa(id);
    setToggleXoa(true);
  };
  const actionXoa = () => {
    callXoaNhanVienRefetch(idXoa);
  };

  const handleClickSua = (infNV) => {
    setDataSua(infNV)
    setToggleSua(true);
  };

  const handleThemTK = () => {
    setToggleThemTK(true);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Mã NV',
      dataIndex: 'staffCode',
      key: 'staffCode',
    },
    {
      title: 'Họ Tên NV',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (_) => (
        <Space size="middle">
          {_ === 1 ? 'Nam' : 'Nữ'}

        </Space>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },

    {
      title: 'Chỉnh sửa',
      key: 'action',
      render: (_,) => (
        <Space size="middle">
          <Button onClick={() => handleClickSua(_)}>Sửa</Button>
          <Button danger onClick={() => handleClickXoa(_.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];



  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <Button onClick={handleThemTK} style={{ margin: '20px 72% 20px 20px' }}>Cấp tài khoản NV</Button>
      {
        GetAllNhanVienResponse ?
          <TableCustom handleOnclickThem={handleOnclickThem} title={'Nhân viên'} columns={columns} data={GetAllNhanVienResponse} />
          : ' '}
      {
        toggleThem ? <ThemNhanVien success={success} GetAllNhanVienRefetch={GetAllNhanVienRefetch} setToggleThem={setToggleThem} /> : ''
      }
      {
        toggleSua ? <SuaNhanVien DataSua={DataSua} success={success} GetAllNhanVienRefetch={GetAllNhanVienRefetch} setToggleSua={setToggleSua} /> : ''
      }
      {
        toggleThemTK ? <CapTaiKhoanNV GetAllNhanVienResponse={GetAllNhanVienResponse} success={success} GetAllNhanVienRefetch={GetAllNhanVienRefetch} setToggleThem={setToggleThemTK} /> : ''
      }
      {
        toggleXoa ? <FormXacNhan message='Bạn chắc chắn xóa Nhân viên này chứ?' setToggle={setToggleXoa} action={actionXoa} /> : ''
      }
    </div>
  )
}
