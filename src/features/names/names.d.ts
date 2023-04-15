declare global {
  type TInputEvent = Event & {
    currentTarget: HTMLInputElement;
    target: Element;
  };
}

export {};
