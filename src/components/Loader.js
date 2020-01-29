import React from 'react';
import loader from '../images/loader.svg';

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

export default Loader;
