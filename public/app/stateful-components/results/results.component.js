(function(){
  const controller = class{
    constructor(dataService, $state, resultsService, toastr){
      this.$state = $state;
      this.dataService = dataService;
      this.toastr = toastr;

      this.numCorrectAnswers = dataService.numCorrect;
      this.askForConfirm = false;
      this.activeQuestion = 0;
      this.quizQuestions = dataService.quizQuestions;
      this.cssOptions = resultsService.cssOptions;
      this.getAnswerClass = resultsService.getAnswerClass;
      this.getProgressClass = resultsService.getProgressClass;
      this.proceed = resultsService.proceed;
    }

    $onInit() {
      this.toastr.success('Congratulations! Now you can check your quiz results');
    }

    onUpdateQuestionBar(event) {
      if(typeof event.askForConfirm !== 'undefined'){
        this.askForConfirm = event.askForConfirm;
      }
    }

    onUpdateProgressButtonToolbar(event) {
      if(typeof event.activeQuestion !== 'undefined'){
        this.activeQuestion = event.activeQuestion;
      }
    }

    onConfirmFinalise(event) {
      if(typeof event.confirmed !== 'undefined'){
        if(event.confirmed === true){
          this.dataService.resetQuiz();
          this.$state.go('facts');
        } else {
          this.askForConfirm = false;
        }
      }
    }
  };

  controller.$inject = ['dataService', '$state', 'resultsService', 'toastr'];

  angular
    .module('turtleApp')
    .component('resultsComponent', {
      templateUrl: 'app/stateful-components/results/results.html',
      controller
    });
})();
