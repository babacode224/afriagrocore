import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: '/images/slider-disease.webp',
    title: 'AI Early Disease and Pest Detection',
    description: 'Identify crop diseases 2-3 weeks before visible symptoms'
  },
  {
    image: '/images/slider-weather.webp',
    title: 'Weather Intelligence',
    description: 'Hyper-local forecasting for precise farming decisions'
  },
  {
    image: '/images/slider-marketplace.webp',
    title: 'Direct Marketplace',
    description: 'Connect directly with buyers, eliminate intermediaries'
  },
  {
    image: '/images/slider-community.webp',
    title: 'AI Voice Chat - Multiple Languages',
    description: 'Talk to AI assistants in your preferred language'
  },
  {
    image: '/images/slider-learning.webp',
    title: 'Gamified Learning',
    description: 'Master modern farming with interactive courses'
  },
  {
    image: '/images/ai-analytics-swahili.webp',
    title: 'AI Analytics Dashboard',
    description: 'Real-time crop health monitoring in Swahili'
  },
  {
    image: '/images/slider-iot.webp',
    title: 'IoT & Satellite Imagery',
    description: 'Connected sensors and satellite data for precision farming'
  },
  {
    image: '/images/farm-hero.webp',
    title: 'Precision Farming',
    description: 'Data-driven decisions for maximum efficiency'
  }
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              srcSet={`
                ${slide.image.replace('.webp', '-sm.webp')} 640w,
                ${slide.image.replace('.webp', '-desktop.webp')} 896w,
                ${slide.image.replace('.webp', '-md.webp')} 1024w,
                ${slide.image} 1536w
              `}
              sizes="(max-width: 640px) 640px, (max-width: 896px) 896px, (max-width: 1024px) 1024px, 1536px"
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold mb-2"
              >
                {slide.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-sm md:text-base text-gray-100"
              >
                {slide.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-20 bg-black/40 text-white px-4 py-2 rounded-full text-sm font-semibold">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
