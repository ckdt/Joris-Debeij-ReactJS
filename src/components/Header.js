// Import Defaults
import React from 'react';

// Import Custom Components
import Logo from '../components/Logo';
import Navigation from './Navigation';

// Component: Header
const Header = () => (
  <header className="header">
    <Logo />
    <Navigation />
  </header>
);

// Export: Header
export default Header;
