import { LinkedArray } from "./classes";

function quick_sort(unsorted_list: LinkedArray): any {
  var list = new LinkedArray();
  list = Object.assign(list, unsorted_list);
  const len: number = list.length;
  let pivot: any;
  if (len <= 1) {
    return list;
  } else {
    pivot = list.pop();
  }
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

function merge_sort(listinput: LinkedArray): LinkedArray {
  const list = new LinkedArray();
  listinput.toArray().forEach((element) => {
    list.push(element);
  }); //copied the LinkedArray
  if (list.length < 2) return list;
  let mid = list.length;
  mid = (mid - (mid % 2)) / 2;
  let side1 = list.slice(0, mid);
  let side2 = list.slice(mid, list.length);
  side1 = merge_sort(side1);
  side2 = merge_sort(side2);
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < side1.length && j < side2.length) {
    if (side1.get(i) < side2.get(j)) {
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

function binary_search(
  list: LinkedArray,
  val: any,
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
  if (val < side2.get(0))
    return binary_search(side1, val, false, [
      indexRange[0],
      Math.floor((indexRange[1] - indexRange[0]) / 2) + indexRange[0],
    ]);
  else if (val === side2.get(0))
    return Math.floor((indexRange[1] - indexRange[0]) / 2) + indexRange[0];
  else
    return binary_search(side2, val, false, [
      Math.floor((indexRange[1] - indexRange[0]) / 2) + indexRange[0],
      indexRange[1],
    ]);
}

exports.merge_sort = merge_sort;
exports.quick_sort = quick_sort;
exports.binary_search = binary_search;
