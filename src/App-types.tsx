export interface QualityProps {
  name: string;
  url: string;
}

export interface Props {
  videoRef: React.RefObject<HTMLVideoElement>;
  timelineBoxRef: React.RefObject<HTMLDivElement>;
  timelineRef: React.RefObject<HTMLDivElement>;
  circleRef: React.RefObject<HTMLDivElement>;
  fullScrnBtnRef: React.RefObject<HTMLDivElement>;
  videoContainerRef: React.RefObject<HTMLDivElement>;
  volumeRef: React.RefObject<HTMLInputElement>;
  controlsBoxRef: React.RefObject<HTMLElement>;

  videoUrl: string;
  setVideoUrl: (prop: string) => void;
  currentTime: null | number | undefined;
  setCurrentTime: (prop: null | number | undefined) => void;
  timelineLength: null | number | undefined;
  setTimelineLength: (prop: null | number | undefined) => void;
  circleOffset: null | number | undefined;
  setCircleOffcet: (prop: null | number | undefined) => void;
  circleOn: boolean;
  setCircleOn: (prop: boolean) => void;

  playAfterUp: () => void;
  rewindHandle: (props: any) => void;
  toggleFullScreen: () => void;
  qualityData: QualityProps[];
  setQualityData: (prop: QualityProps[]) => void;
  currentQuality: string;
  setCurrentQuality: (prop: string) => void;
  qualityListOn: boolean;
  setQualityListOn: (prop: boolean) => void;
  settingBtnOn: boolean;
  setSettingBtnOn: (prop: boolean) => void;
  isQualityItemActive: string;
  setIsQualityItemActive: (prop: string) => void;
  isFullScreen: boolean;
  setIsFullScreen: (prop: boolean) => void;
  volumeValue: number;
  setVolumeValue: (prop: number) => void;
  curSeconds: null | string;
  setCurSeconds: (props: null | string) => void;
  curMinutes: null | string;
  setCurMinutes: (props: null | string) => void;
  vidCurSeconds: null | string;
  setVidCurSeconds: (props: null | string) => void;
  vidCuMinutes: null | string;
  setVidCurMinutes: (props: null | string) => void;
  rewindOn: boolean;
  setRewindOn: (props: boolean) => void;
  isMouseInControl: boolean;
  setIsMouseInControl: (props: boolean) => void;
}
