import React from 'react';
import './Card.css';

export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  padding = 'md',
  ...props
}) => {
  return (
    <div
      className={`card card--padding-${padding} ${hoverable ? 'card--hoverable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
