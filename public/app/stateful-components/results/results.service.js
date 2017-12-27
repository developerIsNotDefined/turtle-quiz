(function(){
  const service = class {
    constructor(){
      this.cssOptions = {
        progressBar : {
          values: [{value: 0, type: 'progress-ui-bar__inner--correct'},
            {value: 100, type: 'progress-ui-bar__outer--incorrect'}],
          hintIcons: [
            {text: 'Correct', type: 'progress-ui-bar__hint-container--correct', icon: 'glyphicon-ok'},
            {text: 'Incorrect', type: 'progress-ui-bar__hint-container--incorrect', icon: 'glyphicon-remove'}
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
        return question.type === 'text' ? "question-bar-card__answer--correct-text" : "question-bar-card__answer--correct-image";
      } else if (index === question.selected){
        return question.type === 'text' ? "question-bar-card__answer--incorrect-text" : "question-bar-card__answer--incorrect-image";
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