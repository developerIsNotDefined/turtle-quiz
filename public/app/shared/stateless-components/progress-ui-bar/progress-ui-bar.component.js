const controller = class {
  constructor() {}

  $onChanges(changes) {
    if (typeof changes.numAnsweredQuestions !== 'undefined') {
      if (this.numAnsweredQuestions !== 0) {
        this.updateProgressBar();
      }
    }

    if (typeof changes.quizLength !== 'undefined') {
      if (Number.isInteger(this.numAnsweredQuestions)) {
        this.updateProgressBar();
      }
    }
  }

  updateProgressBar() {
    this.cssOptions.values = [{
      value: this.numAnsweredQuestions * this.quizLength,
      type: this.cssOptions.values[0].type,
      number: this.numAnsweredQuestions + '/' + this.quizLength
    },
    {
      value: (this.quizLength - this.numAnsweredQuestions) * this.quizLength,
      type: this.cssOptions.values[1].type,
      number: this.quizLength - this.numAnsweredQuestions + '/' + this.quizLength
    }];

    this.cssCompleted = {'width': this.cssOptions.values[0].value + '%'};
  }
};

const component = {
  bindings: {
    numAnsweredQuestions: '<',
    quizLength: '<',
    cssOptions: '<'
  },
  templateUrl: 'app/shared/stateless-components/progress-ui-bar/progress-ui-bar.html',
  controller
};

export default component;