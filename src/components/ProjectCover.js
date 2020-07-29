// Import Defaults
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import Fade from 'react-reveal/Fade';

// Import Prismic
import {RichText} from 'prismic-reactjs';

// Import Custom Components
import Loader from './Loader';

// EventHandlers
const handleClick = (history, location) => {
  // Go to a new page
  return history.push(location);
};

// Component: ProjectCover
const ProjectCover = ({...props}) => {
  let history = useHistory(); // Set history for EventHandler

  // States
  const [loaded, setLoaded] = useState(false);
  // Descructure
  const {tags, slug, video, title, subtitle, fallback, preload} = props;

  // Set vars
  const permaLink = `/project/${slug}`;
  const videoSource = video.url;
  const titleText = RichText.asText(title);
  const subtitleText = RichText.asText(subtitle);
  const fallbackSource = fallback.url;
  const preloadSource = preload.url;

  // find year
  const dispYear = tags.find(value => /\d{4}/.test(value));
  const blacklist = ['tv-film', 'commercial', dispYear];
  const dispTags = tags.filter(tag => !blacklist.includes(tag));

  return (
    <Fade bottom>
      <div
        className={`project--item project--item__${slug}`}
        onClick={() => handleClick(history, permaLink)}
      >
        <div className="overlay">
          <div className="overlay--content">
            <div className="overlay--meta">
              {dispYear && <p className="meta--year">{dispYear}</p>}
              {dispTags && (
                <ul className="meta--tags">
                  {dispTags.map((item, index) => (
                    <li key={index} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {titleText && (
              <h2 className="overlay--title">
                <Link to={permaLink}>{titleText}</Link>
              </h2>
            )}
            {subtitleText && <h3 className="overlay--subtitle">{subtitleText}</h3>}
          </div>
        </div>
        {videoSource ? (
          <div className={`video ${loaded ? 'is-loaded' : 'loading'}`}>
            <video
              poster={fallbackSource}
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
            <img className="video--fallback" src={fallbackSource} alt={titleText} />
          </div>
        )}
        {videoSource && <Loader loaded={loaded} />}

        {preloadSource && (
          <div className="preload">
            <img className="preload--image" src={preloadSource} alt="loading..." />
          </div>
        )}
      </div>
    </Fade>
  );
};

// Export: ProjectCover
export default ProjectCover;
