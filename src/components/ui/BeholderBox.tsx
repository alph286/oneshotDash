import { useState, useEffect, useRef } from 'react';

const BeholderBox = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to trigger random animations
  const triggerRandomAnimation = () => {
    // Random time between 5-15 seconds for next animation
    const nextAnimationDelay = Math.floor(Math.random() * 10000) + 5000;
    
    // Random animation duration between 2-4 seconds
    const animationDuration = Math.floor(Math.random() * 2000) + 2000;
    
    // Schedule next animation
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(true);
      
      // Turn off animation after duration
      setTimeout(() => {
        setIsAnimating(false);
        triggerRandomAnimation(); // Schedule next animation
      }, animationDuration);
    }, nextAnimationDelay);
  };
  
  useEffect(() => {
    // Start the random animation cycle
    triggerRandomAnimation();
    
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      className="mb-4 cursor-pointer"
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => {
        // Only turn off animation if it was triggered by hover
        if (!timeoutRef.current) {
          setIsAnimating(false);
        }
      }}
    >
      <img 
        src={isAnimating ? "/images/beholder.gif" : "/images/beholder-static.gif"} 
        alt="Beholder" 
        className="w-full object-cover rounded-lg transition-all duration-200"
      />
    </div>
  );
};

export default BeholderBox;