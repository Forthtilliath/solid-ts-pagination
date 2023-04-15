import { JSXElement, mergeProps } from "solid-js";
import styles from "../Pagination.module.scss";

type Props = {
  active?: boolean;
  onChange: (event: Pagination.TButtonEvent, value: number) => void;
  disabled?: boolean;
  to?: number;
  children: JSXElement;
};

export function Button(props: Props) {
  const merged = mergeProps(
    { active: false, disabled: false, to: Number(props.children?.toString()) },
    props
  );

  if (!Number.isFinite(merged.to)) {
    throw new Error("to is not a number");
  }

  const handleChange = (e: Pagination.TButtonEvent) => {
    merged.onChange(e, merged.to as number);
  };

  return (
    <button
      type="button"
      onClick={handleChange}
      class={styles.button}
      classList={{ [styles.active]: merged.active }}
      disabled={merged.disabled}
    >
      {merged.children}
    </button>
  );
}
