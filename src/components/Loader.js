// Import Defaults
import React from 'react';

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
