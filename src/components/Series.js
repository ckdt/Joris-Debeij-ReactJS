import React, {useState} from 'react';
import Video from '../components/Video';
import {RichText} from 'prismic-reactjs';
import arrowLeft from '../assets/images/arrow-left.svg';
import arrowRight from '../assets/images/arrow-right.svg';

const Series = ({seriesData, videoIsPaused, setVideoIsPaused, videoIsBlurred}) => {
  const total = seriesData.length;
  const startIndex = 0;
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const videoUrl = seriesData[currentIndex].video_source.url;
  const videoFallback = seriesData[currentIndex].fallback_image.url;
  const videoType = seriesData[currentIndex].video_embed_type;
  const videoTitle = RichText.asText(seriesData[currentIndex].video_title);
  const updateIndex = num => {
    if (num >= 0 && num < total) {
      setCurrentIndex(num);
      setVideoIsPaused(false);
    }
  };

  return (
    <div className="series">
      <Video
        key={currentIndex}
        videoUrl={videoUrl}
        videoType={videoType}
        videoFallback={videoFallback}
        videoIsPaused={videoIsPaused}
        videoTitle={videoTitle}
        videoIsBlurred={videoIsBlurred}
      />
      <div className="series--controls">
        <div
          onClick={() => updateIndex(currentIndex - 1)}
          className={`series--control series--control__prev 
          ${currentIndex === 0 ? 'is-disabled' : null}`}
        >
          <img src={arrowLeft} alt="Previous" />
        </div>
        <div
          onClick={() => updateIndex(currentIndex + 1)}
          className={`series--control series--control__next 
          ${currentIndex === total - 1 ? 'is-disabled' : null}`}
        >
          <img src={arrowRight} alt="Previous" />
        </div>
      </div>
    </div>
  );
};
export default Series;
