const controller = class {
  constructor(toastr){
    this.toastr = toastr;

    this.numAnsweredQuestions = 0;
    this.confirmedAnswer = {
      questionNumber: -1,
      chosenVariant: -1
    };
  }

  selectAnswer(index) {
    const activeQuestion = this.activeQuestion;
    this.confirmedAnswer = {
      questionNumber: activeQuestion,
      chosenVariant: index
    };
  }
};

controller.$inject = ['toastr'];

export default {
  bindings: {
    activeQuestion: '<',
    quizQuestions:'<',
    onChange: '&',
    proceed: '<',
    questionBarOptions: '<',
    getAnswerClass: '<',
    loading: '<'
  },
  templateUrl: 'app/shared/stateless-components/question-bar/question-bar.html',
  controller
}