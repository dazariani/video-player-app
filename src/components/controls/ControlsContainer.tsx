import { useContext } from "react";
import ControlsComponent from "./ControlsComponent";

import { PlayerContext } from "../../AppContainer";

function Controls() {
  const values = useContext(PlayerContext);

  const { videoRef, volumeRef, setVolumeValue } = values;

  // Set video volume on volume input onchange event
  const updateVolume = () => {
    if (videoRef.current && volumeRef.current) {
      videoRef.current.volume = Number(volumeRef.current.value) / 100;
      setVolumeValue(videoRef.current.volume);
    }
  };
  // Mute/unmute actions on volume icon onclick event
  const muteVolume = () => {
    if (videoRef.current && volumeRef.current) {
      videoRef.current.muted = !videoRef.current.muted;

      if (videoRef.current.muted) {
        volumeRef.current.setAttribute("data-volume", volumeRef.current.value);
        volumeRef.current.value = "0";
        setVolumeValue(Number(volumeRef.current.value));
      } else {
        volumeRef.current.value = String(volumeRef.current.dataset.volume);
        setVolumeValue(Number(volumeRef.current.value));
      }
    }
  };

  return (
    <ControlsComponent updateVolume={updateVolume} muteVolume={muteVolume} />
  );
}

export default Controls;
