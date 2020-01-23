import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DefaultLayout = ({title, children}) => (
  <div className={`view view__${title}`}>
    <Header />
    <section className="content">{children}</section>
    <Footer />
  </div>
);

export default DefaultLayout;
