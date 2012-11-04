# particle.js

up and running [here](http://city41.github.com/particle.js/)

A particle system designer written in JavaScript using HTML5 Canvas and ExtJS for the UI
  
![screenshot](https://raw.github.com/city41/particle.js/master/particlejs.png)

## Features

* Same particle system parameters as Cocos2D and LÖVE
* UI agnostic, the particle system itself has no Ext code in it
* Configurable UI through a query parameter (show only the parameters you care about)

## Query Parameters

particle.js is very configurable via query parameters. Here's the low down:

* **w**: integer, width of the canvas in pixels
* **h**: integer, height of the canvas in pixels
* **system**: string, the initial predefined particle system to start out with.
    * choices so far include: meteor, fireworks, fire, galaxy, snow and spiral
* **ui**: string, specifies which UI components to include for alterning the system, see below

### Changing the UI

The **ui** query parameter takes a string that specifies what UI components to include. It's in the form

    <category name>,<parameter name>=<ui type>,<parameter 2 name>=<ui type>:<category 2 name>,<parameter name>=<ui type> ...

For example, to have pos, posVar and startColor UI components all in a "Simple" category, the string would be

    **ui=**Simple,pos=vector,posVar=vector,startColor=color

![screenshot](https://raw.github.com/city41/particle.js/master/exampleUi.png)

Or, see it [in action](http://city41.github.com/particle.js/index.html?ui=Simple,pos=vector,posVar=vector,startColor=color)

It's stupid you have to specify the ui type, as each parameter only works with a specific type. I should change that.

You can also have no UI at all by specifying [ui=none](http://city41.github.com/particle.js/index.html?ui=none)

#### All the possible parameters and their UI Types

* totalParticles, number, total number of particles in the particle pool
* emissionRate, number, rate at which particles are released
* pos, vector, starting position for particles
* posVar, vector, variance in particle starting positions
* gravity, vector, the gravity vector
* angle, number, the angle at which the particles depart, in degrees
* angleVar, number, variance in the particle angle
* speed, number, the speed at which particles move
* speedVar, number, speed variance
* life, number, how long a particle lives, in seconds
* lifeVar, number, life variance
* radialAccel, number, the radial acceleration of a particle. negative values are towards the emitter's location, positive are away
* radialAccelVar, number, radial acceleration variance
* tangentialAccel, number, the tangential acceleration of the particles, perpendicular to the radial acceleration
* tangentialAccelVar, number, tangential acceleration variance
* texture, texture, the texture to use for the particles
* textureEnabled, boolean, whether textures are enabled or not
* textureAdditive, boolean, whether textures are rendered additively or not
* radius, number, the radius of a particle if its not using textures
* radiusVar, number, radius variance
* startScale, number, the initial scale of a particle if its using textures. from 0 (nothing at all) to 1 (full size of the texture)
* endScale, number, the final scale of a particle if its using textures. from 0 (nothing at all) to 1 (full size of the texture)
* startColor, color, the starting color of a particle
* startColorVar, color, starting color variance
* endColor, color, the ending color of a particle
* endColorVar, color, end color variance

## Future Features?

It'd be cool to export these systems into a Cocos2D or LÖVE format. Also would be cool to export
them into a format that would be compatible with ImpactJS and Cocos2D-JavaScript.
