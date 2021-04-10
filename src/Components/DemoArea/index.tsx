import { Box, Plane } from "@react-three/drei";
import { Euler, Vector3 } from "three";

const DemoArea = () => {
  return (
    <>
      <Plane
        receiveShadow
        args={[100, 100]}
        position={new Vector3(0, -0.2, 0)}
        rotation={new Euler(-Math.PI / 2, 0, 0)}
      >
        <meshStandardMaterial attach="material" color="green" />
      </Plane>
      <Box castShadow args={[1, 1, 1]} position={new Vector3(0, 0.5, 0)}>
        <meshStandardMaterial attach="material" color="red" />
      </Box>
    </>
  );
};

export default DemoArea;
