import { Euler, Vector3 } from "three";
import create from "zustand";

type CameraStoreType = {
  lookAt: Vector3;
};
const CameraStore = create<CameraStoreType>((set) => ({
  lookAt: new Vector3(0, 0, 0),
}));

export default CameraStore;
