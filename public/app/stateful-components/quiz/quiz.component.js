(function(){
  const controller = class {
    constructor(dataService, $state, quizService, toastr){
      this.dataService = dataService;
      this.$state = $state;
      this.quizService = quizService;
      this.toastr = toastr;

      this.numAnsweredQuestions = 0;
      this.askForConfirm = false;
      this.activeQuestion = 0;
      this.cssOptions = quizService.cssOptions;
      this.getAnswerClass = quizService.getAnswerClass;
      this.getProgressClass = quizService.getProgressClass;
      this.proceed = quizService.proceed;
    }

    $onInit() {
      this.quizService.getQuizQuestions()
        .then(quizQuestions => {
          this.toastr.success('Questions for quiz have been successfully loaded!');
          this.quizQuestions = quizQuestions.sort((a, b) => a.id - b.id);
        })
        .catch(error => {
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
        this.dataService.markQuiz(this.quizQuestions);
        this.$state.go('results',{
          quizQuestions: this.quizQuestions
        });
      }

      if(event.confirmed === false){
        this.askForConfirm = false;
      }
    }
  };

  controller.$inject = ['dataService', '$state', 'quizService', 'toastr'];

  angular
    .module('turtleApp')
    .component('quizComponent', {
      templateUrl: 'app/stateful-components/quiz/quiz.html',
      controller
    });
})();
