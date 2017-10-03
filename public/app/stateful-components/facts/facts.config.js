(function(){
  const config = $stateProvider => {
    $stateProvider
      .state('facts', {
        url: '/facts',
        component: 'factsComponent'
      });
  };

  config.$inject = ['$stateProvider'];

  angular
    .module('turtleApp')
    .config(config);
})();
