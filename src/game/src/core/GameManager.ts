import GameComponents from '../game-objects/GameComponents';
import AbstractScene from '../scenes/AbstractScene';

export default class GameManager {
  scene: AbstractScene;
  gameComponents: GameComponents;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.gameComponents = new GameComponents(this.scene);
  }

  //Setting the maxLevel played in the game
  setMaxLevel(){
    if(this.scene.currentLevel > this.scene.maxLevel){
      this.scene.maxLevel = this.scene.currentLevel;
    }
  }

  //Increment the current level so that we can load new level data accordingly
  incrementLevel() {
    this.scene.currentLevel++;
  }
}
