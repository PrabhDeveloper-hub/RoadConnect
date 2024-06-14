import AbstractScene from '../scenes/AbstractScene';
import Background from './Background';


export default class GameComponents {
  scene: AbstractScene;
  events: Phaser.Events.EventEmitter;
  grd: CanvasRenderingContext2D | null;
  background: Background;

  level = 1;
  subLevel = 0;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.events = new Phaser.Events.EventEmitter();

    if (this.scene.sys.renderer.type === Phaser.WEBGL) {
      this.grd = this.scene.textures.createCanvas('grd').getContext();
    } else {
      this.grd = this.scene.sys.canvas.getContext('2d');
    }

    this.background = new Background(this.scene);
  }


  resizeAndRepositionElements(): void {
    this.background.resizeBackground();
  }
}
