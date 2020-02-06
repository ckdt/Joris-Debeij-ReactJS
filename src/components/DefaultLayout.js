// Import Defaults
import React from 'react';

// Import Custom Components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Component: DefaultLayout
const DefaultLayout = ({title, children}) => (
  <div className={`view view__${title}`}>
    <Header />
    <section className="content">{children}</section>
    <Footer />
  </div>
);

// Export: DefaultLayout
export default DefaultLayout;
