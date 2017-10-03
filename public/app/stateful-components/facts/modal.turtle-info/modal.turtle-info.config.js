(function(){
  const config = $stateProvider => {
    $stateProvider
      .state('facts.turtleInfo', {
        url: '/:id',
        component: 'factsTurtleInfoModal',
        params: {
          activeTurtle: null
        }
      });
  };

  config.$inject = ['$stateProvider'];

  angular
    .module('turtleApp')
    .config(config);
})();