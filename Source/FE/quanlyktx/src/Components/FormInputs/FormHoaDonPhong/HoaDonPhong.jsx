import React, { useEffect } from 'react';
import { Button, Space, Tag, message } from 'antd';

import TableCustom from '../../Table/Table';
import { GetHoaDonPhongService } from '../../../ApiServices/HoaDonAPI/GetHoaDonPhong';


const HoaDonPhong = ({ dataCT, setToggleSua }) => {
    const { GetHoaDonPhongSVResponse, GetHoaDonPhongSVLoading, GetHoaDonPhongSVError, GetHoaDonPhongRefetch } = GetHoaDonPhongService();

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

console.log(GetHoaDonPhongSVResponse);
    const columns =
        [
            {
                title: 'Mã Hóa Đơn',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Phòng',
                render: (_, record) => (
                    <Space size="middle">
                        <span>{record.contract.roomName}</span>
                    </Space>
                ),
                key: 'roomName',
            },
            {
                title: 'Họ Tên SV',
                key: 'HoTen',
                render: (_, record) => (
                    <Space size="middle">
                        <span>{record.contract.studentName}</span>
                    </Space>
                ),
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createAt',
                key: 'createAt',
            },
            {
                title: 'Nhân viên tạo',
                render: (_, record) => (
                    <Space size="middle">
                        <span>{record.contract.staffName}</span>
                    </Space>
                ),
                key: 'staffName',
            },
            {
                title: 'Tổng tiền',
                dataIndex: 'price',
                key: 'price',
                render: (_, record) => (
                    <Space size="middle">
                        <span>{record.price}</span>
                    </Space>
                ),
            },
            {
                title: 'Trạng thái',
                key: 'status',
                render: (_, record) => (
                    <Space size="middle">
                        <Tag style={record.status === 0 ? { color: 'red' } : { color: 'green' }}>{record.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'} </Tag>
                    </Space>
                ),
            },

        ];

    return (
        <div className='modal' onClick={() => setToggleSua(false)}>
            <div style={{ position: 'relative' }}>
                <TableCustom columns={columns} data={GetHoaDonPhongSVResponse ? GetHoaDonPhongSVResponse : ''} />
            </div>
        </div>)
}
export default HoaDonPhong;