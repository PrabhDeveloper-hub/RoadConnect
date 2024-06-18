
import AbstractScene from '../scenes/AbstractScene';
import GameManager from './GameManager';
import Popup from '../ui-objects/Popup';
import TitleScreen from '../ui-objects/TitleScreen';
import LevelIndicator from '../ui-objects/LevelIndicator';
import GamePlay from '../ui-objects/Gameplay';
import ResultScreen from '../ui-objects/ResultScreen';
import MenuButton from '../ui-objects/MenuButton';

//This class create instance of all the UI objects
export default class UIManager {
  scene: AbstractScene;
  gameManager: GameManager;
  levelIndicator: LevelIndicator;
  popup: Popup;
  titleScreen: TitleScreen;
  gameplay: GamePlay;
  resultScreen: ResultScreen;
  menuButton:MenuButton;

  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
    this.titleScreen = new TitleScreen(this.scene);
    this.levelIndicator = new LevelIndicator(this.scene);
    this.popup = new Popup(this.scene);
    this.gameplay = new GamePlay(this.scene);
    this.menuButton = new MenuButton(this.scene);
    this.resultScreen = new ResultScreen(this.scene);
  }

  
}
