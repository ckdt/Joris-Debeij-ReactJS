// React
import React, {useEffect, useState} from 'react';
import Loader from './Loader';

// Ext. Components
import ReactPlayer from 'react-player';

// VideoPlayer
const VideoPlayer = ({url, handlePlay, togglePlay, handlePause, ...props}) => {
  // States
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`player-wrapper ${loaded ? 'is-loaded' : 'loading'}`}>
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        url={url}
        controls={true}
        onReady={() => setLoaded(true)}
        {...props}
      />

      <Loader loaded={loaded} />
    </div>
  );
};

export default VideoPlayer;
