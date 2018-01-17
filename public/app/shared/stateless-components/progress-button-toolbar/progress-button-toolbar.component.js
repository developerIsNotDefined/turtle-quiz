const controller = class {
  constructor() {}

  setActiveQuestion(index) {
    this.onChange({
      $event: {
        activeQuestion: index
      }
    });
  }
};

export default {
  bindings:{
    progressToolbarOptions: '<',
    onChange: '&',
    quizQuestions: '<',
    getProgressClass: '<',
    activeQuestion: '<'
  },
  templateUrl: 'app/shared/stateless-components/progress-button-toolbar/progress-button-toolbar.html',
  controller
}