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
      <li className="main--nav" key={id}>
        <NavLink
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

  return (
    <>
      {navIsOpen && (
        <nav className="navigation">
          <ul>{links}</ul>
        </nav>
      )}
      <div className="nav--toggle">
        <input
          id="navigation-checkbox"
          className="navigation-checkbox"
          type="checkbox"
          checked={navIsOpen ? 'checked' : null}
          onChange={() => toggleNav()}
        />
        <label className="navigation-toggle" htmlFor="navigation-checkbox">
          <span className="navigation-toggle-icon"></span>
        </label>
      </div>
    </>
  );
};

// Export Navigation
export default Navigation;
