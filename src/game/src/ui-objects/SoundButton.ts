import { CAM_CENTER } from '../cfg/game-config';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class SoundButton extends Phaser.GameObjects.Image {
  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x + scene.grs.designDim.width * 0.4, CAM_CENTER.y - scene.grs.designDim.height * 0.45, 'sfx_on');
    this.scene = scene;
    this.addTouchHandler();
    this.scene.add.existing(this);
  }

  private addTouchHandler() {
    this.setInteractive();
    this.on('pointerdown', () => {
      this.touchAnimation();
      this.scene.audioManager.toggleSound();
      this.scene.audioManager.playClick();
    });
  }

  private touchAnimation() {
    this.scene.tweens.add({
      targets: this,
      scale: 0.9,
      yoyo: true,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      duration: 100,
      onYoyo: () => {
        if (this.scene.audioManager.checkIfSoundOn()) {
          this.setTexture('sfx_on');
        } else {
          this.setTexture('sfx_off');
        }
      },
      onComplete: () => {
        this.scale = 1;
      }
    });
  }
}
