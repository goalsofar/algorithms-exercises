import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";

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

    console.log(this.value);
    console.log(this.right?.value);

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
        console.log("hello");
        // Once recursive call returns, perform balancing if necessary
        // if (this.value === 3) {
        //   console.log(
        //     `Three: isbalanced ${this.isBalanced}, left: ${this.left?.value}, right: ${this.right?.value}`
        //   );
        //   console.log(
        //     `Three: left.left ${this.left?.left.value}, left.right: ${this.left?.right?.value}`
        //   );
        // }

        this.#balanceNode();
        // if (this.value === 3) {
        //   console.log(`Three after balancing: left: ${this.left.value}`);
        // }
      }
    } else {
      if (this.right === null) {
        this.right = new Node(value);
      } else {
        this.right.add(value);
        this.#balanceNode();
      }
    }
    this.#balanceNode();
  };

  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    return ans;
  }
}

export default function TreeComponent() {
  // const nums = _.shuffle(_.range(50));
  const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
