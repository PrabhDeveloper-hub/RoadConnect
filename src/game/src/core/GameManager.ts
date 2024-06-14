import GameComponents from '../game-objects/GameComponents';
import AbstractScene from '../scenes/AbstractScene';

export default class GameManager {
  scene: AbstractScene;
  gameComponents: GameComponents;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.gameComponents = new GameComponents(this.scene);
    
    
    this.updateLevelData();
  }

  updateLevelData(): void {
    const currLevel = this.scene.currentLevel;
    
  }

  incrementLevel(): void {
    this.scene.currentLevel++;
  }
}
