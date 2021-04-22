import { LinkedArray } from "./classes";

function quick_sort(list: LinkedArray): LinkedArray {
  const len: number = list.length;
  let pivot: number;
  if (len <= 1) {
    return list;
  } else {
    pivot = list.pop();
  }
  const biggers = new LinkedArray();
  const smallers = new LinkedArray();
  for (let i = 0; i < list.length; i++) {
    const x = list.get(i);
    if (typeof x !== "number")
      throw new Error("Only numbers can be sorted using LinkedArray.");
    if (x > pivot) biggers.push(x);
    else smallers.push(x);
  }
  const a = quick_sort(smallers);
  const b = quick_sort(biggers);
  a.push(pivot);
  for (let i = 0; i < b.length; i++) a.push(b.get(i));
  return a;
}

exports.quick_sort = quick_sort;
