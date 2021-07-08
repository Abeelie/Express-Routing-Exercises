function conversion(array){
    let new_array = [];
    for(let item in array){
        let converted = Number(array[item]);
        if (isNaN(converted)) {
         return new Error(`A Non number value was passed in`);
        }else {
        new_array.push(converted);
        }
    }
    return new_array;
}

function mean(array) {
    let sum = 0;
    array.length === 0 ? null : array.forEach(num => {sum += num;}); return sum / array.length;
}

function median(array) {
    array.sort((a, b) => a - b);
    const mid = Math.floor(array.length / 2);
    return array.length % 2 === 0 ? (array[mid] + array[mid - 1]) / 2 : array[mid];
}

function mode(array){
    let list = {};

    array.forEach(function(count) {
    if(list[count] === undefined) {
    list[count] = 0;
  }
    list[count] += 1;
  });

    let sorting = [];
    for (let value in list) {
    sorting.push([value, list[value]]);
  }
    sorting.sort((a, b) => b[1] - a[1]);

    return sorting[0];
}



module.exports = {
  conversion,
  mean,
  median,
  mode
};