import styled from 'styled-components';
import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import NewRightPanel from './newRightPanel';

const MainSection = styled.div`
  margin: 0 auto;
  padding: 0;
  position: relative;
  height: 100vh;
`;

const MainPanel = () => {
  return (
    <MainSection>
      <LeftPanel />
      <NewRightPanel />
    </MainSection>
  );
};

export default MainPanel;
