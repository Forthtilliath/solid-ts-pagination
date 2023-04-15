import { Component, createEffect, createSignal } from "solid-js";

import styles from "./App.module.css";
import { Pagination } from "./features/pagination";
import { createNames } from "./features/names/createNames";
import { SearchBar } from "./features/search/SearchBar";
import { ListNames } from "./features/names/ListNames";

// const count = 10;

const App: Component = () => {
  const [page, setPage] = createSignal(1);
  const [search, setSearch] = createSignal("");
  const [names, count] = createNames({
    nbNames: 95,
    page: page,
    nbNamesPerPage: 10,
    filter: search,
  });

  const handleChange = (_event: TButtonEvent, value: number) => {
    setPage(Math.max(1, Math.min(value, count())));
  };

  createEffect(() => setPage(1));

  return (
    <div class={styles.App}>
      <h1>Pagination</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <ListNames names={names} />
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
};

export default App;
