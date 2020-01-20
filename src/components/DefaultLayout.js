import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = ({title, children}) => (
  <div className="view">
    <Header />
    {children}
    <Footer />
  </div>
);

export default DefaultLayout;
