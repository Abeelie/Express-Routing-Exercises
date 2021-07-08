const { mean, conversion, median, mode } = require('../calculate');

describe("testing mean function", function () {
  it("mean of an array", function () { 
    expect(mean([5,4,5,3])).toEqual(4.25);
  });
});

describe("testing median function", function(){
  it("median of an even set", function(){ 
    expect(median([10,20,30,40])).toEqual(25);
  })
  it("median of an odd set", function () { 
    expect(median([10,20,30,40,50])).toEqual(30);
  })
})


describe("testing mode function", function () {
  it("mode of a dataset", function () { 
    expect(mode([10,10,10,20,20,10,40,10,10,20])).toEqual(["10",6]);
  });
});