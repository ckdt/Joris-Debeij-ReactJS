// React
import React, {useState, useEffect} from 'react';

// Components
import VideoPlayer from './VideoPlayer';

// Video
const Video = ({video, isPlaying, togglePlay}) => {
  if (video) {
    console.log('video playing?', isPlaying);
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

export default Video;
