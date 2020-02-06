// Import Defaults
import React from 'react';

// Import Assets
import loader from '../assets/images/loader.svg';

// Component: Loader
const Loader = ({loaded}) => {
  if (loaded) {
    return null;
  } else {
    return (
      <div className="status">
        <img className="status--loader" alt="loading..." src={loader} />
      </div>
    );
  }
};

// Export: Loader
export default Loader;
