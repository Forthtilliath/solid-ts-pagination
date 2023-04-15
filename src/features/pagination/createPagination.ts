import { createSignal } from "solid-js";

export function createPagination(count: number) {
  const [page, setPage] = createSignal(1);

  const handleChange = (
    _event: ActionEvent<HTMLButtonElement>,
    value: number
  ) => {
    setPage(Math.max(1, Math.min(value, count)));
  };

  return [page, handleChange] as const;
}
