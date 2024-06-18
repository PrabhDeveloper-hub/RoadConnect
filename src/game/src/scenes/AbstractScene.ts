import AudioManager from '../core/AudioManager';
import GameResizer from '../utils/GameResizer';
import UIManager from '../core/UIManager';
import { LEVEL_DATA } from '../cfg/game-constants';

//This is the base scene for all other scenes used in the game
export abstract class AbstractScene extends Phaser.Scene {
  grs!: GameResizer;
  audioManager!: AudioManager;
  // playerDocRef!: DocumentReference;
  uiManager!:UIManager;
  currentLevel = 1;
  maxLevel = 1;
  totalLevels = LEVEL_DATA.length;


  abstract resizeAndRepositionElements(): void;

  // gets called on each scene init automatically
  init(data: any): void {
    this.grs.setCamera(this);
  }

  attachHandlers(): void {
    this.handleResize();
    this.attachErrorHandlers();
  }

  turnOffResizeHandler(): void {
    this.game.scale.off('custom-resize', this.resizeHandler, this);
  }

  private resizeHandler(): void {
    this.grs.setCamera(this);
    this.resizeAndRepositionElements();
  }

  private handleResize(): void {
    this.game.scale.on('custom-resize', this.resizeHandler, this);
  }

  private attachErrorHandlers(): void {
    this.load.once('loaderror', () => {
      this.load.reset();
      this.load.removeAllListeners();
      alert('file load error');
    });
  }
}

export default AbstractScene;
