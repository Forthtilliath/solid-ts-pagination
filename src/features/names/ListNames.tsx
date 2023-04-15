import { Accessor } from "solid-js";
import { generatorFullNames } from "./lib/faker";
import styles from "./Names.module.scss";

type Props = {
  // names: ReturnType<typeof generatorFullNames>;
  names: Accessor<ReturnType<typeof generatorFullNames>>;
};

export function ListNames(props: Props) {
  return (
    <div class={styles.list}>
      {props.names().map(({ name }) => (
        <div>{name}</div>
      ))}
    </div>
  );
}
