const blue = 0x2b3252;

const lightGray = 0xeeeeee;

const gray = 0x626262;
const grayHex = '#626262';

const black = 0x000000;

export const BG_COLOR = 0x28bc8c;

export const GAME_FONT = 'GameFont';
export const TITLE_FONT = 'TitleFont';

export const TITLE_CONFIG = {
  text1:' ROAD ',
  text2:' CONNECT ',
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
  textStyle:{
    fontFamily: GAME_FONT,
    fontSize: '50px',
    resolution: 3,
    color: '#ffffff',
  },
  origin:{
    x:0.5,
    y:0.5
  },
  depth:2,
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
  initialX:-170,
  offset:{
    x:120,
    y:120
  },
  textStyle:{
    fontFamily: GAME_FONT,
    fontSize: '50px',
    resolution: 3,
    color: '#ffffff',
  },
  origin:{
    x:0.5,
    y:0.5
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
export const LEVEL_INDICATOR_CONFIG = {
  fontSize: '22px',
  fontColor: '#9e480e',
};

export const RESULT_SCREEN_CONFIG = {
  fontSize: '64px',
  fontColor: grayHex,
}

export const GAME_IMAGES = [
  { id: 'gameBack', path: 'gameBack.png' },
  { id: 'replay', path: 'replay.png' },
  { id: 'popup', path: 'pauseBoard.png' },
  { id: 'overlay', path: 'overlay.png' },
  { id: 'menuBtn', path: 'UI/menu_button.png' },
  { id: 'levelActive', path: 'UI/menu_button_active.png' },
  { id: 'levelClicked', path: 'UI/menu_button_clicked.png' },
  { id: 'levelDisable', path: 'UI/menu_button_disable.png' },
  
]
export const GAME_SOUNDS = [
  { key: 'bgm', path: 'bgm-compressed', loop: true, ext: 'mp3', volume: 0.35 },
  { key: 'click', path: 'click', loop: false, ext: 'wav', volume: 1 },
  { key: 'correct-item', path: 'correct-item', loop: false, ext: 'wav', volume: 1 },
  { key: 'level-up', path: 'level-up-compressed', loop: false, ext: 'mp3', volume: 1 },
  { key: 'wrong-item', path: 'wrong-item', loop: false, ext: 'wav', volume: 1 },
]

export const CUSTOM_EVENTS = {
  BUTTON_CLICKED: 'button-clicked'
}






