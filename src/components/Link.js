import * as React from 'react';
import {Link} from 'react-router-dom';
import {useCursor} from './Cursor';

const ExtendedLink = ({as: AS = Link, ...rest}) => {
  const {setStatus} = useCursor();
  return (
    <AS
      onMouseEnter={() => setStatus('hover')}
      onMouseLeave={() => setStatus(null)}
      {...rest}
    />
  );
};

export default ExtendedLink;
