import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Loader from '../components/Loader';
import {RichText} from 'prismic-reactjs';

const handleClick = (history, location) => {
  return history.push(location);
  console.log('move', location);
};

const CoverVideo = ({
  showTitle = true,
  showInfoControl = true,
  showPlayControl = true,
  isHomeCover = false,
  ...props
}) => {
  let history = useHistory();
  const [loaded, setLoaded] = useState(false);

  // Set Vars
  const {id, slug, video, title, fallback} = props;

  const videoSource = video.url;
  const titleText = RichText.asText(title);
  const fallbackSource = fallback.url;

  const styleFallback = {
    backgroundImage: `url(${fallbackSource})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };

  const permaLink = isHomeCover ? `/projects/${slug}` : `/project/${slug}`;

  return (
    <div
      className={`cover cover__${slug} ${isHomeCover ? 'is-home' : 'is-project'} `}
      onClick={() => handleClick(history, permaLink)}
    >
      {(showTitle || showInfoControl || showPlayControl) && (
        <div className="overlay">
          <div className="overlay--content">
            {title && (
              <h2 className="overlay--title">
                <Link to={permaLink}>{titleText}</Link>
              </h2>
            )}
            {(showInfoControl || showPlayControl) && (
              <div className="overlay--controls">
                {showPlayControl && (
                  <Link to={`/project/${slug}`} className="control--play">
                    Play
                  </Link>
                )}
                {showInfoControl && (
                  <Link to={`/project/${slug}#info`} className="control--info">
                    Info
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {videoSource ? (
        <div className={`video ${loaded ? 'is-loaded' : 'loading'}`} style={styleFallback}>
          <video
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
        <div className="video is-loaded is-unavailable" style={styleFallback}></div>
      )}
      {videoSource && <Loader loaded={loaded} />}
    </div>
  );
};

export default CoverVideo;
