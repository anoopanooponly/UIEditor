import styled from 'styled-components';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import NewDiv from './NewDiv';
import appStoreInstance from './stores/AppStore';
import { AnySoaRecord } from 'dns';
import makeInspectable from 'mobx-devtools-mst';
import { observer } from 'mobx-react';
export const AppStoreContext = React.createContext(appStoreInstance);

const RightDiv = styled.div`
  width: calc(100% - 88px);
  transition: width ease 0.1s;
  border-left: 1px solid #e1e1e1;
  min-height: 100%;
  overflow-y: scroll;
  height: 100%;
  position: relative;
  background-color: #dcdcdc;
  float: left;
  overflow: visible;
  flex-direction: column;
`;

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  console.log('==> dest', destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item: any = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const ViewPort = styled.div`
  margin-left: 146px;
  background: white;
  margin-top: 21px;
  height: 97%;
  margin-right: 20px;
  padding: 7px;
`;

const Item: any = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px
    ${(props: any) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const List: any = styled.div`
  border: 1px
    ${(props: any) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const ControlsPane = styled(List)`
  position: absolute;
  width: 120px;
  background-color: white;
  border-right: 1px solid #e1e1e1;
  position: absolute;
  z-index: 5;
  left: 0;
  top: 0;
  right: 0;
  overflow: hidden;
`;


const grid = 8;
const NewRightPanel = observer(() => {
  
  makeInspectable(AppStoreContext);
  // const onDragEnd = (result: any) => {
  //   const { source, destination } = result;

  //   console.log('==> result', result);

  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }

  //   switch (source.droppableId) {
  //     case destination.droppableId:
  //       setState({
  //         [destination.droppableId]: reorder(
  //           state[source.droppableId],
  //           source.index,
  //           destination.index
  //         ),
  //       });
  //       break;
  //     case 'ITEMS':
  //       setState({
  //         [destination.droppableId]: copy(
  //           appStoreInstance.ITEMS,
  //           state[destination.droppableId],
  //           source,
  //           destination
  //         ),
  //       });
  //       break;
  //     default:
  //       setState(
  //         move(
  //           state[source.droppableId],
  //           state[destination.droppableId],
  //           source,
  //           destination
  //         )
  //       );
  //       break;
  //   }
  // };

  // const addList = (e) => {
  //   setState({ [uuid()]: [] });
  // };

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? 'lightblue' : '',
    // width: 250
  });

  const resizeScreen = () => {
    appStoreInstance.screenSize = 900;
  }
    return (
    <RightDiv>

      <button style={{marginLeft: "200px"}} onClick={(e) => resizeScreen()}>new</button>

      <AppStoreContext.Provider value={appStoreInstance}>
        <DragDropContext onDragEnd={appStoreInstance.onDragEnd1}>
          <Droppable droppableId="ITEMS" isDropDisabled={true} type="items">
            {(provided, snapshot) => (
              <ControlsPane
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {appStoreInstance.ITEMS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                        >
                          {item.content}
                        </Item>
                        {snapshot.isDragging && <Clone>{item.content}</Clone>}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
              </ControlsPane>
            )}
          </Droppable>
          <ViewPort style={{ width: `${appStoreInstance.screenSize}px` }}>
            <Droppable droppableId="droppable" type="App">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {Object.keys(appStoreInstance.uiLayout).map((list, index) => (
                    <NewDiv 
                      orgstate={appStoreInstance.uiLayout}
                      list={list}
                      index={index}
                    ></NewDiv>
                  ))}
                </div>
              )}
            </Droppable>
          </ViewPort>
        </DragDropContext>
        </AppStoreContext.Provider>
    </RightDiv>
  );
});

export default React.memo(NewRightPanel);
