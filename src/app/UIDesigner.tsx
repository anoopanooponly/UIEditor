import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './Header';
import MainPanel from './MainSection';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Container = styled.div`
  background: #dcdcdc;
`;

const UIDesigner = () => {
  return (
    <Container>
      <Header />
      <MainPanel />
    </Container>
  );
};

export default UIDesigner;
