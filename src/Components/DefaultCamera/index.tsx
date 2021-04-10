import { PerspectiveCamera } from "@react-three/drei";
import React from "react";
import { Euler, Vector3 } from "three";

const DefaultCamera = () => {
  return (
    <PerspectiveCamera
      makeDefault
      fov={60}
      aspect={window.innerWidth / window.innerHeight}
      near={0.01}
      far={10000.0}
      rotation={new Euler(-Math.PI / 15, 0, 0)}
      position={new Vector3(5, 5, 10)}
    />
  );
};

export default DefaultCamera;
