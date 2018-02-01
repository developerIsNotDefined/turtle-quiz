const service = class {
  constructor($http, toastr, $q) {
    this.$http = $http;
    this.toastr = toastr;
    this.$q = $q;
  }

  getTurtlesData() {
    return this.$q((resolve, reject) => {
      const turtlesFacts = sessionStorage.getItem('turtlesFacts');
      if (turtlesFacts !== null) {
        const response = {
          data: JSON.parse(turtlesFacts),
          cashed: true
        };
        return resolve(response);
      }
      this.toastr.info('Turtles information is being loaded!');
      this.$http({
        url: 'http://localhost:3003/api/turtlesFacts',
        skipAuthorization: true,
        method: 'GET'
      })
        .then(response => {
          sessionStorage.setItem('turtlesFacts', JSON.stringify(response.data));
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }
};

service.$inject = ['$http', 'toastr', '$q'];

export default service;