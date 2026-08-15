"use client";
import { useState, useEffect } from 'react';

export default function MaintenanceBanner() {
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60); // 4 ساعات بالثواني
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: '#f59e0b',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 9999
    }}>
      <p>⚠️ جارٍ تحديث المنصة لإضافة مميزات جديدة!</p>
      <p>سيتم الانتهاء بعد: {formatTime(timeLeft)}</p>
    </div>
  );
}