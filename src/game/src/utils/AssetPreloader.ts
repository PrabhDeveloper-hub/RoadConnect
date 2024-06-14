import { GAME_SOUNDS } from '../cfg/game-constants';
import AbstractScene from '../scenes/AbstractScene';

const ASSETS_PREFIX_URL = 'game/src/assets/img/';

export class AssetsPreloader {
  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    this.scene = scene;
  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadBootSceneAssets(): void {
    this.scene.load.maxParallelDownloads = 10;
    this.scene.load.xhr.timeout = 10;

    this.scene.load.path = ASSETS_PREFIX_URL;
    this.scene.load.image('loading_bar', 'loading_bar.png');
    this.scene.load.image('loading_fill', 'loading_fill.png');

  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadGameSceneAssets(): void {
    this.scene.load.path = ASSETS_PREFIX_URL;

    this.scene.load.image('black_overlay', 'black_overlay.png');
    this.scene.load.image('clock', 'clock.png');
    this.scene.load.image('gameBack', 'gameBack.png');
    this.scene.load.image('start_button', 'start_button.png');
    this.scene.load.image('music_on', 'music_on.png');
    this.scene.load.image('music_off', 'music_off.png');
    this.scene.load.image('next', 'next.png');
    this.scene.load.image('replay', 'replay.png');
    this.scene.load.image('sfx_on', 'sfx_on.png');
    this.scene.load.image('sfx_off', 'sfx_off.png');
    this.scene.load.image('finger', 'guidingFinger.png');
    this.scene.load.image('popup', 'pauseBoard.png');
    this.scene.load.image('overlay', 'overlay.png');
    this.scene.load.image('cross1', 'cross1.png');
    this.scene.load.image('fireparticle', 'fireParticle.png');
   
    this.scene.load.path = 'game/src/assets/audio/';

    for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
      this.scene.load.audio(GAME_SOUNDS[i].key, [
        `${GAME_SOUNDS[i].path}.${GAME_SOUNDS[i].ext}`,
      ]);
    }

    // this.scene.load.image('logo', 'logo/logo.png');
    // this.scene.load.atlas('logo-shine', 'logo/logo_effect.png', 'logo/logo_effect.json');    // Free Spin

   

    // this.scene.load.bitmapFont(
    //   'win-counter-font',
    //   'bitmapFonts/win-counter.png',
    //   'bitmapFonts/win-counter.xml'
    // );
    this.scene.load.start();
  }

  // createAnimations(): void {}
}

export default AssetsPreloader;
