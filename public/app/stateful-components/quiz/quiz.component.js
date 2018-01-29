const controller = class {
  constructor(dataService, $state, quizService, toastr, modalService){
    this.dataService = dataService;
    this.$state = $state;
    this.quizService = quizService;
    this.toastr = toastr;
    this.modalService = modalService;

    this.loading = {quizQuestions: 'true'};
    this.numAnsweredQuestions = 0;
    this.activeQuestion = 0;
    this.cssOptions = quizService.cssOptions;
    this.getAnswerClass = quizService.getAnswerClass;
    this.getProgressClass = quizService.getProgressClass;
    this.proceed = quizService.proceed;
  }

  $onInit() {
    this.loading.quizQuestions = 'true';
    this.quizService.getQuizQuestions()
      .then(response => {
        if(!response.cashed){
          this.toastr.success('Questions for quiz have been successfully loaded!');
        }
        this.quizQuestions = response.data.sort((a, b) => a.id - b.id);
      })
      .catch(error => this.toastr.error('Questions for quiz haven\'t been loaded!', {timeOut: 0}))
      .finally(() => this.loading.quizQuestions = 'false');
  }

  onUpdateQuestionBar(event) {
    if(typeof event.numAnsweredQuestions !== 'undefined'){
      this.numAnsweredQuestions = event.numAnsweredQuestions;
    }

    if(typeof event.activeQuestion !== 'undefined'){
      this.activeQuestion = event.activeQuestion;
    }

    if((typeof event.askForConfirm !== 'undefined') && (event.askForConfirm === true)){
      this.confirm();
    }
  }

  onUpdateProgressButtonToolbar(event) {
    if(typeof event.activeQuestion !== 'undefined'){
      this.activeQuestion = event.activeQuestion;
    }
  }

  confirm(){
    this.modalService.open({
      templateUrl: 'app/shared/templates/confirm.tpl.html',
      data:{
        message: 'You won\'t be able to change your answers. Quiz will be completed in case you agree.'
      }
    })
      .then(() => {
        this.dataService.markQuiz(this.quizQuestions);
        this.$state.go('results',{
          quizQuestions: this.quizQuestions
        });
      })
      .catch(() => {});
  }
};

controller.$inject = ['dataService', '$state', 'quizService', 'toastr', 'modalService'];

const component = {
  templateUrl: 'app/stateful-components/quiz/quiz.html',
  controller
}

export default component