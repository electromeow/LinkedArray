class node {
  val: unknown;
  next: node | undefined;

  constructor(val: unknown = undefined, next: node | undefined = undefined) {
    this.val = val;
    this.next = next;
  }
}
class LinkedArray {
  private root: node;

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

  constructor(rootVal: unknown = undefined) {
    this.root = new node(rootVal);
  }

  push(val: unknown): void {
    let iterNode: node | undefined;
    iterNode = this.root;
    if (iterNode.val == undefined) {
      iterNode.val = val;
      return;
    }
    while (iterNode.next !== undefined) {
      iterNode = iterNode.next;
    }
    iterNode.next = new node(val);
  }

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

  shift(): unknown {
    if (this.root.next === undefined)
      throw new Error("A linkedlist must have at least one node.");
    const lastNode = this.root.val;
    this.root = this.root.next;
    return lastNode;
  }

  unshift(val: unknown): number {
    this.root = new node(val, this.root);
    return this.length;
  }

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

  concat(la: LinkedArray): LinkedArray {
    let iterNode: node | undefined;
    iterNode = la.root;
    const out = new LinkedArray();
    while (iterNode !== undefined) {
      out.push(iterNode.val);
      iterNode = iterNode.next;
    }
    return out;
  }

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

  toString(): string {
    return "LinkedArray { " + this.toArray() + " }";
  }

  static isLinkedArray(obj: unknown): boolean {
    return obj instanceof LinkedArray;
  }

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

  includes(obj: unknown): boolean {
    let iterNode: node | undefined;
    iterNode = this.root;
    while (iterNode !== undefined) {
      if (iterNode.val === obj) return true;
      iterNode = iterNode.next;
    }
    return false;
  }

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

  indexOf(obj: unknown, fromIndex = 0) {
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

  lastIndexOf(obj: unknown, fromIndex = 0) {
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
    const matches: unknown[] = [];
    while (iterNode !== undefined) {
      if (iterNode.val === obj) matches.push(counter);
      counter++;
      iterNode = iterNode.next;
    }
    if (matches.length > 1) return matches[matches.length - 1];
    else return -1;
  }

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

  static from(array: unknown[]): LinkedArray {
    const output = new LinkedArray();
    array.forEach((x) => {
      output.push(x);
    });
    return output;
  }

  map(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => unknown
  ): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    const returnValues = [];
    let i = 0;
    while (iterNode !== undefined) {
      returnValues.push(callbackfn(iterNode.val, i, this));
      iterNode = iterNode.next;
      i++;
    }
    return LinkedArray.from(returnValues);
  }

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

  filter(
    callbackfn: (
      currentValue: unknown,
      index: number,
      array: LinkedArray
    ) => unknown
  ): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    const returnValues = [];
    let i = 0;
    while (iterNode !== undefined) {
      if (callbackfn(iterNode.val, i, this)) returnValues.push(iterNode.val);
      iterNode = iterNode.next;
      i++;
    }
    return LinkedArray.from(returnValues);
  }

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
}

export { LinkedArray };
