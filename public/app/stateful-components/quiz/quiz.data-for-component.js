(function(){
  const service = class {
    constructor(){
      this.cssOptions = {
        progressBar : {
          values: [{value: 0, type: 'info', number: 0 + '/' + '∞'},
            {value: 100, type: 'warning', number: 0 + '/' + '∞'}],
          message: 'Progress:',
          answerIcons: [
            {text: 'Answered', color: 'btn-info', icon: 'glyphicon-pencil'},
            {text: 'Unanswered', color: 'btn-warning', icon: 'glyphicon-question-sign'}
          ]
        },
        button: 'Continue',
        progressButtonToolbar: {
          icon: ['glyphicon glyphicon-pencil btn-info btn btn-lg', 'glyphicon glyphicon-question-sign btn-warning btn btn-lg']
        }
      };
    }

    getAnswerClass(index) {
      const question = this.quizQuestions[this.activeQuestion];
      let answerClass = "";
      if(this.confirmedAnswer.questionNumber === this.activeQuestion){
        if (index === this.confirmedAnswer.chosenVariant){
          answerClass = question.type === 'text' ? "answer-selected " : "image-selected ";
        }
        return question.type === 'text' ? answerClass + 'answer' : answerClass + 'image-answer';
      } else {
        if (index === question.selected){
          answerClass = question.type === 'text' ? "answer-selected " : "image-selected ";
        }
        return question.type === 'text' ? answerClass + 'answer' : answerClass + 'image-answer';
      }
    }

    getProgressClass(question) {
      const icon = this.progressToolbarOptions.icon;
      return question.selected !== false ? icon[0] : icon[1];
    }

    proceed() {
      if(this.confirmedAnswer.questionNumber !== this.activeQuestion){
        this.toastr.warning('You probably forgot to choose an answer!');
        return;
      }

      if (this.quizQuestions[this.activeQuestion].selected === false){
        this.numAnsweredQuestions++;
        let numAnsweredQuestions = this.numAnsweredQuestions;
        this.onChange({
          $event: {
            numAnsweredQuestions: numAnsweredQuestions
          }
        });
      }

      this.quizQuestions[this.activeQuestion].selected = this.confirmedAnswer.chosenVariant;

      if (this.numAnsweredQuestions !== this.quizQuestions.length){
        let notAnsweredQuestion = this.quizQuestions.find(quizQuestion => quizQuestion.selected === false);
        this.onChange({
          $event: {
            activeQuestion: notAnsweredQuestion.id
          }
        });
      } else {
        this.toastr.success('You have answered all of the questions!');
        this.onChange({
          $event: {
            askForConfirm: true
          }
        });
      }
    }

    grabCssOptions() {
      return this.cssOptions;
    }

    grabGetAnswerClass() {
      return this.getAnswerClass;
    }

    grabGetProgressClass() {
      return this.getProgressClass;
    }

    grabProceed(){
      return this.proceed
    }
  };

  angular
    .module('turtleApp')
    .service("quizService", service);
})();