declare class LinkedArray {
    /**
     * @private
     */
    private root;
    /**
     * @type {number}
     */
    get length(): number;
    /**
     * Creates a LinkedArray object.
     * If the rootVal is given, rootVal will be the first element of the new LinkedArray.
     * Else it will create an empty LinkedArray.
     * @param {*} [rootVal] The first element of the array.
     * @constructor
     */
    constructor(rootVal?: unknown);
    /**
     * Pushes the value given to the end of the LinkedArray.
     * @param {*} val The value to push
     * @returns {void} Doesn't return any value.
     */
    push(val: unknown): void;
    /**
     * Pops the last element of the LinkedArray.
     * @returns {*} The popped last element of the LinkedArray.
     */
    pop(): unknown;
    /**
     * Converts the LinkedArray to a regular array and returns it.
     * @returns {Array} The regular array version of the LinkedArray object.
     */
    toArray(): unknown[];
    /**
     * Shifts the LinkedArray to left and removes the first element and returns it.
     * @returns {*} The first element been removed.
     */
    shift(): unknown;
    /**
     * Shifts the LinkedArray to right and adds the given element to the head of the LinkedArray.
     * @param {*} val The element to add to the head.
     * @returns {number} The new length of the array.
     */
    unshift(val: unknown): number;
    /**
     * Gets the element at the index given.
     * Equivalent to regularArray[index] notation.
     * @param {number} index The index number to get.
     * @returns {*} The element at the index given.
     */
    get(index: number): unknown;
    /**
     * Changes the elements at the index given with the value given.
     * Equivalent to regularArray[index] = newElement notation.
     * @param {number} index The index number to change.
     * @param {*} val The new value to be replaced at the given index.
     * @returns {void} Doesn't return any value.
     */
    set(index: number, val: unknown): void;
    /**
     * Concats the LinkedArray with the given LinkedArray without changing the actual objects.
     * Returns the final concatenated LinkedArray.
     * @param {LinkedArray} la The LinkedArray object to concat.
     * @returns {LinkedArray} The concatenated LinkedArray object.
     */
    concat(la: LinkedArray): LinkedArray;
    /**
     * Slices the LinkedArray from start until end, return the sliced LinkedArray.
     * @param {number} [start=0] The beginning index number to slice from.
     * @param {number} [end=length] The ending index number to slice until.
     * @returns {LinkedArray} The LinkedArray object sliced from beginning until ending.
     */
    slice(start?: number, end?: number): LinkedArray;
    /**
     * The toString function to read the full LinkedArray easily when logging.
     * @returns {string} The string that you can read all of the elements when logged into the console.
     */
    toString(): string;
    /**
     * Static function to return if the given value is a LinkedArray object.
     * @param {*} obj The value to check if it is a LinkedArray object.
     * @returns {boolean}
     */
    static isLinkedArray(obj: unknown): boolean;
    /**
     * Fills the LinkedArray from start to end with the value given.
     * Changes the actual LinkedArray. Returns the result.
     * @param {*} val The value to fill with.
     * @param {number} [start=0] The beginning index number to start filling from.
     * @param {number} [end=length] The ending index number to fill until.
     * @returns {LinkedArray} The result LinkedArray.
     */
    fill(val: unknown, start?: number, end?: number): LinkedArray;
    /**
     * Reverses the LinkedArray object itself.
     * Returns the result LinkedArray.
     * @returns {LinkedArray} The result LinkedArray object been reversed.
     */
    reverse(): LinkedArray;
    /**
     * Returns if the LinkedArray itself includes the given element.
     * @param {*} obj The value to check.
     * @returns {boolean}
     */
    includes(obj: unknown): boolean;
    /**
     * Joins the LinkedArray with the seperator given.
     * Returns the result as a string.
     * @param {string} [seperator=','] The seperator to join with.
     * @returns {string} The string joined with the given seperator.
     */
    join(seperator?: string): string;
    /**
     * Searches the given value and returns the index number.
     * When the value couldn't find, returns -1.
     * @param {*} obj The value to search.
     * @param {number} [fromIndex=0] The index to start searching from.
     * @returns {number} Index number if the value is found, else -1.
     */
    indexOf(obj: unknown, fromIndex?: number): number;
    /**
     * Searches the given value and returns the last index number the value is found in.
     * When the value couldn't find, returns -1.
     * @param {*} obj The value to search.
     * @param {number} [fromIndex=0] The index to start searching from.
     * @returns {number}
     */
    lastIndexOf(obj: unknown, fromIndex?: number): number;
    /**
     * Equivalent to regularArray.splice function.
     * @param {number} start The index number to start from.
     * @param {number} [deleteCount=tillEndOfTheArray] The amount of elements to change/delete.
     * @param {unknown} newItems The new elements to change with.
     */
    splice(start: number, deleteCount: number): LinkedArray;
    /**
     * Creates a new LinkedArray from a regular array.
     * @param {Array} array The array to be converted into a LinkedArray.
     * @returns {LinkedArray} The LinkedArray created.
     */
    static from(array: unknown[]): LinkedArray;
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
    map(callbackfn: (currentValue: unknown, index: number, array: LinkedArray) => unknown): LinkedArray;
    /**
     * Executes the given callback function for each element.
     * Equivalent to regularArray.forEach function.
     * @param {voidcallbackfn} callbackfn The callback function to execute.
     * @returns {void}
     */
    forEach(callbackfn: (currentValue: unknown, index: number, array: LinkedArray) => void): void;
    /**
     * Executes the given callback function which returns a bool for each element.
     * Returns if every element in the LinkedArray returns true.
     * Equivalent to regularArray.every function.
     * @param {boolcallbackfn} callbackfn The callback function to execute.
     * @returns {boolean}
     */
    every(callbackfn: (currentValue: unknown, index: number, array: LinkedArray) => boolean): boolean;
    /**
     * Executes the given callback function which returns a bool for each element.
     * Returns if at least one element in the LinkedArray returns true.
     * Equivalent to regularArray.some function.
     * @param {boolcallbackfn} callbackfn The callback function to execute.
     * @returns {boolean}
     */
    some(callbackfn: (currentValue: unknown, index: number, array: LinkedArray) => boolean): boolean;
    /**
     * Executes the given callback function for each element.
     * Returns a LinkedArray of the values returning true.
     * Equivalent to regularArray.forEach function.
     * @param {boolcallbackfn} callbackfn The callback function to execute.
     * @returns {LinkedArray}
     */
    filter(callbackfn: (currentValue: unknown, index: number, array: LinkedArray) => boolean): LinkedArray;
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
    reduce(callbackfn: (accumulator: unknown, currentValue: unknown, index: number, array: LinkedArray) => unknown, initialValue?: unknown): unknown;
    /**
     * Gets the element at the index given.
     * It accepts negative values, then it counts the index from tail.
     * e.g. if -1 is the index, returns the last element of the LinkedArray.
     * @param {number} index The index number to get.
     * @returns {*} The element at the index.
     */
    at(index: number): unknown;
}
export default LinkedArray;
