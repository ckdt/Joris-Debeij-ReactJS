// Import Defaults
import React, {useState, useEffect} from 'react';

// Import Custom Components
import Carousel from './Carousel';
import VideoPlayer from './VideoPlayer';

// Component: VideoCarousel
const VideoCarousel = ({
  videos,
  isPlaying,
  activeIndex,
  setActiveIndex,
  toggleCarouselPlayback
}) => {
  if (videos) {
    return (
      <>
        <Carousel
          options={{loop: false, draggable: false}}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        >
          {videos.map((video, index) => (
            <div style={{flex: '0 0 100%'}} key={index}>
              <VideoPlayer
                fallback={video.fallback_image.url}
                url={video.video_source.url}
                playing={isPlaying && index === activeIndex}
              />
            </div>
          ))}
        </Carousel>
        <button onClick={toggleCarouselPlayback}>Play/Pause</button>
      </>
    );
  }
  return null;
};
// Component: VideoCarousel
export default VideoCarousel;
