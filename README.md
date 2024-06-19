# RoadConnect
Connect the road blocks to complete the path

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

### Creating Game Config

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

### Adding scenes
```sh
game.scene.add('boot', BootScene);
game.scene.add('game', GameScene);
```

### Starting the boot scene
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

`game/cfg/static-constants.ts` -

`game/core` -

`game/core/AudioManager.ts` -

`game/core/GameManager.ts` -

`game/core/UIManager.ts` -

`game/game-objects` -

`game/game-objects/Background.ts` -

`game/game-objects/GameComponent.ts` -

`game/scenes` -

`game/scenes/AbstractScene.ts` -

`game/scenes/BootScene.ts` -

`game/scenes/GameScene.ts` -

`game/ui-objects` -

`game/ui-objects/Gameplay.ts` -

`game/ui-objects/LevelIndicator.ts` -

`game/ui-objects/MenuButton.ts` -

`game/ui-objects/Popup.ts` -

`game/ui-objects/ResultScreen.ts` -

`game/ui-objects/StartButton.ts` -

`game/ui-objects/TitleScreen.ts` -

`game/utils` -

`game/utils/AssetPreloader.ts` - 

`game/utils/CameraResizer.ts` -

`game/utils/GameResizer.ts` -

