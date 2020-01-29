import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => (
  <nav className="navigation">
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/page/about">About</NavLink>
    <NavLink to="/projects/commercial">Commercial</NavLink>
    <NavLink to="/projects/tv-film">TV &amp; Film</NavLink>
  </nav>
);
export default Navigation;
