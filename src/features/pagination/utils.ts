/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
export function range(from: number, to: number, step = 1) {
  return [...Array(to)].map((_, i) => from + i * step);
}
