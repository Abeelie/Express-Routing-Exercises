const express = require('express');
const ExpressError = require('./expressError');
const fs = require('fs');
const { mean, conversion, median, mode } = require('./calculate');

const app = express();

app.get('/mean', (req, res, next) => {
  if (!req.query.nums) {throw new ExpressError('You must query in correct format ex:?nums=1,2,3', 400);}
  
  const stringNums = req.query.nums;
  const arrayNums = stringNums.split(",");
  const convertedNums = conversion(arrayNums);
  
  if (convertedNums instanceof Error) {throw new ExpressError(convertedNums.message);}
  
  const save = req.query.save;
  const t = new Date();
  const d = (t.getMonth()+1)+'-'+t.getDate() + '-' + t.getFullYear();
  
  const response = {operation: "mean", result: mean(convertedNums), timestamp: d};
  console.log(response);
  
  let data = JSON.stringify(response, null, 2);

  if(save == "true"){
    fs.appendFile('data.json', data, (err) => {
       if (err) throw err;
      console.log('Data written to file');
   });
 } 
  return res.send(response);
});

app.get('/median', (req, res, next) => {
  if (!req.query.nums) {throw new ExpressError('You must query in correct format ex:?nums=1,2,3', 400);} 
  
  const stringNums = req.query.nums;
  const arrayNums = stringNums.split(",");
  const convertedNums = conversion(arrayNums);
  
  if (convertedNums instanceof Error) {throw new ExpressError(convertedNums.message);}
  
  const save = req.query.save;
  const t = new Date();
  const d = (t.getMonth()+1)+'-'+t.getDate() + '-' + t.getFullYear();
  
  const response = {operation: "median", result: median(convertedNums), timestamp: d};
  
  let data = JSON.stringify(response, null, 2);

  if(save == "true"){
    fs.appendFile('data.json', data, (err) => {
       if (err) throw err;
      console.log('Data written to file');
   });
 } 

  console.log(response);
  return res.send(response);
});

app.get('/mode', (req, res, next) => {
  if (!req.query.nums) {throw new ExpressError('You must query in correct format ex:?nums=1,2,3', 400);}
  
  const stringNums = req.query.nums;
  const arrayNums = stringNums.split(",");
  const convertedNums = conversion(arrayNums);
  
  if (convertedNums instanceof Error) {throw new ExpressError(convertedNums.message);}
  
  const save = req.query.save;
  const t = new Date();
  const d = (t.getMonth()+1)+'-'+t.getDate() + '-' + t.getFullYear();
  const response = {operation: "mode", result: mode(convertedNums), timestamp: d};
 
  let data = JSON.stringify(response, null, 2);

  if(save == "true"){
    fs.appendFile('data.json', data, (err) => {
       if (err) throw err;
      console.log('Data written to file');
   });
 } 

  return res.send(response);
});

app.get('/all', (req, res, next) => {
  if (!req.query.nums) {throw new ExpressError('You must query in correct format ex:?nums=1,2,3', 400);}
  
  const stringNums = req.query.nums;
  const arrayNums = stringNums.split(",");
  const convertedNums = conversion(arrayNums);
  
  if (convertedNums instanceof Error) {throw new ExpressError(convertedNums.message);}
  
  const save = req.query.save;
  const t = new Date();
  const d = (t.getMonth()+1)+'-'+t.getDate() + '-' + t.getFullYear();
  const response = {operation: "all", mean: mean(convertedNums), 
                                      median: median(convertedNums),
                                      mode: mode(convertedNums),
                                      timestamp: d}; 
  console.log(response);

  let data = JSON.stringify(response, null, 2);

  if(save == "true"){
    fs.appendFile('data.json', data, (err) => {
       if (err) throw err;
      console.log('Data written to file');
   });
 } 

  return res.send(response);
});


app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  return next(err);
});


app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(3000, () => {
	console.log("Serving on port 3000")
});