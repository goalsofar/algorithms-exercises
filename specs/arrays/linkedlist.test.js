/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class Node {
  #value;
  #next;
  #prev;

  constructor(value, next, prev) {
    this.#value = value;
    this.#next = next;
    this.#prev = prev;
  }

  set value(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  set next(next) {
    this.#next = next;
  }

  get next() {
    return this.#next;
  }

  set prev(prev) {
    this.#prev = prev;
  }

  get prev() {
    return this.#prev;
  }
}

class LinkedList {
  #first = undefined;
  #last = undefined;
  #length = 0;

  get length() {
    return this.#length;
  }

  set length(val) {
    this.#length = val;
  }

  push = (val) => {
    if (!this.#first) {
      const node = new Node(val, null, null);
      this.#first = node;
      this.#last = node;
    } else {
      const node = new Node(val, null, this.#last);
      // console.log(node.prev.value);
      this.#last.next = node;
      this.#last = node;
    }
    this.length++;
  };

  pop = () => {
    if (!this.#last) {
      return undefined;
    } else {
      const item = this.#last;
      this.#last = this.#last.prev;
      this.length--;
      if (this.length === 0) {
        this.#first = null;
      }
      return item.value;
    }
  };

  get = (index) => this.#getNode(index).value;

  #getNode = (index) => {
    let item = this.#first;
    for (let i = 0; i < index; i++) {
      item = item.next;
    }
    return item;
  };

  delete = (index) => {
    const node = this.#getNode(index);
    if (node.prev) {
      node.prev.next = node.next;
      if (node.next) {
        node.next.prev = node.prev;
      }
    } else {
      this.#first = node.next;
    }
    this.length--;
    if (this.length === 0) {
      this.#first = null;
    }
  };
}

// unit tests
// do not modify the below code
describe("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(LinkedList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
