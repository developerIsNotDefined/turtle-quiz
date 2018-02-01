const service = class {
  constructor($http, toastr, $q) {
    this.$http = $http;
    this.toastr = toastr;
    this.$q = $q;
  }

  signUp(authData) {
    this.toastr.info('Data submited, it is being checked!');
    return this.$q((resolve, reject) => {
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
          if (typeof error.data.errors !== 'undefined') {
            let errors = error.data.errors, errorMessage = '';
            errors.forEach(err => errorMessage += err.message + ' ');
            reject(errorMessage);
          } else {
            reject('Oops, something went wrong, please try again later!');
          }
        });
    });
  }

  signIn(authData) {
    this.toastr.info('Data submited, it is being checked!');
    return this.$q((resolve, reject) => {
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
        .catch(error => {
          if (typeof error.data.errors !== 'undefined') {
            let errors = error.data.errors, errorMessage = '';
            errors.forEach(err => errorMessage += err.message + ' ');
            reject(errorMessage);
          } else {
            reject('Oops, something went wrong, please try again later!');
          }
        });
    });
  }

  signOut() {
    this.toastr.info('Submited!');
    return this.$q((resolve, reject) => {
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

service.$inject = ['$http', 'toastr', '$q'];

export default service;