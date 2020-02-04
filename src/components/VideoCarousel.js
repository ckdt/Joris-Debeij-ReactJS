// React
import React, {useState, useEffect} from 'react';

// Components
import Carousel from './Carousel';
import VideoPlayer from './VideoPlayer';

// VideoCarousel
const VideoCarousel = ({videos}) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);

  const togglePlay = () => {
    if (autoPlay) {
      setManualPause(true);
      setAutoPlay(false);
    } else {
      setManualPause(false);
      setAutoPlay(true);
    }
  };
  if (videos) {
    return (
      <>
        <Carousel
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          options={{loop: false, draggable: false}}
        >
          {videos.map((video, index) => (
            <div style={{flex: '0 0 100%'}} key={index}>
              <VideoPlayer
                fallback={video.fallback_image.url}
                url={video.video_source.url}
                playing={index === activeIndex && !manualPause}
              />
            </div>
          ))}
        </Carousel>
        <button onClick={togglePlay}>Play/Pause</button>
      </>
    );
  }
  return null;
};

export default VideoCarousel;
