import React from "react";
import Styled from "styled-components";
import { useState, useEffect, useRef, createContext } from "react";
import Video from "./components/video/Video";
import { GlobalStyle } from "./app-global-styles";
import { Props } from "./App-types";
import { QualityProps } from "./App-types";

const data = [
  {
    name: "720p",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    name: "360p",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
];

export const PlayerContext = createContext({} as Props);

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineBoxRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const fullScrnBtnRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);
  const controlsBoxRef = useRef<HTMLElement>(null);

  const [settingBtnOn, setSettingBtnOn] = useState<boolean>(false);
  const [qualityData, setQualityData] = useState<QualityProps[]>(data);
  const [currentQuality, setCurrentQuality] = useState<string>("360p");
  const [qualityListOn, setQualityListOn] = useState<boolean>(false);
  const [isQualityItemActive, setIsQualityItemActive] =
    useState<string>("360p");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [volumeValue, setVolumeValue] = useState<number>(50);
  const [curSeconds, setCurSeconds] = useState<null | string>(null);
  const [curMinutes, setCurMinutes] = useState<null | string>(null);
  const [vidCurSeconds, setVidCurSeconds] = useState<null | string>(null);
  const [vidCuMinutes, setVidCurMinutes] = useState<null | string>(null);
  const [rewindOn, setRewindOn] = useState<boolean>(false);
  const [isMouseInControl, setIsMouseInControl] = useState<boolean>(false);

  const [videoUrl, setVideoUrl] = useState<string>(qualityData[1].url);
  const [currentTime, setCurrentTime] = useState<null | number | undefined>(
    null
  );
  const [timelineLength, setTimelineLength] = useState<
    null | number | undefined
  >(null);
  const [circleOffset, setCircleOffcet] = useState<null | number | undefined>(
    null
  );
  const [circleOn, setCircleOn] = useState<boolean>(false);

  // Make controlsBox visible on mouseMove on full screen mode
  useEffect(() => {
    let mouseMove: any;
    if (document.fullscreenElement) {
      mouseMove = (e: any) => {
        if (controlsBoxRef.current && e.target === controlsBoxRef.current) {
          controlsBoxRef.current.style.opacity = "1";
        }
      };
      document.addEventListener("mousemove", mouseMove);
    }
    return () => document.removeEventListener("mousemove", mouseMove);
  }, [document.fullscreenElement]);

  // Make controlsBox visible when mouse enters
  useEffect(() => {
    const mouseenter = () => {
      if (
        controlsBoxRef.current &&
        videoRef.current &&
        videoRef.current?.currentTime > 0
      )
        controlsBoxRef.current.style.opacity = "1";
    };
    videoContainerRef.current?.addEventListener("mouseenter", mouseenter);

    return () =>
      videoContainerRef.current?.removeEventListener("mouseenter", mouseenter);
  }, []);

  // Make controlsBox hidden when mouse leaves
  useEffect(() => {
    const mouseLeave = () => {
      if (
        controlsBoxRef.current &&
        videoRef.current &&
        !videoRef.current?.paused &&
        videoRef.current?.currentTime > 0 &&
        videoRef.current?.currentTime < videoRef.current?.duration
      )
        controlsBoxRef.current.style.opacity = "0";
    };
    videoContainerRef.current?.addEventListener("mouseleave", mouseLeave);

    return () =>
      videoContainerRef.current?.removeEventListener("mouseleave", mouseLeave);
  }, []);

  // Hide controls after a while when video starts playing
  useEffect(() => {
    let timer: any;
    if (!videoRef.current?.paused && !isMouseInControl) {
      timer = setTimeout(() => {
        if (controlsBoxRef.current) {
          controlsBoxRef.current.style.opacity = "0";
        }
      }, 1500);
    } else {
      if (controlsBoxRef.current) controlsBoxRef.current.style.opacity = "1";
    }
    return () => clearTimeout(timer);
  }, [videoRef.current?.paused, isMouseInControl]);

  // Play video when up event happens outside of timelineBox
  useEffect(() => {
    const stopMove = () => {
      document.onmousemove = null;
      if (rewindOn) {
        playAfterUp();
        setRewindOn(false);
      }
    };
    document.addEventListener("mouseup", stopMove);

    return () => {
      document.removeEventListener("mouseup", stopMove);
    };
  }, [rewindOn]);

  //  Set timer
  useEffect(() => {
    const timersSetup = () => {
      if (videoRef.current && videoRef.current.duration) {
        const curtime = new Date(videoRef.current.currentTime * 1000)
          .toISOString()
          .substr(11, 8);
        const videoTime = new Date(videoRef.current.duration * 1000)
          .toISOString()
          .substr(11, 8);

        const sec = curtime.substr(6, 2);
        const min = curtime.substr(3, 2);
        const videosec = videoTime.substr(6, 2);
        const videomin = videoTime.substr(3, 2);
        setCurSeconds(sec);
        setCurMinutes(min);
        setVidCurSeconds(videosec);
        setVidCurMinutes(videomin);
      }
      if (!videoRef.current || !videoRef.current.duration) {
        setCurSeconds("00");
        setCurMinutes("00");
        setVidCurSeconds("00");
        setVidCurMinutes("00");
      }
    };
    timersSetup();
  }, [videoRef.current?.currentTime || videoRef.current]);

  // Set current time
  useEffect(() => {
    const timeUpdate = (e: any) => {
      setCurrentTime(e.target.currentTime);
    };

    videoRef.current?.addEventListener("timeupdate", (e) => timeUpdate(e));

    return () =>
      videoRef.current?.removeEventListener("timeUpdate", timeUpdate);
  }, []);

  // Set length of timeline
  useEffect(() => {
    const videoLength = videoRef.current?.duration;
    const length: null | number | undefined =
      currentTime && videoLength && (currentTime / videoLength) * 100;
    setTimelineLength(length);
    setCircleOffcet(length);
  }, [currentTime]);

  // Play video after mouseup
  const playAfterUp = () => {
    let playPromise: any = videoRef.current?.paused;
    if (playPromise) {
      videoRef.current?.play();
    } else {
      setTimeout(() => {
        videoRef.current?.play();
      }, 2000);
    }
  };

  //  Timline mousedown handler function
  const rewindHandle = (e: any) => {
    if (timelineBoxRef.current && timelineRef.current && videoRef.current) {
      const newLength =
        e.pageX - (window.innerWidth - timelineBoxRef.current.offsetWidth) / 2;
      const timelinePercent =
        (newLength / timelineBoxRef.current?.offsetWidth) * 100 + 0.4;
      const videoLength = videoRef.current?.duration;
      if (videoLength) {
        videoRef.current.currentTime = (timelinePercent * videoLength) / 100;
      }
      setCircleOffcet(timelinePercent);
    }
    let playPromise = videoRef.current?.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          videoRef.current?.pause();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Toogle fullscreen and set state for icon toogling
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (videoContainerRef.current?.requestFullscreen) {
      // Need this to support Safari
      videoContainerRef.current.requestFullscreen();
    } else {
      videoContainerRef.current?.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <PlayerContext.Provider
      value={{
        videoRef,
        timelineBoxRef,
        timelineRef,
        circleRef,
        fullScrnBtnRef,
        videoContainerRef,
        videoUrl,
        volumeRef,
        setVideoUrl,
        currentTime,
        setCurrentTime,
        timelineLength,
        setTimelineLength,
        circleOffset,
        setCircleOffcet,
        circleOn,
        setCircleOn,
        rewindHandle,
        toggleFullScreen,
        qualityData,
        setQualityData,
        currentQuality,
        setCurrentQuality,
        qualityListOn,
        setQualityListOn,
        settingBtnOn,
        setSettingBtnOn,
        isQualityItemActive,
        setIsQualityItemActive,
        isFullScreen,
        setIsFullScreen,
        volumeValue,
        setVolumeValue,
        curSeconds,
        setCurSeconds,
        curMinutes,
        setCurMinutes,
        vidCurSeconds,
        setVidCurSeconds,
        vidCuMinutes,
        setVidCurMinutes,
        rewindOn,
        setRewindOn,
        playAfterUp,
        controlsBoxRef,
        isMouseInControl,
        setIsMouseInControl,
      }}
    >
      <Wrapper>
        <GlobalStyle />
        <Container>
          <Video />
        </Container>
      </Wrapper>
    </PlayerContext.Provider>
  );
}

export default App;

const Wrapper = Styled.section`

`;

const Container = Styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
