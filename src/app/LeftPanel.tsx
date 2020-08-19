import styled from 'styled-components';
import React, { Component } from 'react';

const Settings = styled.div`
  transition: width ease 0.1s;
  width: 55px;
  float: left;
  
  background-color: #1a1e38;
  color: #607d8b;
  height: 100vh;
`;

const LeftPanel = () => {
  return <Settings></Settings>;
};

export default LeftPanel;
