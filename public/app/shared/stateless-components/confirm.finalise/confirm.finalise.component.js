(function(){
  const controller = class {
    constructor(modalService) {
      this.modalService = modalService;
    }

    $onInit() {
      this.open();
    }

    open() {
      const onResult = this.onResult;
      this.modalService.open({
        templateUrl: 'app/shared/stateless-components/confirm.finalise/confirm.finalise.html'
      })
        .then(() => {
            onResult({
              $event: {
                confirmed: true
              }
            });
          })
        .catch(() => {
          onResult({
            $event: {
              confirmed: false
            }
          });
        });

    }
  };

  controller.$inject = ['modalService'];

  angular
    .module('turtleApp')
    .component('confirmFinalise',  {
      bindings: {
        onResult: '&'
      },
      controller
    });
})();

