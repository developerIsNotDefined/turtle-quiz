const config = $stateProvider => {
  $stateProvider
    .state('results', {
      url: '/results',
      component: 'resultsComponent',
      resolve:{
        checkPermission: ['dataService', '$state', 'toastr', (dataService, $state, toastr) => {
          if(!dataService.isAuthenticated()){
            dataService.resetQuiz();
            toastr.warning('You have to be authenticated to start quiz!');
            return $state.go('facts.authorization');
          }
          if(dataService.quizQuestions.some(item => item.selected === false)){
            toastr.warning('You should complete quiz to see results!');
            return $state.go('quiz');
          }
        }]
      }
    });
};

config.$inject = ['$stateProvider'];

export default config