import AudioManager from '../core/AudioManager';
import GameManager from '../core/GameManager';
import UIManager from '../core/UIManager';
import AbstractScene from './AbstractScene';
import LocalizationManager from '../core/LocalizationManager';


class GameScene extends AbstractScene {
  private gameManager!: GameManager;

  currentLevel = 1;

  constructor() {
    super('game');
  }

  init(data: { level: number}): void {
    super.init(data);
    this.currentLevel = data.level;
  }

  //Initiating the core classes used by all scenes
  preload(): void {
    this.localizationManager = new LocalizationManager(this);
    this.audioManager = new AudioManager(this);
    this.audioManager.initGameAudio();
    this.gameManager = new GameManager(this);
    this.uiManager = new UIManager(this, this.gameManager);
    this.audioManager.playMusic('bgm');
  }

  resizeAndRepositionElements(): void {
    if (this.gameManager) {
      this.gameManager.gameComponents.resizeAndRepositionElements();
    }
  }

  update(time: number, delta: number): void {
   

  }
}

export default GameScene;
