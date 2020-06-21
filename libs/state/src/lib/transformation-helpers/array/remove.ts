import { CompareFn } from '../../rxjs/interfaces/compare-fn';

/**
 * @description
 * Removes one or multiple items from array T[].
 * You can provide a custom comparison function that should return true if items match.
 * If no comparison is provided, an equality check is used by default.
 * Returns new updated array T[].
 * Not mutating original array.
 *
 * @example
 * // Removing value without comparison function
 *
 * const items = [1,2,3,4,5];
 *
 * const updatedItems = insert(items, [1,2,3]);
 *
 * // updatedItems will be: [4,5];
 *
 * @example
 * // Removing values with comparison function
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const realCreatures = remove(creatures, nonExistingCreatures, (a, b) => a.id === b.id);
 *
 * // realCreatures will be: [{id: 1, type: 'cat'}];
 *
 * @returns T[]
 *
 * @docsPage remove
 * @docsCategory transformation-helpers
 */
export function remove<T>(
  array: T[],
  itemsOrItem: Partial<T>[] | Partial<T>,
  compare?: CompareFn<T>
): T[] {
  const items = itemsOrItem
    ? Array.isArray(itemsOrItem)
      ? itemsOrItem
      : [itemsOrItem]
    : [];
  const defaultCompare = (a: T, b: T) => a === b;
  const innerCompare = compare || defaultCompare;

  if (array === undefined || array === null) {
    return undefined as any;
  }

  if (!Array.isArray(array) || !array.length) {
    return [];
  }

  return array.filter(existingItem => {
    return !items.some(item => innerCompare(item as T, existingItem));
  });
}
