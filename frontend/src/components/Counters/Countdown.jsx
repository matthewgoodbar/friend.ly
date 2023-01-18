import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("The day has ended!");
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`Expires in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <p>{timeLeft}</p>
    </>
  );
};

export default Countdown;