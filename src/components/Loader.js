import React from 'react';
import loader from '../images/loader.svg';

const Loader = ({loaded}) => {
  console.log(loaded);
  return (
    <div className="status">{loaded ? '' : <img className="status--loader" src={loader} />}</div>
  );
};

export default Loader;
