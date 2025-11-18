console.log("Start");

setTimeout(() => {
  console.log("Inside setTimeout");
}, 0);

const promise = new Promise((resolve) => {
  console.log("Inside Promise");
  resolve("Resolved!");
});

promise.then((message) => console.log(message));

console.log("End");
