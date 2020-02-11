// Import Defaults
import React, {useEffect, useState} from 'react';

// Import Prismic
import {client} from '../prismic-configuration';
import {RichText} from 'prismic-reactjs';

// Import Views
import NotFound from './NotFound';

// Import Custom Components
import DefaultLayout from '../components/DefaultLayout';
import Series from '../components/Series';
import Video from '../components/Video';

// Components
import Credits from '../components/Credits';
import Awards from '../components/Awards';

import Info from '../components/Info';

const ContentSlices = ({doc, videoIsPaused, setVideoIsPaused, seriesIndex, setSeriesIndex}) => {
  const {body} = doc;
  console.log('body', body);

  const content = body.map(function(item, index) {
    const type = item.slice_type;
    const {items, primary} = item;
    switch (type) {
      case 'video':
        const videoUrl = primary.video_source.url;
        const videoType = primary.video_embed_type;
        const videoFallback = primary.fallback_image.url;
        const videoTitle = RichText.asText(doc.title);
        return (
          <Video
            key={index}
            videoUrl={videoUrl}
            videoFallback={videoFallback}
            videoType={videoType}
            videoIsPaused={videoIsPaused}
            videoTitle={videoTitle}
          />
        );
      case 'series':
        const seriesData = items;
        return (
          <Series
            key={index}
            seriesData={seriesData}
            seriesIndex={seriesIndex}
            setSeriesIndex={setSeriesIndex}
            videoIsPaused={videoIsPaused}
            setVideoIsPaused={setVideoIsPaused}
          />
        );
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

const InfoPopModal = ({doc, openModal, toggleInfoModal}) => {
  const {title, subtitle, description, cover_image, body} = doc;

  const backgroundSource = cover_image.url;
  const styleBackground = {
    backgroundImage: `url(${backgroundSource})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };

  const ModalSlices = ({body}) => {
    const content = body.map(function(item, index) {
      const type = item.slice_type;
      const {items, primary} = item;
      switch (type) {
        case 'credits':
          return <Credits content={primary} key={index} />;
        case 'awards':
          return <Awards content={primary} key={index} />;
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
  return (
    <div className={`info ${openModal ? 'is-open' : 'is-closed'}`} style={styleBackground}>
      <h1>{RichText.asText(title)}</h1>
      <ModalSlices body={doc.body} />
      <button onClick={() => toggleInfoModal()}>Close</button>
    </div>
  );
};

const Project = ({match}) => {
  const uid = match.params.uid;
  const path = match.path;

  // States
  const [notFound, toggleNotFound] = useState(false);
  const [doc, setDocData] = useState(null);
  const [dataHasSeries, setDataHasSeries] = useState(false);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [videoIsPaused, setVideoIsPaused] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('project', uid);

      if (result) {
        // set document data
        const {data} = result;
        setDocData(data);

        //  Check if there are series
        const hasFilter = data.body.filter(item => item.slice_type === 'series');
        if (hasFilter.length > 0) {
          setDataHasSeries(true);
        }
        // Toogle info based on URL

        // if (path === '/project/:uid/info') {
        //   toggleInfo();
        // }
        return true;
      } else {
        console.warn('404. Page document not found.');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  const InfoPopToggle = ({dataHasSeries}) => {
    // if (dataHasSeries) {
    //   return null;
    // } else {
    return (
      <button className="info--toggle" onClick={() => toggleInfoModal()}>
        Info
      </button>
    );
    // }
  };

  const toggleInfoModal = () => {
    if (videoIsPaused) {
      setVideoIsPaused(false);
      setOpenModal(false);
    } else {
      setVideoIsPaused(true);
      setOpenModal(true);
    }
  };

  if (doc) {
    return (
      <DefaultLayout title="project">
        <ContentSlices
          doc={doc}
          videoIsPaused={videoIsPaused}
          setVideoIsPaused={setVideoIsPaused}
          seriesIndex={seriesIndex}
          setSeriesIndex={setSeriesIndex}
        />
        <InfoPopModal doc={doc} openModal={openModal} toggleInfoModal={toggleInfoModal} />
        <InfoPopToggle dataHasSeries={dataHasSeries} />
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};
export default Project;
