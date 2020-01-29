// React
import React, {useEffect, useState} from 'react';

// Ext. Components
import ReactPlayer from 'react-player';

// VideoPlayer
const VideoPlayer = ({url, handlePlay, handlePause, ...props}) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        url={url}
        controls={false}
        onPlay={handlePlay}
        onPause={handlePause}
        {...props}
      />
    </div>
  );
};

export default VideoPlayer;
