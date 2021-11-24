import React from "react";
import styled from "styled-components";

import HomePage from "./containers/HomePage";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App(): JSX.Element {
  return (
    <React.Fragment>
      <AppContainer>
        <HomePage />
      </AppContainer>
    </React.Fragment>
  );
}

export default App;
