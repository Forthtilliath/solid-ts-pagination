import { range } from "./utils";
import {
  Button,
  RiSystemArrowDropLeftLine,
  RiSystemArrowDropRightLine,
  Spread,
} from "./components";
import { Accessor, createEffect, createSignal, mergeProps, on } from "solid-js";
import styles from "./Pagination.module.scss";

type Props = {
  /** Nombre de pages */
  count: Accessor<number>;
  /** Page courante */
  page: Accessor<number>;
  /** Nombre de pages avant et après la page courante */
  siblingCount?: number;
  /** Nombre de pages à coté de la première et dernière page */
  boundaryCount?: number;
  /** Action quand on clique sur une page */
  onChange: (event: Pagination.TButtonEvent, value: number) => void;
};

// https://codesandbox.io/s/sleepy-perlman-zqt4xb?file=/demo.tsx
// Le nombre de pages affiché est toujours le même (spread inclus)
export function Pagination(props: Props) {
  const merged = mergeProps({ siblingCount: 1, boundaryCount: 1 }, props);

  let [pagination, setPagination] = createSignal([] as number[], {
    equals: false,
  });

  // Met à jour la pagination au changement soit de la page, soit du nombre de pages
  createEffect(on(merged.page, () => setPagination(createPagination())));
  createEffect(on(merged.count, () => setPagination(createPagination())));

  /**
   * Liste des numéros de pages contenus dans la pagination
   * Les spreads ont les valeurs -1 et -2 afin d'afficher un span spécial
   */

  /** Contient toutes les pages */
  const allPages = () => range(1, merged.count());

  const nbPagesDisplay = () =>
    /** first */ 1 +
    /** last */ 1 +
    /** current */ 1 +
    /** avant/après */ merged.siblingCount * 2 +
    /** start/end */ merged.boundaryCount * 2;

  const createPagination = () => {
    let pagi = [] as number[];
    // let [pagi, setPagi] = createSignal([] as number[], { equals: false });
    /**
     * Nombre de pages que l'on peut afficher au total.
     * Si on peut afficher plus de pages qu'il n'y en a, pas besoin de filtrer.
     */

    if (nbPagesDisplay() >= merged.count()) {
      pagi.push(...allPages());
    } else {
      const pagesStart = allPages().slice(
        0,
        /** spread */ 1 +
          merged.boundaryCount +
          /** page */ 1 +
          merged.siblingCount
      );

      const pagesEnd = allPages().slice(
        /** spread */ merged.count() -
          merged.siblingCount -
          merged.boundaryCount -
          /** page */ 1 -
          /** index array */ 1
      );

      /** Contient les pages de début */
      let boundaryStart = [] as number[];
      if (pagesStart.includes(merged.page())) {
        boundaryStart = pagesStart.slice(0);
        if (merged.siblingCount > 0) {
          const nexts = allPages().slice(
            pagesStart.length,
            pagesStart.length + merged.siblingCount
          );
          boundaryStart.push(...nexts);
        }
      } else {
        boundaryStart = allPages().slice(0, merged.boundaryCount);
      }
      pagi.push(...boundaryStart, -1);

      /** Contient les pages de fin */
      let boundaryEnd = [] as number[];
      if (pagesEnd.includes(merged.page())) {
        boundaryEnd = pagesEnd.slice(0);
        if (merged.siblingCount > 0) {
          const prevs = allPages().slice(
            merged.count() - pagesEnd.length - merged.siblingCount,
            merged.count() - pagesEnd.length
          );
          boundaryEnd.unshift(...prevs);
        }
      } else {
        boundaryEnd = allPages().slice(
          merged.count() -
            merged.boundaryCount -
            /** index array */ 1 +
            /** element */ 1
        );
      }

      let siblingPages = [] as number[];
      if (
        !pagesStart.includes(merged.page()) &&
        !pagesEnd.includes(merged.page())
      ) {
        siblingPages = [
          ...siblingPages,
          ...allPages().slice(
            merged.page() - merged.siblingCount - 1,
            merged.page() - 1
          ),
        ];
        siblingPages.push(merged.page());
        siblingPages = [
          ...siblingPages,
          ...allPages().slice(
            merged.page(),
            merged.page() + merged.siblingCount
          ),
        ];
        pagi.push(-1);
      }
      pagi.push(...siblingPages);
      if (
        !pagesStart.includes(merged.page()) &&
        !pagesEnd.includes(merged.page())
      ) {
        pagi.push(-2);
      }

      pagi.push(...boundaryEnd);
    }

    return Array.from(new Set(pagi));
  };

  return (
    <div class={styles.container}>
      {/* Previous button */}
      <Button
        onChange={merged.onChange}
        to={merged.page() - 1}
        disabled={merged.page() === 1}
        label="Previous"
      >
        <RiSystemArrowDropLeftLine class={styles.icon} />
      </Button>

      {/* Liste des pages */}
      {pagination().map((p) => {
        return p >= 0 ? (
          <Button onChange={merged.onChange} active={p === merged.page()}>
            {p}
          </Button>
        ) : (
          <Spread />
        );
      })}

      {/* Next button */}
      <Button
        onChange={merged.onChange}
        to={merged.page() + 1}
        disabled={merged.page() === merged.count()}
        label="Next"
      >
        <RiSystemArrowDropRightLine class={styles.icon} />
      </Button>
    </div>
  );
}
