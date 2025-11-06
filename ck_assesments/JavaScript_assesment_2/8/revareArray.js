var arr = [4,3,2,1]

for(var i = 0; i<arr.length/2;i++){
    console.log(i)
    var temp = arr[i]
    arr[i] = arr[arr.length-1-i]
    arr[arr.length-1-i] = temp
}

console.log(arr)