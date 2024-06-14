import { CAM_CENTER } from '../cfg/game-config';
import { GAME_FONT, LEVEL_INDICATOR_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class LevelIndicator extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private levelTitleText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x + scene.grs.designDim.width * 0.3, CAM_CENTER.y - scene.grs.designDim.height * 0.45);
    this.scene = scene;
    // this.addLevelTitleText();
    this.addLevelText();
    this.scene.add.existing(this);
  }

  private addLevelTitleText() {
    this.levelTitleText = this.scene.add
      .text(0, 0, 'LEVEL ', {
        fontFamily: GAME_FONT,
        fontSize: LEVEL_INDICATOR_CONFIG.fontSize,
        resolution: 3,
        color: LEVEL_INDICATOR_CONFIG.fontColor,
      })
      .setAlign('center')
      .setOrigin(1, 0.5);
    this.add(this.levelTitleText);
  }

  private addLevelText() {
    this.levelText = this.scene.add
      .text(0, 0, ' x 1000', {
        fontFamily: GAME_FONT,
        fontSize: LEVEL_INDICATOR_CONFIG.fontSize,
        resolution: 3,
        color: LEVEL_INDICATOR_CONFIG.fontColor,
      })
      .setAlign('center')
      .setOrigin(0, 0.5);
    this.add(this.levelText);
  }

  setLevel(value: number): void {
    this.levelText.text = ` x  ${value}`;
    
  }

  tweenForResultScreen(): void {
    const gap = (this.levelTitleText.displayWidth - this.levelText.displayWidth) * 0.5;
    this.scene.tweens.add({
      targets: this,
      y: CAM_CENTER.y - 200,
      x: CAM_CENTER.x + gap,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 75,
    })
  }

  tweenForMenuScreen(level: number) {
    this.scene.tweens.add({
      targets: this,
      scale: 1.1,
      yoyo: true,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 100,
      onYoyo: () => {
        this.setLevel(level);
      }
    })
  }

  tweenForGameScreen() {
    this.scene.tweens.add({
      targets: this,
      y: CAM_CENTER.y - this.scene.grs.designDim.height * 0.45,
      x: CAM_CENTER.x - this.scene.grs.designDim.width * 0.2,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      duration: 100,
    })
  }
}
