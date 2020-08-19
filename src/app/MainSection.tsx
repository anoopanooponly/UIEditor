import styled from 'styled-components';
import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import NewRightPanel from './newRightPanel';
import appStoreInstance from './stores/AppStore';

export const AppStoreContext = React.createContext(appStoreInstance);

const MainSection = styled.div`
  margin: 0 auto;
  padding: 0;
  position: relative;
  height: 100vh;
`;

const MainPanel = () => {
  const store = React.useContext(AppStoreContext);
  return (
    <AppStoreContext.Provider value={appStoreInstance}>
    <MainSection>
      <LeftPanel />
      <NewRightPanel />
    </MainSection>
    </AppStoreContext.Provider>
  );
};

export default MainPanel;
