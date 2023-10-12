import React, { useEffect } from 'react';
import { Button, Form, Input, Select,message } from 'antd';
import { SuaLoaiPhongService } from '../../../ApiServices/LoaiPhong/SuaLoaiPhong';




const SuaLoaiPhong = ({ dataLoaiPhongSua, success, GetAllLoaiPhongRefetch, setToggleSua }) => {
    const { SuaLoaiPhongResponse, SuaLoaiPhongIsLoading, SuaLoaiPhongError, callSuaLoaiPhongRefetch } = SuaLoaiPhongService();
    const [messageApi, contextHolder] = message.useMessage();

    const error = (mess) => {
        messageApi.open({
          type: 'error',
          content: mess,
        });
      };
    useEffect(() => {
        if (SuaLoaiPhongResponse) {
            if (SuaLoaiPhongResponse.message === "Sửa loại phòng thành công") {
                setToggleSua(false);
                GetAllLoaiPhongRefetch();
                success(SuaLoaiPhongResponse.message);
            }else{
                error(SuaLoaiPhongResponse.message)
            }
        }
        if (SuaLoaiPhongError) {
            console.log(SuaLoaiPhongError);
        }
    }, [SuaLoaiPhongResponse, SuaLoaiPhongError]);

    const onFinish = (values) => {
        const dataSua = {
            bedNumber: 0,
            image: null,
            price: values.price,
            name: values.name,
            roomGender: values.roomGender,
            description: values.description,
        }

        callSuaLoaiPhongRefetch(dataSua);
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
                initialValues={
                    dataLoaiPhongSua
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 style={{ textAlign: 'center' }}>Sửa Loại Phòng KTX</h2>
                <Form.Item
                    label="Tên Loại Phòng"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Tên Loại phòng!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá "
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số giường',
                        },
                    ]}
                >
                    <Input type='number' />
                </Form.Item>


                <Form.Item
                    label="Phân loại Phòng"
                    name="roomGender"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng Chọn loại phòng!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option key='Nam' values="Nam">Nam</Select.Option>
                        <Select.Option key="Nữ" values="Nữ">Nữ</Select.Option>
                    </Select>

                </Form.Item>

                <Form.Item
                    label="Mô tả "
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số giường',
                        },
                    ]}
                >
                    <Input type='textarea' />
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
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default SuaLoaiPhong;