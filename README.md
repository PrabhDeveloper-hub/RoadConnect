# RoadConnect
Connect the road blocks to complete the path

## Requirements
[Node.js](https://nodejs.org/en) is required to install dependencies and run scripts via npm.

## Available Commands
**npm install** - To install project dependencies
**npm start** - Launch a development web server
**npm run build** - Create a production build in the dist folder

## Writing Code
After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

The local development server runs on `http://localhost:9000` by default. Please see the webpack documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. Webpack will automatically recompile your code and then reload the browser.

## Template Structure
`webpack` - If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/config.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json`. Please see the [Webpack documentation](https://webpack.js.org/) for more information.

`src` - Contains all the source code of the game

`src/shared` - Contains all the reusable template code.

`src/shared/global.d.ts` - It has declared modules for all the file types used as sprites and plugins to be used in the game.

`src/shared/index-template.hbs` - An HBS file is a template file created by Handlebars, a web template system. It contains a template written in HTML code and embedded with Handlebars expressions. An HBS file performs the same function as a .HANDLEBARS file.
Handlebars is a JavaScript library that helps developers create cleaner code. A Handlebars template includes a series of Handlebars expressions that look something like this: `{{inputobject}}`.

By applying input code to HBS templates, Handlebars users can efficiently generate HTML code for use in their development projects. The Ember web app development framework also makes use of HBS templates.
To deliver an HBS file to the browser, you must include it in the script tag, as shown below:
`<script id="entry-template" type="text/x-handlebars-template">`
`template content`
`</script>`