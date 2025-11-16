let arr = [1, 2, [2, 4, 5, [, 1, 4, 5]], 3];
let res = [];
function flat(arr){

    arr.forEach(element => {

        if(!Array.isArray(element)){
            res.push(element);
        }else{
            flat(element)
        }
        
    });

}

flat(arr)
console.log(res);
