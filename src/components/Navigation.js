// Import Defaults
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

// Import Routes
import {routes} from '../routes';

// Component: Navigation
const Navigation = () => {
  const [navIsOpen, SetNavIsOpen] = useState(false);
  const [navHoverID, setNavHoverID] = useState(null);

  const toggleNav = () => {
    if (navIsOpen) {
      SetNavIsOpen(false);
    } else {
      SetNavIsOpen(true);
    }
  };

  const handleMouseEnter = id => {
    setNavHoverID(id);
  };
  const handleMouseLeave = () => {
    setNavHoverID(null);
  };

  const links = routes.map(({id, to, label, slug}) => {
    return (
      <li className="main--nav">
        <NavLink
          key={id}
          className={`nav--item nav--item__${slug} ${navHoverID === id ? 'strike' : null}`}
          to={to}
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={() => handleMouseLeave()}
        >
          {label}
        </NavLink>
      </li>
    );
  });
  const Toggle = () => {
    return (
      <button className="nav--toggle" onClick={() => toggleNav()}>
        Open/close
      </button>
    );
  };
  if (navIsOpen) {
    return (
      <>
        <nav className="navigation">
          <ul>{links}</ul>
        </nav>
        <Toggle />
      </>
    );
  } else {
    return (
      <>
        <Toggle />
      </>
    );
  }
};

// Export Navigation
export default Navigation;
