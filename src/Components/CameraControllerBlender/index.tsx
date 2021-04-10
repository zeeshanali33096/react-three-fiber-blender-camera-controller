import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { PerspectiveCamera, Quaternion, Spherical, Vector3 } from "three";
import CameraStore from "../../Stores/CameraStore";
import InputCaptureStore from "../../Stores/InputCaptureStore";

const CameraControllerBlender = () => {
  const keyPressedRef = useRef<any>(InputCaptureStore.getState().pressed);

  const mouseEventRef = useRef({
    deltaX: InputCaptureStore.getState().deltaX,
    deltaY: InputCaptureStore.getState().deltaY,
    isPinch: InputCaptureStore.getState().isPinch,
    clicked: InputCaptureStore.getState().clicked,
    isWheel: InputCaptureStore.getState().isWheel,
  });
  const setWheel = InputCaptureStore((state) => state.setWheel);

  const cameraStoreRef = useRef({
    lookAt: CameraStore.getState().lookAt,
  });

  const offsetRef = useRef(new Vector3());
  const quatRef = useRef(new Quaternion());
  const quatInverseRef = useRef(new Quaternion());
  const sphericalRef = useRef(new Spherical());
  const sphericalDRef = useRef(new Spherical());
  const scaleRef = useRef<number>(1);
  const positionRef = useRef<Vector3>(new Vector3());
  // const lastPositionRef = useRef<Vector3>(new Vector3());
  // const lastQuaternionRef = useRef<Quaternion>(new Quaternion());
  const panOffsetRef = useRef<Vector3>(new Vector3());

  const v = new Vector3(0, 1, 0);
  const EPS = 0.000001;

  useEffect(() => {
    InputCaptureStore.subscribe(
      (pressed) => (keyPressedRef.current = pressed),
      (state) => state.pressed
    );

    InputCaptureStore.subscribe(
      ({ deltaX, deltaY, isPinch, clicked, isWheel }) =>
        (mouseEventRef.current = { deltaX, deltaY, isPinch, clicked, isWheel }),
      (state) => ({
        deltaX: state.deltaX,
        deltaY: state.deltaY,
        isPinch: state.isPinch,
        clicked: state.clicked,
        isWheel: state.isWheel,
      })
    );

    return () => {
      InputCaptureStore.destroy();
    };
  }, []);

  const rotateCamera = (canvas: HTMLCanvasElement) => {
    sphericalDRef.current.theta -=
      (2 * Math.PI * mouseEventRef.current.deltaX) / canvas.clientHeight;
    sphericalDRef.current.phi +=
      (2 * Math.PI * mouseEventRef.current.deltaY * 0.8) / canvas.clientHeight;
  };

  const handlePinch = () => {
    if (mouseEventRef.current.deltaY < 0) {
      scaleRef.current *= 0.92;
    } else {
      scaleRef.current /= 0.92;
    }
  };

  const handlePan = (
    camera: PerspectiveCamera,
    domElement: HTMLCanvasElement
  ) => {
    const { deltaX, deltaY } = mouseEventRef.current;
    offsetRef.current.copy(camera.position).sub(cameraStoreRef.current.lookAt);
    let distance = offsetRef.current.length();
    distance *= Math.tan(((camera.fov / 2) * Math.PI) / 180.0);

    //left-right
    positionRef.current.setFromMatrixColumn(camera.matrix, 0);
    positionRef.current.multiplyScalar(
      -((2 * deltaX * distance) / domElement.clientHeight)
    );
    panOffsetRef.current.add(positionRef.current);

    //up-down
    positionRef.current.setFromMatrixColumn(camera.matrix, 1);
    positionRef.current.multiplyScalar(
      (2 * deltaY * distance) / domElement.clientHeight
    );
    panOffsetRef.current.add(positionRef.current);
  };

  useFrame(({ mouse, raycaster, camera, clock, gl }) => {
    const speed = 5;
    let updateController = false;
    let zoomChanged = false;

    if (mouseEventRef.current.isWheel) {
      if (keyPressedRef.current["ShiftLeft"]) {
        handlePan(camera as PerspectiveCamera, gl.domElement);
      } else if (mouseEventRef.current.isPinch) {
        handlePinch();
        zoomChanged = true;
      } else {
        rotateCamera(gl.domElement);
      }
      updateController = true;
      setWheel(false);  // Value Consumed! removing this line may cause the condition to occur forever!
    }

    if (keyPressedRef.current["ArrowLeft"]) {
      sphericalDRef.current.theta -=
        (2 * Math.PI * speed) / gl.domElement.clientHeight;
      updateController = true;
      console.log({
        ArrowLeft: `keyPressedRef.current["ArrowLeft"]`,
        updateController,
      });
    }

    if (keyPressedRef.current["ArrowRight"]) {
      sphericalDRef.current.theta +=
        (2 * Math.PI * speed) / gl.domElement.clientHeight;
      updateController = true;
    }

    if (keyPressedRef.current["ArrowUp"]) {
      sphericalDRef.current.phi -=
        (2 * Math.PI * speed * 0.5) / gl.domElement.clientHeight;
      console.log({ ip: sphericalDRef.current.phi });
      updateController = true;
    }

    if (keyPressedRef.current["ArrowDown"]) {
      sphericalDRef.current.phi +=
        (2 * Math.PI * speed * 0.5) / gl.domElement.clientHeight;
      console.log({ ip: sphericalDRef.current.phi });
      updateController = true;
    }

    if (updateController) {
      positionRef.current.copy(camera.position);
      offsetRef.current
        .copy(camera.position)
        .sub(cameraStoreRef.current.lookAt);
      quatRef.current.setFromUnitVectors(camera.up, v);
      offsetRef.current.applyQuaternion(quatRef.current);
      quatInverseRef.current = quatRef.current.invert();
      sphericalRef.current.setFromVector3(offsetRef.current);
      sphericalRef.current.theta += sphericalDRef.current.theta;
      sphericalRef.current.phi += sphericalDRef.current.phi;
      sphericalRef.current.phi = Math.max(
        0,
        Math.min(Math.PI, sphericalRef.current.phi)
      );
      sphericalRef.current.makeSafe();
      sphericalRef.current.radius *= scaleRef.current;

      sphericalRef.current.radius = Math.max(
        0,
        Math.min(Infinity, sphericalRef.current.radius)
      );
      cameraStoreRef.current.lookAt.add(panOffsetRef.current);  //Very Bad! Avoid doing this! But works in my case!
      offsetRef.current.setFromSpherical(sphericalRef.current);
      offsetRef.current.applyQuaternion(quatInverseRef.current);

      camera.position
        .copy(cameraStoreRef.current.lookAt)
        .add(offsetRef.current);
      sphericalDRef.current.theta = 0;
      sphericalDRef.current.phi = 0;
      panOffsetRef.current.set(0, 0, 0);
      scaleRef.current = 1;
      updateController = false;
    }
    camera.lookAt(cameraStoreRef.current.lookAt);
  });

  return (
    <GizmoHelper
      alignment="top-right"
      margin={[120, 100]}
      onTarget={() => cameraStoreRef.current.lookAt}
      onUpdate={() => {}}
    >
      <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
    </GizmoHelper>
  );
};

export default CameraControllerBlender;
