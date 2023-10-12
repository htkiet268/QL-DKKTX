import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { SuaPhongService } from '../../../ApiServices/PhongAPI/SuaPhong';
import { GetAllLoaiPhongService } from '../../../ApiServices/LoaiPhong/GetAllLoaiPhong';




const SuaPhong = ({ dataPhongSua,success, GetAllPhongRefetch, setToggleSua }) => {

    const { GetAllLoaiNPhongesponse, GetAllLoaiNhPhongLoading, GetAPhongenError, GetAllLoaiPhongRefetch } = GetAllLoaiPhongService();
    const { SuaNPhongResponse, SuaNPhongIsLoading, SuaNPhongError, callSuaNPhongRefetch } = SuaPhongService();
    const idNV = localStorage.getItem('idNV');

    useEffect(() => {
        if (SuaNPhongResponse) {
            setToggleSua(false);
            GetAllPhongRefetch();
            success('Sửa Phòng Thành Công');
        }
        if (SuaNPhongError) {
            console.log(SuaNPhongError);
        }
    }, [SuaNPhongResponse, SuaNPhongError]);

    const onFinish = (values) => {
        const dataSua = {
            contracts: [],
            linkImg: "",
            status: 1,
            roomName: values.roomName,
            totalCapacity: +values.totalCapacity,
            availableCapacity: +values.totalCapacity,
            roomType: { id: values.roomType },
          }
        callSuaNPhongRefetch(dataSua);

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
                initialValues={
                    dataPhongSua
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2 style={{ textAlign: 'center' }}>Sửa Phòng KTX</h2>
                <Form.Item
                    label="Tên Phòng"
                    name="roomName"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Tên phòng!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tổng số giường"
                    name="totalCapacity"
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
                    label="Loại Phòng"
                    name="roomType"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng Chọn loại phòng!',
                        },
                    ]}
                    initialValue={dataPhongSua.roomTypeId}
                >
                    <Select defaultValue={dataPhongSua.roomTypeId}>
                        {GetAllLoaiNPhongesponse ? GetAllLoaiNPhongesponse.map((value) => {
                            return <Select.Option key={value.id} value={value.id}>{value.name}</Select.Option>
                        }) : ''}

                    </Select>
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
export default SuaPhong;