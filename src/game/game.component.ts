import './game.styles.scss';
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin';
import AbstractScene from './src/scenes/AbstractScene';
import BootScene from './src/scenes/BootScene';
import GameScene from './src/scenes/GameScene';
import GameResizer from './src/utils/GameResizer';



type GameConfig = Phaser.Types.Core.GameConfig;

class Game {
  static setupGame(): void {
    const renderer = Phaser.CANVAS;
    const config: GameConfig = {
      type: renderer,
      title: 'Road Connect',
      backgroundColor: '#FFF',
      banner: process.env.NODE_ENV === 'development',
      scale: {
        fullscreenTarget: 'app-root',
        parent: 'phaser-canvas',
        mode: Phaser.Scale.NONE,
        width: 540,
        height: 960,
        autoRound: true,
      },
      plugins: {
        global: [
          {
            key: 'rexRoundRectanglePlugin',
            plugin: RoundRectanglePlugin,
            start: true,
          },
          // ...
        ],
      },
    };

    const game = new Phaser.Game(config);
    const gameResizer = new GameResizer(game);
    window.addEventListener('resize', () => {
      gameResizer.resize();
    });
    window.addEventListener('orientationchange', () => {
      // Added a time delay since it's observed that devicePixelRatio updates the next frame
      setTimeout(() => {
        gameResizer.resize();
      }, 1);
    });

    game.scene.add('boot', BootScene);
    game.scene.add('game', GameScene);

    const startInterval = setInterval(() => {
      if (game && game.scene && game.scene.scenes && game.scene.scenes[1]) {
        clearInterval(startInterval);
        (game.scene.scenes as AbstractScene[]).forEach((scene: AbstractScene) => {
          scene.grs = gameResizer;
          scene.attachHandlers();
        });
        game.scene.start('boot');
      }
    }, 50);
  }
}

export default Game;
