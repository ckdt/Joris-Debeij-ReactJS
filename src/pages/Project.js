// React
import React, {useEffect, useState} from 'react';
// Prismic
import Prismic from 'prismic-javascript';
import {RichText} from 'prismic-reactjs';
import {client} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import DefaultLayout from '../components/DefaultLayout';
import VideoCarousel from '../components/VideoCarousel';
import Video from '../components/Video';
import Info from '../components/Info';

const Slices = ({doc}) => {
  const {body} = doc;
  const content = body.map(function(item, index) {
    const type = item.slice_type;
    const {items, primary} = item;
    switch (type) {
      case 'video':
        return <Video video={primary} key={index} />;
      case 'series':
        return <VideoCarousel videos={items} key={index} />;
      case 'image':
        return null;
      default:
        return null;
    }
  });
  if (content) {
    return content;
  } else {
    return null;
  }
};

// Page: Project
const Project = ({match}) => {
  const uid = match.params.uid;

  // States
  const [notFound, toggleNotFound] = useState(false);
  const [doc, setDocData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    if (showInfo) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
  };

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('project', uid);

      if (result) {
        const {data} = result;
        console.log(data);
        setDocData(data);

        // We use the State hook to save the document
        return true;
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
      <DefaultLayout title="project">
        <Info doc={doc} toggleInfo={toggleInfo} showInfo={showInfo} />
        <Slices doc={doc} />
        <button className="info--toggle" onClick={() => toggleInfo()}>
          Info
        </button>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Project;
