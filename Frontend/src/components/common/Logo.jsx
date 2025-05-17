import React from 'react';

function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`logo-box ${sizes[size]}`}>
      <span>T</span>
    </div>
  );
}

export default Logo;
