(function(){
  const service = class {
    constructor(){
      this.cssOptions = {
        progressBar : {
          values: [{value: 0, type: 'success', number: 0 + '/' + '∞'},
            {value: 100, type: 'danger', number: 0 + '/' + '∞'}],
          message: 'Results:',
          answerIcons: [
            {text: 'Correct', color: 'btn-success', icon: 'glyphicon-ok'},
            {text: 'Incorrect', color: 'btn-danger', icon: 'glyphicon-remove'}
          ]
        },
        button: 'Go Back To Facts',
        progressButtonToolbar: {
          icon: ['progress-btn-toolbar__button--correct', 'progress-btn-toolbar__button--incorrect']
        }
      };
    }

    getAnswerClass(index) {
      const question = this.quizQuestions[this.activeQuestion];
      if (index === question.correct){
        return "bg-success";
      } else if (index === question.selected){
        return "bg-danger";
      }
    }

    getProgressClass(question) {
      const icon = this.progressToolbarOptions.icon;
      return question.selected ===  question.correct ? icon[0] : icon[1];
    }

    proceed() {
      this.onChange({
        $event: {
          askForConfirm: true
        }
      });
    }
  };

  angular
    .module('turtleApp')
    .service("resultsService", service);
})();