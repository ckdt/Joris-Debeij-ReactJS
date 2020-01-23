import React from 'react';
import loader from '../images/loader.svg';

const Loader = ({loaded}) => {
  console.log(loaded);
  if (loaded) {
    return null;
  } else {
    return (
      <div className="status">
        <img className="status--loader" src={loader} />
      </div>
    );
  }
};

export default Loader;
