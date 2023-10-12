import React, { useEffect } from 'react';
import { Button, Form, Input, Select,message } from 'antd';
import { SuaSVService } from '../../../ApiServices/SinhVienAPI/SuaSV';



const SuaSV = ({ dataSua, success, GetAllSinhVienRefetch, setToggleSua }) => {
    const { SuaNSVResponse, SuaNSVIsLoading, SuaNSVError, callSuaNSVRefetch } = SuaSVService();
    const [messageApi, contextHolder] = message.useMessage();

    const error = (mes) => {
      messageApi.open({
        type: 'error',
        content: mes,
      });
    };
    useEffect(() => {
        if (SuaNSVResponse) {
            if (SuaNSVResponse.message === "Sửa sinh viên thành công") {
                setToggleSua(false);
                GetAllSinhVienRefetch();
                success(SuaNSVResponse.message);
            }
            else {
                error(SuaNSVResponse.message);
            }
        }
        if (SuaNSVError) {
            error('Đã có lỗi xảy ra')
        }
    }, [SuaNSVResponse, SuaNSVError]);

    const onFinish = (values) => {

        callSuaNSVRefetch(dataSua.id, values);

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
                initialValues={dataSua}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 style={{ textAlign: 'center' }}>Sửa TT Sinh Viên</h2>
                <Form.Item
                    label="Mã Sinh Viên"
                    name="studentCode"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Mã Sinh viên!',
                        },
                    ]}
                >
                    <Input readOnly />
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
                    label="Email Liên hệ"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email Liên hệ!',
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
                    <Input type='date' defaultValue={dataSua.dob} />
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
                    label="CCCD / CMND"
                    name="identityCard"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập CCCD / CMND!',
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
export default SuaSV;