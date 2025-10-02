import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient';
}

/**
 * Modern loading spinner with smooth animations
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  variant = 'default' 
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const gradientVariant = variant === 'gradient';

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} rounded-full border-4 ${
          gradientVariant 
            ? 'border-education-primary/30 border-t-education-primary' 
            : 'border-gray-200 dark:border-gray-700 border-t-education-primary'
        }`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
