Array.prototype.myFilter = function (callback) {
  let temp = [...this];
  let filteredArray = [];

  temp.forEach((item) => {
    if (callback(item)) filteredArray.push(item);
  });
  return filteredArray;
};

Array.prototype.myReduce = function (callback, initialValue = this[0]) {
  let temp = [...this];
  let accumulator = initialValue;
  temp.forEach((item) => {
    accumulator = callback(accumulator, item);
  });
  return accumulator;
};
