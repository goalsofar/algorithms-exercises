const breadthFirstTraverseIterative = (queue, array) => {
  while (queue.length > 0) {
    const current = queue.shift();
    array.push(current.value);
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
  }
  return array;
};

/**
 * Check the solution for less complicated iterative approach
 */
const breadthFirstTraverseRecursive = (queue, array) => {
  console.log(queue);
  if (queue.length === 0) {
    return [];
  }
  return [
    ...queue.map((i) => i.value),
    ...breadthFirstTraverseRecursive(
      queue
        .map((i) => [i.left, i.right])
        .flat()
        .filter((i) => Boolean(i))
    ),
  ];
};

// unit tests
// do not modify the below code
describe("breadth-first tree traversal", function () {
  const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  const tree = {
    value: "A",
    left: {
      value: "B",
      left: {
        value: "D",
        left: {
          value: "G",
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: "E",
        left: null,
        right: {
          value: "H",
          left: {
            value: "K",
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: "C",
      left: {
        value: "F",
        left: {
          value: "I",
          left: null,
          right: null,
        },
        right: {
          value: "J",
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  test("breadthFirstTraverse Iterative", () => {
    expect(breadthFirstTraverseIterative([tree], [])).toEqual(answer);
  });

  test("breadthFirstTraverse Recursive", () => {
    expect(breadthFirstTraverseRecursive([tree], [])).toEqual(answer);
  });
});
