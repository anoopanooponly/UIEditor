import { observable, action, decorate } from 'mobx';
import { v4 as uuid } from 'uuid';

class AppStore {

  @observable screenSize: number = 1600;
  @observable uiLayout = {
    [uuid()]: [
      {
        columns: [
          {
            id: uuid(),
            w: 20,
            items: [
              {
                id: uuid(),
                content: '<input type="text" style="width:100%" value="aa" />',
                w: 20,
              },
              {
                id: uuid(),
                content: '<div>ss</div>',
                w: 40,
              },
            ],
          },
          {
            id: uuid(),
            w: 75,
            items: [
              {
                id: uuid(),
                content: '<div>tt</div>',
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
            w: 49,
            items: [
              {
                id: uuid(),
                content: '<div>headline</div>',
                w: 30,
              },
            ],
          },
          {
            id: uuid(),
            w: 49,
            items: [
              {
                id: uuid(),
                content: '<div>new1</div>',
                w: 30,
              },
            ],
          },
        ],
      },
    ],
  };

  ITEMS = [
    {
      id: uuid(),
      content: 'Headline',
    },
    {
      id: uuid(),
      content: 'Copy',
    },
    {
      id: uuid(),
      content: 'Image',
    },
    {
      id: uuid(),
      content: 'Slideshow',
    },
    {
      id: uuid(),
      content: 'Quote',
    },
  ];

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
