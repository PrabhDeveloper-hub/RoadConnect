import GameComponents from '../game-objects/GameComponents';
import AbstractScene from '../scenes/AbstractScene';

export default class GameManager {
  scene: AbstractScene;
  gameComponents: GameComponents;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.gameComponents = new GameComponents(this.scene);
  }

 
  setMaxLevel(){
    if(this.scene.currentLevel > this.scene.maxLevel){
      this.scene.maxLevel = this.scene.currentLevel;
    }
  }
  incrementLevel() {
    this.scene.currentLevel++;
  }
}
