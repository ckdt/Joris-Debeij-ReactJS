// Import Defaults
import React from 'react';

// Import Assets
// import loader from '../assets/images/loader.svg';

// Component: Loader
const Loader = ({loaded}) => {
  if (loaded) {
    return null;
  } else {
    return (
      <div className="status">
        <div className="status--loader"></div>
      </div>
    );
  }
};

// Export: Loader
export default Loader;
