import React, {useRef, useState, useEffect} from 'react';
import Plyr from 'plyr';

const Video = ({videoUrl, videoType, videoFallback, videoIsPaused}) => {
  const videoID = parseVideo(videoUrl).id;
  const videoInstance = useRef(null);
  const [videoPlayer, setVideoPlayer] = useState(null);

  const controls = ['play-large', 'play', 'progress', 'mute', 'fullscreen'];

  // Initialize Plyr
  useEffect(() => {
    const plyr = new Plyr(videoInstance.current, {
      volume: 0.5,
      muted: false,
      controls: controls
      // autoplay: true
    });

    if (!videoIsPaused) {
      plyr.autoplay = true;
    }
    window.player = plyr;
    setVideoPlayer(plyr);
    console.log(plyr);
  }, [videoInstance]);

  useEffect(() => {
    if (videoPlayer) {
      if (videoIsPaused) {
        videoPlayer.pause();
      } else {
        videoPlayer.play();
      }
    }
  }, [videoIsPaused]);

  switch (videoType) {
    case 'vimeo':
      return (
        <>
          <div className="video">
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
          <div className="video">
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
          <div className="video">
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

const parseVideo = videoUrl => {
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
    /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
  );

  if (RegExp.$3.indexOf('youtu') > -1) {
    var type = 'youtube';
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    var type = 'vimeo';
  }

  return {
    type: type,
    id: RegExp.$6
  };
};

export default Video;
