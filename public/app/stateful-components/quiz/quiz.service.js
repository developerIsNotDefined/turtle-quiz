const service = class {
  constructor($http, toastr, $q) {
    this.$http = $http;
    this.toastr = toastr;
    this.$q = $q;

    this.cssOptions = {
      progressBar: {
        values: [{value: 0, type: 'progress-ui-bar__inner--answered'},
          {value: 100, type: 'progress-ui-bar__outer--unanswered'}],
        hintIcons: [
          {text: 'Answered', type: 'progress-ui-bar__hint--answered', icon: 'icon-edit'},
          {text: 'Unanswered', type: 'progress-ui-bar__hint--unanswered', icon: 'icon-help'}
        ]
      },
      questionBarOptions: {
        btn: 'Continue',
        checkHover: 'question-bar-card__answer-container-hover'
      },
      progressButtonToolbar: {
        icon: ['progress-btn-toolbar__button--answered', 'progress-btn-toolbar__button--unanswered']
      }
    };
  }

  getQuizQuestions() {
    return this.$q((resolve, reject) => {
      const quizQuestions = sessionStorage.getItem('quizQuestions');
      if (quizQuestions !== null) {
        const response = {
          data: JSON.parse(quizQuestions),
          cashed: true
        };
        return resolve(response);
      }
      this.toastr.info('Questions for quiz are being loaded!');
      this.$http({
        url: 'http://localhost:3003/api/quizQuestions',
        method: 'GET'
      })
        .then(response => {
          sessionStorage.setItem('quizQuestions', JSON.stringify(response.data));
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }

  getAnswerClass(index) {
    let question = this.quizQuestions[this.activeQuestion];
    if (this.confirmedAnswer.questionNumber === this.activeQuestion) {
      if (index === this.confirmedAnswer.chosenVariant) {
        return question.type === 'text' ? 'question-bar-card__answer--selected-text' : 'question-bar-card__answer--selected-image';
      }
    } else if (index === question.selected) {
        return question.type === 'text' ? 'question-bar-card__answer--selected-text' : 'question-bar-card__answer--selected-image';
      }
  }

  getProgressClass(question) {
    let btnCssClass = question.id === this.activeQuestion ? 'progress-btn-toolbar__button--active ' : '';
    let icon = this.progressToolbarOptions.icon;
    return question.selected !== false ? btnCssClass+icon[0] : btnCssClass+icon[1];
  }

  proceed() {
    if ((this.confirmedAnswer.questionNumber !== this.activeQuestion) && (this.activeQuestion.selected === false)) {
      this.toastr.warning('You probably forgot to choose an answer!');
      return;
    }

    if (this.quizQuestions[this.activeQuestion].selected === false) {
      this.numAnsweredQuestions++;
      let numAnsweredQuestions = this.numAnsweredQuestions;
      this.onChange({
        $event: {
          numAnsweredQuestions: numAnsweredQuestions
        }
      });
    }

    this.quizQuestions[this.activeQuestion].selected = this.confirmedAnswer.chosenVariant;

    if (this.numAnsweredQuestions !== this.quizQuestions.length) {
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
};

service.$inject = ['$http', 'toastr', '$q'];

export default service;