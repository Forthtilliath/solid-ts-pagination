declare global {
    type ActionEvent<T> = MouseEvent & {
        currentTarget: T;
        target: Element;
    }
}

export {}