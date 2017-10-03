(function(){
  const config = $stateProvider => {
    $stateProvider
      .state('quiz', {
        url: '/quiz',
        component: 'quizComponent',
        resolve:{
          checkPermission(dataService, $state, toastr) {
            if(!dataService.isAuthenticated()){
              toastr.warning('You have to be authenticated to start quiz!');
              return $state.go('facts.authorization');
            }
          }
        }
      });
  };

  config.$inject = ['$stateProvider'];

  angular
    .module('turtleApp')
    .config(config);
})();