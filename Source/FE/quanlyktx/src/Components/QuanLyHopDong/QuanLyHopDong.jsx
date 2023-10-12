import React, { useEffect, useState } from 'react'
import TableCustom from '../Table/Table'
import { Button, Space, Tag, message } from 'antd';

import { GetAllHopDongService } from '../../ApiServices/HopDong/GetAllHopDong';
import { DuyetHopDongService } from '../../ApiServices/HopDong/DuyetHopDong';

export const QuanLyHopDong = () => {

  const { GetAllLoaiNPhongesponse, GetAllLoaiNhPhongLoading, GetLoaiPhongenError, GetAllHopDongRefetch } = GetAllHopDongService();
  const { DuyetHopDongResponse, DuyetHopDongIsLoading, DuyetHopDongError, callDuyetHopDong } = DuyetHopDongService();
  const [messageApi, contextHolder] = message.useMessage();

  const [title, setTitle] = useState();
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
  useEffect(() => {
    if (DuyetHopDongError) {
      error(`${title} Thất bại`);
    }
    if (DuyetHopDongResponse) {
      success(`${title} Thành công`);
      GetAllHopDongRefetch();
    }
  }, [DuyetHopDongResponse, DuyetHopDongError]);

  const handleDuyet = (id) => {
    callDuyetHopDong(id, 1);
    setTitle('Duyệt hợp đồng');
  }
  const handleHuy = (id) => {
    callDuyetHopDong(id, 2);
    setTitle('Hủy hợp đồng');
  }

  const columns = [
    {
      title: 'Mã hợp đồng',
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
      title: 'Nhân viên',
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

    {
      title: 'Chỉnh sửa',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button disabled={record.status === 0 ? false : true} onClick={() => handleDuyet(record.id)}>Duyệt </Button>
          <Button disabled={record.status === 0 ? false : (record.status === 1 ? false : true)} onClick={() => handleHuy(record.id)} danger>Hủy </Button>
        </Space >
      ),
    },
  ];


  return (
    <div style={{ position: 'relative' }}>
      {contextHolder}
      <TableCustom columns={columns} data={GetAllLoaiNPhongesponse ? GetAllLoaiNPhongesponse : ''} />
    </div>
  )
}
