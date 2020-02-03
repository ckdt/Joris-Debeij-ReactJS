import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => (
  <nav className="navigation">
    <NavLink className="nav__commercial" to="/projects/commercial">
      Commercial
    </NavLink>
    <NavLink className="nav__tv-film" to="/projects/tv-film">
      TV &amp; Film
    </NavLink>
    <NavLink className="nav__about" to="/page/about">
      About &amp; Contact
    </NavLink>
  </nav>
);
export default Navigation;
