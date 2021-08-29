import LinkedArray from "./classes.js";
/**
 * The quick sort algorithm.
 * @param {LinkedArray} unsorted_list The unsorted LinkedArray to sort.
 * @param {boolean} [in_place=false] If true, sorts the LinkedArray given in place. Else, creates a shallow copy to sort and doesn't change the actual LinkedArray.
 * @returns {LinkedArray} The sorted output.
 */
export declare function quick_sort(unsorted_list: LinkedArray, in_place?: boolean): LinkedArray;
/**
 * The merge sort algorithm.
 * @param {LinkedArray} unsorted_list The unsorted LinkedArray to sort.
 * @param {boolean} [in_place=false] If true, sorts the LinkedArray given in place. Else, creates a shallow copy to sort and doesn't change the actual LinkedArray.
 * @returns {LinkedArray} The sorted output.
 */
export declare function merge_sort(unsorted_list: LinkedArray, in_place?: boolean): LinkedArray;
/**
 * The binary search algorithm.
 * @param {LinkedArray} list The LinkedArray to search in.
 * @param {number} val The value to search in the LinkedArray.
 * @param {boolean} [sort=false] If the given LinkedArray is unsorted, pass this as true to make it sort using quick sort.
 * @returns {number} The index number if value is found, else -1.
 */
export declare function binary_search(list: LinkedArray, val: number, sort: boolean | undefined, indexRange: number[]): number;
/**
 * The linear search algorithm.
 * @param {LinkedArray} list The LinkedArray to search in.
 * @param {*} val The value to search.
 * @returns {number} The index number if value is found, else -1.
 */
export declare function linear_search(list: LinkedArray, val: unknown): number;
