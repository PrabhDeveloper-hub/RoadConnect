# RoadConnect 
[PLAY GAME](https://prabhjotsingh.itch.io/road-connect)

Connect the road blocks to complete the path.

## Requirements
[Node.js](https://nodejs.org/en) is required to install dependencies and run scripts via npm.

## Available Commands
**npm install** - To install project dependencies
**npm start** - Launch a development web server
**npm run build** - Create a production build in the dist folder

## Running Code
After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

The local development server runs on `http://localhost:9000` by default. Please see the webpack documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. Webpack will automatically recompile your code and then reload the browser.

## Template Structure
`webpack` - If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/config.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json`. Please see the [Webpack documentation](https://webpack.js.org/) for more information.

`src` - Contains all the source code of the game.

`src/index.ts` - In this file we are importing the Phaser and calling the `setupGame()` of Game class which initiate the Phaser game renderer

`src/shared` - Contains all the reusable template code.

`src/shared/global.d.ts` - It has declared modules for all the file types used as sprites and plugins to be used in the game.

`src/shared/index-template.hbs` - An HBS file is a template file created by Handlebars, a web template system. It contains a template written in HTML code and embedded with Handlebars expressions. An HBS file performs the same function as a .HANDLEBARS file.
Handlebars is a JavaScript library that helps developers create cleaner code. A Handlebars template includes a series of Handlebars expressions that look something like this: `{{inputobject}}`.

By applying input code to HBS templates, Handlebars users can efficiently generate HTML code for use in their development projects. The Ember web app development framework also makes use of HBS templates.
To deliver an HBS file to the browser, you must include it in the script tag, as shown below:
`<script id="entry-template" type="text/x-handlebars-template">`
`template content`
`</script>`

`src/shared/styles` - Contains the styling files for the canvas.

`src/shared/styles/index.scss` - In this scss file we are styling the main root component and loading the custom fonts used in the game

`src/shared/styles/reset.scss` - Some browser automatically takes extra padding and margin around the content , in this file we are removing all the extra padding, margins and resizing the canvas to fit in full browser screen

`game` - Contains all the game logic

`game/game.component.ts` - Component where we are doing the following tasks

#### Creating Game Config

```sh
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
```

#### Adding scenes
```sh
game.scene.add('boot', BootScene);
game.scene.add('game', GameScene);
```

#### Starting the boot scene
```sh
game.scene.start('boot');
```
and doing other stuff like event when orientation changes , Instantiating the game resizer.

`game/game.styles.scss` - contains css related to canvas created to embed the game.

`game/assets` - It contains all the assets related to the game.

`game/assets/audio` - contains all the audio used inside the game like Background Music and SFX.

`game/assets/fonts` - contains custom fonts used in game.

`game/assets/img` - contains all the images and Sprites used in the game.

`game/cfg` - This folder consists of configurable constants which are used by the objects in game

`game/cfg/game-config.ts` - It contains the value of Design Resolution like a Safe area for the UI objects and Center position of the game view.
```sh
export const CAM_CENTER = {
  x: 1920,
  y: 1920,
};
```

`game/cfg/game-constants.ts` - Contains constants for the UI objects like Position, Scaling, Text Style
```sh
export const LEVEL_INDICATOR_CONFIG = {
  textStyle: {
    fontFamily: GAME_FONT,
    fontSize: '60px',
    resolution: 3,
    color: '#ffffff',
  },
  origin: {
    x: 0.5,
    y: 0.5
  },
  shadowStyle: {
    x: -10,
    y: 5,
    color: '#36454F',
    blur: 10,
    stroke: false,
    fill: true
  }
};
```
Also it has array of dictionaries which contains asset Ids and their path which can help in creating the readable code while loading and assigning ids to the assets.
It also has level data which contains the info related to each level like number of blocks their positions and angles

`game/cfg/static-constants.ts` - This file contains the static constants which doesn't need to modify like Tween Easing types and Resizer type.
```sh
export const enum ResizerType {
  'FIT' = 'FIT', // Leads to empty spaces around canvas. But preserves aspect ratio. May not cover the entire screen with canvas.
  'ZOOM_FIT' = 'ZOOM_FIT', // Preserves aspect ratio and uses camera zoom to cover the entire screen with canvas.
  'ZOOM_FIT_DPR' = 'ZOOM_FIT_DPR', // Same as zoom fit but fixes pixelation issues on mobile by taking dpr into account.
}
```

`game/core` - Contains the core managing classes which are common throughout the game

`game/core/AudioManager.ts` - This class contains common reusable functions which can manage all the audio in the game like 
Adding audio to scene , function to play audio using audioId, Toggling the Music and SFX.
```sh
initGameAudio(): void {
    for (let i = 0, len = GAME_SOUNDS.length; i < len; ++i) {
      if (GAME_SOUNDS[i].loop) {
        this.bgSounds.set(
          GAME_SOUNDS[i].key,
          this.scene.sound.add(GAME_SOUNDS[i].key, { volume: GAME_SOUNDS[i].volume, loop: GAME_SOUNDS[i].loop })
        );
      } else {
        this.sounds.set(
          GAME_SOUNDS[i].key,
          this.scene.sound.add(GAME_SOUNDS[i].key, { volume: GAME_SOUNDS[i].volume, loop: GAME_SOUNDS[i].loop })
        );
      }
    }
  }
```

`game/core/GameManager.ts` - It contains the common methods like incrementing the level, setting the max level so that in Level select popup we can enable or disable the level buttons accordingly.

`game/core/UIManager.ts` - This class manages all the UI element classes. All the UI objects are instantiated in this class. It serves as a link between this ui objects like we need to call the Popup entry animation on PLAY button click and so on.

`game/game-objects/Background.ts` - Creates a Background behind the game screen.

`game/game-objects/GameComponent.ts` - This class is getting the renderer type and creating an area on which our game can render .Phaser renderer are off three types `Phaser.CANVAS`, `Phaser.WEBGL`, or `Phaser.AUTO`. This is the rendering context that you want to use for your game. The recommended value is Phaser.AUTO which automatically tries to use WebGL, but if the browser or device doesn't support it it'll fall back to Canvas. The canvas element that Phaser creates will be simply be appended to the document at the point the script was called.
```sh
if (this.scene.sys.renderer.type === Phaser.WEBGL) {
      this.grd = this.scene.textures.createCanvas('grd').getContext();
    } else {
      this.grd = this.scene.sys.canvas.getContext('2d');
    }
```

`game/scenes` - This directory contains all the game scenes.

`game/scenes/AbstractScene.ts` - This is the base scene of all the scenes which is extending the Phaser.Scene and attaching core functinality like resize handler, Audio manager

`game/scenes/BootScene.ts` - Bootscene is responsible for loading all the assets used in the game like Images, Sounds and Fonts. It is the first scene of the game . Load method of this scene is resoponsible of loading the assets , It has some callback events like `progress` which returns the percentage of assets loaded . `complete` which tells the assets are loaded successfully and we can use them accordingly in the game. We can also show Loading text and Loading Progress bar in this scene.

`game/scenes/GameScene.ts` - GameScene is the actual scene where a player interacts with the game elements . This scene instantiates audio manager , game manager and UI manager.

`game/ui-objects` - Contains all the UI elements of the game.

`game/ui-objects/Gameplay.ts` - This class is responsible for adding the blocks according to the level number, attaching the events to blocks, Rotating blocks functionality, Loading next level, Entry animation of blocks when level starts and exit animation of blocks when game ends.

`game/ui-objects/LevelIndicator.ts` - LevelIndicator is a Phaser Container (a container in phaser is an object which can have many child game objects) which is used to show the level number on the top of the game screen `LEVEL 1`. This container has entry and exit animations which are created using [Phaser tweens](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween/)

`game/ui-objects/MenuButton.ts` - Contains the logic for adding the menu button on the screen and events attached to call the Menu Popup.It also contains the method `showHideMenu` which takes a boolean value. This method is responsible to show the menu button on game screen and hiding on title screen and when popup is visible.

`game/ui-objects/Popup.ts` - Popup class is extending the Phaser.GameObjects.Container . In this class we are creating the Popup base, Level buttons, enabling/disabling logic of level buttons according to the `maxLevel` , `Level Select` text and animations for closing and opening the popup.

`game/ui-objects/ResultScreen.ts` - This class contains a result text which says `ALL  LEVELS  CLEARED!  =)` and animation methods to show the result after all levels are cleared. We can also add Replay button or Reset progress button which can clear the data and start game from beginning.

`game/ui-objects/StartButton.ts` - This class is responsible for creating the `PLAY` button on the title screen and calling the methods attached with button to call the popup when user clicks on the button. It also has its own entry and exit animation.

`game/ui-objects/TitleScreen.ts` - This class creates Game logo on starting screen , animation which runs when title screen appears like the Road is coming from left and Connect is coming from right , animation of title when user clicks on play button. We are instantiating the start button in this class.

`game/utils` - Contains utility classes which are helping in resizing and loading game assets

`game/utils/AssetPreloader.ts` - Contains method which loads the assets used by fetching the dictionary of images and sounds which constits of key(name using which an image or sound can be used in the game) and path of assets .

`game/utils/CameraResizer.ts` - This class is responsible for preserving the main content specified within the bounds of `DESIGN_RES` using `DPR`. Uses camera zoom to add black borders in the canvas.In simple words Canvas dom attributes acts as an image resolution opened in a device screen.Canvas style attributes specify the device screen resolution. A 540x960 image opened in a 1080x1920 device screen will be scaled up hence clarity loss. A 2160x3840 image opened in a 1080x1920 device screen will be scaled down, since aspect ratio is the same, no loss of clarity, but memory consumption will be more.

`game/utils/GameResizer.ts` - This class is responsible for the resizing of the game screen and contains the methods for setting the camera zoom. It has method which resizes the game and preserve the aspect ratio at the same time for both the orientations. 

## Gameplay Flow

1. When game starts Boot scene is loading all the assets after that control goes to Title screen.
2. On Title Screen user clicks on Play button.
3. Popup displays on the screen which has 3 levels but user can click on level 1 button.
4. When user clicks on Level 1 button `setup()` method of `Gameplay` is called which calls `addblocks()` and blocks appears on screen.
5. User can play by clicking on blocks and rotating them. Once all block angles are correctly set all blocks will disappear and next level begins.
6. After completing all the levels there will be result screen which shows `ALL LEVELS CLEARED! =)`.
7. User can also select level of its choice by clicking on the Menu button at the bottom of the screen and selecting the level button.