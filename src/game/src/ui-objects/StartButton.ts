import { CAM_CENTER } from '../cfg/game-config';
import { CUSTOM_EVENTS, GAME_FONT, START_BUTTON_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class StartButton extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  private base!: Phaser.GameObjects.Image;
  private startText!: Phaser.GameObjects.Text;
  private yPositions: { initial: number; final: number };
  private isEnabled: boolean;
  
  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y + scene.grs.designDim.height * 0.4);
    this.scene = scene;
    this.depth = START_BUTTON_CONFIG.depth;

    this.isEnabled = true;
    this.yPositions = {
      initial: this.y,
      final: this.y + 150,
    };

    this.addBase();
    this.addTouchHandler();
    this.scene.add.existing(this);
  }

  private addBase() {
    this.base = this.scene.add.image(0, 0, 'start_button');
    this.add(this.base);
  }

  private addStartText() {
    this.startText = this.scene.add
      .text(0, 0, 'START', {
        fontFamily: GAME_FONT,
        fontSize: '28px',
        resolution: 3,
        color: START_BUTTON_CONFIG.textColor,
      })
      .setAlign('center')
      .setOrigin(0.5, 0.5);
    this.add(this.startText);
  }

  private addTouchHandler() {
    this.base.setInteractive();
    this.base.on('pointerdown', () => {
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
      yoyo: true,
      ease: TWEEN_EASING.SINE_EASE_IN,
      duration: 300,
    });
    timeline.add({
      targets: this,
      scale: 0.3,
      alpha: 0,
      y: this.yPositions.final,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 300,
      offset: '-=25'
    });
    timeline.play();
  }

  entryAnimation(): void {
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      alpha: 1,
      y: this.yPositions.initial,
      ease: TWEEN_EASING.QUAD_EASE_OUT,
      duration: 300,
      onComplete: () => {
        this.isEnabled = true;
      },
    });
  }

  setEnabled(value: boolean): void {
    this.isEnabled = value;
  }
}
