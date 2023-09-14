import Styled from "styled-components";

export const ButtonsBox = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-inline: 10px;
    padding-block: 10px;
`;
export const Button = Styled.button`
  
`;
export const ControlsBox = Styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 0px; 
    padding: 13px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)); 
`;

export const TimelineBox = Styled.div`
    width: 100%;
    height: 8px;
    background-color: #d2cece;
    cursor: pointer;
    margin-bottom: 10px;
`;
export const Timeline = Styled.div<{
  $timelineLength: number | null | undefined;
}>`
    height: 8px;
    width: ${(props) =>
      props.$timelineLength ? props.$timelineLength + "%" : "0px"} ;
    background: red;
    position: relative;
    top: -12px;
    left: 0;
`;
export const Circle = Styled.div<{
  $offset: null | number | undefined;
  $circleOn: boolean;
}>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: green;
    position: relative;
    top: -1.5px;
    left: ${(props) =>
      props.$offset && props.$offset <= 100
        ? props.$offset - 0.4 + "%"
        : props.$offset && props.$offset > 100
        ? "100%"
        : "-2px"};
    visibility: ${(props) => (props.$circleOn ? "visible" : "hidden")};
    z-index: 3;
`;

export const VolumeBox = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
`;
export const VolumeImgBox = Styled.div`

`;
export const VolumeInput = Styled.input`
  width: 100px;

`;
export const PlayStopBtnBox = Styled.div`
    position: relative;
    left: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #005cc8;
    cursor: pointer;

     &:hover{
      transform: scale(0.95);
    }
`;
export const FullScreenBtnBox = Styled.div`
    cursor: pointer;

     &:hover{
      transform: scale(0.95);
    }
`;
export const SettingBtnBox = Styled.div`
    cursor: pointer;

    &:hover{
      transform: scale(0.95);
    }
`;
export const SettingFullScrBtnBox = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;
export const TimeBox = Styled.div`
    color: #FFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-left: 10px;
`;
export const CurrentTimeBox = Styled.div`
   letter-spacing: 1px;
`;
export const VideoTimeBox = Styled.div`
   letter-spacing: 1px;
`;
export const Minutes = Styled.span`
   
`;
export const DropElem = Styled.span`
   
`;
export const Seconds = Styled.span`

  
`;
