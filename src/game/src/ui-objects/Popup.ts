import { CAM_CENTER } from '../cfg/game-config';
import { LEVEL_BUTTON_CONFIG } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';
export default class Popup extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  base!: Phaser.GameObjects.Image;
  cross!: Phaser.GameObjects.Image;
  overlay: any;
  levelButtons: any[] = [];
  levelSelect!: Phaser.GameObjects.Text;
  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y - scene.grs.designDim.height);
    this.scene = scene;
    this.addBase();
    this.addBtns();
    this.addLevelText();
    this.scene.add.existing(this);
  }

  //Adding LEVEL SELECT text on top of popup
  addLevelText() {
    this.levelSelect = this.scene.add.text(0, -this.base.height/1.5, ' LEVEL SELECT ', LEVEL_BUTTON_CONFIG.textStyle)
    .setAlign('center')
    .setOrigin(LEVEL_BUTTON_CONFIG.origin.x, LEVEL_BUTTON_CONFIG.origin.y)
    .setShadow(LEVEL_BUTTON_CONFIG.shadowStyle.x, LEVEL_BUTTON_CONFIG.shadowStyle.y, LEVEL_BUTTON_CONFIG.shadowStyle.color, LEVEL_BUTTON_CONFIG.shadowStyle.blur, LEVEL_BUTTON_CONFIG.shadowStyle.stroke, LEVEL_BUTTON_CONFIG.shadowStyle.fill);
    this.add(this.levelSelect);
  }

  //Adding Popup background Image and overlay
  addBase() {
    this.base = this.scene.add.image(0, 0, 'popup').setOrigin(0.5);
    this.overlay = this.scene.add.sprite(this.base.x, this.base.y, 'overlay').setOrigin(0.5).setScale(3);
    this.overlay.setAlpha(0.01)
    this.add(this.overlay);
    this.add(this.base);
    this.setPosition(CAM_CENTER.x, -500);

  }

  //Adding Level Buttons to popup
  addBtns() {
    console.log("CURRLEVEL", this.scene.currentLevel);
    for (let i = 0; i < this.scene.totalLevels; i++) {
      let levelButtonContainer = this.scene.add.container(LEVEL_BUTTON_CONFIG.initialX + i * LEVEL_BUTTON_CONFIG.offset.x, -this.base.height / 2.5)
      let lvlBtn = this.scene.add.sprite(0, 0, 'levelActive').setScale(2);
      lvlBtn.setDataEnabled();
      lvlBtn.data.set('lvl', i + 1);
      lvlBtn.data.set('enabled', false);
      lvlBtn.setInteractive();
      lvlBtn.on('pointerdown', () => {
        this.levelButtonClicked(lvlBtn);
      });
      this.levelButtons.push(lvlBtn);
      levelButtonContainer.add(lvlBtn);

      let lvlText = this.scene.add.text(0, 0, ` ${(i + 1).toString()} `, LEVEL_BUTTON_CONFIG.textStyle)
        .setAlign('center')
        .setOrigin(LEVEL_BUTTON_CONFIG.origin.x, LEVEL_BUTTON_CONFIG.origin.y)
        .setShadow(LEVEL_BUTTON_CONFIG.shadowStyle.x, LEVEL_BUTTON_CONFIG.shadowStyle.y, LEVEL_BUTTON_CONFIG.shadowStyle.color, LEVEL_BUTTON_CONFIG.shadowStyle.blur, LEVEL_BUTTON_CONFIG.shadowStyle.stroke, LEVEL_BUTTON_CONFIG.shadowStyle.fill);
      levelButtonContainer.add(lvlText);
      this.add(levelButtonContainer)
    }

  }

  //Handling level button click event
  levelButtonClicked(lvlBtn: any) {
    if (lvlBtn.texture.key != 'levelDisable') {
      let curLevel = lvlBtn.data.get('lvl');
      lvlBtn.setTexture('levelClicked');
      this.scene.currentLevel = curLevel;
      let self = this;
      setTimeout(() => {
        self.exitAnimation();
        lvlBtn.setTexture('levelActive');
      }, 100);
    }

    console.log(lvlBtn.texture.key, this.scene.currentLevel);
  }

  //Disable buttons of those levels which are not played yet
  disableButtons() {
    console.log(this.scene.maxLevel)
    for (let i = this.scene.maxLevel; i < this.levelButtons.length; i++) {
      this.levelButtons[i].setTexture('levelDisable');
    }
  }

  //Animating the popup from out of the screen when menu button or play button is clicked
  entryAnimation() {
    this.disableButtons();
    this.overlay.setInteractive();
    var self = this;
    this.scene.tweens.add({
      targets: this,
      y: CAM_CENTER.y + 50,
      duration: 200,
      ease: TWEEN_EASING.LINEAR,
      onStart: () => {
      },
      onComplete: () => {
        self.overlay.setAlpha(0.15);
      },
    });
  }

  //Animating the popup when clicking on the level button
  exitAnimation() {
    let self = this;
    this.overlay.disableInteractive();
    this.overlay.setAlpha(0.01);
    this.scene.tweens.add({
      targets: this,
      y: -500,
      duration: 200,
      ease: TWEEN_EASING.QUAD_EASE_IN,
      onStart: () => {
      },
      onComplete: () => {
        self.scene.uiManager.levelIndicator.entryAnimation();
      },
    });
  }


}
