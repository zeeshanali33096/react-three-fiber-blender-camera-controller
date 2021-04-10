## Blender Style Camera Controller for Three.js

# [Demo](https://blender-camera-controller.web.app)

# Theory

Started with Orbit Camera controller and was really unhappy with how the left click was used in the "Drag and Rotate" manner.
Coming from the Blender world, I tried to recreate the mouse controls.

Heavily inspired by Orbit Controls.

P.S. - Don't have an external mouse! The controls are strictly laptop's trackpad based!

# Controls

    *Pinch = Zoom
    *2 finger scroll = rotate
    *Left Shift + 2 finger scroll = Pan

## TODO

    * Continuous Longitudinal Movements!!! => Actually do justice to the name
    * Keyboard Movements
    * Mouse support
    * Touch controls
    * Object click to focus
    * Macbook juicy trackpad gestures
    * Fully Customizable
    * Orthographic/Perspective Switch
    * Multiple Camera Switching

## Dependencies (apart from three.js)

    *@react-three/fiber - [Link](https://github.com/pmndrs/react-three-fiber) - Well written three.js wrapper for react!

    *@react-three/drei - [Link](https://github.com/pmndrs/drei) - great helper classes for react-three-fiber. Will grow stronger with time!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.

Created using create-react-app with typescript.
