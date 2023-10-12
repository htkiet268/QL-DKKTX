import React, { useEffect } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { SuaNhanVienService } from '../../../ApiServices/NhanVienAPI/SuaNhanVien';



const SuaNhanVien = ({ DataSua, success, GetAllNhanVienRefetch, setToggleSua }) => {
    const { SuaNhanVienResponse, SuaNhanVienIsLoading, SuaNhanVienError, callSuaNhanVienRefetch } = SuaNhanVienService();
    const [messageApi, contextHolder] = message.useMessage();
    const error = (mess) => {
        messageApi.open({
            type: 'error',
            content: mess,
        });
    };
    useEffect(() => {
        if (SuaNhanVienResponse) {
            if (SuaNhanVienResponse.message === "Sửa nhân viên thàn công") {
                setToggleSua(false);
                GetAllNhanVienRefetch();
                success('Sửa Nhân Viên Thành Công');
            }
            else {
                error(SuaNhanVienResponse.message);
            }
        }
        if (SuaNhanVienError) {
            error('Đã xảy ra lỗi trong quá trình xử lý');
        }
    }, [SuaNhanVienResponse, SuaNhanVienError]);

    const onFinish = (values) => {

        callSuaNhanVienRefetch(values, DataSua.id);

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
                initialValues={DataSua}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 style={{ textAlign: 'center' }}>Sửa Thông tin Nhân Viên</h2>
                <Form.Item
                    label="Mã Nhân Viên"
                    name="staffCode"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Mã nhân viên!',
                        },
                    ]}
                >
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    label="Họ và Tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên NV!',
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
                            message: 'Vui lòng nhập dob!',
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
                    <Input />
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
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button style={{ marginRight: 20 + 'px' }} type="primary" danger onClick={() => setToggleSua(false)}>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>)
}
export default SuaNhanVien;