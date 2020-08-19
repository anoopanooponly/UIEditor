import styled from 'styled-components';
import React, { Component } from 'react';
import { AppStoreContext } from './MainSection';
import { observer } from "mobx-react";
import { Button } from 'antd';
import { DesktopOutlined, TabletOutlined,MobileOutlined } from '@ant-design/icons';

const Header1 = styled.div`
  color: #444;
  width: 100%;
  height: 50px;
  background-color: #1a1e38;
  /* border-bottom: 1px solid #e1e1e1; */
  display: flex;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  width: 80px;
  /* padding: 0 10px; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  /* border-right: 1px solid #e1e1e1; */
  transition: visibility 0s linear 0s, opacity 300ms;
`;

const MiddleHeader = styled.div`
  width: calc(100% - 51px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MiddleHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
`;

const MiddleHeadercenter = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const MiddleHeaderright = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-content: center;
  width: 100%;
`;

 
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const resizeScreen = (event:any, store: any) => {
  
  store.screenSize = 800;
}

const Header = () => {

  const store = React.useContext(AppStoreContext);
  return (
    <Header1>
      <HeaderLogo>New App</HeaderLogo>
      <MiddleHeader>
        <MiddleHeaderLeft></MiddleHeaderLeft>
        <MiddleHeadercenter>
           <div style={{ display: 'flex',
    flexFlow: 'row wrap',
    width: '104px',
    justifyContent: 'space-between'}}>
                <Button onClick={(e) => {store.screenSize.size = 1600; store.currentScreenSize("lg")}}  icon={<DesktopOutlined />} />
                <Button onClick={(e) => {store.screenSize.size = 900; store.currentScreenSize("md")}}  icon={<TabletOutlined />} />
                <Button onClick={(e) => {store.screenSize.size = 500; store.currentScreenSize("sm")}}  icon={<MobileOutlined />} />
                {/* <button >PC</button>
                <button >Tab</button>
                <button >Mobile</button> */}
           </div>

        </MiddleHeadercenter>
        <MiddleHeaderright>Right</MiddleHeaderright>
      </MiddleHeader>
    </Header1>
  );
};

export default Header;
