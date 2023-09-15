import { useContext } from "react";
import { PlayerContext } from "../../AppContainer";
import ControlsContainer from "../controls/ControlsContainer";
import SettingsComponent from "../settings/SettingsComponent";
import { VideoBox, VideoElem } from "./video-styles";

function VideoComponent() {
  const values = useContext(PlayerContext);

  const { videoRef, videoContainerRef, videoUrl } = values;

  return (
    <VideoBox ref={videoContainerRef}>
      <SettingsComponent />
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
      <ControlsContainer></ControlsContainer>
    </VideoBox>
  );
}

export default VideoComponent;
