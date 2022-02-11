/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

const getDigit = (num, pos) => getNumArray(num)[pos];

// @param array -
const getLongestNumberLength = (array) =>
  array.reduce((acc, cur) => {
    const numberLength = cur.length;
    return acc >= numberLength ? acc : numberLength;
  }, 0);

/**
 *
 * Second version of radix sort
 */
function radixSort(array) {
  // Creates an array of ten arrays
  // Note: Just filling with [] adds reference to the SAME ARRAY to each position
  const queues = Array(10)
    .fill(1)
    .map((x) => []);
  // Each number in array is converted into a array of base10 numbers
  // LEARNED AFTER SOLUTION: EASIER JUST TO GET A CHARACTER AT POSITION
  // INSTRUCTOR MENTIONED MOD
  // https://stackoverflow.com/questions/24226324/getting-place-values-of-a-number-w-modulus
  const digitNums = array.map((num) =>
    num
      .toString(10)
      .split("")
      .map((digitString) => parseInt(digitString, 10))
  );
  // Calculate the number of needed iterations
  const iterationCount = getLongestNumberLength(digitNums);
  for (let i = 0; i < iterationCount; i++) {
    // For each iteration, push first all numbers in radix queues
    while (digitNums.length) {
      // Get the first item and shorten the array
      const numArray = digitNums.shift();
      // Get the digit in position or if not exists, get 0
      const digitInPos = numArray[numArray.length - (1 + i)] ?? 0;
      queues[digitInPos].push(numArray);
    }

    // For each iteration, push items back to digitNums array
    for (let i = 0; i < queues.length; i++) {
      let queue = queues[i];
      while (queue.length) {
        digitNums.push(queue.shift());
      }
    }
  }

  // After sorting is done, parse the data back into numbers
  const res = digitNums
    .map((num) => num.join(""))
    .map((numsAsString) => parseInt(numsAsString));
  return res;
}

/**
 * First implementation of radix sort.
 * Created just of of head.
 *
 */
function radixSortFirst(array) {
  const radixQueues = {};
  let radixPosition = 0;
  let continueLoop;
  do {
    continueLoop = false;
    while (array.length > 0) {
      const num = array.shift();
      let numString = num.toString().split("").reverse();
      const numInPos = numString[radixPosition];
      if (numInPos) {
        continueLoop = true;
      }
      const index = numInPos ?? 0;
      if (!radixQueues[index]) {
        radixQueues[index] = [];
      }
      radixQueues[index].push(num);
    }

    // array should be empty now
    for (let i = 0; i < 10; i++) {
      const radixQueue = radixQueues[i];
      if (radixQueue) {
        while (radixQueue.length > 0) {
          array.push(radixQueue.shift());
        }
      }
    }
    radixPosition += 1;
  } while (continueLoop);
  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    // nums.sort();
    // console.log(nums);
    // console.log(ans);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
    // expect(ans).toEqual(nums.sort());
  });
});
