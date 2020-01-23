import React from 'react';
import Logo from '../components/Logo';
import Navigation from './Navigation';

const Header = () => (
  <header className="header">
    <Navigation />
    <Logo />
  </header>
);

export default Header;
