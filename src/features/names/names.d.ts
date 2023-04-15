declare global {
  namespace Names {
    type TInputEvent = Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    };
  }
}

export {};
