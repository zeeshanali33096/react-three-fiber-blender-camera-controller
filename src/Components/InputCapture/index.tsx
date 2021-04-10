import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import InputCaptureStore from "../../Stores/InputCaptureStore";

const InputCapture = () => {
  const keyDown = InputCaptureStore((state) => state.keyDown);
  const keyUp = InputCaptureStore((state) => state.keyUp);
  const setClicked = InputCaptureStore((state) => state.setClicked);
  const setMouseScroll = InputCaptureStore((state) => state.setMouseScroll);
  const setWheel = InputCaptureStore((state) => state.setWheel);

  const { gl } = useThree();

  const handleKeyDown = (e: KeyboardEvent) => {
    console.log({ handleKeyDown: e.code });
    keyDown(e.code);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    console.log({ handleKeyUp: e.code });
    keyUp(e.code);
  };

  const handleMouseDown = (e: MouseEvent) => {
    setClicked(true, e.button);
    // console.log({gl})
  };

  const handleMouseUp = (e: MouseEvent) => {
    setClicked(false, e.button);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()  // prevent page zoom
    // Needs a consumer!!
    setWheel(true);
    setMouseScroll(e.deltaX, e.deltaY, e.ctrlKey);
  };

  
  const handleTouchStart = (e: TouchEvent) => {
    console.log("Touch Started");
    // TODO
  };

  const handleTouchMove = (e: TouchEvent) => {
    console.log("Touch moved");
    // TODO
  };

  const handleTouchEnd = (e: TouchEvent) => {
    console.log("Touch End");
    // TODO
  };

  const handleTouchCancel = (e: TouchEvent) => {
    // TODO
  };

  useEffect(() => {
    //Keyboard Events
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Mouse Click Event

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Mouse Scroll Events
    gl.domElement.addEventListener("wheel", handleWheel);

    // Touch Events
    gl.domElement.addEventListener("touchstart", handleTouchStart);
    gl.domElement.addEventListener("touchmove", handleTouchMove);
    gl.domElement.addEventListener("touchend", handleTouchEnd);
    gl.domElement.addEventListener("touchcancel", handleTouchCancel);

    return () => {
      //Keyboard Events
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

      // Mouse Click Event
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      //Mouse Scroll Event
      gl.domElement.removeEventListener("wheel", handleWheel);

      //Touch Events
      gl.domElement.removeEventListener("touchstart", handleTouchStart);
      gl.domElement.removeEventListener("touchmove", handleTouchMove);
      gl.domElement.removeEventListener("touchend", handleTouchEnd);
      gl.domElement.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, []);

  return <></>;
};

export default InputCapture;
