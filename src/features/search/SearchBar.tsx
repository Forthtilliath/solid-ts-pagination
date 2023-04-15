import { Accessor, Setter } from "solid-js";

type Props = {
  search: Accessor<string>;
  setSearch: Setter<string>;
};

export function SearchBar({ search, setSearch }: Props) {
  const handleSearch = (e: Names.TInputEvent) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <div>
      {/* <label class="search-bar" for="search" htmlFor="search"> */}
      <label class="search-bar" for="search">
        <input
          onInput={handleSearch}
          type="text"
          placeholder="Rechercher..."
          id="search"
          value={search()}
          autocomplete="off"
        />
      </label>
    </div>
  );
}
