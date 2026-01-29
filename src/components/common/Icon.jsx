// src/components/common/Icon.jsx
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';
import * as HiIcons from 'react-icons/hi';

const iconLibraries = {
  fa: FaIcons,
  md: MdIcons,
  io: IoIcons,
  hi: HiIcons
};

const Icon = ({ 
  name, 
  library = 'fa', 
  size = 20, 
  color = 'currentColor',
  className = '',
  ...props 
}) => {
  const IconLibrary = iconLibraries[library];
  
  if (!IconLibrary) {
    console.error(`Icon library "${library}" not found`);
    return null;
  }

  const IconComponent = IconLibrary[name];
  
  if (!IconComponent) {
    console.error(`Icon "${name}" not found in "${library}" library`);
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className}
      {...props}
    />
  );
};

export default Icon;