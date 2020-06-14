import { CompareFn } from '../../rxjs/interfaces/compare-fn';

/**
 * @description
 * Updates one or multiple items in array T[].
 * You can provide a custom comparison function that should return true if items match.
 * If no comparison is provided, an equality check is used by default.
 * Not mutating original array.
 * Returns new updated array of type T[];
 *
 * @example
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const newCat = {id: 1, type: 'lion'};
 *
 * const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
 *
 * @returns T[]
 *
 * @docsPage update
 * @docsCategory transformation-helpers
 */
export function update<T extends object, I extends T>(
  array: T[],
  itemsOrItem: I[] | I,
  compare?: CompareFn<T>
): T[] {
  if (array && itemsOrItem) {
    const items = Array.isArray(itemsOrItem) ? itemsOrItem : [itemsOrItem];
    const defaultCompare = (a: T, b: T) => a === b;
    const innerCompare = compare || defaultCompare;

    return array.map(existingItem => {
      return (
        items.find(item => innerCompare(item, existingItem)) || existingItem
      );
    });
  }

  throw new Error(`wrong params to 'update'`);
}