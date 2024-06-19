import { CAM_CENTER } from '../cfg/game-config';
import { RESULT_SCREEN_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';


export default class ResultScreen extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  resultText!: Phaser.GameObjects.Text;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.addResultText()
    this.scene.add.existing(this);
  }

  //Creating the Result text
  addResultText() {
    this.resultText = this.scene.add.text(0, 0, ' ALL  LEVELS  CLEARED!  =) ', RESULT_SCREEN_CONFIG.textStyle)
      .setAlign('center')
      .setOrigin(RESULT_SCREEN_CONFIG.origin.x, RESULT_SCREEN_CONFIG.origin.y)
      .setScale(0)
      .setShadow(RESULT_SCREEN_CONFIG.shadowStyle.x, RESULT_SCREEN_CONFIG.shadowStyle.y, RESULT_SCREEN_CONFIG.shadowStyle.color, RESULT_SCREEN_CONFIG.shadowStyle.blur, RESULT_SCREEN_CONFIG.shadowStyle.stroke, RESULT_SCREEN_CONFIG.shadowStyle.fill);
    this.add(this.resultText);
  }

  //Scaling animation when menu is clicked after game ends
  exitAnimation() {
    this.scene.uiManager.levelIndicator.setAlpha(0);
    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: this.resultText,
      scale: 0,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 100,
    });
    timeline.play();
  }

  //Scaling animation when all levels are cleared
  entryAnimation() {
    this.scene.uiManager.levelIndicator.setAlpha(1);
    this.scene.tweens.add({
      targets: this.resultText,
      scale: 1,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      duration: 200,
      onComplete: () => {
      },
    });
  }

}