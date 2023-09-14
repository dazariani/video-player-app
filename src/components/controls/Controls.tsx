import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import {
  ButtonsBox,
  ControlsBox,
  TimelineBox,
  Timeline,
  Circle,
  VolumeBox,
  VolumeImgBox,
  VolumeInput,
  PlayStopBtnBox,
  FullScreenBtnBox,
  SettingBtnBox,
  SettingFullScrBtnBox,
  TimeBox,
  Minutes,
  Seconds,
  DropElem,
  CurrentTimeBox,
  VideoTimeBox,
} from "./controls-styles";

import { AiOutlineSetting } from "react-icons/ai";

import { PlayerContext } from "../../AppComponent";
import {
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsFillVolumeUpFill,
  BsFillPlayFill,
  BsFillPauseFill,
  BsArrowsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs";

function Controls() {
  const values = useContext(PlayerContext);

  const {
    videoRef,
    timelineBoxRef,
    timelineRef,
    circleRef,
    fullScrnBtnRef,
    volumeRef,
    timelineLength,
    circleOffset,
    circleOn,
    setCircleOn,
    rewindHandle,
    toggleFullScreen,
    settingBtnOn,
    setSettingBtnOn,
    setQualityListOn,
    isFullScreen,
    volumeValue,
    setVolumeValue,
    curSeconds,
    curMinutes,
    vidCurSeconds,
    vidCuMinutes,
    setRewindOn,
    playAfterUp,
    controlsBoxRef,
    setIsMouseInControl,
  } = values;

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
    <ControlsBox
      onMouseEnter={() => setIsMouseInControl(true)}
      onMouseLeave={() => setIsMouseInControl(false)}
      ref={controlsBoxRef}
    >
      {/* Timeline box */}
      <TimelineBox
        onMouseOver={() => {
          if (circleRef.current) {
            setCircleOn(true);
          }
        }}
        onMouseLeave={() => {
          if (circleRef.current) {
            setCircleOn(false);
          }
        }}
        ref={timelineBoxRef}
        onMouseDown={(e) => {
          rewindHandle(e);
          setRewindOn(true);

          document.onmousemove = (e) => {
            e.preventDefault();
            rewindHandle(e);
            setCircleOn(true);
          };
        }}
        onMouseUp={(e) => {
          if (videoRef.current) {
            playAfterUp();
          }
          document.onmousemove = null;
          setRewindOn(false);
        }}
      >
        <Circle ref={circleRef} $offset={circleOffset} $circleOn={circleOn} />
        <Timeline ref={timelineRef} $timelineLength={timelineLength} />
      </TimelineBox>

      {/* Buttons' box */}
      <ButtonsBox>
        <VolumeBox>
          <VolumeImgBox onClick={muteVolume}>
            {volumeValue <= 0 ? (
              <BsFillVolumeMuteFill
                style={{ fill: "#FFF", fontSize: "30px" }}
              />
            ) : volumeValue <= 0.5 && volumeValue > 0 ? (
              <BsFillVolumeDownFill
                style={{ fill: "#FFF", fontSize: "30px" }}
              />
            ) : (
              <BsFillVolumeUpFill style={{ fill: "#FFF", fontSize: "30px" }} />
            )}
          </VolumeImgBox>
          <VolumeInput type="range" ref={volumeRef} onChange={updateVolume} />

          <TimeBox>
            <CurrentTimeBox>
              <Minutes>{curMinutes}</Minutes>
              <DropElem>:</DropElem>
              <Seconds>{curSeconds}</Seconds>
            </CurrentTimeBox>

            <VideoTimeBox>
              <Minutes>{vidCuMinutes}</Minutes>
              <DropElem>:</DropElem>
              <Seconds>{vidCurSeconds}</Seconds>
            </VideoTimeBox>
          </TimeBox>
        </VolumeBox>

        <PlayStopBtnBox
          onClick={() => {
            if (videoRef.current?.paused) {
              videoRef.current?.play();
            } else {
              videoRef.current?.pause();
            }
          }}
        >
          {videoRef.current?.paused || videoRef.current === null ? (
            <BsFillPlayFill
              style={{ fill: "#FFF", fontSize: "30px", marginLeft: "3px" }}
            />
          ) : (
            <BsFillPauseFill style={{ fill: "#FFF", fontSize: "30px" }} />
          )}
        </PlayStopBtnBox>
        <SettingFullScrBtnBox>
          <SettingBtnBox
            onClick={() => {
              setSettingBtnOn(!settingBtnOn);
              setQualityListOn(false);
            }}
          >
            <AiOutlineSetting style={{ fill: "#FFF", fontSize: "30px" }} />
          </SettingBtnBox>
          <FullScreenBtnBox ref={fullScrnBtnRef} onClick={toggleFullScreen}>
            {isFullScreen ? (
              <BsFullscreenExit style={{ fill: "#FFF", fontSize: "20px" }} />
            ) : (
              <BsArrowsFullscreen style={{ fill: "#FFF", fontSize: "20px" }} />
            )}
          </FullScreenBtnBox>
        </SettingFullScrBtnBox>
      </ButtonsBox>
    </ControlsBox>
  );
}

export default Controls;
