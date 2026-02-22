import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedText = () => {
  const features = [
    'AI Early Disease & Pest Detection',
    'IoT Monitoring',
    'Satellite Imagery',
    'AI Voice Chat - Multiple Languages',
    'Climate Forecasting',
    'Real-Time Market Insights',
    'Accessible to All'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      key={currentIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 font-light"
    >
      {features[currentIndex]}
    </motion.span>
  );
};

export default AnimatedText;
