// React
import React, {useState, useEffect} from 'react';

// Components
import VideoPlayer from './VideoPlayer';

// Video
const Video = ({video}) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [manualPause, setManualPause] = useState(false);

  const togglePlay = () => {
    if (autoPlay) {
      setAutoPlay(false);
    } else {
      setAutoPlay(true);
    }
  };
  if (video) {
    return (
      <>
        <VideoPlayer
          fallback={video.fallback_image.url}
          url={video.video_source.url}
          playing={autoPlay}
        />

        <button onClick={togglePlay}>Play/Pause</button>
      </>
    );
  }
  return null;
};

export default Video;
