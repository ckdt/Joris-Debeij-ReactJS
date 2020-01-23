import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';
import Loader from '../components/Loader';

const CoverVideo = ({
  showTitle = true,
  showInfoControl = true,
  showPlayControl = true,
  isHomeCover = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  // Set Vars
  const video = props.cover_video.url;
  const title = props.cover_title[0].text;
  const fallback = props.cover_fallback_image.url;
  console.log(fallback);
  const styleFallback = {
    backgroundImage: `url(${fallback})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };
  return (
    <div className={`cover cover__${slugify(title)} ${isHomeCover ? 'is-home' : 'is-project'} `}>
      {(showTitle || showInfoControl || showPlayControl) && (
        <div className="overlay">
          <div className="overlay--content">
            {title && (
              <h2 className="overlay--title">
                <Link to={`projects/${slugify(title)}`}>{title}</Link>
              </h2>
            )}
            {(showInfoControl || showPlayControl) && (
              <div className="overlay--controls">
                {showPlayControl && <a className="control--play">Play</a>}
                {showInfoControl && <a className="control--info">Info</a>}
              </div>
            )}
          </div>
        </div>
      )}

      {video && (
        <div className={`video ${loaded ? 'is-loaded' : 'loading'}`} style={styleFallback}>
          <video
            className="video--player"
            playsInline
            autoPlay
            muted
            loop
            src={video}
            onLoadedData={() => setLoaded(true)}
          />
        </div>
      )}

      {/* {fallback && (
        <div className="fallback">
          <img className="fallback--image" src={fallback} alt={`Cover of ${title}`} />
        </div>
      )} */}

      <Loader loaded={loaded} />
    </div>
  );
};

export default CoverVideo;
