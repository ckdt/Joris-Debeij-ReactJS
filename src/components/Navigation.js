// Import Defaults
import React from 'react';
import {NavLink} from 'react-router-dom';

// Import Routes
import {routes} from '../routes';

// Component: Navigation
const Navigation = () => {
  const links = routes.map(({id, to, label, slug}) => {
    return (
      <NavLink key={id} className={`nav--item nav--item__${slug}`} to={to}>
        {label}
      </NavLink>
    );
  });
  return <nav className="navigation">{links}</nav>;
};

// Export Navigation
export default Navigation;
