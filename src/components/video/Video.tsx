import React from "react";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { PlayerContext } from "../../AppComponent";
import Controls from "../controls/Controls";
import Settings from "../settings/Settings";
import { VideoBox, VideoElem } from "./video-styles";

function Video() {
  const values = useContext(PlayerContext);

  const { videoRef, videoContainerRef, videoUrl } = values;

  return (
    <VideoBox ref={videoContainerRef}>
      <Settings />
      <VideoElem
        onClick={() => {
          if (videoRef.current?.paused) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        }}
        ref={videoRef}
        src={videoUrl}
        controls={false}
      ></VideoElem>
      <Controls></Controls>
    </VideoBox>
  );
}

export default Video;
