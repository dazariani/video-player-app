import Styled from "styled-components";

export const Wrapper = Styled.div<{ $settingBtnOn: boolean }>`
    position: absolute;
    right: 50px;
    bottom: 115px;
    color: #FFF;
    background: #1a1919;
    width: 100%;
    max-width: 200px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1;
    visibility: ${(props) => (props.$settingBtnOn ? "visible" : "hidden")};
`;
export const Container = Styled.div`
    padding: 15px;
    padding-inline: 13px;
`;
export const OptionBox = Styled.div`
    width: 93%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 8px;
    cursor: pointer;
`;
export const Name = Styled.span`
    
`;
export const Value = Styled.span`
    
`;
export const QualityListBox = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
export const QualityListTitle = Styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    cursor: pointer;
`;
export const QualityListitem = Styled.li<{ $isActive: boolean }>`
    width: 100%;
    margin-block: 10px;
    margin-left: 5px;
    list-style-type: ${(props) => (props.$isActive ? "disc" : "none")};
    padding-left: ${(props) => (props.$isActive ? "0px" : "19.1px")};
    cursor: pointer;
`;
