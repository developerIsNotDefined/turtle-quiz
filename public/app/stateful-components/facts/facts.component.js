(function(){
  const controller = class {
    constructor($state, factsService, toastr){
      this.$state = $state;
      this.factsService = factsService;
      this.toastr = toastr;

      this.loading = {};
      this.search = "";
    }

    $onInit() {
      this.loading.turtles = 'true';
      this.factsService.getTurtlesData()
        .then(turtlesFacts => {
          this.toastr.success('Turtles information has been successfully loaded!');
          this.turtlesFacts = turtlesFacts;
          this.loading.turtles = 'false';
        })
        .catch(error => {
          this.toastr.error('Turtles information hasn\'t been loaded!', {timeOut: 0});
          this.loading.turtles = 'notFound';
        });
    }

    turtleInfo(activeTurtle) {
      this.$state.go('facts.turtleInfo', {
        id: activeTurtle.id+1,
        activeTurtle: activeTurtle
      });
    }

    startSpinner(){
      this.loading.turtles = 'true';
      console.log('starting spinner...');
    }

    stopSpinner(){
      this.loading.turtles = 'false';
      console.log('ending spinner...');
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

