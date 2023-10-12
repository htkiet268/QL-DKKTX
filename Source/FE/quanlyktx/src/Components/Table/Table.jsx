import React from 'react';
import { Button, Table } from 'antd';


const TableCustom = ({ handleOnclickThem,title, columns, data }) => {
    return <>
        {title ? <Button onClick={handleOnclickThem} style={{margin: '20px 0'}}>Thêm {title}</Button> : ''}
        <Table columns={columns} dataSource={data} />
    </>
};
export default TableCustom;