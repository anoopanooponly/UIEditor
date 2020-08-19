import styled from 'styled-components';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as style from './panel.css';
import ResizableDiv from './ResizeDiv';
import { observer } from "mobx-react";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useEventListener from './use-event-listener';
import { AppStoreContext } from './newRightPanel';
import { trace, toJS } from 'mobx'


const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 4,
  margin: `0 0px 8px 0`,
  
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'whitesmoke',
  display: 'flex',
  flexFlow: 'row',
  border: '1px dashed gray',
  // styles we need to apply on draggables
  ...draggableStyle,
  flexWrap: 'wrap'
});

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;


const NewDiv = observer((props) => {

  const store = React.useContext(AppStoreContext);

  const [state, setState]: any = useState({
    isDragging: false,
    panels: [50, 50],
  });


  const startResize = (event: any, index: any, currentRowId: any) => {
    let panels = [];
    props.orgstate[currentRowId].map(listItems => {
      if(listItems.columns && listItems.columns.length){
        listItems.columns.map((column, index) => {
          panels[index] = column.w[props.currentscreen];
        });
      }
      
    }
      );
    setState({
      ...state,
      panels: panels,
      isDragging: true,
      currentPanel: index,
      currentRowId: currentRowId,
      initialPos: event.clientX,
    });
  };

  const mouseLeave = () => {
    console.log('mouseLeave');
  };

  const stopResize = (e: any) => {
    if (state.isDragging) {


      props.orgstate[state.currentRowId].map(
        (listItems, index) => {
          console.log("iterating...", toJS(listItems.columns));

          if (listItems.columns &&
            listItems.columns.length)
            listItems.columns[state.currentPanel].w[props.currentscreen] = state.panels[state.currentPanel] + (state.delta / store.screenSize.size) * 100;
        }
      );

      setState(
        ({ panels, currentPanel, delta }) => ({
          isDragging: false,
          panels: {
            ...panels,
            [currentPanel]: panels[currentPanel] + (delta / store.screenSize.size) * 100,
            // [currentPanel]: (panels[currentPanel] || 0) + delta,
            // [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta
          },
          delta: 0,
          currentPanel: null,
          currentRowId: null,
        })
      );
    }



    console.log("done...");
  };

  const resizePanel = (event) => {
    // console.log('resizing:', this.state.isDragging);
    if (state.isDragging) {
      const delta = event.clientX - state.initialPos;
      // console.log('resizing:', event.clientX, delta);
      setState({
        ...state,
        delta: delta,
      });
    }
  };

  useEventListener('mousemove', resizePanel);
  useEventListener('mouseup', stopResize);
  useEventListener('mouseleave', stopResize);
  trace();

  return (

    <Draggable
      key={props.list}
      draggableId={props.list}
      index={props.index}
    >
      {(provided: any, snapshot: any) => (
        <div onMouseUp={(e: any) => stopResize(e)} className={style.test}>
          <div
            className="dragContainer"
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <span {...provided.dragHandleProps} className="drag">
              {' '}
            </span>

            {props.orgstate[props.list].length ? (
              props.orgstate[props.list].map(
                (listItems, index) =>
                  listItems.columns &&
                  listItems.columns.length &&
                  listItems.columns.map((column, index) => (
                    <Droppable
                      droppableId={column.id}
                      direction="horizontal"
                      type="items"
                    >
                      {(provided, snapshot) => (
                        <React.Fragment>
                          <ResizableDiv
                            column={column}
                            provider={provided.innerRef}
                            index={index}
                            width={column.w[props.currentscreen]}
                          ></ResizableDiv>

                          <div
                            onMouseDown={(e) =>
                              startResize(e, index, props.list)
                            }
                            key={'resizer_' + props.index}
                            style={
                              state.currentPanel === index
                                ? { left: state.delta }
                                : {}
                            }
                            className="resizer"
                          ></div>
                        </React.Fragment>
                      )}
                    </Droppable>
                  ))
              )
            ) : (
                <Notice>Drop items here1</Notice>
              )}
          </div>
        </div>
      )}
    </Draggable>

  );

})

export default React.memo(NewDiv);
