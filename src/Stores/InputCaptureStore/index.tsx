import create from "zustand";

type KeyboardState = {
  pressed: any;
  clicked: boolean;
  clickedButton: number;
  deltaX: number;
  deltaY: number;
  isPinch: boolean;
  isWheel: boolean;
  setWheel: (val: boolean) => void;
  setMouseScroll: (deltaX: number, deltaY: number, isPinch: boolean) => void;
  setClicked: (val: boolean, button: number) => void;
  keyDown: (code: string) => void;
  keyUp: (code: string) => void;
};

const getMouseButton = (button: number) => {
  switch (button) {
    case 0:
      return "Left";
    case 1:
      return "Middle";
    case 2:
      return "Right";
    default:
      return "Left";
  }
};

const InputCaptureStore = create<KeyboardState>((set) => ({
  pressed: {},
  clicked: false,
  clickedButton: 0,
  isPinch: false,
  deltaX: 0,
  deltaY: 0,
  isWheel: false,
  setWheel: (val: boolean) => set(() => ({ isWheel: val })),
  setClicked: (val: boolean, button: number) =>
    set((state) => ({
      clicked: val,
      pressed: { ...state.pressed, [`Mouse${getMouseButton(button)}`]: val },
    })),
  keyDown: (code: string) =>
    set((state) => {
      const pressed = { ...state.pressed, [code]: true };
      return {
        pressed: pressed,
      };
    }),
  setMouseScroll: (deltaX: number, deltaY: number, isPinch: boolean) =>
    set(() => ({
      deltaX,
      deltaY,
      isPinch,
    })),
  keyUp: (code: string) =>
    set((state) => ({
      pressed: { ...state.pressed, [code]: false },
    })),
}));

export default InputCaptureStore;
