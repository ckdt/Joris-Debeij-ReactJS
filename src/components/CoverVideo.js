import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';
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
  const slug = props.slug;
  const video = props.cover_video.url;
  const title = RichText.asText(props.cover_title);
  const fallback = props.cover_fallback_image.url;

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
                {isHomeCover ? (
                  // Link to project overview
                  <Link to={`/projects/${slug}`}>{title}</Link>
                ) : (
                  // Link to project detail
                  <Link to={`/project/${slug}`}>{title}</Link>
                )}
              </h2>
            )}
            {(showInfoControl || showPlayControl) && (
              <div className="overlay--controls">
                {showPlayControl && (
                  <Link to={`/project/${slugify(title)}`} className="control--play">
                    Play
                  </Link>
                )}
                {showInfoControl && (
                  <Link to={`/project/${slugify(title)}#info`} className="control--info">
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
            src={video}
            onLoadedData={() => setLoaded(true)}
          />
        </div>
      )}

      <Loader loaded={loaded} />
    </div>
  );
};

export default CoverVideo;
