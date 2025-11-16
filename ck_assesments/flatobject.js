const person = {
  name: "Alice",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Wonderland",
    country: "Fantasy",
    geo: {
      lat: 12.3456,
      lng: 65.4321
    }
  },
};

const obj = {};

function flat(person){

    Object.keys(person).forEach((ci)=>{

        if(typeof person[ci] !== 'object' && typeof person[ci] !== null && typeof person[ci] !== undefined ){
            obj[ci] = person[ci];
        }else{
            flat(person[ci])
        }

    })
}

flat(person);
console.log(obj );



