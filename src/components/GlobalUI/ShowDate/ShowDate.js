// import PropType from 'prop-types';
import { useState } from 'react';
import './ShowDate.css';

const ShowDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleDateString('se-SE', { month: 'long' });
    const day = date.toLocaleDateString('se-SE', { day: 'numeric' });
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();


    const [time, setUpdateTime] = useState({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds(),
    })
    
    const updateTime = (event) => {
        setUpdateTime({
            ...time,
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
        });
    };

    setTimeout(updateTime, 1000);

    return (
        <div className="show-date" >
            <div className="date-day">{day}</div>
            <div className = "date-month">{month}</div>
            <div className="date-year">{year}</div>
            <div>{`klockan är: ${hours} : ${minutes} : ${seconds}`}</div>
        </div>
    )
}

export default ShowDate