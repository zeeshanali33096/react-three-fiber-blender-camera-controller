import { Canvas } from "@react-three/fiber";
import CameraControllerBlender from "./Components/CameraControllerBlender";
import DefaultCamera from "./Components/DefaultCamera";
import DemoArea from "./Components/DemoArea";
import InputCapture from "./Components/InputCapture";

const App = () => {
  return (
    <Canvas
      gl={{ antialias: true, autoClear: true }}
      linear
      mode="concurrent"
      dpr={window.devicePixelRatio}
      shadows
    >
      {/* Uncommenting the next line will break Gizmo Helper! */}
      {/* <color attach="background" args={["gray"]} /> */}
      {/* https://github.com/pmndrs/drei/issues/358 */}

      <gridHelper args={[1000, 1000, "red", 0x222222]} />
      <ambientLight intensity={0.8} />
      <pointLight intensity={1} position={[0, 6, 0]} />

      {/* Input Capture */}
      <InputCapture />

      {/* Camera */}
      <DefaultCamera />

      {/* Camera Controller + Gizmo */}
      <CameraControllerBlender />

      {/* Stage */}
      <DemoArea />
    </Canvas>
  );
};

export default App;
