// Generic icon resolver utility for react-icons
// Supports any icon from react-icons/md (Md*) and react-icons/fa (Fa*)
// Import all icons from react-icons packages
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
// Import default fallback icon
import { MdHome } from "react-icons/md";

/**
 * Dynamically resolves icon component from icon name string
 * @param {string} iconName - Icon name like "MdHome", "FaDna", etc.
 * @returns {React.Component} - React icon component or default fallback (MdHome)
 * 
 * @example
 * const Icon = getIconComponent('MdHome');
 * const Icon2 = getIconComponent('FaDna');
 * const Icon3 = getIconComponent('MdLocalHospital');
 */
export const getIconComponent = (iconName) => {
  if (!iconName) return MdHome; // Default fallback
  
  // Try Material Design icons first (Md*)
  if (iconName.startsWith('Md') && MdIcons[iconName]) {
    return MdIcons[iconName];
  }
  
  // Try Font Awesome icons (Fa*)
  if (iconName.startsWith('Fa') && FaIcons[iconName]) {
    return FaIcons[iconName];
  }
  
  // Fallback to MdHome if icon not found
  return MdHome;
};

/**
 * Resolves icon component with custom fallback
 * @param {string} iconName - Icon name like "MdHome", "FaDna", etc.
 * @param {React.Component} fallbackIcon - Custom fallback icon component
 * @returns {React.Component} - React icon component or custom fallback
 */
export const getIconComponentWithFallback = (iconName, fallbackIcon = MdHome) => {
  if (!iconName) return fallbackIcon;
  
  // Try Material Design icons first (Md*)
  if (iconName.startsWith('Md') && MdIcons[iconName]) {
    return MdIcons[iconName];
  }
  
  // Try Font Awesome icons (Fa*)
  if (iconName.startsWith('Fa') && FaIcons[iconName]) {
    return FaIcons[iconName];
  }
  
  return fallbackIcon;
};

