<meta charset="utf-8" />
# particle.js

up and running [here](http://city41.github.com/particle.js/)

A particle system designer written in JavaScript using HTML5 Canvas and dat-gui for the UI
  
![screenshot](https://raw.github.com/city41/particle.js/master/particlejs.png)

## Main Purpose

This particle editor was written to support an article I wrote for [Build New Games](http://buildnewgames.com/particle-systems/).
The needs of the article came first and so that does mean particle.js possibly has less than optimal choices for general usage.  
  
I am currently in the midst of improving particle.js, primarily to support Cocos2D (see the last section below)
  
## Building

head to the `r/` directory and run `r.js -o build.js`, out will pop `pjs-min.js` up in the `public` directory. the `require.js` script is required (see the script tags in index.html).  
  
r.js is the requirejs optimizer. You can install it with npm: `npm install -g requirejs`. See [http://requirejs.org](http://requirejs.org) for more info
  
## License

Licensed under Apache 2.0. This generally means you can do just about anything you want with this code.
But if unsure, you can read the license here: [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

## Features

* Almost the same particle system parameters as Cocos2D and LÖVE
* Mostly UI agnostic, the particle system itself has no dat-gui code in it
  * to be fair: the Emitter has been written with dat-gui-isms in mind.
* Configurable UI through a query parameter (show only the parameters you care about)

## Query Parameters

particle.js's UI is very configurable via query parameters. Here's the low down:

all parameters are optional.

* **w**: integer, width of the canvas in pixels (default is 250)
* **h**: integer, height of the canvas in pixels (default is 300)
* **system**: string, the initial predefined particle system to start out with.
    * choices so far include: `meteor`, `fireworks`, `fire`, `galaxy`, `snow`, `watergeyser` and `ribbon`
* **ui**: string, specifies which UI components to include for alterning the system, see below

### Changing the UI

The **ui** query parameter takes a string that specifies what UI components to include. It's in the form

    <category name>,<parameter name>,<parameter 2 name>:<category name>,<parameter name>,<parameter name>

For example, to have pos, and posVar UI components all in a "Simple" category, the string would be

    ui=Simple,pos,posVar

[like this](http://city41.github.com/particle.js/index.html?ui=Simple,pos,posVar)

*(NOTE: when there is only one category, a folder for the category is not created, so you don't see the title of the category anywhere)*

Or to have two different categories:

    ui=Basics,pos,posVar,life:Appearance,startColor,endColor

[like this](http://city41.github.com/particle.js/index.html?ui=Basics,pos,posVar,life:Appearance,startColor,endColor)


You can also have no UI at all by specifying [ui=none](http://city41.github.com/particle.js/index.html?ui=none), in this case
you will still get the 'Play' and 'Reset' buttons. 

You can fully hide the UI by hitting 'h', and bring it back with 'h' again

#### All the possible parameters and their UI Types

* **totalParticles** `unsignednumber` total number of particles in the particle pool
* **emissionRate** `unsignednumber` rate at which particles are released
* **pos** `vector` starting position for particles
* **posVar** `vector` variance in particle starting positions
* **gravity** `vector` the gravity vector
* **angle** `number` the angle at which the particles depart, in degrees
* **angleVar** `unsignednumber` variance in the particle angle
* **speed** `number` the speed at which particles move
* **speedVar** `unsignednumber` speed variance
* **life** `number` how long a particle lives, in seconds
* **lifeVar** `unsignednumber` life variance
* **radialAccel** `number` the radial acceleration of a particle. negative values are towards the emitter's location, positive are away
* **radialAccelVar** `unsignednumber` radial acceleration variance
* **tangentialAccel** `number` the tangential acceleration of the particles, perpendicular to the radial acceleration
* **tangentialAccelVar** `unsignednumber` tangential acceleration variance
* **texture** `texture` the texture to use for the particles, UI wise, a file chooser is displayed allowing users to change the texture
* **textureEnabled** `boolean` whether textures are enabled or not
* **textureAdditive** `boolean` whether textures are rendered additively or not
* **radius** `unsignednumber` the radius of a particle if its not using textures
* **radiusVar** `unsignednumber` radius variance
* **startScale** `unsignednumber` the initial scale of a particle if its using textures. from 0 `nothing at all` to 1 `full size of the texture`
* **endScale** `unsignednumber` the final scale of a particle if its using textures. from 0 `nothing at all` to 1 `full size of the texture`
* **startColor** `color` the starting color of a particle
* **startColorVar** `color` starting color variance
* **endColor** `color` the ending color of a particle
* **endColorVar** `color` end color variance

## About datGUI

datGUI is a Google library from the Chrome Experiments team (they are also behind stats.js and three.js). It is the UI library responsible for the
user controls in particle.js.
  
datGUI's main source code home is [here](http://code.google.com/p/dat-gui/). Since it is licensed under Apache-2.0, I decided
to bring my fork of datGUI over here to github (hey datGUI members, if you don't like that, let me know). It is in the `dat-gui` directory.
  
My fork primarily includes two additions:

* FileController -- a controller that allows users to select a file from their file system
* TextAreaController -- like StringController, but users a textarea. 

## And stats.js

particle.js also uses stats.js to display framerate info. I hack it a smidge, and get rid of the realtime graphs after instantiating a `stats` object.
The stats.js library is untouched by me.

## Import Cocos2D particle plist files

The `plist` branch is pretty successfully importing Cocos2D plist files and loading them in as the current particle system.

It's not all the way there, but supports TIFF and PNG textures, and most of Cocos2D's particle attributes. Most notably missing is spinning particles.

The experiment is running [here](http://city41.github.com/particle.js/exp/)

You can find some sample plist files at the Cocos2D repo [here](https://github.com/cocos2d/cocos2d-iphone/tree/master-v2/Resources/Particles), known to work are `BoilingFoam.plist`, `LaveFlow.plist`, `Comet.plist` and `Meteor.plist`.

Overall goal: ability to fully import all Cocos2D plists, and export the current system as a Cocos2D plist.
