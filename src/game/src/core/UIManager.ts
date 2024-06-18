import { CUSTOM_EVENTS } from '../cfg/game-constants';
import AbstractScene from '../scenes/AbstractScene';
import GameManager from './GameManager';
import Popup from '../ui-objects/Popup';
import TitleScreen from '../ui-objects/TitleScreen';
import LevelIndicator from '../ui-objects/LevelIndicator';
import GamePlay from '../ui-objects/Gameplay';
export default class UIManager {
  scene: AbstractScene;
  gameManager: GameManager;
  levelIndicator: LevelIndicator;
  popup: Popup;
  titleScreen: TitleScreen;
  gameplay: GamePlay;

  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
    this.titleScreen = new TitleScreen(this.scene);
    this.levelIndicator = new LevelIndicator(this.scene);
    this.popup = new Popup(this.scene);
    this.gameplay = new GamePlay(this.scene);
    this.addEventHandlers();
  }

  private addEventHandlers() {
    this.titleScreen.startButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.titleScreen.exitAnimation();
      this.popup.entryAnimation();
    });
    
  }
}
