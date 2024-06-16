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
  buttonColor: lightGray,
  shadowColor: black,
  textColor: '#ffffff',
  depth: 2,
  strokeColor: blue,
  strokeSize: 0,
};

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
  { id: 'start_button', path: 'start_button.png' },
  { id: 'next', path: 'next.png' },
  { id: 'replay', path: 'replay.png' },
  { id: 'popup', path: 'pauseBoard.png' },
  { id: 'overlay', path: 'overlay.png' },
  { id: 'cross1', path: 'cross1.png' },
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






