import styled from 'styled-components';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as style from './panel.css';
import ResizableDiv from './ResizeDiv';
import { observer } from "mobx-react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useEventListener from './use-event-listener';

import { trace, toJS } from 'mobx'


const TestDiv = observer((props) => (<div>{ props.list.columns.map((column, index) => (<div style={{border: '1px solid red',width: `${column.w.lg}px`}}></div> ))}</div>));
export default TestDiv;