import { CUSTOM_EVENTS } from '../cfg/game-constants';
import AbstractScene from '../scenes/AbstractScene';
import ResultScreen from '../ui-objects/ResultScreen';
import GameManager from './GameManager';
import Popup from '../ui-objects/Popup';
import TitleScreen from '../ui-objects/TitleScreen';

export default class UIManager {
  scene: AbstractScene;
  private gameManager: GameManager;

  resultScreen: ResultScreen;
  popup:Popup;
  titleScreen:TitleScreen;
  isRetry: boolean = false;
  isGameStarted: boolean = false;
  constructor(scene: AbstractScene, gameManager: GameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
    this.popup = new Popup(this.scene);
    this.resultScreen = new ResultScreen(this.scene);
    this.titleScreen = new TitleScreen(this.scene); 
    this.addEventHandlers();
  }

  private addEventHandlers() {
    const gc = this.gameManager.gameComponents;

    this.titleScreen.startButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      console.log("START ANIMATION");
      // this.popup.tweenQuitShow();
    });
    this.resultScreen.retryButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.isRetry = true;
      this.showMainMenu();
    });
    this.resultScreen.nextButton.on(CUSTOM_EVENTS.BUTTON_CLICKED, () => {
      this.isRetry = false;
      this.gameManager.updateLevelData();
      this.showMainMenu();
    });
  }

  

  private showMainMenu() {
    // this.titleScreen.startButton.entryAnimation();
  }

  resizeAndRepositionElements() {
  }
}
