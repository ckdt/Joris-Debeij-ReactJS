// Import Defaults
import React from 'react';
import {Link} from 'react-router-dom';

// Component: Logo
const Logo = () => (
  <h1 className="logo">
    <Link to="/">
      <span className="logo--item logo--item__left">Joris</span>
      <span className="logo--item logo--item__right">Debeij</span>
    </Link>
  </h1>
);

// Export Logo
export default Logo;
