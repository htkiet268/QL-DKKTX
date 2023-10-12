import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { ThemSVService } from '../../../ApiServices/SinhVienAPI/ThemSV';



const ThemSV = ({ error, success, GetAllSVRefetch, setToggleThem }) => {
  const { ThemSVResponse, ThemSVIsLoading, ThemSVError, callThemSVRefetch } = ThemSVService();
  useEffect(() => {
    if (ThemSVResponse) {
      if (ThemSVResponse.message === "Mã sinh viên đã tồn tại") {
        error(ThemSVResponse.message);
      } else {
        setToggleThem(false);
        GetAllSVRefetch();
        success('Thêm Sinh Viên Thành Công');
      }
    }
    if (ThemSVError) {
      console.log(ThemSVError);
    }
  }, [ThemSVResponse, ThemSVError]);

  const onFinish = (values) => {
    callThemSVRefetch(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='modal'>
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
        <h2 style={{ textAlign: 'center' }}>Thêm Sinh Viên</h2>
        <Form.Item
          label="Mã Sinh Viên"
          name="studentCode"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Mã Sinh Viên!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ và tên sv!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email liên hệ"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giới tính!',
            },
          ]}
        >
          <Select>
            <Select.Option value={1}>Nam</Select.Option>
            <Select.Option value={2}>Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập ngày sinh!',
            },
          ]}
        >
          <Input type='date' />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Số điện thoại!',
            },
          ]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Số  CMND/CCCD"
          name="identityCard"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Số  CMND/CCCD!',
            },
          ]}
        >
          <Input type='number' />
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>)
}
export default ThemSV;