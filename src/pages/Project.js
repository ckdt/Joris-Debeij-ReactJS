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

const Slices = ({
  doc,
  togglePlay,
  isPlaying,
  toggleCarouselPlayback,
  activeIndex,
  setActiveIndex
}) => {
  const {body} = doc;
  const content = body.map(function(item, index) {
    const type = item.slice_type;
    const {items, primary} = item;
    switch (type) {
      case 'video':
        return <Video key={index} video={primary} togglePlay={togglePlay} isPlaying={isPlaying} />;
      case 'series':
        return (
          <VideoCarousel
            key={index}
            videos={items}
            toggleCarouselPlayback={toggleCarouselPlayback}
            isPlaying={isPlaying}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        );
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
  const path = match.path;

  // States
  const [notFound, toggleNotFound] = useState(false);
  const [doc, setDocData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const toggleCarouselPlayback = () => {
    if (isPlaying) {
      setManualPause(true);
      setIsPlaying(false);
    } else {
      setManualPause(false);
      setIsPlaying(true);
    }
  };

  const toggleInfo = () => {
    if (!manualPause) {
      togglePlay();
    }
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

        if (path === '/project/:uid/info') {
          toggleInfo();
        }
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
        <Slices
          doc={doc}
          togglePlay={togglePlay}
          toggleCarouselPlayback={toggleCarouselPlayback}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isPlaying={isPlaying}
        />
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
