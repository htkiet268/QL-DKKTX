import React, { useState, useEffect } from 'react'
import { Select, message } from 'antd';
import CardsPhong from '../CardsPhong/CardsPhong'
import DangKyPhong from '../FormInputs/FormDangKyPhong/DangKyPhong';
import { GetAllPhongService } from '../../ApiServices/PhongAPI/GetAllPhong';
import { GetAllLoaiPhongService } from '../../ApiServices/LoaiPhong/GetAllLoaiPhong';

export const DichVuSinhVien = () => {
  const [toggleThem, setToggleThem] = useState(false);
  const { GetAllNPhongesponse, GetAllNhPhongLoading, GetAPhongenError, GetAllPhongRefetch } = GetAllPhongService();
  const { GetAllLoaiNPhongesponse, GetAllLoaiNhPhongLoading, GetLoaiPhongenError, GetAllLoaiPhongRefetch } = GetAllLoaiPhongService();

  const [LoaiPhong, setLoaiPhong] = useState();

  const [idHopDong, setIdHopDong] = useState();

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


  const handleOnSelect = (id) => {
    if(id === 0){
      setLoaiPhong(null)
    }else
      setLoaiPhong(GetAllNPhongesponse.filter((item) => item.roomTypeId === id))
  };

  const handleDangKy = (id) => {
    setIdHopDong(id);
    setToggleThem(true);
  }
  return (
    <div style={{ position: 'relative' }} className='container_Cards'>
      {contextHolder}

      <Select defaultValue={0} className='locPhong' onSelect={(e) => handleOnSelect(e)}>
        <Select.Option key={0} value={0}>Tất cả các phòng</Select.Option>
        {GetAllLoaiNPhongesponse?.map((item) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}

      </Select>
      {
        LoaiPhong ? LoaiPhong.map((card) => {
          return (<CardsPhong card={card} onClick={handleDangKy} />)
        }) : GetAllNPhongesponse?.map((card) => {
          return (<CardsPhong card={card} onClick={handleDangKy} />)
        })
      }

      {toggleThem ? <DangKyPhong GetAllPhongRefetch={GetAllPhongRefetch} card={GetAllNPhongesponse?.find((card) => { return card.id === idHopDong })} success={success} setToggleThem={setToggleThem} /> : null}
    </div>
  )
}
