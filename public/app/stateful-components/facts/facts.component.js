(function(){
  const controller = class {
    constructor($state, factsService, toastr){
      this.$state = $state;
      this.factsService = factsService;
      this.toastr = toastr;

      this.search = "";
    }

    $onInit() {
      this.factsService.getTurtlesData()
        .then(turtlesFacts => {
          this.toastr.success('Turtles information has been successfully loaded!');
          this.turtlesFacts = turtlesFacts;
        })
        .catch(error => {
          this.toastr.error('Turtles information hasn\'t been loaded!', {timeOut: 0});
        });
    }

    turtleInfo(activeTurtle) {
      this.$state.go('facts.turtleInfo', {
        id: activeTurtle.id+1,
        activeTurtle: activeTurtle
      });
    }
  };

  controller.$inject = ['$state', 'factsService', 'toastr'];

  angular
    .module('turtleApp')
    .component('factsComponent', {
      templateUrl: 'app/stateful-components/facts/facts.html',
      controller
    });
})();

