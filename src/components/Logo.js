import React from 'react';
import {Link} from 'react-router-dom';

const Logo = () => (
  <h1 className="logo">
    <Link to="/">
      <span className="logo--split logo--split__left">Joris</span>
      <span className="logo--split logo--split__right">Debeij</span>
    </Link>
  </h1>
);
export default Logo;
