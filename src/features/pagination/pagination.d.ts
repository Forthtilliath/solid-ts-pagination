declare global {
    type TButtonEvent = MouseEvent & {
        currentTarget: HTMLButtonElement;
        target: Element;
    }
}

export {}