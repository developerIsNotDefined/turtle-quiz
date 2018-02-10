const service = class {
  constructor($http, toastr, $q, dataService) {
    this.$http = $http;
    this.toastr = toastr;
    this.$q = $q;
    this.dataService = dataService;
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
        url: `${this.dataService.serverUrl}/api/turtlesFacts`,
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

service.$inject = ['$http', 'toastr', '$q', 'dataService'];

export default service;