import { faker } from "@faker-js/faker";

export function generatorFullNames(n: number) {
  return Array.from({ length: n }).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName()
  }));
}
