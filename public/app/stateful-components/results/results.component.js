const controller = class {
  constructor(dataService, $state, resultsService, toastr, modalService) {
    this.$state = $state;
    this.dataService = dataService;
    this.toastr = toastr;
    this.modalService = modalService;

    this.numCorrectAnswers = dataService.numCorrect;
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
    if ((typeof event.askForConfirm !== 'undefined') && (event.askForConfirm === true)) {
      this.confirm();
    }
  }

  onUpdateProgressButtonToolbar(event) {
    if (typeof event.activeQuestion !== 'undefined') {
      this.activeQuestion = event.activeQuestion;
    }
  }

  confirm() {
    this.modalService.open({
      templateUrl: 'app/shared/templates/confirm.tpl.html',
      data: {
        message: 'You won\'t be able to see your results in case you agree.'
      }
    })
      .then(() => {
        this.dataService.resetQuiz();
        this.$state.go('facts');
      })
      .catch(() => {});
  }
};

controller.$inject = ['dataService', '$state', 'resultsService', 'toastr', 'modalService'];

const component = {
  templateUrl: 'app/stateful-components/results/results.html',
  controller
};

export default component;