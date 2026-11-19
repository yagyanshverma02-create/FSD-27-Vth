import React from 'react';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'default', // 'default', 'success', 'warning', 'danger', 'info', 'sage'
  size = 'md',
  className = ''
}) => {
  return (
    <span className={`badge badge--${variant} badge--${size} ${className}`}>
      {children}
    </span>
  );
};
