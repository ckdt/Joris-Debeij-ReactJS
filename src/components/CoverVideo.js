import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Loader from '../components/Loader';
import {RichText} from 'prismic-reactjs';

const CoverVideo = ({
  showTitle = true,
  showInfoControl = true,
  showPlayControl = true,
  isHomeCover = false,
  ...props
}) => {
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

  return (
    <div className={`cover cover__${slug} ${isHomeCover ? 'is-home' : 'is-project'} `}>
      {(showTitle || showInfoControl || showPlayControl) && (
        <div className="overlay">
          <div className="overlay--content">
            {title && (
              <h2 className="overlay--title">
                {isHomeCover ? (
                  // Link to project overview
                  <Link to={`/projects/${slug}`}>{titleText}</Link>
                ) : (
                  // Link to project detail
                  <Link to={`/project/${slug}`}>{titleText}</Link>
                )}
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

      {video && (
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
      )}

      <Loader loaded={loaded} />
    </div>
  );
};

export default CoverVideo;
