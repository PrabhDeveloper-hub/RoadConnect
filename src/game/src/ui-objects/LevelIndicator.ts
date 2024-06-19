import { CAM_CENTER } from '../cfg/game-config';
import { GAME_FONT, LEVEL_INDICATOR_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class LevelIndicator extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private levelTitleText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y - scene.grs.designDim.height * 0.435);
    this.scene = scene;
    this.addLevelTitleText();
    this.scene.add.existing(this);
  }

  //Adding GameScreen Level Text
  private addLevelTitleText() {
    let text = this.scene.localizationManager.translate('level');
    this.levelTitleText = this.scene.add.text(CAM_CENTER.x, 0, ` ${this.scene.localizationManager.translate('level')} ${this.scene.currentLevel} `, LEVEL_INDICATOR_CONFIG.textStyle)
      .setAlign('center')
      .setOrigin(LEVEL_INDICATOR_CONFIG.origin.x, LEVEL_INDICATOR_CONFIG.origin.y)
      .setShadow(LEVEL_INDICATOR_CONFIG.shadowStyle.x, LEVEL_INDICATOR_CONFIG.shadowStyle.y, LEVEL_INDICATOR_CONFIG.shadowStyle.color, LEVEL_INDICATOR_CONFIG.shadowStyle.blur, LEVEL_INDICATOR_CONFIG.shadowStyle.stroke, LEVEL_INDICATOR_CONFIG.shadowStyle.fill);;
    this.add(this.levelTitleText);
  }

  //Setting dynamic level text according to current level
  setLevel(): void {
    this.levelTitleText.text = ` ${this.scene.localizationManager.translate('level')} ${this.scene.currentLevel} `;
  }

  //Level text animation when level starts
  entryAnimation() {
    this.setAlpha(1);
    this.setLevel();
    this.scene.tweens.add({
      targets: this.levelTitleText,
      x: 0,
      ease: TWEEN_EASING.LINEAR,
      duration: 100,
    })
  }

  //Level text animation when level ends after all road blocks are arranged
  exitAnimation() {
    this.setLevel();
    this.scene.tweens.add({
      targets: this.levelTitleText,
      x: -CAM_CENTER.x,
      ease: TWEEN_EASING.LINEAR,
      duration: 100,
      onComplete: () => {
        this.levelTitleText.x = CAM_CENTER.x;
      }
    })
  }
}
