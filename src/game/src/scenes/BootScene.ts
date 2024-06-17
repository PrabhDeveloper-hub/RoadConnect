import AbstractScene from './AbstractScene';
import AssetsPreloader from '../utils/AssetPreloader';
import AudioManager from '../core/AudioManager';
import { CAM_CENTER } from '../cfg/game-config';
import { GAME_FONT ,TITLE_FONT} from '../cfg/game-constants';

class BootScene extends AbstractScene {
  assetsPreloader: AssetsPreloader;

  loadingBar!: Phaser.GameObjects.Image;
  loadingBarMask!: Phaser.Display.Masks.BitmapMask;
  loadingBarFill!: Phaser.GameObjects.Image;
  loadingTitle!: Phaser.GameObjects.Text;

  private assetsLoaded = false;

  constructor() {
    super('boot');
    this.assetsPreloader = new AssetsPreloader(this);
  }

  preload(): void {
    // Load all loading bar related assets here assets here
    this.assetsPreloader.loadBootSceneAssets();
  }

  resizeAndRepositionElements(): void {
  }

  create(): void {
    this.loadingTitle = this.add.text(CAM_CENTER.x, CAM_CENTER.y - 75, 'Loading...', {
      fontFamily: GAME_FONT,
      fontSize: '56px',
      resolution: 3,
      color: '#74d049',
    })
    .setAlign('center')
    .setOrigin(0.5, 0.5);
    this.add.text(CAM_CENTER.x,CAM_CENTER.y," ",{
      fontFamily: TITLE_FONT
    })

    this.audioManager = new AudioManager(this);
    this.audioManager.initBootAudio();

    this.handleLoadingProgress();
    this.handleAssetLoad();
    this.handleUserDataLoad();
    // To load main game assets
    this.assetsPreloader.loadGameSceneAssets();
  }

  private handleLoadingProgress(): void {
    this.load.on('progress', (percentage: number) => {
      console.warn('percentage', percentage);
    });
  }

  private handleUserDataLoad(): void {

  }
  private handleAssetLoad(): void {
    this.load.on('complete', () => {
      this.assetsLoaded = true;
      this.transitionScene();
    });
  }

  private transitionScene(): void {
    if ( this.assetsLoaded) {
      this.turnOffResizeHandler();
      this.scene.start('game', { level: this.currentLevel });
    }
  }
}

export default BootScene;
