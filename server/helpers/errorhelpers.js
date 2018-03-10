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

  let errorsArray = [], message = '';

  for (let error in err.errors) {
    message = err.errors[error].message.replace(/Path/g, 'Field');
    errorsArray.push(message);
  }

  return errorsFormattingHelper(errorsArray);
};

module.exports = {
  tryCatchHelper,
  errorsFormattingHelper,
  mongoErrorsFormattingHelper
};