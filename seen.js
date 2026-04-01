// AP2
Array.prototype.MyMap = function (callback) {
   let result = [];
   for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i]));
   }
   return result;
};
[1, 2].MyMap(x => x * 2)
console.log([1, 2].MyMap(x => x * 2));

// implimeting the filter function
//AP1
const Myfilter = (arr, callback) => {
   const result = [];
   for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i])) {
         result.push(arr[i]);
      }
   }
   return result;
}

console.log(Myfilter([-1, -2, 4], x => x > 0));

// [4]

Array.prototype.Myfilter = function (filter) {
   let result = [];
   for (let i = 0; i < this.length; i++) {
      if (filter(this[i])) result.push(this[i]);
   }
   return result;
};

[-1, -2, 4].Myfilter(x => x > 0);
console.log([-1, -2, 4].Myfilter(x => x > 0));

// so to code the map function, we have two appraches
// we can either create a separate function which is the safer apprache generally
//or we can bind the function into the Array.prototype if we were dealing with a new function we want to impliment

// so AP1
const map = (arr, callback) => {
   let result = [];
   for (let i = 0; i < arr.length; i++) {
      result.push(callback(arr[i]));
   }
   return result
}
let array = [1, 2];
console.log(map(array, x => x * 2));
console.log(array);


//implimeting the ForEach function



const MyForEach = (arr, callback) => {
   // result
   for (let i = 0; i < arr.length; i++) {
      arr[i] = callback(arr[i]);
   }
};
const fArray = [1, 2, 3, 4, 5];

console.log(fArray);


