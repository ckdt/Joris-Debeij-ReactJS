import React, {useState, useEffect} from 'react';
import Video from '../components/Video';

const Series = ({seriesData, videoIsPaused, setVideoIsPaused}) => {
  const total = seriesData.length;
  const startIndex = 0;
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const videoUrl = seriesData[currentIndex].video_source.url;
  const videoFallback = seriesData[currentIndex].fallback_image.url;
  const videoType = seriesData[currentIndex].video_embed_type;

  const updateIndex = num => {
    if (num >= 0 && num < total) {
      setCurrentIndex(num);
      setVideoIsPaused(false);
    }
  };

  useEffect(() => {
    console.log('serues', seriesData);
  }, [seriesData]);

  useEffect(() => {
    console.log('total', total, 'start', startIndex, 'current', currentIndex);
  }, [currentIndex]);

  return (
    <div>
      <Video
        key={currentIndex}
        videoUrl={videoUrl}
        videoType={videoType}
        videoFallback={videoFallback}
        videoIsPaused={videoIsPaused}
      />
      <button onClick={() => updateIndex(currentIndex - 1)}>Prev</button>
      <button onClick={() => updateIndex(currentIndex + 1)}>Next</button>
    </div>
  );
};
export default Series;
