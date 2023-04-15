import { Accessor } from "solid-js";
import { generatorFullNames } from "./lib/faker";

type Props = {
  /** Nombre de noms à générer */
  nbNames: number;
  /** Page courante */
  page: Accessor<number>;
  /** Nombre de noms par page */
  nbNamesPerPage: number;
  /** Filtre à appliquer à la liste de noms */
  filter?: Accessor<string>;
};

/**
 * Récupère une liste de noms qui s'adapte à une __pagination__ et un __filtre__.
 * @param props
 * @property props.nbNames - Nombre de noms à générer
 * @property props.page - Page courante
 * @property props.nbNamesPerPage - Nombre de noms par page
 * @property props.filter - Filtre à appliquer à la liste de noms
 * @returns
 * La fonction retourne un tableau contenant :
 * - les noms pour la page courante
 * - le nombre de pages
 * - la liste totale des noms
 * - la liste après application du filtre
 */
export function createNames(props: Props) {
  const allNames = generatorFullNames(props.nbNames);

  /** Applique le filtre */
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
  const namesInPage = () =>
    displayedNames().slice(postFirstIndex(), postLastIndex());

  const nbPages = () =>
    Math.ceil(displayedNames().length / props.nbNamesPerPage);

  return [namesInPage, nbPages, allNames, displayedNames] as const;
}
