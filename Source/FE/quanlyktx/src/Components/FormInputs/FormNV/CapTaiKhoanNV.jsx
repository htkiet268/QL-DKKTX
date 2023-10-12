import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { CapTKNhanVienService } from '../../../ApiServices/NhanVienAPI/CapTKNhanVien';



const CapTaiKhoanNV = ({ GetAllNhanVienResponse, success, GetAllNhanVienRefetch, setToggleThem }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectNV, setSelectNV] = useState({
    name: '',
    userName: '-- Chưa chọn nhân viên --',
  })

  const error = (mess) => {
    messageApi.open({
      type: 'error',
      content: mess,
    });
  };
  const { CapTKNhanVienResponse, CapTKNhanVienIsLoading, CapTKNhanVienError, callCapTKNhanVienRefetch } = CapTKNhanVienService();
  useEffect(() => {
    if (CapTKNhanVienResponse) {
      if (CapTKNhanVienResponse.message === "success") {
        setToggleThem(false);
        GetAllNhanVienRefetch();
        success('Cấp tài khoản Nhân Viên Thành Công');
      }
      else {
        error(CapTKNhanVienResponse.message);
      }
    }
    if (CapTKNhanVienError) {
      error('Đã có lỗi xảy ra trong quá trình xử lý');
    }
  }, [CapTKNhanVienResponse, CapTKNhanVienError]);

  const onFinish = (values) => {
    let dataNhanVien = GetAllNhanVienResponse.find((item) => item.staffCode === values.NhanVien);
    let data = {
      firstName: '',
      lastName: dataNhanVien.name,
      userName: values.NhanVien,
      password: values.password,
      matchingPassword: values.matchingPassword,
      email: values.email,
    };
    callCapTKNhanVienRefetch(data);

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='modal'>
      {contextHolder}
      <Form
        className='FormCustom'
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center' }}>Cấp Tài Khoản Nhân Viên</h2>
        <Form.Item
          label="Chọn nhân viên"
          name="NhanVien"
          rules={[
            {
              required: true,
              message: 'Vui lòng Chọn nhân viên!',
            },
          ]}
        >
          <Select onSelect={(e) => {
            let nv = GetAllNhanVienResponse.find((item) => item.staffCode === e);
            setSelectNV({
              name: nv.name,
              userName: nv.staffCode,
            });
          }}>
            {GetAllNhanVienResponse?.map((item) =>
              <Select.Option key={item.id} value={item.staffCode}>{item.name}</Select.Option>
            )}

          </Select>
        </Form.Item>
        <Form.Item
          label="UserName"
          name="userName"
        >
          <div>{selectNV.userName}</div>
        </Form.Item>
        
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email!',
            },
          ]}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Mật khẩu!',
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label="Nhập lại Mật khẩu"
          name="matchingPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại Mật khẩu!',
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{ marginRight: 20 + 'px' }} type="primary" danger onClick={() => setToggleThem(false)}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default CapTaiKhoanNV;