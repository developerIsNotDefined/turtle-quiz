(function(){
  angular
    .module('turtleApp', ['ui.router', 'ngAnimate', 'ngTouch', 'toastr', 'angular-jwt'])
    .config(['$urlRouterProvider', ($urlRouterProvider) => $urlRouterProvider.otherwise('/facts')])
    .run(['authManager', '$state', (authManager, $state) => {
      authManager.checkAuthOnRefresh();
      authManager.redirectWhenUnauthenticated();
      $state.defaultErrorHandler(() => {}); //handles ui-router transition errors
    }]);
})();

//127.0.0.1:8080/#!/facts

// node index.js
// json-server -w db.json -d 2000

// getQuizQuestions() {
//   // return this.$http.get('http://localhost:3000/quizQuestions'); for json-server
// }

// getQuizQuestions() {
//   return this.$http({
//     method: 'GET',
//     url: 'http://localhost:3003/api/quizQuestions'
//     // headers: {
//     //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWNkMjI1OTdkNDQ0NjNmYmNmZTQwYTIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTA2NjE1ODk4fQ.V8PRg2yr5r_jXHsva47Rhb69h5HTXPtxYWx8vNQH9A4'
//     // }
//   });
// }
