import { LinkedArray } from "./classes";
import * as algos from "./algorithms";

function ArrayToLinkedArray(array: any[]): LinkedArray {
  const output = new LinkedArray();
  array.forEach((x) => {
    output.push(x);
  });
  return output;
}

exports.ArrayToLinkedArray = ArrayToLinkedArray;
exports.algorithms = algos;
exports.LinkedArray = LinkedArray;
