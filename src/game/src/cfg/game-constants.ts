const blue = 0x2b3252;

const lightGray = 0xeeeeee;

const gray = 0x626262;
const grayHex = '#626262';

const black = 0x000000;

export const BG_COLOR = 0x28bc8c;

export const GAME_FONT = 'GameFont';
export const TITLE_FONT = 'TitleFont';

export const TITLE_CONFIG = {
  text1: ' ROAD ',
  text2: ' CONNECT ',
  style: {
    fontFamily: TITLE_FONT,
    fontSize: '60px',
    resolution: 3,
    color: '#ffffff',
  },
  origin: {
    x: 0.5,
    y: 0.5
  },
  shadowStyle: {
    x: -10,
    y: 5,
    color: '#36454F',
    blur: 10,
    stroke: false,
    fill: true
  }
}
export const START_BUTTON_CONFIG = {
  textStyle: {
    fontFamily: GAME_FONT,
    fontSize: '50px',
    resolution: 3,
    color: '#ffffff',
  },
  origin: {
    x: 0.5,
    y: 0.5
  },
  depth: 2,
  shadowStyle: {
    x: -10,
    y: 5,
    color: '#36454F',
    blur: 10,
    stroke: false,
    fill: true
  }
};

export const LEVEL_BUTTON_CONFIG = {
  initialX: -170,
  offset: {
    x: 120,
    y: 120
  },
  textStyle: {
    fontFamily: GAME_FONT,
    fontSize: '50px',
    resolution: 3,
    color: '#ffffff',
  },
  origin: {
    x: 0.5,
    y: 0.5
  },
  shadowStyle: {
    x: -10,
    y: 5,
    color: '#36454F',
    blur: 10,
    stroke: false,
    fill: true
  }
};
export const LEVEL_INDICATOR_CONFIG = {
  textStyle: {
    fontFamily: GAME_FONT,
    fontSize: '60px',
    resolution: 3,
    color: '#ffffff',
  },
  origin: {
    x: 0.5,
    y: 0.5
  },
  shadowStyle: {
    x: -10,
    y: 5,
    color: '#36454F',
    blur: 10,
    stroke: false,
    fill: true
  }
};

export const RESULT_SCREEN_CONFIG = {
  textStyle: {
    fontFamily: GAME_FONT,
    fontSize: '65px',
    resolution: 3,
    color: '#ffffff',
    wordWrap:{
      width:50 
    }
  },
  origin: {
    x: 0.5,
    y: 0.5
  },
  depth: 2,
  shadowStyle: {
    x: -10,
    y: 5,
    color: '#36454F',
    blur: 10,
    stroke: false,
    fill: true
  }
};

export const GAME_IMAGES = [
  { id: 'gameBack', path: 'gameBack.png' },
  { id: 'popup', path: 'pauseBoard.png' },
  { id: 'overlay', path: 'overlay.png' },
  { id: 'menuBtn', path: 'UI/menu_button.png' },
  { id: 'levelActive', path: 'UI/menu_button_active.png' },
  { id: 'levelClicked', path: 'UI/menu_button_clicked.png' },
  { id: 'levelDisable', path: 'UI/menu_button_disable.png' },
  { id: 'block1', path: 'Roads/block1.png' },
  { id: 'block2', path: 'Roads/block2.png' },
  { id: 'block3', path: 'Roads/block3.png' },
  { id: 'block4', path: 'Roads/block4.png' },
  { id: 'block5', path: 'Roads/block5.png' },
  { id: 'block6', path: 'Roads/block6.png' },
  { id: 'block7', path: 'Roads/block7.png' },

]
export const GAME_SOUNDS = [
  { key: 'bgm', path: 'bgMusic', loop: true, ext: 'wav', volume: 0.35 },
  { key: 'click', path: 'click', loop: false, ext: 'ogg', volume: 1 },
  { key: 'rotateShape', path: 'RotateShape', loop: false, ext: 'ogg', volume: 1.5 },
  { key: 'shapeAppear', path: 'ShapeAppear', loop: false, ext: 'ogg', volume: 1 },
  { key: 'levelComplete', path: 'LevelComplete', loop: false, ext: 'wav', volume: 1 },
]

export const ROAD_BLOCK = {
  width:127,
  height:127,
  scale:0.9,
  origin:{
    x:0.5,
    y:0.5
  }
}
export const LEVEL_DATA = [
  [
    //finalAngle should be array because some blocks has 2 final angles like block2,5,6
    {
      blockId: 'block1',
      posX:0,
      posY:0,
      initialAngle:90,
      finalAngle:[0]
    },
    {
      blockId: 'block1',
      posX:ROAD_BLOCK.width * ROAD_BLOCK.scale,
      posY:0,
      initialAngle:0,
      finalAngle:[90]
    },
    {
      blockId: 'block1',
      posX:0,
      posY:ROAD_BLOCK.height* ROAD_BLOCK.scale,
      initialAngle:180,
      finalAngle:[-90]
    },
    {
      blockId: 'block1',
      posX:ROAD_BLOCK.width* ROAD_BLOCK.scale,
      posY:ROAD_BLOCK.height* ROAD_BLOCK.scale,
      initialAngle:270,
      finalAngle:[-180]
    }
  ],
  [
    {
      blockId: 'block1',
      posX:0,
      posY:0,
      initialAngle:90,
      finalAngle:[0]
    },
    {
      blockId: 'block3',
      posX:ROAD_BLOCK.width * ROAD_BLOCK.scale,
      posY:0,
      initialAngle:90,
      finalAngle:[-180]
    },
    {
      blockId: 'block1',
      posX:0,
      posY:ROAD_BLOCK.height* ROAD_BLOCK.scale,
      initialAngle:180,
      finalAngle:[-90]
    },
    {
      blockId: 'block4',
      posX:ROAD_BLOCK.width* ROAD_BLOCK.scale,
      posY:ROAD_BLOCK.height* ROAD_BLOCK.scale,
      initialAngle:270,
      finalAngle:[90]
    },
    {
      blockId: 'block3',
      posX:0,
      posY:2*(ROAD_BLOCK.height* ROAD_BLOCK.scale),
      initialAngle:0,
      finalAngle:[0]
    },
    {
      blockId: 'block4',
      posX:ROAD_BLOCK.width* ROAD_BLOCK.scale,
      posY:2*(ROAD_BLOCK.height* ROAD_BLOCK.scale),
      initialAngle:90,
      finalAngle:[-180]
    }
  ],
  [
    {
      blockId: 'block1',
      posX:0,
      posY:0,
      initialAngle:0,
      finalAngle:[0]
    },
    {
      blockId: 'block1',
      posX:ROAD_BLOCK.width * ROAD_BLOCK.scale,
      posY:0,
      initialAngle:-180,
      finalAngle:[90]
    },
    {
      blockId: 'block1',
      posX:0,
      posY:ROAD_BLOCK.height* ROAD_BLOCK.scale,
      initialAngle:180,
      finalAngle:[-90]
    },
    {
      blockId: 'block2',
      posX:ROAD_BLOCK.width* ROAD_BLOCK.scale,
      posY:ROAD_BLOCK.height* ROAD_BLOCK.scale,
      initialAngle:90,
      finalAngle:[0,-180]
    },
    {
      blockId: 'block2',
      posX:ROAD_BLOCK.width* ROAD_BLOCK.scale,
      posY:2*(ROAD_BLOCK.height* ROAD_BLOCK.scale),
      initialAngle:90,
      finalAngle:[0,-180]
    }
  ]
]






