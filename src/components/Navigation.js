// Import Defaults
import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import close from '../assets/images/close.svg';

// Import Routes
import {routes} from '../routes';

// Component: Navigation
const Navigation = ({showBackButton = false}) => {
  const [navIsOpen, SetNavIsOpen] = useState(false);
  const [navHoverID, setNavHoverID] = useState(null);

  const toggleNav = navIsOpen => {
    if (navIsOpen) {
      SetNavIsOpen(false);
    } else {
      SetNavIsOpen(true);
    }
  };

  const BackButton = () => {
    let history = useHistory();
    return (
      <>
        <div className="nav--toggle">
          <div className="back--button">
            <img src={close} alt="" onClick={() => history.goBack()} />
          </div>
        </div>
      </>
    );
  };

  const handleMouseEnter = id => {
    setNavHoverID(id);
  };
  const handleMouseLeave = () => {
    setNavHoverID(null);
  };

  const links = routes.map(({id, to, label, slug}) => {
    return (
      <li className="list--item" key={id}>
        <NavLink
          className={`list--link link--list__${slug} ${navHoverID === id ? 'strike' : null}`}
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
      <div className="navigation">
        {showBackButton ? (
          <>
            <BackButton />
          </>
        ) : (
          <div className="nav--toggle">
            <input
              id="burger"
              className="burger"
              type="checkbox"
              checked={navIsOpen ? 'checked' : ''}
              value={''}
              onChange={() => toggleNav(navIsOpen)}
            />
            <label className="burger--toggle" htmlFor="burger">
              <span className="burger--icon"></span>
            </label>
          </div>
        )}
        <div className={`nav--overlay nav--overlay__${navIsOpen ? 'visible' : 'hidden'}`}>
          <nav className="menu" role="navigation">
            <ul className="menu--list menu--list__main">{links}</ul>
            <ul className="menu--list menu--list__social">
              <li className="list--item">
                <a
                  className="list--link"
                  href="https://www.instagram.com/jorisdebeij"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="list--item">
                <a
                  className="list--link"
                  href="https://vimeo.com/jorisdebeij"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vimeo
                </a>
              </li>
              <li className="list--item">
                <a
                  className="list--link"
                  href="https://www.imdb.com/name/nm4757578"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IMDB
                </a>
              </li>
            </ul>
            <ul className="menu--list menu--list__credits">
              <li className="list--item">
                <a
                  className="list--link"
                  href="https://allthis.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Design &amp; Development by ALL THIS
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
    /* 
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
    </> */
  );
};

// Export Navigation
export default Navigation;
