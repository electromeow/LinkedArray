import { LinkedArray } from "./classes";

/**
 * The quick sort algorithm.
 * @param {LinkedArray} unsorted_list The unsorted LinkedArray to sort.
 * @param {boolean} [in_place=false] If true, sorts the LinkedArray given in place. Else, creates a shallow copy to sort and doesn't change the actual LinkedArray.
 * @returns {LinkedArray} The sorted output.
 */
function quick_sort(unsorted_list: LinkedArray, in_place = false): LinkedArray {
  var list = new LinkedArray();
  if (!in_place) list = Object.assign(list, unsorted_list);
  else list = unsorted_list;
  const len: number = list.length;
  let pivot: number;
  let beforecheckpivot: unknown;
  beforecheckpivot = undefined; // this line added to bypass eslint prefer-const error
  if (len <= 1) {
    return list;
  }
  beforecheckpivot = list.pop();
  if (typeof beforecheckpivot !== "number")
    throw new Error("Only number can be sorted");
  else pivot = beforecheckpivot * 1;
  const biggers = new LinkedArray();
  const smallers = new LinkedArray();
  list.forEach((x) => {
    if (typeof x !== "number") throw new Error("Only numbers can be sorted.");
    if (x > pivot) biggers.push(x);
    else smallers.push(x);
  });
  var a: LinkedArray;
  var b: LinkedArray;
  if (smallers.get(0) === undefined) {
    a = new LinkedArray(pivot);
    b = quick_sort(biggers);
    b.forEach((x) => a.push(x));
    return a;
  } else if (biggers.get(0) === undefined) {
    b = new LinkedArray(pivot);
    a = quick_sort(smallers);
    b.forEach((x) => a.push(x));
    return a;
  } else {
    a = quick_sort(smallers);
    b = quick_sort(biggers);
    a.push(pivot);
    b.forEach((x) => a.push(x));
    return a;
  }
}

/**
 * The merge sort algorithm.
 * @param {LinkedArray} unsorted_list The unsorted LinkedArray to sort.
 * @param {boolean} [in_place=false] If true, sorts the LinkedArray given in place. Else, creates a shallow copy to sort and doesn't change the actual LinkedArray.
 * @returns {LinkedArray} The sorted output.
 */
function merge_sort(unsorted_list: LinkedArray, in_place = false): LinkedArray {
  let list: LinkedArray;
  if (!in_place) {
    list = new LinkedArray();
    list = Object.assign(list, unsorted_list);
  } else list = unsorted_list;
  if (list.length < 2) return list;
  let mid = list.length;
  mid = (mid - (mid % 2)) / 2;
  let side1: LinkedArray = list.slice(0, mid);
  let side2: LinkedArray = list.slice(mid, list.length);
  side1 = merge_sort(side1);
  side2 = merge_sort(side2);
  let i = 0;
  let j = 0;
  let k = 0;
  function __return_if_number(inputVal: unknown): number {
    if (typeof inputVal === "number") return inputVal;
    else throw new Error("Only numbers can be sorted.");
  }
  while (i < side1.length && j < side2.length) {
    if (__return_if_number(side1.get(i)) < __return_if_number(side2.get(j))) {
      list.set(k, side1.get(i));
      i++;
    } else {
      list.set(k, side2.get(j));
      j++;
    }
    k++;
  }
  while (i < side1.length) {
    list.set(k, side1.get(i));
    i++;
    k++;
  }
  while (j < side2.length) {
    list.set(k, side2.get(j));
    j++;
    k++;
  }
  return list;
}

/**
 * The binary search algorithm.
 * @param {LinkedArray} list The LinkedArray to search in.
 * @param {number} val The value to search in the LinkedArray.
 * @param {boolean} [sort=false] If the given LinkedArray is unsorted, pass this as true to make it sort using quick sort.
 * @returns {number} The index number if value is found, else -1.
 */
function binary_search(
  list: LinkedArray,
  val: number,
  sort = false,
  indexRange: number[]
): number {
  if (typeof val !== "number")
    throw new Error("Only numbers can be searched using binary search.");
  if (!LinkedArray.isLinkedArray(list))
    throw new Error("List given must be a LinkedArray Object");
  if (sort) {
    var list1: LinkedArray = quick_sort(list);
  } else {
    var list1: LinkedArray = new LinkedArray();
    list1 = Object.assign(list1, list);
  }
  const len = list1.length;
  if (!indexRange) indexRange = [0, len];
  if (len <= 1 && list1.get(0) === val) return indexRange[0];
  if (len <= 1 && list1.get(0) !== val)
    throw new Error("Value couldn't found!");
  const mid = (len - (len % 2)) / 2;
  const side1 = list1.slice(0, mid);
  const side2 = list1.slice(mid, len);
  function __return_if_number(inputVal: unknown): number {
    if (typeof inputVal === "number") return inputVal;
    else throw new Error("Only numbers can be sorted.");
  }
  const midpoint: number = __return_if_number(side2.get(0));
  if (val < midpoint)
    return binary_search(side1, val, false, [
      indexRange[0],
      Math.floor((indexRange[1] - indexRange[0]) / 2) + indexRange[0],
    ]);
  else if (val === midpoint)
    return Math.floor((indexRange[1] - indexRange[0]) / 2) + indexRange[0];
  else
    return binary_search(side2, val, false, [
      Math.floor((indexRange[1] - indexRange[0]) / 2) + indexRange[0],
      indexRange[1],
    ]);
}

/**
 * The linear search algorithm.
 * @param {LinkedArray} list The LinkedArray to search in.
 * @param {*} val The value to search.
 * @returns {number} The index number if value is found, else -1.
 */
function linear_search(list: LinkedArray, val: unknown): number {
  if (!LinkedArray.isLinkedArray(list))
    throw new Error("List given must be a LinkedArray Object");
  return list.indexOf(val);
}

exports.merge_sort = merge_sort;
exports.quick_sort = quick_sort;
exports.binary_search = binary_search;
exports.linear_search = linear_search;
