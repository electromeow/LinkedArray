class node {
  val: unknown;
  next: node | undefined;

  constructor(val: unknown = undefined, next: node | undefined = undefined) {
    this.val = val;
    this.next = next;
  }
}

class LinkedArray {
  /**
   * @private
   */
  private root: node;

  /**
   * @type {number}
   */
  get length(): number {
    let iterNode: node;
    iterNode = this.root;
    let counter = 1;
    while (iterNode.next !== undefined) {
      iterNode = iterNode.next;
      counter++;
    }
    return counter;
  }

  /**
   * Creates a LinkedArray object.
   * If the rootVal is given, rootVal will be the first element of the new LinkedArray.
   * Else it will create an empty LinkedArray.
   * @param {*} [rootVal] The first element of the array.
   * @constructor
   */
  constructor(rootVal: unknown = undefined) {
    this.root = new node(rootVal);
  }

  /**
   * Pushes the value given to the end of the LinkedArray.
   * @param {*} val The value to push
   * @returns {void} Doesn't return any value.
   */
  push(val: unknown): void {
    let iterNode: node | undefined;
    iterNode = this.root;
    if (iterNode.val === undefined) {
      iterNode.val = val;
      return;
    }
    while (iterNode.next !== undefined) {
      iterNode = iterNode.next;
    }
    iterNode.next = new node(val);
  }

  /**
   * Pops the last element of the LinkedArray.
   * @returns {*} The popped last element of the LinkedArray.
   */
  pop(): unknown {
    let iterNode: node | undefined;
    iterNode = this.root;
    if (this.root.val === undefined) {
      throw new Error("The LinkedArray to pop must have at least one node.");
    }
    if (this.root.next === undefined) {
      const lastNode = this.root.val;
      this.root.val = undefined;
      return lastNode;
    }
    while (iterNode.next?.next !== undefined) {
      iterNode = iterNode.next;
    }
    const lastNode = iterNode.next?.val;
    iterNode.next = undefined;
    return lastNode;
  }

  /**
   * Converts the LinkedArray to a regular array and returns it.
   * @returns {Array} The regular array version of the LinkedArray object.
   */
  toArray(): unknown[] {
    const arr: unknown[] = [];
    let iterNode: node | undefined;
    iterNode = this.root;
    while (iterNode !== undefined) {
      arr.push(iterNode.val);
      iterNode = iterNode.next;
    }
    return arr;
  }

  /**
   * Shifts the LinkedArray to left and removes the first element and returns it.
   * @returns {*} The first element been removed.
   */
  shift(): unknown {
    if (this.root.next === undefined)
      throw new Error("The LinkedArray to shift must have at least two nodes.");
    const lastNode = this.root.val;
    this.root = this.root.next;
    return lastNode;
  }

  /**
   * Shifts the LinkedArray to right and adds the given element to the head of the LinkedArray.
   * @param {*} val The element to add to the head.
   * @returns {number} The new length of the array.
   */
  unshift(val: unknown): number {
    this.root = new node(val, this.root);
    return this.length;
  }

  /**
   * Gets the element at the index given.
   * Equivalent to regularArray[index] notation.
   * @param {number} index The index number to get.
   * @returns {*} The element at the index given.
   */
  get(index: number): unknown {
    let iterNode: node | undefined;
    iterNode = this.root;
    let counter = 0;
    while (iterNode !== undefined) {
      if (counter == index) {
        return iterNode.val;
      }
      iterNode = iterNode.next;
      counter++;
    }
    throw new Error(`This LinkedArray has less than ${index + 1} nodes.`);
  }

  /**
   * Changes the elements at the index given with the value given.
   * Equivalent to regularArray[index] = newElement notation.
   * @param {number} index The index number to change.
   * @param {*} val The new value to be replaced at the given index.
   * @returns {void} Doesn't return any value.
   */
  set(index: number, val: unknown): void {
    let iterNode: node | undefined;
    iterNode = this.root;
    let counter = 0;
    while (iterNode !== undefined) {
      if (counter == index) {
        iterNode.val = val;
        return;
      }
      iterNode = iterNode.next;
      counter++;
    }
    throw new Error(`This LinkedArray has less than ${index + 1} nodes.`);
  }

  /**
   * Concats the LinkedArray with the given LinkedArray without changing the actual objects.
   * Returns the final concatenated LinkedArray.
   * @param {LinkedArray} la The LinkedArray object to concat.
   * @returns {LinkedArray} The concatenated LinkedArray object.
   */
  concat(la: LinkedArray): LinkedArray {
    let iterNode: node | undefined;
    iterNode = la.root;
    const out: LinkedArray = new LinkedArray();
    this.forEach((x) => out.push(x));
    while (iterNode !== undefined) {
      out.push(iterNode.val);
      iterNode = iterNode.next;
    }
    return out;
  }

  /**
   * Slices the LinkedArray from start until end, return the sliced LinkedArray.
   * @param {number} [start=0] The beginning index number to slice from.
   * @param {number} [end=length] The ending index number to slice until.
   * @returns {LinkedArray} The LinkedArray object sliced from beginning until ending.
   */
  slice(start = 0, end: number = this.length): LinkedArray {
    let iterNode: node | undefined;
    iterNode = undefined; // this line is written to deal with eslint "prefer-const" error. don't mind
    iterNode = this.root;
    for (let i = 0; i < start; i++) {
      if (iterNode === undefined) {
        throw new Error(`This LinkedArray has less than ${end + 1} nodes.`);
      }
      iterNode = iterNode.next;
    }
    const newla: LinkedArray = new LinkedArray();
    for (let i = 0; i < end - start; i++) {
      if (iterNode === undefined) {
        throw new Error(`This LinkedArray has less than ${end + 1} nodes.`);
      }
      newla.push(iterNode.val);
      iterNode = iterNode.next;
    }
    return newla;
  }

  /**
   * The toString function to read the full LinkedArray easily when logging.
   * @returns {string} The string that you can read all of the elements when logged into the console.
   */
  toString(): string {
    return "LinkedArray { " + this.join(", ") + " }";
  }

  /**
   * Static function to return if the given value is a LinkedArray object.
   * @param {*} obj The value to check if it is a LinkedArray object.
   * @returns {boolean}
   */
  static isLinkedArray(obj: unknown): boolean {
    if (typeof obj !== "object") return false;
    else return obj instanceof LinkedArray;
  }

  /**
   * Fills the LinkedArray from start to end with the value given.
   * Changes the actual LinkedArray. Returns the result.
   * @param {*} val The value to fill with.
   * @param {number} [start=0] The beginning index number to start filling from.
   * @param {number} [end=length] The ending index number to fill until.
   * @returns {LinkedArray} The result LinkedArray.
   */
  fill(val: unknown, start = 0, end: number = this.length): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    for (let i = 0; i < start; i++) {
      if (iterNode.next !== undefined) iterNode = iterNode.next;
      else throw new Error(`This LinkedArray has less than ${end} nodes.`);
    }
    for (let i = start; i < end; i++) {
      if (iterNode !== undefined) {
        iterNode.val = val;
        iterNode = iterNode.next;
      } else throw new Error(`This LinkedArray has less than ${end} nodes.`);
    }
    return this;
  }

  /**
   * Reverses the LinkedArray object itself.
   * Returns the result LinkedArray.
   * @returns {LinkedArray} The result LinkedArray object been reversed.
   */
  reverse(): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    let lengthCounter: number;
    lengthCounter = 0;
    while (iterNode !== undefined) {
      this.unshift(iterNode.val);
      iterNode = iterNode.next;
      lengthCounter++;
    }
    let counter: number;
    counter = 0;
    iterNode = this.root;
    while (counter + 1 < lengthCounter) {
      counter++;
      if (iterNode.next === undefined)
        throw new Error(
          'Unknown Error! This error was just added to bypass TypeScript Compiler\'s "Object is possibly undefined." error.'
        );
      iterNode = iterNode.next;
    }
    iterNode.next = undefined;
    return this;
  }

  /**
   * Returns if the LinkedArray itself includes the given element.
   * @param {*} obj The value to check.
   * @returns {boolean}
   */
  includes(obj: unknown): boolean {
    let iterNode: node | undefined;
    iterNode = this.root;
    while (iterNode !== undefined) {
      if (iterNode.val === obj) return true;
      iterNode = iterNode.next;
    }
    return false;
  }

  /**
   * Joins the LinkedArray with the seperator given.
   * Returns the result as a string.
   * @param {string} [seperator=','] The seperator to join with.
   * @returns {string} The string joined with the given seperator.
   */
  join(seperator = ","): string {
    let iterNode: node | undefined;
    iterNode = this.root;
    let joinedString = "";
    joinedString += this.root.val;
    iterNode = iterNode.next;
    while (iterNode !== undefined) {
      joinedString += seperator;
      joinedString += iterNode.val;
      iterNode = iterNode.next;
    }
    return joinedString;
  }

  /**
   * Searches the given value and returns the index number.
   * When the value couldn't find, returns -1.
   * @param {*} obj The value to search.
   * @param {number} [fromIndex=0] The index to start searching from.
   * @returns {number} Index number if the value is found, else -1.
   */
  indexOf(obj: unknown, fromIndex = 0): number {
    let iterNode: node | undefined;
    iterNode = this.root;
    let counter = 0;
    for (let i = 0; i < fromIndex; i++) {
      if (iterNode.next !== undefined) iterNode = iterNode.next;
      else
        throw new Error(
          `This LinkedArray has less than ${fromIndex + 1} nodes.`
        );
      counter++;
    }
    while (iterNode !== undefined) {
      if (iterNode.val === obj) return counter;
      counter++;
      iterNode = iterNode.next;
    }
    return -1;
  }

  /**
   * Searches the given value and returns the last index number the value is found in.
   * When the value couldn't find, returns -1.
   * @param {*} obj The value to search.
   * @param {number} [fromIndex=0] The index to start searching from.
   * @returns {number}
   */
  lastIndexOf(obj: unknown, fromIndex = 0): number {
    let iterNode: node | undefined;
    iterNode = this.root;
    let counter: number;
    counter = 0;
    for (let i = 0; i < fromIndex; i++) {
      if (iterNode.next !== undefined) iterNode = iterNode.next;
      else
        throw new Error(
          `This LinkedArray has less than ${fromIndex + 1} nodes.`
        );
      counter++;
    }
    const matches: number[] = [];
    while (iterNode !== undefined) {
      if (iterNode.val === obj) matches.push(counter);
      counter++;
      iterNode = iterNode.next;
    }
    if (matches.length > 1) return matches[matches.length - 1];
    else return -1;
  }

  /**
   * Equivalent to regularArray.splice function.
   * @param {number} start The index number to start from.
   * @param {number} [deleteCount=tillEndOfTheArray] The amount of elements to change/delete.
   * @param {unknown} newItems The new elements to change with.
   */
  splice(start: number, deleteCount: number): LinkedArray {
    const array = this.toArray();
    const splicedElements: unknown[] = array.splice(
      start,
      deleteCount,
      ...Array.from(arguments).slice(2)
    );
    this.root = LinkedArray.from(array).root;
    return LinkedArray.from(splicedElements);
  }

  /**
   * Creates a new LinkedArray from a regular array.
   * @param {Array} array The array to be converted into a LinkedArray.
   * @returns {LinkedArray} The LinkedArray created.
   */
  static from(array: unknown[]): LinkedArray {
    const output = new LinkedArray();
    array.forEach((x) => {
      output.push(x);
    });
    return output;
  }

  /**
   * @callback callbackfn
   * @param {*} currentValue The current value in iteration.
   * @param {number} index The index number of the current value in iteration.
   * @param {LinkedArray} array The whole LinkedArray.
   * @returns {*}
   */

  /**
   * @callback voidcallbackfn
   * @param {*} currentValue The current value in iteration.
   * @param {number} index The index number of the current value in iteration.
   * @param {LinkedArray} array The whole LinkedArray.
   * @returns {void}
   */

  /**
   * @callback boolcallbackfn
   * @param {*} currentValue The current value in iteration.
   * @param {number} index The index number of the current value in iteration.
   * @param {LinkedArray} array The whole LinkedArray.
   * @returns {boolean}
   */

  /**
   * Calls a function for each element.
   * Returns the return values in a LinkedArray.
   * Equivalent to regularArray.map function.
   * @param {callbackfn} callbackfn Function to call on each iteration.
   * @returns {LinkedArray} The LinkedArray including the return values.
   */
  map(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => unknown
  ): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    const returnValues = new LinkedArray();
    let i = 0;
    while (iterNode !== undefined) {
      returnValues.push(callbackfn(iterNode.val, i, this));
      iterNode = iterNode.next;
      i++;
    }
    return returnValues;
  }

  /**
   * Executes the given callback function for each element.
   * Equivalent to regularArray.forEach function.
   * @param {voidcallbackfn} callbackfn The callback function to execute.
   * @returns {void}
   */
  forEach(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => void
  ): void {
    let iterNode: node | undefined;
    iterNode = this.root;
    let i = 0;
    while (iterNode !== undefined) {
      callbackfn(iterNode.val, i, this);
      i++;
      iterNode = iterNode.next;
    }
  }

  /**
   * Executes the given callback function which returns a bool for each element.
   * Returns if every element in the LinkedArray returns true.
   * Equivalent to regularArray.every function.
   * @param {boolcallbackfn} callbackfn The callback function to execute.
   * @returns {boolean}
   */
  every(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => boolean
  ): boolean {
    let iterNode: node | undefined;
    iterNode = this.root;
    let i = 0;
    let res;
    while (iterNode !== undefined) {
      res = callbackfn(iterNode.val, i, this);
      if (!res) return false;
      i++;
      iterNode = iterNode.next;
    }
    return true;
  }

  /**
   * Executes the given callback function which returns a bool for each element.
   * Returns if at least one element in the LinkedArray returns true.
   * Equivalent to regularArray.some function.
   * @param {boolcallbackfn} callbackfn The callback function to execute.
   * @returns {boolean}
   */
  some(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => boolean
  ): boolean {
    let iterNode: node | undefined;
    iterNode = this.root;
    let i = 0;
    let res;
    while (iterNode !== undefined) {
      res = callbackfn(iterNode.val, i, this);
      if (res) return true;
      i++;
      iterNode = iterNode.next;
    }
    return false;
  }

  /**
   * Executes the given callback function for each element.
   * Returns a LinkedArray of the values returning true.
   * Equivalent to regularArray.forEach function.
   * @param {boolcallbackfn} callbackfn The callback function to execute.
   * @returns {LinkedArray}
   */
  filter(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => boolean
  ): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    const returnValues: LinkedArray = new LinkedArray();
    let i = 0;
    while (iterNode !== undefined) {
      if (callbackfn(iterNode.val, i, this)) returnValues.push(iterNode.val);
      iterNode = iterNode.next;
      i++;
    }
    return returnValues;
  }

  /**
   * @callback reducercallbackfn
   * @param {*} accumulator The previous return value.
   * @param {*} currentValue The current value in iteration.
   * @param {number} index The index number of the current value in iteration.
   * @param {LinkedArray} array The whole LinkedArray.
   * @returns {boolean}
   */

  /**
   * Executes a reducer callback function for each element of the array, returning in a single output value.
   * Equivalent to regularArray.reduce
   * @param {reducercallbackfn} callbackfn The reducer callback function to call.
   * @param {*} [initialValue=firstElement] First accumulator value, when doesn't provided, first element of the LinkedArray will be used.
   * @returns {*}
   */
  reduce(
    callbackfn: (
      accumulator: unknown,
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => unknown,
    initialValue: unknown = this.root.val
  ): unknown {
    let iterNode: node | undefined;
    iterNode = this.root;
    let i = 0;
    let acc;
    acc = callbackfn(initialValue, iterNode.val, i, this);
    iterNode = iterNode.next;
    i++;
    while (iterNode !== undefined) {
      acc = callbackfn(acc, iterNode.val, i, this);
      iterNode = iterNode.next;
      i++;
    }
    return acc;
  }

  /**
   * Gets the element at the index given.
   * It accepts negative values, then it counts the index from tail.
   * e.g. if -1 is the index, returns the last element of the LinkedArray.
   * @param {number} index The index number to get.
   * @returns {*} The element at the index.
   */
  at(index: number): unknown {
    if (index < 0) {
      index = -index;
      index = this.length - index;
    }
    return this.get(index);
  }
}

export { LinkedArray };
