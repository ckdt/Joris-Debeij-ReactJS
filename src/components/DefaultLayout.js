// Import Defaults
import React from 'react';

// Import Custom Components
import Header from '../components/Header';

// Component: DefaultLayout
const DefaultLayout = ({title, children, showBackButton}) => (
  <div className={`view view__${title}`}>
    <Header showBackButton={showBackButton} />
    <section
      className="content"
      {...(title === 'home' && {style: {height: '100vh'}})}
    >
      {children}
    </section>
  </div>
);

// Export: DefaultLayout
export default DefaultLayout;
