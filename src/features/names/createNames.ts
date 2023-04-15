import { Accessor, createEffect } from "solid-js";
import { generatorFullNames } from "./lib/faker";

type Props = {
  nbNames: number;
  page: Accessor<number>;
  nbNamesPerPage: number;
  filter?: Accessor<string>;
};

export function createNames(props: Props) {
  const allNames = generatorFullNames(props.nbNames);

  const displayedNames = () => {
    return allNames.filter((item) => {
      return item.name
        .toLowerCase()
        .includes((props.filter ?? (() => ""))().toLowerCase());
    });
  };

  // Premier et dernier index des posts de la page courante
  const postLastIndex = () => props.page() * props.nbNamesPerPage;
  const postFirstIndex = () => postLastIndex() - props.nbNamesPerPage;
  // Conserve seulement les posts de la page
  const namesInPage = () => displayedNames().slice(postFirstIndex(), postLastIndex());

  const nbPages = () => Math.ceil(displayedNames().length / props.nbNamesPerPage);
  createEffect(() => console.log(nbPages()))

  return [namesInPage, nbPages, allNames, displayedNames] as const;
}
