(function(){
  const controller = class {
    constructor($state, $stateParams, modalService){
      this.$state = $state;
      this.modalService = modalService;

      this.activeTurtle = $stateParams.activeTurtle;
    }

    $onInit() {
      this.open(this.activeTurtle);
    }

    open(activeTurtle) {
      this.modalService.open({
        templateUrl: 'app/stateful-components/facts/modal.turtle-info/modal.turtle-info.html',
        data:{
          activeTurtle
        }
      })
        .then(response => this.$state.go('facts'))
        .catch(reason => this.$state.go('facts'));
    }
  };

  controller.$inject = ['$state', '$stateParams', 'modalService'];

  angular
    .module('turtleApp')
    .component('factsTurtleInfoModal', {
      bindings: {},
      controller
    });
})();






