// Import Defaults
import React from 'react';

// Import Custom Components
import Logo from '../components/Logo';
import Navigation from './Navigation';

// Component: Header
const Header = ({showBackButton}) => (
  <header className="header">
    <Logo />
    <Navigation showBackButton={showBackButton} />
  </header>
);

// Export: Header
export default Header;
