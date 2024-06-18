import { CAM_CENTER } from '../cfg/game-config';
import { LEVEL_DATA, ROAD_BLOCK } from '../cfg/game-constants';
import { TWEEN_EASING } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';


export default class GamePlay extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  allBlocks: any[] = [];


  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x - ROAD_BLOCK.width / 2, CAM_CENTER.y - scene.grs.designDim.height * 0.15);
    this.scene = scene;
    this.scene.add.existing(this);
  }

  //Setting up Game Screen
  setup() {
    this.addBlocks();
  }

  //Adding road blocks
  addBlocks() {
    let levelData = LEVEL_DATA[this.scene.currentLevel - 1];
    for (let i = 0; i < levelData.length; i++) {
      let block = this.scene.add.sprite(levelData[i].posX, levelData[i].posY, levelData[i].blockId)
        .setAngle(levelData[i].initialAngle)
        .setScale(0)
        .setOrigin(ROAD_BLOCK.origin.x, ROAD_BLOCK.origin.y);
      block.setInteractive();
      block.setDataEnabled();
      block.data.set('finalAngle', levelData[i].finalAngle)
      block.on('pointerdown', () => {
        this.scene.audioManager.play('rotateShape');
        block.angle += 90;
        this.checkCorrectAngles();
      });
      this.allBlocks.push(block);
      this.add(block)
    }
    this.entryAnimation();
  }

  //Check if all block angles are correct
  checkCorrectAngles() {
    let correctBlock = 0;
    this.allBlocks.forEach(function (block) {
      let finalAngles = block.data.get('finalAngle');
      if (finalAngles.includes(block.angle)) {
        correctBlock++;
      } else {
        correctBlock--;
      }
    });
    if (correctBlock === this.allBlocks.length) {
      this.scene.audioManager.play('levelComplete');
      setTimeout(() => {
        this.exitAnimation();
        this.scene.uiManager.levelIndicator.exitAnimation();
        if (this.scene.currentLevel < this.scene.totalLevels) {
          this.scene.uiManager.gameManager.incrementLevel();
          this.scene.uiManager.gameManager.setMaxLevel();
          setTimeout(() => {
            this.nextLevel();
          }, 150);
        } else {
          this.scene.uiManager.resultScreen.entryAnimation();

        }
      }, 150);
    }
  }

  //Entry Blocks scale tween
  entryAnimation() {
    let self = this;
    let durationGap = 80;
    let blockNumber = 0;
    this.allBlocks.forEach(function (block) {
      self.scene.audioManager.play('shapeAppear');
      self.scene.tweens.add({
        targets: block,
        scale: ROAD_BLOCK.scale,
        ease: TWEEN_EASING.LINEAR,
        duration: 150 + blockNumber * durationGap
      });
      blockNumber++;
    })
  }

  //Exit Blocks scale tween on level complete
  exitAnimation() {
    let self = this;
    this.allBlocks.forEach(function (block) {
      block.disableInteractive();
      self.scene.tweens.add({
        targets: block,
        scale: 0,
        ease: TWEEN_EASING.LINEAR,
        duration: 100,
        onComplete: () => {
          block.destroy();
        }
      });
    })
    this.allBlocks = [];
  }

  //Load next level
  nextLevel() {
    this.scene.uiManager.levelIndicator.entryAnimation();
    this.addBlocks();
  }
}