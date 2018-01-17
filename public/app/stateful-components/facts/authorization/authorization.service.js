const service = class{
  constructor($http, toastr){
    this.$http = $http;
    this.toastr = toastr;
  }

  signUp(authData){
    this.toastr.info('Data submited, it is being checked!');
    return new Promise((resolve, reject) => {
      this.$http({
        url: 'http://localhost:3003/sign-up',
        data: authData,
        skipAuthorization: true,
        method: 'POST'
      })
        .then(response => {
          localStorage.setItem('jwt_auth', response.headers('Authorization'));
          localStorage.setItem('user', JSON.stringify(response.data));
          resolve(response.data.name);
        })
        .catch(error => {
          if (typeof error.data.errors !== 'undefined'){
            const errors = error.data.errors;
            let errorMessage = '';
            for (let prop in errors) {
              errorMessage += errors[prop].message + ' ';
            }
            errorMessage = errorMessage.replace(/Path/g, 'Field');
            reject(errorMessage + 'Please try again!');
          } else if ((typeof error.data.code !== 'undefined') && (error.data.code === 11000)) {
            reject('What a disaster! desired email is already taken... Please take other one!');
          } else {
            reject('Oops, something went wrong, please try again later!');
          }
        });
    });
  }

  signIn(authData){
    this.toastr.info('Data submited, it is being checked!');
    return new Promise((resolve, reject) => {
      this.$http({
        url: 'http://localhost:3003/sign-in',
        data: authData,
        skipAuthorization: true,
        method: 'POST'
      })
        .then(response => {
          localStorage.setItem('jwt_auth', response.headers('Authorization'));
          localStorage.setItem('user', JSON.stringify(response.data));
          resolve(response.data.name);
        })
        .catch(error => reject(error));
    });
  }

  signOut(){
    this.toastr.info('Submited!');
    return new Promise((resolve, reject) => {
      this.$http.delete('http://localhost:3003/sign-out')
        .then(() => {
          const user = JSON.parse(localStorage.getItem('user'));
          localStorage.removeItem('jwt_auth');
          localStorage.removeItem('user');
          sessionStorage.removeItem('turtlesFacts');
          sessionStorage.removeItem('quizQuestions');
          resolve(user.name);
        })
        .catch(error => reject(error));
    });
  }
};

service.$inject = ['$http', 'toastr'];

export default service