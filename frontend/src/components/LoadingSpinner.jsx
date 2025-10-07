import React from 'react';
import { Loader, Code, Zap } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false,
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variants = {
    default: {
      icon: Loader,
      color: 'text-primary',
      bg: 'bg-base-100'
    },
    code: {
      icon: Code,
      color: 'text-secondary',
      bg: 'bg-base-200'
    },
    execution: {
      icon: Zap,
      color: 'text-warning',
      bg: 'bg-warning/10'
    }
  };

  const currentVariant = variants[variant] || variants.default;
  const Icon = currentVariant.icon;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${currentVariant.bg} p-4 rounded-full`}>
        <Icon className={`${sizeClasses[size]} ${currentVariant.color} animate-spin`} />
      </div>
      {message && (
        <div className="text-center">
          <p className="text-base-content/70 font-medium">{message}</p>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-base-100/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="card bg-base-100 shadow-xl p-8">
          {spinner}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
};

// Skeleton loader for content
export const SkeletonLoader = ({ lines = 3, className = "" }) => {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="flex space-x-4">
          <div className="rounded-full bg-base-300 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-base-300 rounded w-3/4"></div>
            <div className="h-4 bg-base-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Card skeleton
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card bg-base-100 shadow-xl animate-pulse">
          <div className="card-body">
            <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded"></div>
              <div className="h-4 bg-base-300 rounded w-5/6"></div>
              <div className="h-4 bg-base-300 rounded w-4/6"></div>
            </div>
            <div className="flex justify-end mt-4">
              <div className="h-8 bg-base-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;