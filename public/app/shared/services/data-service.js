(function(){
  const service = class{
    constructor($http){
      this.$http = $http;
    }

    // node index.js
    // json-server -w db.json -d 2000

    getQuizQuestions() {
      return this.$http.get('http://localhost:3003/api/quizQuestions');
      // return this.$http.get('http://localhost:3000/quizQuestions'); for json-server
    }

    getTurtlesData() {
      return this.$http.get('http://localhost:3003/api/turtlesFacts');
      // return this.$http.get('http://localhost:3000/turtlesData'); for json-server
    }
  };

  service.$inject = ['$http'];

  angular
    .module('turtleApp')
    .service("dataService", service);
})();
