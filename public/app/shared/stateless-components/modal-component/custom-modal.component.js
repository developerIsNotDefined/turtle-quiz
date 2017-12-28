(function(){
  const controller = class {
    constructor($rootScope, modalService) {
      this.$rootScope = $rootScope;
      this.modalService = modalService;
    }

    $onInit(){
      this.modalData = this.modalService.modalConfig().data;
    }

    ok(){
      this.modalService.resolve();
    }

    cancel(){
      this.modalService.reject();
    }
  };

  controller.$inject = ['$rootScope', 'modalService'];

  angular
    .module('turtleApp')
    .component('customModal', {
      bindings:{},
      controller,
      templateUrl: ($element, $attrs, modalService) => modalService.modalConfig().templateUrl
    });
})();