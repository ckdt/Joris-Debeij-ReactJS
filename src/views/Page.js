// Import Defaults
import React, {useEffect, useState} from 'react';

// Import Prismic
import {RichText} from 'prismic-reactjs';
import {client, linkResolver} from '../prismic-configuration';

// Import Views
import NotFound from '../views/NotFound';

// Import Custom Components
import DefaultLayout from '../components/DefaultLayout';

// Component: Page
const Page = ({match}) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('page', uid);
      if (result) {
        return setDocData(result);
      } else {
        console.warn('404. Page document not found.');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  if (doc) {
    return (
      <DefaultLayout>
        <div className="page">
          {/* This is how to get an image into your template */}
          <img src={doc.data.image.url} alt={doc.data.image.alt} />
          {/* This is how to render a Rich Text field as plain text */}
          <h1>{RichText.asText(doc.data.title)}</h1>
          {/* This is how to render a Rich Text field into your template as HTML */}
          <RichText render={doc.data.description} linkResolver={linkResolver} />
        </div>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

// Export View
export default Page;
