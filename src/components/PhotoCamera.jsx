import { useState, useEffect } from 'react';
import camera from "../assets/images/home/camera.png";
import camera_mobile from "../assets/images/home/camera_mobile.png";

function PhotoCamera({ images = [], mobileImages = [], interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize with correct value on mount (640px is Tailwind's 'sm' breakpoint)
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });

  // Detect if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is Tailwind's 'sm' breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use mobileImages if provided and on mobile, otherwise use desktop images
  const activeImages = isMobile && mobileImages.length > 0 ? mobileImages : images;

  // Reset index when switching between mobile/desktop
  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  useEffect(() => {
    if (activeImages.length === 0) return;

    const timer = setInterval(() => {
      // Trigger snap animation
      setIsSnapping(true);
      
      // Change image while screen is white (during flash)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activeImages.length);
      }, 100);
      
      // End snap animation
      setTimeout(() => {
        setIsSnapping(false);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [activeImages.length, interval]);

  return (
    <div className="relative w-full h-full">
      {/* Camera frame overlay - different camera for mobile */}
      <img 
        src={isMobile ? camera_mobile : camera} 
        alt="Camera frame" 
        className="w-full h-full z-1000 pointer-events-none sm:rotate-0"
      />
      
      {/* Photo display area - adjust positioning based on your cutout */}
      <div className="absolute inset-0 z-[-10] flex items-center justify-center p-8">
        <div className="relative w-full h-full">
          {/* Mobile images */}
          {isMobile && mobileImages.length > 0 && (
            <>
              <img
                key={`mobile-${currentIndex}`}
                src={mobileImages[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className={`w-full h-full object-cover transition-all duration-200 ${
                  isSnapping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              />
              {/* Camera flash effect for mobile */}
              {isSnapping && (
                <div className="absolute inset-0 bg-white animate-flash rotate-90" />
              )}
            </>
          )}
          
          {/* Desktop images */}
          {!isMobile && images.length > 0 && (
            <>
              <img
                key={`desktop-${currentIndex}`}
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className={`w-full h-full object-cover transition-all duration-200 ${
                  isSnapping ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              />
              {/* Camera flash effect for desktop */}
              {isSnapping && (
                <div className="absolute inset-0 bg-white animate-flash" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotoCamera;
