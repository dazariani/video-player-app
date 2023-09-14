import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { PlayerContext } from "../../AppComponent";
import {
  Wrapper,
  Container,
  OptionBox,
  Name,
  Value,
  QualityListBox,
  QualityListTitle,
  QualityListitem,
} from "./settings-styles";

import { MdOutlineArrowBackIos } from "react-icons/md";

function Settings() {
  const values = useContext(PlayerContext);

  const {
    setVideoUrl,
    qualityData,
    currentQuality,
    setCurrentQuality,
    qualityListOn,
    setQualityListOn,
    settingBtnOn,
    isQualityItemActive,
    setIsQualityItemActive,
    setSettingBtnOn,
  } = values;

  return (
    <Wrapper $settingBtnOn={settingBtnOn}>
      <Container>
        {qualityListOn === false ? (
          <OptionBox onClick={() => setQualityListOn(true)}>
            <Name>Quality</Name>
            <Value>{currentQuality}</Value>
          </OptionBox>
        ) : (
          <QualityListBox>
            <QualityListTitle onClick={() => setQualityListOn(false)}>
              <MdOutlineArrowBackIos /> Quality
            </QualityListTitle>
            {qualityData.map((data, ind) => {
              return (
                <QualityListitem
                  onClick={() => {
                    setIsQualityItemActive(data.name);
                    setCurrentQuality(data.name);
                    setVideoUrl(data.url);
                    setSettingBtnOn(false);
                  }}
                  key={ind}
                  $isActive={isQualityItemActive === data.name}
                >
                  {data.name}
                </QualityListitem>
              );
            })}
          </QualityListBox>
        )}
      </Container>
    </Wrapper>
  );
}

export default Settings;
