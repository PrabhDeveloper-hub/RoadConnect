import { CAM_CENTER } from '../cfg/game-config';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';
export default class Popup extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  base!: Phaser.GameObjects.Image;
  cross!: Phaser.GameObjects.Image;
  cross1!: Phaser.GameObjects.Image;
  private waheguruLogo!: Phaser.GameObjects.Image;
  overlay: any;
  flowAnim: any;
  tailParticles: any;
  particles: any;
  timerEvent: any;
  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y - scene.grs.designDim.height);
    this.scene = scene;
    this.addBase();
    this.addBtns();
    this.addLogo();
    this.scene.add.existing(this);
  }

  addBase() {
    this.base = this.scene.add.image(0, 0, 'popup').setOrigin(0.5);
    this.overlay = this.scene.add.sprite(this.base.x, this.base.y, 'overlay').setOrigin(0.5).setScale(3);
    this.overlay.setAlpha(0.01)
    this.add(this.overlay);
    this.add(this.base);
    this.setPosition(CAM_CENTER.x, -500);

  }
  addBtns() {
    this.cross = this.scene.add.sprite(this.base.width/2.6, this.base.height / 2.4, 'cross1').setScale(0.5)
    this.cross.setInteractive();
    this.cross.on('pointerdown', () => {
      // this.tweenHideShow()
    });
    this.cross1 = this.scene.add.sprite(-this.base.width/2.6, this.base.height / 2.4, 'cross1').setScale(0.5)
    this.cross1.setAngle(-180);
    this.cross1.setInteractive();
    this.cross1.on('pointerdown', () => {
      // this.tweenHideShow()
    });
    this.add(this.cross1)
    this.add(this.cross)

  }

  addLogo() {
    // this.waheguruLogo = this.scene.add.text(0, - this.base.height / 2.4, "You Won", { fontFamily: 'GameFont', fontSize: '38px', color: '#ffffff' }).setOrigin(0.5);
    this.waheguruLogo = this.scene.add.sprite(0, - this.base.height / 2.4, 'waheguru').setOrigin(0.5).setScale(1);
    this.add(this.waheguruLogo);

  }
  tweenQuitShow() {
    this.overlay.setInteractive();
    var self = this;
    this.scene.tweens.add({
      targets: this,
      y: CAM_CENTER.y,
      duration: 2000,
      ease: TWEEN_EASING.BOUNCE_EASE_IN_OUT,
      onStart: () => {
      },
      onComplete: () => {
        self.overlay.setAlpha(0.3);
      },
    });
  }
 
  tweenHideShow() {
    this.overlay.disableInteractive();
    this.overlay.setAlpha(0.01);
    this.scene.tweens.add({
      targets: this,
      y: -500,
      duration: 1000,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      onStart: () => {
      },
      onComplete: () => {

      },
    });
  }


}
