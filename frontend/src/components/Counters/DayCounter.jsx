import React, { useEffect, useState } from 'react';

const DayCounter = () => {
  const [day, setDay] = useState("");

  useEffect(() => {
    const today = new Date();
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearEnd = new Date(today.getFullYear(), 11, 31);
    const currentDay = today.getDate();
    const daysInYear = ((yearEnd - yearStart) / (1000 * 60 * 60 * 24))+1;
    setDay(`${currentDay}/${daysInYear}`);
  }, []);

  return (
    <>
      <p>{day}</p>
    </>
  );
};

export default DayCounter;