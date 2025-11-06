// 1. Convert to Arrow Function
// Rewrite the following function using an arrow function:
// function add(a, b) {
//     return a + b;
// }

const add = (a, b) => a + b;
add(10, 20);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2. Default Parameters
// Create a function greet that takes two parameters, name and message.
// If the message is not provided, it should default to "Welcome!".
// Use default parameters in your implementation.

const greet = (name, message = "  welcome!") => {
  console.log("hii  " + name + message);
};
greet("saddam");

// 3. Template Literals
// Write a function formatString that takes a name and an age and returns a sentence in the format:
// "Hello, my name is [name] and I am [age] years old."

const formatString = (name, age) => {
  return `Hello, my name is ${name} and I am ${age} years old.`;
};

console.log(formatString("saddam", 25));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 4. Object Destructuring
// Given the following object:
const person = {
  name: "Alice",
  age: 25,
  address: {
    city: "New York",
    country: "NY",
  },
};
// Write a function that extracts the name and city properties and logs the sentence:
// "Alice lives in New York." It should also access and log the address object.

const {
  name,
  age,
  address: { city, country, state },
} = person;
console.log(
  `${name} lives in ${country} ${state} //////////////////////////////////////`
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 5. Rest Operator
// Write a function sumAll that takes any number of arguments and returns their sum.
// Use the rest operator to handle the arguments.

const arr = [1, 2, 3, 4, 5];
const [...rest] = arr;
const sumAll = (rest) => {
  const ans = rest.reduce((acc, ci) => {
    return acc + ci;
  }, 0);

  console.log(ans);
};

sumAll(rest);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 6. Filter Even Numbers
// Write a function filterEvens that takes an array of numbers and returns a new array
// containing only the even numbers. Use the filter method.
// Example:
// filterEvens([1, 2, 3, 4, 5, 6]); // Output: [2, 4, 6]

const arr1 = [1, 2, 3, 4, 5, 6];

function filterEvens(arr1) {
  const res = arr1.filter(function (element) {
    if (element % 2 == 0) {
      return 1;
    }
  });

  return res;
}

console.log(filterEvens(arr1), "even1111");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 7. Array Mapping
// Write a function doubleValues that takes an array of numbers
// and returns a new array where each number is doubled. Use the map method.
// Example:
// doubleValues([1, 2, 3]); // Output: [2, 4, 6]

const arr2 = [1, 2, 3, 5];

function doubleValues(arr2) {
  const res = arr2.map((element) => element * 2);
  return res;
}

console.log(doubleValues(arr2));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 8. Find the Maximum
// Write a function findMax that takes an array of numbers
// and returns the largest number in the array. Use the spread operator.
// Example:
// findMax([3, 5, 7, 2, 8]); // Output: 8
const arr4 = [3, 5, 7, 2, 8];
const findMax = (arr4) => {
  return Math.max(...arr4);
};
console.log(findMax(arr4));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 9. Object and Array Destructuring
// Given the following data:
const data = [
  {
    name: "Bob",
    age: 24,
  },
  {
    name: "Alice",
    age: 21,
  },
];

// Write a function that extracts the age as  “24”
//   and name as “Alice” and returns a sentence: "Alice’s age is 24."

function extracts(data) {
  // const{name1,age1} = data[0];
  const [{ name }, { age }] = data;
  // const age = data[0].age;
  // const name = data[1].name;

  return `${name}'s age is ${age}`;
}

console.log(extracts(data));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 10. Data Manipulation using Array functions
// Write a function that manipulates data in such a way that
// it returns an array of objects again but with the selected keys only.
// Input:
const input = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];
// Output:
// [{
// "id": 1,
// "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
// "rate": 3.9,
// "count": 120
// }]

function manipulateData(data) {
  return data.map((element) => {
    const {
      id,
      title,
      rating: { rate, count },
    } = element;
    return { id, title, rate, count };
  });
}

console.log(manipulateData(input));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 11. Default Parameter
const fun = (name = "abc") => {
  if (name) {
    console.log("if", name);
  } else {
    console.log("else", name);
  }
};

fun("");
// Output  = else
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 12. Deep Clone Objects
// Write a function deepClone that creates a deep copy of a given object.
//  Ensure that nested objects and arrays are properly cloned without retaining references to the original object.
// Example:
const obj = { a: 1, b: { c: 2 } };
// const clonedObj = deepClone(obj);
// clonedObj.b.c = 42;
// console.log(obj.b.c); // Output: 2

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  var copyobject = Array.isArray(obj) ? [] : {};
  var keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    copyobject[keys[i]] = deepClone(obj[keys[i]]);
  }

  return copyobject;
}

var obj2 = deepClone(obj);
console.log(obj);

obj2.a = "whbefhjw";
obj2.b.c = "vfhewvf";

console.log(obj2);
console.log(obj);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 13. Flatten Nested Arrays
// Write a function flattenArray that takes a nested array and returns a flattened array.
// Use recursion and/or ES6 methods to solve this problem.
// Example:
// flattenArray([1, [2, [3, [4, 5]]]]); // Output: [1, 2, 3, 4, 5]

const arr3 = [1, [2, [3, [4, 5]]]];
const resArray = [];
function flattenArray(arr3) {
  arr3.forEach((element) => {
    if (Array.isArray(element)) {
      flattenArray(element);
    } else {
      resArray.push(element);
    }
  });
}
flattenArray(arr3);

console.log("flat arr", flattenArray(arr3));

console.log(resArray);

// const obj1 = {};
// obj[10] = "number";
// obj["10"] = "string";

// console.log(obj1, "last");
