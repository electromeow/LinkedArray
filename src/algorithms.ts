import { LinkedArray } from "./classes";

function quick_sort(list: LinkedArray): LinkedArray {
  const len: number = list.length;
  let pivot;
  if (len <= 1) {
    return list;
  } else {
    pivot = list.pop();
  }
  const biggers = new LinkedArray();
  const smallers = new LinkedArray();
  for (let i = 0; i < list.length; i++) {
    const x = list.get(i);
    if (typeof x !== "number") throw new Error("Only numbers can be sorted.");
    if (x > pivot) biggers.push(x);
    else smallers.push(x);
  }
  const a = quick_sort(smallers);
  const b = quick_sort(biggers);
  a.push(pivot);
  for (let i = 0; i < b.length; i++) a.push(b.get(i));
  return a;
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
/*
function binary_search(list: LinkedArray, val: number, sort = false): number {
  let value: number;
  if (sort) {
    list = quick_sort(list);
  }

  const len = list.length;
  const mid = (len - (len % 2)) / 2;
  const side1 = list.slice(0, mid);
  const side2 = list.slice(mid, len);
  if (side1.get(mid - 1) > val) {
    return binary_search(side1, val);
  } else if (side1.get(mid - 1) < val) {
    return binary_search(side2, val);
  } else return list.get(mid - 1);
}
*/
exports.merge_sort = merge_sort;
exports.quick_sort = quick_sort;
//exports.binary_search = binary_search;
