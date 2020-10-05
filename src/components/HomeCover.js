import React, {useState} from 'react';
import Link from './Link';
import Loader from './Loader';
import {RichText} from 'prismic-reactjs';

// Component: HomeCover
const HomeCover = ({...props}) => {
  // States
  const [loaded, setLoaded] = useState(false);
  // Destructure
  const {id, slug, video, title, fallback, preload} = props;

  // Set vars
  const permaLink = `/projects/${slug}`;
  const videoSource = video.url;
  const titleText = RichText.asText(title);
  const fallbackSource = fallback.url;
  const preloadSource = preload.url;

  return (
    <div className={`cover--item cover--item__${slug}`}>
      {titleText && (
        <div className="overlay">
          <div className="overlay--content">
            <h2 className="overlay--title">
              <Link to={permaLink}>{titleText}</Link>
            </h2>
          </div>
        </div>
      )}

      {videoSource ? (
        <div className={`video ${loaded ? 'is-loaded' : 'loading'}`}>
          <video
            poster={fallbackSource}
            key={id}
            className="video--player"
            playsInline
            autoPlay
            muted
            loop
            src={videoSource}
            onLoadedData={() => setLoaded(true)}
          />
        </div>
      ) : (
        <div className="video is-loaded is-unavailable">
          <img
            className="video--fallback"
            src={fallbackSource}
            alt={titleText}
          />
        </div>
      )}
      {videoSource && <Loader loaded={loaded} />}

      {preloadSource && (
        <div className="preload">
          <img
            className="preload--image"
            src={preloadSource}
            alt="loading..."
          />
        </div>
      )}
    </div>
  );
};

export default HomeCover;
