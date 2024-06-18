import { CAM_CENTER } from '../cfg/game-config';
import AbstractScene from '../scenes/AbstractScene';


export default class MenuButton extends Phaser.GameObjects.Container {
  scene: AbstractScene;
  button!: Phaser.GameObjects.Sprite;

  constructor(scene: AbstractScene) {
    super(scene, CAM_CENTER.x, CAM_CENTER.y + scene.grs.designDim.height * 0.4);
    this.scene = scene;
    this.addMenuButton();
    this.showHideMenu(false);
    this.scene.add.existing(this);
  }

  //Adding menu button 
  addMenuButton(){
    this.button = this.scene.add.sprite(0,0, 'menuBtn')
    .setScale(1,0.7)
    .setOrigin(0.5, 0.5);
    this.button.setInteractive();
    this.button.on('pointerdown', () => {
      this.scene.audioManager.playClick();
      this.showHideMenu(false);
      this.scene.uiManager.popup.entryAnimation();
      this.scene.uiManager.gameplay.exitAnimation();
      this.scene.uiManager.levelIndicator.exitAnimation();
      this.scene.uiManager.resultScreen.exitAnimation();
    });
    this.add(this.button);
  }

  //function to hide/show menu button like when menupopup and title screen are visible then we
  // we need to hide menu button but on game screen we need to show menu button
  showHideMenu(visible:boolean){
    if(visible){
      this.setAlpha(1);
      this.setInteractive();
    } else {
      this.setAlpha(0);
      this.disableInteractive();
    }
  }
}