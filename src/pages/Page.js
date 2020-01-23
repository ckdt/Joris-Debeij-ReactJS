// React
import React, {useEffect, useState} from 'react';
// Prismic
import {RichText} from 'prismic-reactjs';
import {client, linkResolver} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import DefaultLayout from '../components/DefaultLayout';

const Page = ({match}) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID('page', uid);

      if (result) {
        // We use the State hook to save the document
        console.log(result);
        return setDocData(result);
      } else {
        // Otherwise show an error message
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

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

export default Page;
