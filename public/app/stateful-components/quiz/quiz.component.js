(function(){
  const controller = class {
    constructor(quizMetrics, $state, dataService, quizService, toastr){
      this.quizMetrics = quizMetrics;
      this.$state = $state;
      this.dataService = dataService;
      this.toastr = toastr;

      this.numAnsweredQuestions = 0;
      this.askForConfirm = false;
      this.activeQuestion = 0;
      this.cssOptions = quizService.grabCssOptions();
      this.getAnswerClass = quizService.grabGetAnswerClass();
      this.getProgressClass = quizService.grabGetProgressClass();
      this.proceed = quizService.grabProceed();
    }

    $onInit() {
      this.toastr.info('Questions for quiz are being loaded!');
      this.dataService.getQuizQuestions()
        .then(response => {
          this.toastr.success('Questions for quiz have been successfully loaded!');
          this.quizQuestions = response.data.sort((a, b) => a.id - b.id);
        })
        .catch(response => {
          this.toastr.error('Questions for quiz haven\'t been loaded!', {timeOut: 0});
        });
    }

    onUpdateQuestionBar(event) {
      if(typeof event.numAnsweredQuestions !== 'undefined'){
        this.numAnsweredQuestions = event.numAnsweredQuestions;
      }

      if(typeof event.activeQuestion !== 'undefined'){
        this.activeQuestion = event.activeQuestion;
      }

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
        this.quizMetrics.markQuiz(this.quizQuestions);
        this.$state.go('results',{
          quizQuestions: this.quizQuestions
        });
      }

      if(event.confirmed === false){
        this.askForConfirm = false;
      }
    }
  };

  controller.$inject = ['quizMetrics', '$state', 'dataService', 'quizService', 'toastr'];

  angular
    .module('turtleApp')
    .component('quizComponent', {
      templateUrl: 'app/stateful-components/quiz/quiz.html',
      controller
    });
})();
