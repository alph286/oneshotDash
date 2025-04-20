import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  key?: number;
}

function Alert({ message, type, duration = 5000, key }: AlertProps) {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setVisible(false), 200); // Wait for fade-out to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, key]);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white transform transition-all duration-200 ${
      isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
    } ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`}>
      {message}
    </div>
  );
}

export default Alert;