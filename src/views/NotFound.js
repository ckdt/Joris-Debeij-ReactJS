// Import Defaults
import React from 'react';
import Link from '../components/Link';

// Import Custom Components
import DefaultLayout from '../components/DefaultLayout';

// Component: Not Found
const NotFound = () => {
  return (
    <DefaultLayout title="404">
      <div className="not-found" style={notFoundStyle}>
        <h1>404</h1>
        <h2>Document not found</h2>
        <p>
          <Link to="/">Return to homepage</Link>
        </p>
      </div>
    </DefaultLayout>
  );
};

// Component: CSS
const notFoundStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '50vw',
  alignItems: 'center'
};

// Export View
export default NotFound;
