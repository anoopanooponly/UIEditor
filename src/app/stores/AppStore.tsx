import { observable, action, decorate } from 'mobx';
import { v4 as uuid } from 'uuid';

class AppStore {

  @observable screenSize: any = {size: 1600, code: "lg"};
  @observable currentScreen: any = "lg";


  @observable uiLayout = {
    [uuid()]: [
      {
        columns: [
          {
            id: uuid(),
            w: {lg: 20, md: 25, sm: 46},
            items: [
              {
                id: uuid(),
                type: 'inputtext',
                w: 20,
              },
              {
                id: uuid(),
                type: 'button',
                w: 40,
              },
            ],
          },
          {
            id: uuid(),
            w: {lg: 25, md: 25, sm: 49},
            items: [
              {
                id: uuid(),
                type: 'button',
                w: 40,
              },
            ],
          },
          {
            id: uuid(),
            w: {lg: 20, md: 25, sm: 49},
            items: [
              {
                id: uuid(),
                type: 'button',
                w: 40,
              },
            ],
          },
          {
            id: uuid(),
            w: {lg: 20, md: 25, sm: 46},
            items: [
              {
                id: uuid(),
                type: 'button',
                w: 40,
              },
            ],
          },
        ],
      },
    ],
    [uuid()]: [
      {
        columns: [
          {
            id: uuid(),
            w: {lg: 20, md: 25, sm: 50},
            items: [
              {
                id: uuid(),
                type: 'inputtext',
                w: 30,
              },
            ],
          },
          {
            id: uuid(),
            w: {lg: 20, md: 25, sm: 50},
            items: [
              {
                id: uuid(),
                type: 'inputtext',
                w: 30,
              },
            ],
          },
        ],
      },
    ],
  };

  @action currentScreenSize(val) {
    this.currentScreen = val;
  }
  @action onDragEnd1 = (result) => {
    const { source, destination } = result;
    console.log('==> result', result);
  };

  @action stopResize1 = () => {
    console.log('==> ii');
  };
}

const appStoreInstance = new AppStore();
export default appStoreInstance;
