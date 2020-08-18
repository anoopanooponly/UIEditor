import styled from 'styled-components';
import React, { Component } from 'react';

const Settings = styled.div`
  transition: width ease 0.1s;
  width: 80px;
  float: left;

  background-color: #ffffff;
  color: #607d8b;
  height: 100vh;
`;

const LeftPanel = () => {
  return <Settings>Settings</Settings>;
};

export default LeftPanel;
