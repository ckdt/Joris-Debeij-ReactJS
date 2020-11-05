import React, {useRef, useEffect} from 'react';
import Plyr from 'plyr';
import './video.css';

export const blurStyle = {
  filter: `blur(20px)`
};

const Video = ({
  videoTitle,
  videoUrl,
  videoType,
  videoFallback,
  videoIsPaused,
  videoIsBlurred
}) => {
  const videoID = parseVideo(videoUrl).id;
  const videoInstance = useRef(null);
  const videoPlayer = useRef(null);

  // Initialize Plyr
  useEffect(() => {
    const controls = `
  <div class="plyr__controls">
    <div class="plyr__controls__item plyr__title">
      ${videoTitle}
    </div>
    <button type="button" class="plyr__control" aria-label="Play, ${videoTitle}" data-plyr="play">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
    </button>
    <div class="plyr__controls__item plyr__progress__container">
        <div class="plyr__progress">
        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
        <span role="tooltip" class="plyr__tooltip">00:00</span>
        </div>
    </div>
    <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
    </button>
    <button type="button" class="plyr__control" data-plyr="fullscreen">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
    </button>
  </div>
  `;

    const plyr = new Plyr(videoInstance.current, {
      volume: 0.5,
      muted: false,
      controls: controls,
      title: videoTitle
      // autoplay: true
    });
    if (!videoIsPaused) {
      plyr.autoplay = true;
    }
    window.player = plyr;
    videoPlayer.current = plyr;
  }, [videoInstance, videoIsPaused, videoTitle]);

  useEffect(() => {
    if (videoPlayer.current) {
      if (videoIsPaused) {
        videoPlayer.current.pause();
      } else {
        videoPlayer.current.play();
      }
    }
  }, [videoIsPaused]);

  switch (videoType) {
    case 'vimeo':
      return (
        <>
          <div className="video" style={videoIsBlurred ? blurStyle : null}>
            <div
              ref={videoInstance}
              className="video--player"
              data-plyr-provider={videoType}
              data-plyr-embed-id={videoID}
            ></div>
          </div>
        </>
      );
    case 'youtube':
      return (
        <>
          <div className="video" style={videoIsBlurred ? blurStyle : null}>
            <div
              ref={videoInstance}
              className="video--player"
              data-plyr-provider={videoType}
              data-plyr-embed-id={videoID}
            ></div>
          </div>
        </>
      );
    default:
      return (
        <>
          <div className="video" style={videoIsBlurred ? blurStyle : null}>
            <video
              ref={videoInstance}
              poster={videoFallback}
              className="video--player"
              playsInline
              controls
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </>
      );
  }
};

const parseVideo = (videoUrl) => {
  // - Supported YouTube URL formats:
  //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
  //   - http://youtu.be/My2FRPA3Gf8
  //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
  // - Supported Vimeo URL formats:
  //   - http://vimeo.com/25451551
  //   - http://player.vimeo.com/video/25451551
  // - Also supports relative URLs:
  //   - //player.vimeo.com/video/25451551

  videoUrl.match(
    /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/
  );

  var type = '';
  if (RegExp.$3.indexOf('youtu') > -1) {
    type = 'youtube';
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    type = 'vimeo';
  }

  return {
    type: type,
    id: RegExp.$6
  };
};

export default Video;
