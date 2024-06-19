import { GAME_FONT } from '../cfg/game-constants';
import { LangCode } from '../cfg/static-constants';
import AbstractScene from '../scenes/AbstractScene';

export default class LocalizationManager {
  scene: AbstractScene;
  private currentTranslation: { [key: string]: string } = {};
  private gameFont = GAME_FONT;
  private isDesktop = true;

  constructor(scene: AbstractScene) {
    this.scene = scene;
    this.setTranslations(scene.cache.json.get('language'));
    this.isDesktop = this.scene.game.device.os.desktop;
  }

  getLangFont(): string {
    return this.gameFont;
  }

  getGameFont(): string {
    return GAME_FONT;
  }

  //Getting all the translations from the json files 
  private setTranslations(translationsObject: { [key: string]: string }): void {
    Object.keys(translationsObject).forEach((languageKey: string) => {
      if (this.currentTranslation[languageKey]) {
        console.error(`DUPLICATED TRANSLATION KEY DETECTED: ${languageKey}`);
      }
      this.currentTranslation[languageKey] = translationsObject[languageKey];
    });
  }

  //Translating a particular text according to the key provided
  translate(key: string, toUpperCase = true): string {
    let keyMod = key;
    let translation: string = this.currentTranslation[keyMod];
    if (!translation) {
      console.error(`NO TRANSLATION WITH KEY: ${keyMod}`);
      return '';
    }
    if (toUpperCase) {
      translation = translation.toUpperCase();
    }
    return translation;
  }
}
