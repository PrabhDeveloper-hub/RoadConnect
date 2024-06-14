import { CAM_CENTER } from '../cfg/game-config';
import { BG_COLOR } from '../cfg/game-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class Background extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  background!: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    // this.addBackgroundImage();
    this.addBackground();
    this.resizeBackground();
    this.scene.add.existing(this);
  }

  private addBackground(): void {
    this.background = this.scene.add.rectangle(
      0,
      0,
      this.scene.grs.resizeDim.width,
      this.scene.grs.resizeDim.height,
      BG_COLOR
    );
    this.background.setOrigin(0.5);
    this.background.setAlpha(0.95);
    this.add(this.background);
  }

  private addBackgroundImage(): void {
    this.background = this.scene.add.image(
      0,
      0,
      'bg'
    );
    this.background.setOrigin(0.5).setAlpha(0.7);
    this.add(this.background);
  }

  resizeBackground(): void {
    const width = ((this.scene.grs.resizeDim.width / this.scene.grs.dpr) / this.background.width);
    const height = ((this.scene.grs.resizeDim.height / this.scene.grs.dpr) / this.background.height);
    this.background.setScale(width > height ? width : height);
  }
}
