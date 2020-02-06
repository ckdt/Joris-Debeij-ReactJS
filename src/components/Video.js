// Import Defaults
import React, {useState, useEffect} from 'react';

// Import Custom Components
import VideoPlayer from './VideoPlayer';

// Component: Video
const Video = ({video, isPlaying, togglePlay}) => {
  if (video) {
    return (
      <>
        <VideoPlayer
          fallback={video.fallback_image.url}
          url={video.video_source.url}
          playing={isPlaying}
        />
        <button onClick={togglePlay}>Play/Pause</button>
      </>
    );
  }
  return null;
};

// Export: Video
export default Video;
