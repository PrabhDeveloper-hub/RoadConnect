import { CAM_CENTER } from '../cfg/game-config';
import { CUSTOM_EVENTS, GAME_FONT, START_BUTTON_CONFIG, TITLE_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class StartButton extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private base!: Phaser.GameObjects.Image;
  private startText!: Phaser.GameObjects.Text;
  private isEnabled: boolean;
  
  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y + scene.grs.designDim.height * 0.25);
    this.scene = scene;
    this.depth = START_BUTTON_CONFIG.depth;

    this.isEnabled = true;

    // this.addBase();
    this.addStartText()
    this.addTouchHandler();
    this.scene.add.existing(this);
  }

  private addBase() {
    this.base = this.scene.add.image(0, 0, 'start_button');
    this.add(this.base);
  }

  private addStartText() {
    this.startText = this.scene.add
      .text(0, 0, ' PLAY ', START_BUTTON_CONFIG.textStyle)
      .setAlign('center')
      .setOrigin(START_BUTTON_CONFIG.origin.x, START_BUTTON_CONFIG.origin.y)
      .setScale(0)
      .setShadow(START_BUTTON_CONFIG.shadowStyle.x, START_BUTTON_CONFIG.shadowStyle.y, START_BUTTON_CONFIG.shadowStyle.color, START_BUTTON_CONFIG.shadowStyle.blur, START_BUTTON_CONFIG.shadowStyle.stroke, START_BUTTON_CONFIG.shadowStyle.fill);
;
    this.add(this.startText);
  }

  private addTouchHandler() {
    this.startText.setInteractive();
    this.startText.on('pointerdown', () => {
      if (!this.isEnabled) {
        return;
      }
      this.isEnabled = false;
      this.emit(CUSTOM_EVENTS.BUTTON_CLICKED);
      this.scene.audioManager.playClick();
      this.exitAnimation();
    });
  }

  private exitAnimation() {
    const timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: this,
      scale: 1.2,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 100,
    });
    timeline.add({
      targets: this,
      scale: 0,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 100,
    });
    timeline.play();
  }

  entryAnimation(): void {
    this.scene.tweens.add({
      targets: this.startText,
      scale: 1,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      duration: 200,
      onComplete: () => {
        this.isEnabled = true;
      },
    });
  }

  setEnabled(value: boolean): void {
    this.isEnabled = value;
  }
}
