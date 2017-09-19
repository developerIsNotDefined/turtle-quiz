(function(){
  angular
    .module('turtleApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'toastr'])
    .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RouterConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/facts');

    $stateProvider
      .state('facts', {
        url: '/facts',
        component: 'factsComponent'
      })
      .state('quiz', {
        url: '/quiz',
        component: 'quizComponent'
      })
      .state('results', {
        url: '/results',
        component: 'resultsComponent'
      })
      .state('facts.turtleInfo', {
        url: '/:id',
        component: 'factsTurtleInfoModal',
        params: {
          activeTurtle: null
        }
      });
    };
})();

//127.0.0.1:8080/#!/facts



