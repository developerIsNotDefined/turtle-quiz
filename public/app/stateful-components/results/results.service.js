const service = class {
  constructor() {
    this.cssOptions = {
      progressBar: {
        values: [{value: 0, type: 'progress-ui-bar__inner--correct'},
          {value: 100, type: 'progress-ui-bar__outer--incorrect'}],
        hintIcons: [
          {text: 'Correct', type: 'progress-ui-bar__hint--correct', icon: 'icon-calendar-check-o'},
          {text: 'Incorrect', type: 'progress-ui-bar__hint--incorrect', icon: 'icon-calendar-times-o'}
        ]
      },
      questionBarOptions: {
        btn: 'Go Back To Facts',
        checkHover: ''
      },
      progressButtonToolbar: {
        icon: ['progress-btn-toolbar__button--correct', 'progress-btn-toolbar__button--incorrect']
      }
    };
  }

  getAnswerClass(index) {
    let question = this.quizQuestions[this.activeQuestion];
    if (index === question.correct) {
      return question.type === 'text' ? 'question-bar-card__answer--correct-text' : 'question-bar-card__answer--correct-image';
    } else if (index === question.selected) {
      return question.type === 'text' ? 'question-bar-card__answer--incorrect-text' : 'question-bar-card__answer--incorrect-image';
    }
  }

  getProgressClass(question) {
    let btnCssClass = question.id === this.activeQuestion ? 'progress-btn-toolbar__button--active ' : '';
    let icon = this.progressToolbarOptions.icon;
    return question.selected === question.correct ? btnCssClass+icon[0] : btnCssClass+icon[1];
  }

  proceed() {
    this.onChange({
      $event: {
        askForConfirm: true
      }
    });
  }
};

export default service;