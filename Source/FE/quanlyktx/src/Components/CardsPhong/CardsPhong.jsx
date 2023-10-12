import React from 'react';
import { Card } from 'antd';
import './card.css'
import Img1 from '../../accets/PhongImg/1.jpg'
import Img2 from '../../accets/PhongImg/2.jpg'
import Img3 from '../../accets/PhongImg/3.jpg'
import Img5 from '../../accets/PhongImg/5.jpg'
import Img6 from '../../accets/PhongImg/6.jpg'
import Img7 from '../../accets/PhongImg/7.jpg'
import Img8 from '../../accets/PhongImg/8.jpg'



const { Meta } = Card;

const CardsPhong = ({ card, onClick }) => {
    return (
        <Card
            onClick={() => onClick(card.id)}
            hoverable
            style={{
                width: 250,
                height: 350,
            }}
            className='cardItem'
            cover={

                card.id === 0 ?
                    <img src={Img1} alt="Img" />
                    : card.id === 1 ?
                        <img src={Img2} alt="Img" />
                        : card.id === 2 ?
                            <img src={Img3} alt="Img" />
                            : card.id === 3 ?
                                <img src={Img6} alt="Img" />
                                : card.id === 4 ?
                                    <img src={Img5} alt="Img" />
                                    :
                                    card.id === 5 ?
                                        <img src={Img6} alt="Img" />
                                        : 
                                        card.id === 6 ?
                                            <img src={Img7} alt="Img" />
                                            : 
                                            card.id === 7 ?
                                                <img src={Img8} alt="Img" />
                                                : 
                                                card.id === 25 ?
                                                    <img src={Img8} alt="Img" />
                                                    : 
                                                    card.id === 9 ?
                                                        <img src={Img5} alt="Img" />
                                                        :
                                                        <img src={Img1} alt="Img" />

            }
        >
            <Meta title={card.roomName} />
            <hr />
            <div >{"Tổng số giường:" + card.totalCapacity} </div>
            <div >{"Số giường trống:" + card.availableCapacity}</div>
            <Meta description={card.description} />
            <div className="price">{card.price}/tháng</div>
        </Card>
    )
};
export default CardsPhong;