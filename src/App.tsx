import type { Component } from "solid-js";

import styles from "./App.module.css";
import { Pagination, createPagination } from "./features/pagination";

const count = 10;

const App: Component = () => {
  const [page, handleChange] = createPagination(count);

  return (
    <div class={styles.App}>
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default App;
