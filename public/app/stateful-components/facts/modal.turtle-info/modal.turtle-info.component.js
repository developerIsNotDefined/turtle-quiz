(function(){
  const controller = class {
    constructor($uibModal, $state, $stateParams){
      this.$uibModal = $uibModal;
      this.$state = $state;

      this.activeTurtle = $stateParams.activeTurtle;
    }

    $onInit() {
      this.open(this.activeTurtle);
    }

    open(activeTurtle) {
      this.$uibModal.open({
        templateUrl: 'app/stateful-components/facts/modal.turtle-info/modal.turtle-info.html',
        controller($uibModalInstance, activeTurtle){
          this.activeTurtle = activeTurtle;
          this.cancel = () => $uibModalInstance.dismiss('cancel');
          this.ok = () => $uibModalInstance.close(this.activeTurtle);
        },
        controllerAs: '$ctrl',
        resolve: {
          activeTurtle: () => {
            return activeTurtle;
          }
        }
      }).result.then(item => this.$state.go('facts'), () => this.$state.go('facts'));
    }
  };

  controller.$inject = ['$uibModal', '$state', '$stateParams'];

  angular
    .module('turtleApp')
    .component('factsTurtleInfoModal', {
      bindings: {},
      controller
    });
})();






