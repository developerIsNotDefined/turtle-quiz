(function(){
  const controller = class {
    constructor($uibModal) {
      this.$uibModal = $uibModal;
    }

    $onInit() {
      this.open();
    }

    open() {
      const onResult = this.onResult;
      this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/shared/stateless-components/confirm.finalise/confirm.finalise.html',
        controller($uibModalInstance){
          this.cancel = () => $uibModalInstance.dismiss('No');
          this.ok = () => $uibModalInstance.close('Yes');
        },
        controllerAs: '$ctrl',
        size: 'sm',
        windowClass: 'confirm-finalise'
      }).result.then
        (response => {
            onResult({
              $event: {
                confirmed: true
              }
            });
          },
          () => {
            onResult({
              $event: {
                confirmed: false
              }
            });
          });
    }
  };

  controller.$inject = ['$uibModal'];

  angular
    .module('turtleApp')
    .component('confirmFinalise',  {
      bindings: {
        onResult: '&'
      },
      controller
    });
})();

