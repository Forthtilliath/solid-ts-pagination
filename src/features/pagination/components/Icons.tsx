type Props = {
  class?: string;
};

export function RiSystemArrowDropLeftLine(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style="overflow: visible;"
      class={props.class}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="m11.828 12 2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z"></path>
    </svg>
  );
}

export function RiSystemArrowDropRightLine(props: Props) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style="overflow: visible;"
      class={props.class}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12.172 12 9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z"></path>
    </svg>
  );
}
