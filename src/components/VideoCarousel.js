// React
import React, {useState, useEffect} from 'react';

// Components
import Carousel from './Carousel';
import VideoPlayer from './VideoPlayer';

// VideoCarousel
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

export default VideoCarousel;
