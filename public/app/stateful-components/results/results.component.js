(function(){
  const controller = class{
    constructor(quizMetrics, $state, resultsService, toastr){
      this.$state = $state;
      this.quizMetrics = quizMetrics;
      this.toastr = toastr;

      this.numCorrectAnswers = quizMetrics.numCorrect;
      this.askForConfirm = false;
      this.activeQuestion = 0;
      this.quizQuestions = quizMetrics.quizQuestions;
      this.cssOptions = resultsService.grabCssOptions();
      this.getAnswerClass = resultsService.grabGetAnswerClass();
      this.getProgressClass = resultsService.grabGetProgressClass();
      this.proceed = resultsService.grabProceed();
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
      if(event.confirmed === true){
        this.quizMetrics.numCorrect = 0;
        this.$state.go('facts');
      }
      if(event.confirmed === false){
        this.askForConfirm = false;
      }
    }
  };

  controller.$inject = ['quizMetrics', '$state', 'resultsService', 'toastr'];

  angular
    .module('turtleApp')
    .component('resultsComponent', {
      templateUrl: 'app/stateful-components/results/results.html',
      controller
    });
})();
