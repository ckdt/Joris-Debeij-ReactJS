import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Loader from './Loader';
import {RichText} from 'prismic-reactjs';

// EventHandlers
const handleClick = (history, location) => {
  // Go to a new page
  return history.push(location);
};

const ProjectCover = ({...props}) => {
  // Set history for EventHandler
  let history = useHistory();

  // States
  const [loaded, setLoaded] = useState(false);
  // Descructure
  const {id, slug, video, title, fallback} = props;

  // Set vars
  const permaLink = `/project/${slug}`;
  const permaLinkInfo = `/project/${slug}/info`;
  const videoSource = video.url;
  const titleText = RichText.asText(title);
  const fallbackSource = fallback.url;

  const styleFallback = {
    backgroundImage: `url(${fallbackSource})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };

  return (
    <div className={`cover cover__${slug} is-project`}>
      <div className="overlay">
        <div className="overlay--content">
          {titleText && (
            <h2 className="overlay--title">
              <Link to={permaLink}>{titleText}</Link>
            </h2>
          )}
          <div className="overlay--controls">
            <Link to={permaLink} className="control--play">
              Play
            </Link>
            <Link to={permaLinkInfo} className="control--info">
              Info
            </Link>
          </div>
        </div>
      </div>
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

export default ProjectCover;
