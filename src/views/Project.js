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
import {useComingFrom} from '../components/ComingFrom';
import {useCursor} from '../components/Cursor';

const ContentSlices = ({
  doc,
  videoIsPaused,
  videoIsBlurred,
  setVideoIsPaused,
  seriesIndex,
  setSeriesIndex,
}) => {
  const {body} = doc;

  const content = body.map(function (item, index) {
    const type = item.slice_type;
    const {items, primary} = item;

    const txtTitle = RichText.asText(doc.title);

    switch (type) {
      case 'video':
        const videoUrl = primary.video_source.url;
        const videoType = primary.video_embed_type;
        const videoFallback = primary.fallback_image.url;
        return (
          <Video
            key={index}
            videoUrl={videoUrl}
            videoFallback={videoFallback}
            videoType={videoType}
            videoIsPaused={videoIsPaused}
            videoIsBlurred={videoIsBlurred}
            videoTitle={txtTitle}
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
            videoIsBlurred={videoIsBlurred}
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
  const {title, subtitle, description} = doc;

  const txtTitle = RichText.asText(title);
  const txtSubTitle = RichText.asText(subtitle);

  const ModalSlices = ({body}) => {
    const content = body.map(function (item, index) {
      const type = item.slice_type;
      const {primary} = item;
      switch (type) {
        case 'credits':
          return <Credits content={primary} key={index} />;
        case 'awards':
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
  return (
    <div className={`info ${openModal ? 'is-open' : 'is-closed'}`}>
      <div className="info--column info--column__left">
        {txtTitle && <h1 className="info--title">{txtTitle}</h1>}
        {txtSubTitle && <p className="info--subtitle">{txtSubTitle}</p>}
        {description && (
          <div className="info--body">
            <RichText render={description} />
          </div>
        )}
      </div>
      <div className="info--column info--column__right">
        <ModalSlices body={doc.body} />
      </div>
    </div>
  );
};

const Project = ({match}) => {
  const uid = match.params.uid;

  const {set} = useComingFrom();
  useEffect(() => set('project'), [set]);
  // States
  const [notFound, toggleNotFound] = useState(false);
  const [doc, setDocData] = useState(null);
  const [dataHasSeries, setDataHasSeries] = useState(false);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [videoIsPaused, setVideoIsPaused] = useState(false);
  const [videoIsBlurred, setVideoIsBlurred] = useState(false);
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
        const hasFilter = data.body.filter(
          (item) => item.slice_type === 'series'
        );
        if (hasFilter.length > 0) {
          setDataHasSeries(true);
        }
        return true;
      } else {
        console.warn('404. Page document not found.');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  // cursor
  const {setStatus} = useCursor();

  const InfoPopToggle = ({dataHasSeries}) => {
    return (
      <button
        className="info--toggle"
        onClick={() => {
          setStatus(null);
          toggleInfoModal();
        }}
        onMouseEnter={() => setStatus('hover')}
        onMouseLeave={() => setStatus(null)}
        onMouseOutCapture={() => setStatus(null)}
        style={{backgroundColor: 'black', cursor: 'pointer'}}
      >
        {openModal ? 'close' : 'info'}
      </button>
    );
  };

  const toggleInfoModal = () => {
    if (videoIsPaused) {
      setVideoIsPaused(false);
      setVideoIsBlurred(false);
      setOpenModal(false);
    } else {
      setVideoIsPaused(true);
      setVideoIsBlurred(true);
      setOpenModal(true);
    }
  };

  console.log({doc});

  if (doc) {
    return (
      <DefaultLayout title="project" showBackButton={true}>
        <ContentSlices
          doc={doc}
          videoIsPaused={videoIsPaused}
          videoIsBlurred={videoIsBlurred}
          setVideoIsPaused={setVideoIsPaused}
          seriesIndex={seriesIndex}
          setSeriesIndex={setSeriesIndex}
        />
        <InfoPopModal
          doc={doc}
          openModal={openModal}
          toggleInfoModal={toggleInfoModal}
        />
        <InfoPopToggle dataHasSeries={dataHasSeries} />
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};
export default Project;
