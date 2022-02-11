// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
  // code goes here
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    // console.log(item);
    if (item.id === id) {
      return item;
    }
  }
  console.log("Did not find.");
  return null;
}

function binarySearch(id, array) {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    let middle = Math.floor((end + start) / 2);
    // console.log(`Start: ${start}, end: ${end}, middle: ${middle}`);
    const item = array[middle];
    if (item.id === id) {
      return item;
    } else if (id < item.id) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }
  return null;
}

function binarySearchResursive(id, array) {
  let middle = Math.floor(array.length / 2);
  const item = array[middle];
  if (item.id === id) {
    return id;
  }
  if (array.length === 0) {
    return null;
  }
  const start = id < item.id ? 0 : middle + 1;
  const end = id < item.id ? middle - 1 : array.length - 1;
  return item.id === id ? item : binarySearch(id, array.slice(start, end));
}

// unit tests
// do not modify the below code
test("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" },
    ])
  ).toBe(lookingFor);
});

test("binary search", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearchResursive(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" },
    ])
  ).toBe(lookingFor);
});
