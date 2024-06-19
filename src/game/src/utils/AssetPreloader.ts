import { GAME_SOUNDS,GAME_IMAGES } from '../cfg/game-constants';
import { LangCode } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

const IMG_PREFIX_URL = 'game/src/assets/img/';
const AUDIO_PREFIX_URL = 'game/src/assets/audio/';

export class AssetsPreloader {
  scene: AbstractScene;

  constructor(scene: AbstractScene) {
    this.scene = scene;
  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadBootSceneAssets(): void {
    this.scene.load.maxParallelDownloads = 10;
    this.scene.load.xhr.timeout = 10

  }

  // Requires use of this.scene.load.start in the case of calling anywhere outside a scene preload function.
  loadGameSceneAssets(): void {
    this.scene.load.path = IMG_PREFIX_URL;
    for (let i = 0, len = GAME_IMAGES.length; i < len; ++i) {
      this.scene.load.image(GAME_IMAGES[i].id,GAME_IMAGES[i].path);
    }
  
    this.scene.load.path = AUDIO_PREFIX_URL;
    for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
      this.scene.load.audio(GAME_SOUNDS[i].key, [
        `${GAME_SOUNDS[i].path}.${GAME_SOUNDS[i].ext}`,
      ]);
    }

    this.scene.load.path = 'game/src/assets/localization/';
    this.scene.load.json('language', `${LangCode}.json`);

    this.scene.load.start();
  }
}

export default AssetsPreloader;
