/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  constructor() {
    this.root = null;
  }

  add = (value) => {
    if (!this.root) {
      const node = new Node(value);
      this.root = node;
      return;
    } else {
      this.root.add(value);
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

  get depth() {
    return Math.max(this.leftDepth, this.rightDepth) + 1;
  }

  get leftDepth() {
    return this.left ? this.left.depth : 0;
  }

  get rightDepth() {
    return this.right ? this.right.depth : 0;
  }

  get isBalanced() {
    return Math.abs(this.rightDepth - this.leftDepth) < 2;
  }

  get isRightHeavy() {
    return this.rightDepth > this.leftDepth;
  }

  get isLeftHeavy() {
    return this.leftDepth > this.rightDepth;
  }

  rotateLeft = () => {
    const node = this;
    const rightChild = node.right;
    const leftChild = node.left;

    // 1. B becomes the new root
    const rightChildValue = rightChild?.value;
    rightChild.value = node.value;
    node.value = rightChildValue;

    node.right = rightChild?.right;
    node.left = rightChild;

    // RightChildin leftist'a tulee right
    rightChild.right = rightChild?.left;
    rightChild.left = leftChild;
  };

  rotateRight = () => {
    const node = this;
    const leftChild = node.left;
    const rightChild = node.right;

    // 1. b becomes the new root
    const leftChildValue = leftChild?.value;
    leftChild.value = node.value;
    node.value = leftChildValue;

    node.left = leftChild?.left;
    node.right = leftChild;

    // leftChildin leftist'a tulee left
    leftChild.left = leftChild?.right;
    leftChild.right = rightChild;
  };

  #balanceNode = () => {
    if (!this.isBalanced) {
      if (this.isRightHeavy) {
        if (this.right.isRightHeavy) {
          // Unbalanced right heavy tree with rightheavy child can be corrected with a single left rotation
          this.rotateLeft();
        } else {
          // Unbalanced right heavy tree with leftheavy child can be corrected with a left-right rotation
          // First right rotation on the left heavy child
          // Then left rotation on the right heavy node itself
          this.right.rotateRight();
          this.rotateLeft;
        }
      } else {
        // Else branch: Tree is left heavy
        if (this.left.isLeftHeavy) {
          this.rotateRight();
        } else {
          // right heavy child
          this.left.rotateLeft();
          this.rotateRight;
        }
      }
    }
  };

  add = (value) => {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new Node(value);
      } else {
        // Add to the tree recursively
        this.left.add(value);
        // Once recursive call returns, perform balancing if necessary
        this.#balanceNode();
      }
    } else {
      if (this.right === null) {
        this.right = new Node(value);
      } else {
        this.right.add(value);
        this.#balanceNode();
      }
    }

    /*
      At least my solution requires that balancing is run every time to keep the 
      tree in a shape that will be set right by balancing in the nodes above
      If balancing is not run after insert, what happens is that the test data
      ends up after insert of 1 in the following structure: 3 - left 2 - right 1
      And the balancing of 3 (which would be firt to run balancing) would not achieve correct structure
      from this starting position.
      AND ALL TEXT ABOVE IS PROBABLY WRONG:
      I do not know why byt this only works if #balanceNode is run twice.... sigh.
    */

    this.#balanceNode();
  };

  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    return ans;
  }
}
// unit tests
// do not modify the below code
describe("AVL Tree", function () {
  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
