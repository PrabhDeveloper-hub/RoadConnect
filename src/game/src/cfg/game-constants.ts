const blue = 0x2b3252;

const lightGray = 0xeeeeee;

const gray = 0x626262;
const grayHex = '#626262';

const black = 0x000000;

export const BG_COLOR = 0x28bc8c;

export const GAME_FONT = 'GameFont';

export const TIMER_CONFIG = {
  fontSize: '36px',
  fontColor: '#fad744',
  clockColor: '0xf9eeff',
  yOffsetFromSudokuCont: 0.05,
};

export const START_BUTTON_CONFIG = {
  buttonColor: lightGray,
  shadowColor: black,
  textColor: '#ffffff',
  depth: 2,
  strokeColor: blue,
  strokeSize: 0,
};

export const COUNT_DOWN_CONFIG = {
  fontSize: '24px',
  fontColor: grayHex,
  clockColor: lightGray,
  strokeColor: gray,
  strokeSize: 3,
  depth: 2,
  yOffsetFromSudokuCont: 0.9,
};

export const LEVEL_INDICATOR_CONFIG = {
  fontSize: '22px',
  fontColor: '#9e480e',
};

export const RESULT_SCREEN_CONFIG = {
  fontSize: '64px',
  fontColor: grayHex,
}

export const RETRY_CONFIG = {
  baseColor: 0xff2e63,
  imageColor: 0xeaeaea,
};


export const GAME_SOUNDS = [
  { key: 'bgm', path: 'bgm-compressed', loop: true, ext: 'mp3', volume: 0.35 },
  { key: 'click', path: 'click', loop: false, ext: 'wav', volume: 1 },
  { key: 'correct-item', path: 'correct-item', loop: false, ext: 'wav', volume: 1 },
  { key: 'level-up', path: 'level-up-compressed', loop: false, ext: 'mp3', volume: 1 },
  { key: 'wrong-item', path: 'wrong-item', loop: false, ext: 'wav', volume: 1 },
]

export const CUSTOM_EVENTS = {
  BUTTON_CLICKED: 'button-clicked',
  CORRECT_ITEM: 'correct-item',
  INCORRECT_ITEM: 'incorrect-item',
  ROUND_START: 'round-start',
  ROUND_END: 'round-end',
  CIRCLE_EXPANDED: 'circle-expanded',
  CIRCLE_SHRINKED: 'circle-shrinked',
}






