(function(){
  const service = class{
    constructor($http, toastr){
      this.$http = $http;
      this.toastr = toastr;
    }

    getTurtlesData(){
      return new Promise((resolve, reject) => {
        let turtlesFacts = sessionStorage.getItem('turtlesFacts');
        if (turtlesFacts !== null){
          return resolve(JSON.parse(turtlesFacts));
        }
        this.toastr.info('Turtles information is being loaded!');
        this.$http({
          url: 'http://localhost:3003/api/turtlesFacts',
          skipAuthorization: true,
          method: 'GET'
        })
          .then(response => {
            sessionStorage.setItem('turtlesFacts', JSON.stringify(response.data));
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

  service.$inject = ['$http', 'toastr'];

  angular
    .module('turtleApp')
    .service("factsService", service);
})();
