import React from 'react';
import CoverVideo from '../components/CoverVideo';
import CoverImage from '../components/CoverImage';

const Cover = props => {
  const type = props.type;

  switch (type) {
    case 'video':
      return <CoverVideo {...props} />;
    case 'image':
      return <CoverImage {...props} />;
    default:
      return <CoverVideo {...props} />;
  }
};

export default Cover;
