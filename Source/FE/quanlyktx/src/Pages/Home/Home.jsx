import React, { useEffect, useState } from 'react';
import {
    ContainerFilled,
    EuroCircleFilled,
    ScheduleFilled,
    SafetyCertificateFilled,
    ContactsFilled,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import './Home.css'
import { QuanLySinhVien } from '../../Components/QuanLySinhVien/QuanLySinhVien';
import { QuanLyNhanVien } from '../../Components/QuanLyNhanVien/QuanLyNhanVien';
import { QuanLyPhong } from '../../Components/QuanLyPhong/QuanLyPhong';
import { DichVuSinhVien } from '../../Components/DichVuSinhVien/DichVuSinhVien'
import { QuanLyHopDong } from '../../Components/QuanLyHopDong/QuanLyHopDong';
import { QuanLyHoaDon } from '../../Components/QuanLyHoaDon/QuanLyHoaDon';
import { QuanLyLoaiPhong } from '../../Components/QuanLyLoaiPhong/QuanLyLoaiPhong';
import { HopDongByIDSV } from '../../Components/QuanLyHopDong/HopDongByIIDSinhVien/HopDongBy_IDSV';
import { HoaDonSinhVien } from '../../Components/HoaDonSinhVIen/HoaDonSinhVien';
import { HoaDonDien } from '../../Components/HoaDonDien/HoaDonDien';
import { HoaDonNuoc } from '../../Components/HoaDonNuoc/HoaDonNuoc';
import { PhieuDien } from '../../Components/HoaDonDien/PhieuDien';
import { PhieuNuoc } from '../../Components/HoaDonNuoc/PhieuNuoc';
import { HoaDonDienNuoc } from '../../Components/HoaDonSinhVIen/HoaDonDienNuoc';


const { Header, Content, Footer, Sider } = Layout;


const Home = () => {
    const [role, setRole] = useState(() => localStorage.getItem('role'));
    const item = role === 'ROLE_USER' ? [
        {
            key: '6',
            icon: <ScheduleFilled />,
            label: 'Dịch vụ Sinh viên',
        },
        {
            key: '7',
            icon: <ContainerFilled />,
            label: 'Hợp đồng của Sinh viên',
        },
        {
            key: '8',
            icon: <EuroCircleFilled />,
            label: 'Hóa Đơn Sinh Viên',
        }, {
            key: '13',
            icon: <EuroCircleFilled />,
            label: 'Hóa Đơn Điện-Nước',
        },
    ]
        :
        (role === 'ROLE_STAFF'
            ?
            [
                {
                    key: '1',
                    icon: <ContactsFilled />,
                    label: 'Quản Lý Sinh Viên',
                },
                {
                    key: '2',
                    icon: <SafetyCertificateFilled />,
                    label: 'Quản Lý phòng',
                },
                {
                    key: '3',
                    icon: <SafetyCertificateFilled />,
                    label: 'Quản Lý Loại phòng',
                },
                {
                    key: '4',
                    icon: <ContainerFilled />,
                    label: 'Quản Lý Hợp Đồng',
                },
                {
                    key: '5',
                    icon: <EuroCircleFilled />,
                    label: 'Quản Lý Hóa Đơn',
                },
                {
                    key: '9',
                    icon: <EuroCircleFilled />,
                    label: 'Quản Lý Bảng giá điện',
                },
                {
                    key: '11',
                    icon: <EuroCircleFilled />,
                    label: 'Phiếu điện',
                },
                {
                    key: '10',
                    icon: <EuroCircleFilled />,
                    label: 'Quản Lý Bảng giá nước',
                },


                {
                    key: '12',
                    icon: <EuroCircleFilled />,
                    label: 'Phiếu nước',
                },
            ]
            :
            [
                {
                    key: '0',
                    icon: <ContactsFilled />,
                    label: 'Quản Lý Nhân Viên',
                },
                {
                    key: '1',
                    icon: <ContactsFilled />,
                    label: 'Quản Lý Sinh Viên',
                },
                {
                    key: '2',
                    icon: <SafetyCertificateFilled />,
                    label: 'Quản Lý phòng',
                },
                {
                    key: '3',
                    icon: <SafetyCertificateFilled />,
                    label: 'Quản Lý Loại phòng',
                },
                {
                    key: '4',
                    icon: <ContainerFilled />,
                    label: 'Quản Lý Hợp Đồng',
                },
                {
                    key: '5',
                    icon: <EuroCircleFilled />,
                    label: 'Quản Lý Hóa Đơn',
                },
                {
                    key: '9',
                    icon: <EuroCircleFilled />,
                    label: 'Quản Lý Bảng giá điện',
                },
                {
                    key: '11',
                    icon: <EuroCircleFilled />,
                    label: 'Phiếu điện',
                },
                {
                    key: '10',
                    icon: <EuroCircleFilled />,
                    label: 'Quản Lý Bảng giá Nước',
                },

                {
                    key: '12',
                    icon: <EuroCircleFilled />,
                    label: 'Phiếu nước',
                },
            ]
        )
        ;


    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
    })
    const username = localStorage.getItem('username');
    const handleDangXuat = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/')
    }

    const [selectKey, setSelectKey] = useState(role === 'ROLE_USER' ? '6' : (role === 'ROLE_STAFF' ? '1' : '0'));

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div className="home_title" ><h3>Quản lý KTX Sinh Viên</h3></div>
                <div className='user_infor' onClick={() => handleDangXuat()}>
                    <div className="username">
                        {username}
                    </div>
                    <div className="IconDangXuat">
                        <LogoutOutlined />
                    </div>
                </div>
            </Header>
            <Content
                style={{
                    padding: '0px 50px 40px 50px',
                    minHeight: '600px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    {
                        selectKey === '0' ? <Breadcrumb.Item>Quản Lý Nhân Viên</Breadcrumb.Item> :

                            selectKey === '1' ? <Breadcrumb.Item>Quản Lý Sinh Viên</Breadcrumb.Item> :

                                selectKey === '2' ? <Breadcrumb.Item>Quản Lý phòng</Breadcrumb.Item> :

                                    selectKey === '3' ? <Breadcrumb.Item>Quản Lý Loại phòng</Breadcrumb.Item> :

                                        selectKey === '4' ? <Breadcrumb.Item>Quản Lý Hợp Đồng</Breadcrumb.Item> :

                                            selectKey === '5' ? <Breadcrumb.Item>Quản Lý Hóa Đơn</Breadcrumb.Item> :

                                                selectKey === '6' ? <Breadcrumb.Item>Dịch vụ sinh viên</Breadcrumb.Item> :

                                                    selectKey === '7' ? <Breadcrumb.Item>Hợp đồng sinh viên</Breadcrumb.Item> :

                                                        selectKey === '8' ? <Breadcrumb.Item>Hóa Đơn Sinh Viên</Breadcrumb.Item> :

                                                            selectKey === '9' ? <Breadcrumb.Item>Quản lý Giá điện</Breadcrumb.Item> :

                                                                selectKey === '11' ? <Breadcrumb.Item>Phiếu điện</Breadcrumb.Item> :

                                                                    selectKey === '10' ? <Breadcrumb.Item>Quản lý Giá nước</Breadcrumb.Item> :


                                                                        selectKey === '12' ? <Breadcrumb.Item>Phiếu nước</Breadcrumb.Item> :

                                                                            selectKey === '13' ? <Breadcrumb.Item>Hóa đơn Điện - Nước</Breadcrumb.Item> :

                                                                                ''
                    }



                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={role === 'ROLE_USER' ? ['6'] : (role === 'ROLE_STAFF' ? ['1'] : ['0'])}
                            style={{
                                height: '100%',
                            }}
                            onSelect={(e) => setSelectKey(e.key)}
                            items={item}
                        />
                    </Sider>

                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        {
                            selectKey === '0' ? <QuanLyNhanVien /> :

                                selectKey === '1' ? <QuanLySinhVien /> :

                                    selectKey === '2' ? <QuanLyPhong /> :

                                        selectKey === '3' ? <QuanLyLoaiPhong /> :

                                            selectKey === '4' ? <QuanLyHopDong /> :

                                                selectKey === '5' ? <QuanLyHoaDon /> :

                                                    selectKey === '6' ? <DichVuSinhVien /> :

                                                        selectKey === '7' ? <HopDongByIDSV /> :

                                                            selectKey === '8' ? <HoaDonSinhVien /> :

                                                                selectKey === '9' ? <HoaDonDien /> :

                                                                    selectKey === '10' ? <HoaDonNuoc /> :

                                                                        selectKey === '11' ? <PhieuDien /> :

                                                                            selectKey === '12' ? <PhieuNuoc /> :

                                                                                selectKey === '13' ? <HoaDonDienNuoc /> :

                                                                                    ''
                        }
                    </Content>

                </Layout>
            </Content>


            <Footer
                style={{
                    textAlign: 'center',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                Nguyễn Viết Tín ©D19CQCNPM02-N
            </Footer>
        </Layout >
    );
};
export default Home;