import React from "react";
import Styled from "styled-components";
import Video from "./components/video/VideoComponent";
import { GlobalStyle } from "./app-global-styles";

function AppComponent() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Container>
        <Video />
      </Container>
    </Wrapper>
  );
}

export default AppComponent;

const Wrapper = Styled.section`

`;

const Container = Styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
