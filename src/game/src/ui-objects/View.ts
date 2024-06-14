import { CAM_CENTER } from '../cfg/game-config';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';


export default class View extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  intro!: Phaser.GameObjects.Image;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    console.log("VIEW INITIALIZE");
    this.createView();
    this.scene.add.existing(this);

  }

  createView() {
    //ADD BG
    this.intro = this.scene.add.image(0, 0, 'gameBack').setScale(0.78);
    this.add(this.intro);
    console.log(this.intro);
  }



  
}