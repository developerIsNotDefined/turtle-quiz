const tryCatchHelper = promise => {
  return promise
    .then(data => [null, data])
    .catch(err => [err]);
};

const errorsFormattingHelper = err => {
  return ({errors: err.map(error => ({message: error}))});
};

const mongoErrorsFormattingHelper = err => {
  if (err.code === 11000)
    return errorsFormattingHelper(['Desired email is already taken... Please take other one!']);

  let returnedArray = [], message = '';

  for (let error in err.errors) {
    message = err.errors[error].message.replace(/Path/g, 'Field');
    returnedArray.push(message);
  }

  return errorsFormattingHelper(returnedArray);
};

module.exports = {
  tryCatchHelper,
  errorsFormattingHelper,
  mongoErrorsFormattingHelper
};

// const tryCatchHelper = (functionToCall, wrapInPromise) => {
//   if (!wrapInPromise){
//     return functionToCall
//     .then(data => [null, data])
//     .catch(err => [err]);
//   }
  
//   return new Promise((resolve, reject) => {
//     const result = functionToCall();
//     resolve(result);
//   })
//     .then(data => [null, data])
//     .catch(err => [err]);
// };