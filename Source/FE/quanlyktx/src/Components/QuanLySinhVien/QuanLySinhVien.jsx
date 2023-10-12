import React, { useState, useEffect } from 'react'
import TableCustom from '../Table/Table'
import { Space, message, Button } from 'antd';

import { GetAllSinhVienService } from '../../ApiServices/SinhVienAPI/GetAllSinhVien';
import { XoaSVService } from '../../ApiServices/SinhVienAPI/XoaSV';

import ThemSV from '../FormInputs/FormSV/ThemSinhVien';
import SuaSV from '../FormInputs/FormSV/SuaSV';
import { FormXacNhan } from '../FormXacNhan/FormXacNhan';

export const QuanLySinhVien = () => {
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

  const [toggleThem, setToggleThem] = useState(false);
  const [toggleSua, setToggleSua] = useState(false);
  const [toggleXoa, setToggleXoa] = useState(false);

  const [dataSua, setDataSua] = useState();

  const { GetAllSinhVienResponse, GetSinhVienLoading, GetSinhVienError, GetAllSinhVienRefetch } = GetAllSinhVienService();
  const { XoaSVResponse, XoaSVIsLoading, XoaSVError, callXoaSVRefetch } = XoaSVService();

  const handleOnclickThem = () => {
    setToggleThem(true);
  }
  const handleSua = (id, studentCode) => {
    localStorage.setItem("idSV", id);
    localStorage.setItem("studentCode", studentCode);
    setDataSua(GetAllSinhVienResponse.find((student) => {
      return student.id === id;
    }))
    setToggleSua(true);
  }
  const handleXoa = (id) => {
    setToggleXoa(true);
    setDataSua(id);
  }
  const actionXoa = () => {
    callXoaSVRefetch(dataSua);
  }

  useEffect(() => {
    if (XoaSVError) {
      setToggleXoa(false);
      error('Sinh viên đã có hợp đồng!');
    }
    if (XoaSVResponse) {
      if (XoaSVResponse.message === "Xóa thành công") {
        success('Xóa Sinh Viên Thành Công');
        setToggleXoa(false);
        GetAllSinhVienRefetch();
      } else {
        setToggleXoa(false);
        error('Sinh viên đã có hợp đồng!');

      }
    }

  }, [XoaSVError, XoaSVResponse]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Họ và tên sinh viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'studentCode',
      key: 'studentCode',
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
      render: (_, record) => (
        _ === 1 ? 'Nam' : 'Nữ'
      ),
    },
    {
      title: 'Số CMND/CCCD',
      dataIndex: 'identityCard',
      key: 'identityCard',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },

    {
      title: 'Chỉnh sửa',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleSua(_.id, _.studentCode)}>Sửa </Button>
          <Button danger onClick={() => handleXoa(_.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom handleOnclickThem={handleOnclickThem} title={'sinh viên'} columns={columns} data={GetAllSinhVienResponse ? GetAllSinhVienResponse : ''} />
      {
        toggleThem ? <ThemSV error={error} success={success} GetAllSVRefetch={GetAllSinhVienRefetch} setToggleThem={setToggleThem} /> : ''
      }
      {
        toggleSua ? <SuaSV error={error} dataSua={dataSua} success={success} GetAllSinhVienRefetch={GetAllSinhVienRefetch} setToggleSua={setToggleSua} /> : ''
      }
      {
        toggleXoa ? <FormXacNhan message={'Bạn chắc chắn chưa?'} action={actionXoa} setToggle={setToggleXoa} /> : ''
      }
    </div>
  )
}
