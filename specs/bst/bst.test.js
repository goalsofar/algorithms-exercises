/*

Binary Search Tree!

Name your class Tree. 

I'd suggest making another class called Node. You don't have to; you can make them all plain JS objects

Here you'll make a BST. Your Tree class will have keep track of a root which will be the first item added
to your tree. From there, if the item is less than the value of that node, it will go into its left subtree
and if greater it will go to the right subtree.

value - integer     - value being contained in the node
left  - Node/object - the left node which itself may be another tree
right - Node/object - the right node which itself may be another tree

*/

class Tree {
  constructor() {
    this.root = null;
  }

  add = (value) => {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let currNode = this.root;
    while (true) {
      // console.log(`${value}, currNode ${currNode.value}`);
      // let child = node.value < currNode.value ? currNode.left : currNode.right;
      if (node.value < currNode.value) {
        if (currNode.left === null) {
          currNode.left = node;
          break;
        } else {
          currNode = currNode.left;
        }
      } else {
        if (currNode.right === null) {
          currNode.right = node;
          break;
        } else {
          currNode = currNode.right;
        }
      }
    }
  };

  toObject() {
    return this.root.serialize();
  }
}

// you might consider using a Node class too
class Node {
  constructor(val) {
    this.value = val;
    this.right = null;
    this.left = null;
  }

  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    return ans;
  }
}

// unit tests
// do not modify the below code
describe("Binary Search Tree", function () {
  it("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();
    // render(objs, nums);

    expect(objs.value).toEqual(3);

    expect(objs.left.value).toEqual(1);
    expect(objs.left.left).toBeNull();

    expect(objs.left.right.value).toEqual(2);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(4);
    expect(objs.right.left.left).toBeNull();

    expect(objs.right.left.right.value).toEqual(6);
    expect(objs.right.left.right.left.value).toEqual(5);
    expect(objs.right.left.right.left.right).toBeNull();
    expect(objs.right.left.right.left.left).toBeNull();

    expect(objs.right.right.value).toEqual(10);
    expect(objs.right.right.right).toBeNull();

    expect(objs.right.right.left.value).toEqual(9);
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.left.left.value).toEqual(8);
    expect(objs.right.right.left.left.right).toBeNull();
    expect(objs.right.right.left.left.left).toBeNull();
  });
});
