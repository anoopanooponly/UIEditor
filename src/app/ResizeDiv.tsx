import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as style from './panel.css';
import { Draggable } from 'react-beautiful-dnd';
import ReactHtmlParser from 'react-html-parser';
import useEventListener from './use-event-listener';
import { observer } from "mobx-react";
import { AppStoreContext } from './newRightPanel';

const getItemStyle2 = (isDragging, draggableStyle, width) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 2,
  margin: `0 0px 2px 0`,

  display: 'inline-flex',
  width: `${width}%`,
  height: '38px',
  justifyContent: 'space-between',
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  border: '1px solid grey',
  // styles we need to apply on draggables
  ...draggableStyle,
});


const ResizableDiv = observer((props) => {

  const store = React.useContext(AppStoreContext);
  var widths = [];
  props.column.items.map((item, index) => {
    widths.push(item.w);
  });

  const [state, setState]: any = useState({
    isDragging: false,
    widths: widths,
  });



  const startResize = (event: any, index: any, itemId: any) => {
    setState({
      ...state,
      isDragging: true,
      currentPanel: index,
      itemId: itemId,
      initialPos: event.clientX,

    })
  };

  const stopResize = (event) => {
    if (state.isDragging) {
      console.log('stopResize');
      console.log(state);

      props.column.items.map(item => {

        if (item.id == state.itemId) {
          item.w = state.widths[state.currentPanel] + (state.delta / store.screenSize) * 100;
        }
      });



      setState(function ({ widths, currentPanel, delta }) {
        console.log("here");
        return {
          isDragging: false,
          widths: {
            ...widths,
            [currentPanel]: widths[currentPanel] + (delta / store.screenSize) * 100,
            // [currentPanel]: (panels[currentPanel] || 0) + delta,
            // [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta
          },
          delta: 0,
        }
      });
    }
  };

  const resizePanel = (event) => {
    console.log('resizing new div:', state.isDragging)
    if (state.isDragging) {
      const delta = event.clientX - state.initialPos;
      setState({
        ...state,
        delta: delta

      });
    }
  };


  useEventListener('mousemove', resizePanel);
  useEventListener('mouseup', stopResize);
  //  useEventListener('mouseleave', stopResize);


  return (
    <div
      className={style.panel}
      style={{ width: `${props.width}%` }}
      onMouseUp={(e) => stopResize(e)}
      ref={props.provider}
    >
      {props.column.items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={getItemStyle2(
                snapshot.isDragging,
                provided.draggableProps.style,
                item.w
              )}
            >
              <span {...provided.dragHandleProps} className={style.drag}>
                {' '}
              </span>

              {ReactHtmlParser(item.content)}
              <div
                onMouseDown={(e) => startResize(e, index, item.id)}
                key={'resizer_'}
                className={style.resizer}
              ></div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );

})

export default ResizableDiv;
