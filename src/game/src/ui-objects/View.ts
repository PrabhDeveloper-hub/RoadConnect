import { CAM_CENTER } from '../cfg/game-config';
import { TITLE_CONFIG, TITLE_FONT } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';


export default class View extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  intro!: Phaser.GameObjects.Image;
  titleRoad!: Phaser.GameObjects.Text;
  titleConnect!: Phaser.GameObjects.Text;

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
    this.createTItleText();
    console.log(this.intro);
  }

  createTItleText() {
    this.titleRoad = this.scene.add.text(0, -CAM_CENTER.y / 7, TITLE_CONFIG.text1, TITLE_CONFIG.style)
      .setAlign('center')
      .setOrigin(TITLE_CONFIG.origin.x, TITLE_CONFIG.origin.y)
      .setShadow(TITLE_CONFIG.shadowStyle.x, TITLE_CONFIG.shadowStyle.y, TITLE_CONFIG.shadowStyle.color, TITLE_CONFIG.shadowStyle.blur, TITLE_CONFIG.shadowStyle.stroke, TITLE_CONFIG.shadowStyle.fill);
    this.add(this.titleRoad);

    this.titleConnect = this.scene.add.text(0, -CAM_CENTER.y / 9.3, TITLE_CONFIG.text2, TITLE_CONFIG.style)
      .setAlign('center')
      .setOrigin(TITLE_CONFIG.origin.x, TITLE_CONFIG.origin.y)
      .setShadow(TITLE_CONFIG.shadowStyle.x, TITLE_CONFIG.shadowStyle.y, TITLE_CONFIG.shadowStyle.color, TITLE_CONFIG.shadowStyle.blur, TITLE_CONFIG.shadowStyle.stroke, TITLE_CONFIG.shadowStyle.fill);
    this.add(this.titleConnect);
  }

  animateTitle(){
    this.scene.tweens.add({
      targets: this,
      x: 0,
      ease: TWEEN_EASING.LINEAR,
      duration: 75,
    })
  }

}