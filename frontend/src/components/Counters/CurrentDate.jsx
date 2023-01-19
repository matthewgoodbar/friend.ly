import React, { useState, useEffect } from 'react';

const CurrentDate = () => {
    const [date, setDate] = useState("");
    useEffect(() => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const today = new Date();
        const month = monthNames[today.getMonth()];
        const day = today.getDate();
        const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
        setDate(`${month} ${day}${suffix}`);
    }, []);
    return (
        <>
            <p>{date}</p>
        </>
    );
};

export default CurrentDate;