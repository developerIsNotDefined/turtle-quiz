(function(){
  const controller = class {
    constructor($state, dataService, toastr){
      this.$state = $state;
      this.dataService = dataService;
      this.toastr = toastr;

      this.carouselVisible = false;
      this.search = "";
    }

    $onInit() {
      this.toastr.info('Turtles information is being loaded!');
      this.dataService.getTurtlesData()
        .then(response => {
          this.toastr.success('Turtles information has been successfully loaded!');
          this.turtles = response.data;
        })
        .catch(response => {
          this.toastr.error('Turtles information hasn\'t been loaded!', {timeOut: 0});
        });
    }

    activateQuiz() {
      this.$state.go('quiz');
    }

    showCarousel() {
      if(this.turtles){
        this.carouselVisible = !this.carouselVisible;
      }
      else {
        this.toastr.error('Turtles information hasn\'t been loaded!', {timeOut: 0});
      }
    }

    turtleInfo(activeTurtle) {
      this.$state.go('facts.turtleInfo', {
        id: activeTurtle.id+1,
        activeTurtle: activeTurtle
      });
    }
  };

  controller.$inject = ['$state', 'dataService', 'toastr'];

  angular
    .module('turtleApp')
    .component('factsComponent', {
      templateUrl: 'app/stateful-components/facts/facts.html',
      controller
    });
})();

