// React
import React, {useEffect, useState} from 'react';
// Prismic
import {RichText} from 'prismic-reactjs';
import {client} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import DefaultLayout from '../components/DefaultLayout';
import VideoCarousel from '../components/VideoCarousel';

const Project = ({match}) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  const videoData = [
    {
      id: '0',
      slug: 'video-one',
      src: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
    },
    {
      id: '1',
      slug: 'video-two',
      src: 'https://vimeo.com/385369619'
    },
    {
      id: '2',
      slug: 'video-three',
      src: 'https://vimeo.com/275891086'
    }
  ];

  console.log(match);

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID('project', uid);

      if (result) {
        // We use the State hook to save the document
        console.log(result);
        return setDocData(result.data);
      } else {
        // Otherwise show an error message
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    console.log(doc);
    return (
      <DefaultLayout>
        <div className="page">
          <VideoCarousel videos={videoData} />
          <h1>{RichText.asText(doc.title)}</h1>
        </div>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Project;
