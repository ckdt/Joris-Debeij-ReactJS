import React from 'react';
import {NavLink} from 'react-router-dom';

const routes = [
  {id: 0, to: '/projects/commercial', label: 'Commercial', slug: 'commercial'},
  {id: 1, to: '/projects/tv-film', label: 'TV & Film', slug: 'tv-film'},
  {id: 2, to: '/page/about', label: 'About', slug: 'about'}
];

const Navigation = () => {
  const links = routes.map(({id, to, label, slug}) => {
    return (
      <NavLink key={id} className={`nav__${slug}`} to={to}>
        {label}
      </NavLink>
    );
  });

  return <nav className="navigation">{links}</nav>;
};
export default Navigation;
