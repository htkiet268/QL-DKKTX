import React, { useEffect } from 'react';
import { Button, Space, Tag } from 'antd';

import TableCustom from '../../Table/Table';



const ChiTietHoaDon = ({ dataCT, error, success, GetAllSinhVienRefetch, setToggleSua }) => {
    console.log(dataCT);
    const data = [dataCT.contract];

    const columns =
        [
            {
                title: 'Mã HĐ',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Phòng',
                dataIndex: 'roomName',
                key: 'roomName',
            },
            {
                title: 'Ngày bắt đầu',
                dataIndex: 'dateStart',
                key: 'dateStart',
            },
            {
                title: 'Sinh viên thuê',
                dataIndex: 'studentName',
                key: 'studentName',
            },
            {
                title: 'Ngày kết thúc',
                dataIndex: 'dateEnd',
                key: 'dateEnd',
            },
            {
                title: 'Nhân viên duyệt',
                dataIndex: 'staffName',
                key: 'staffName',
            },
            {
                title: 'Giá tiền $',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Trạng thái',
                key: 'status',
                render: (_, record) => (
                  <Space size="middle">
                    <Tag style={record.status === 0 ? { color: 'brown' } : (record.status === 1 ? { color: 'blue' } : (record.status === 2 ? { color: 'red' } : { color: 'green' }))}>{record.status === 0 ? 'Chưa duyệt' : (record.status === 1 ? 'Đã duyệt' : (record.status === 2 ? 'Hủy' : 'Hoàn thành'))} </Tag>
                  </Space>
                ),
              },
        ]

    return (
        <div className='modal' onClick={()=>setToggleSua(false)}>
            <div style={{ position: 'relative' }}>
                <TableCustom columns={columns} data={data}/>
            </div>
        </div>)
}
export default ChiTietHoaDon;