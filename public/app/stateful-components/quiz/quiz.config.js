const checkPermission = (dataService, $state, toastr) => {
  if(!dataService.isAuthenticated()){
    toastr.warning('You have to be authenticated to start quiz!');
    return $state.go('facts.authorization');
  }
};

checkPermission.$inject = ['dataService', '$state', 'toastr'];

const config = $stateProvider => {
    $stateProvider.state('quiz', {
      url: '/quiz',
      component: 'quizComponent',
      resolve:{
        checkPermission
      }
    });
};

config.$inject = ['$stateProvider'];

export default config