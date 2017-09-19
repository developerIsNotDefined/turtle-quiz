(function(){
  const service = class {
    constructor(){
      this.numCorrect = 0;
      this.quizQuestions = {};
    }

    markQuiz (quizQuestions) {
      quizQuestions.forEach((quizQuestion) => {
        if(quizQuestion.selected === quizQuestion.correct){
          this.numCorrect++;
        }
      })
      this.quizQuestions = quizQuestions;
    }
  };

  angular
    .module('turtleApp')
    .service("quizMetrics", service);
})();


