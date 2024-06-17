import { CAM_CENTER } from '../cfg/game-config';
import { TITLE_CONFIG, TITLE_FONT } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import StartButton from '../ui-objects/StartButton';
import AbstractScene from '../scenes/AbstractScene';


export default class TitleScreen extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  intro!: Phaser.GameObjects.Image;
  titleRoad!: Phaser.GameObjects.Text;
  titleConnect!: Phaser.GameObjects.Text;
  startButton!: StartButton;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y);
    this.scene = scene;
    this.setup();
    this.scene.add.existing(this);
  }

  setup() {
    //ADD BG
    this.intro = this.scene.add.image(0, 0, 'gameBack').setScale(0.78);
    this.startButton = new StartButton(this.scene);
    this.add(this.intro);
    this.createTItleText();
    this.entryAnimation();
  }

  createTItleText() {
    this.titleRoad = this.scene.add.text(-CAM_CENTER.x, -CAM_CENTER.y / 9, TITLE_CONFIG.text1, TITLE_CONFIG.style)
      .setAlign('center')
      .setOrigin(TITLE_CONFIG.origin.x, TITLE_CONFIG.origin.y)
      .setShadow(TITLE_CONFIG.shadowStyle.x, TITLE_CONFIG.shadowStyle.y, TITLE_CONFIG.shadowStyle.color, TITLE_CONFIG.shadowStyle.blur, TITLE_CONFIG.shadowStyle.stroke, TITLE_CONFIG.shadowStyle.fill);
    this.add(this.titleRoad);

    this.titleConnect = this.scene.add.text(CAM_CENTER.x, -CAM_CENTER.y / 13, TITLE_CONFIG.text2, TITLE_CONFIG.style)
      .setAlign('center')
      .setOrigin(TITLE_CONFIG.origin.x, TITLE_CONFIG.origin.y)
      .setShadow(TITLE_CONFIG.shadowStyle.x, TITLE_CONFIG.shadowStyle.y, TITLE_CONFIG.shadowStyle.color, TITLE_CONFIG.shadowStyle.blur, TITLE_CONFIG.shadowStyle.stroke, TITLE_CONFIG.shadowStyle.fill);
    this.add(this.titleConnect);
  }

  entryAnimation() {
    let self = this;
    this.scene.tweens.add({
      targets: [this.titleRoad, this.titleConnect],
      x: 0,
      ease: TWEEN_EASING.LINEAR,
      duration: 200,
      onComplete: () => {
        self.startButton.entryAnimation();
      },
    })
  }

  exitAnimation() {
    let self = this;
    this.scene.tweens.add({
      targets: [this.titleRoad],
      x: -CAM_CENTER.x,
      ease: TWEEN_EASING.LINEAR,
      duration: 200,
      onComplete: () => {
      },
    });
    this.scene.tweens.add({
      targets: [this.titleConnect],
      x: CAM_CENTER.x,
      ease: TWEEN_EASING.LINEAR,
      duration: 200,
      onComplete: () => {
      },
    });
  }
  
}