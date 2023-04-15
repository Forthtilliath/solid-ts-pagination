declare global {
  namespace Pagination {
    type TButtonEvent = MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    };
  }
}

export {};
