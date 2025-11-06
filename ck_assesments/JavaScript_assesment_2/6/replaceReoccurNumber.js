var arr = [1, 2, 2, 4, 2, 8, 2, 7];
// console.log(arr)
var reoccuredNumber = "2";
var replacedByNumber = 10;

arr.forEach(function (element, index) {
  if (element == reoccuredNumber) {
    // console.log(index)
    arr[index] = replacedByNumber;
  }
  // console.log(element);
});

console.log(arr);
