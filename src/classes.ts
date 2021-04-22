class node {
  val: any;
  next: node | undefined;
  constructor(val: any, next: node | undefined = undefined) {
    this.val = val;
    this.next = next;
  }
}

class LinkedArray {
  private root: node;

  get length() {
    let iterNode: node;
    iterNode = this.root;
    let counter = 1;
    while (iterNode.next !== undefined) {
      iterNode = iterNode.next;
      counter++;
    }
    return counter;
  }

  constructor(rootVal: any = undefined) {
    this.root = new node(rootVal);
  }

  push(val: any): void {
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

  pop(): any {
    let iterNode: node | undefined;
    iterNode = this.root;
    if (this.root.next === undefined) {
      throw new Error("A linkedlist must have at least one node.");
    }
    while (iterNode.next !== undefined) {
      iterNode = iterNode.next;
    }
    const lastNode = iterNode.val;
    iterNode.next = undefined;
    return lastNode;
  }

  toArray(): any[] {
    let arr: any[];
    arr = [0];
    arr = []; // this made to deal with eslint "prefer-const" error
    let iterNode: node | undefined;
    iterNode = this.root;
    while (iterNode !== undefined) {
      arr.push(iterNode.val);
      iterNode = iterNode.next;
    }
    return arr;
  }

  shift(): any {
    if (this.root.next === undefined)
      throw new Error("A linkedlist must have at least one node.");
    const lastNode = this.root.val;
    this.root = this.root.next;
    return lastNode;
  }

  unshift(val: any): number {
    this.root = new node(val, this.root);
    return this.length;
  }

  get(index: number): any {
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

  set(index: number, val: any): void {
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

  slice(start = 0, end: number): LinkedArray {
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

  static isLinkedArray(obj: any): boolean {
    return obj instanceof LinkedArray;
  }

  fill(val: any, start = 0, end: number = this.length): LinkedArray {
    let iterNode: node | undefined;
    iterNode = this.root;
    for (let i = 0; i < start; i++) {
      if (iterNode.next !== undefined) iterNode = iterNode.next;
      else throw new Error(`This LinkedArray has less than ${end + 1} nodes.`);
    }
    for (let i = start; i < end; i++) {
      iterNode.val = val;
      if (iterNode.next !== undefined) iterNode = iterNode.next;
      else throw new Error(`This LinkedArray has less than ${end + 1} nodes.`);
    }
    return this;
  }

  reverse(): LinkedArray {
    const arr = this.toArray();
    arr.reverse();
    this.root = new node(undefined);
    arr.forEach((x) => {
      this.push(x);
    });
    return this;
  }

  includes(obj: any): boolean {
    let iterNode: node | undefined;
    iterNode = this.root;
    while (iterNode.next !== undefined) {
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

  indexOf(obj: any, fromIndex = 0) {
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

  lastIndexOf(obj: any, fromIndex = 0) {
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
    const matches: any[] = [];
    while (iterNode !== undefined) {
      if (iterNode.val === obj) matches.push(counter);
      counter++;
      iterNode = iterNode.next;
    }
    if (matches.length > 1) return matches[matches.length - 1];
    else return -1;
  }
}

export { LinkedArray };
