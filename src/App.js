import React from "react";
import styled from "styled-components";
import Main from "./pages/Main";

const AppContainer = styled.div`
  height: 100%;
  padding: 6rem;
  padding-top: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.2rem;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://wallup.net/wp-content/uploads/2019/09/495651-interior-design-home-room-beautiful-arhitecture.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
`;

const BackgroundImageBlur = styled(BackgroundImage)`
  filter: blur(8px);
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  z-index: 2;
`;

const RelativeContainer = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 20rem);
`;

function App() {
  return (
    <AppContainer>
      <BackgroundImage />
      <BackgroundImageBlur />
      <RelativeContainer>
        <Main />
      </RelativeContainer>
    </AppContainer>
  );
}

export default App;
