(function(){
  const controller = class {
    constructor($rootScope, modalService) {
      this.$rootScope = $rootScope;
      this.modalService = modalService;
    }

    $onInit(){
      this.modalData = this.modalService.modalConfig().data;
    }

    ok(data){
      this.modalService.resolve(data);
    }

    cancel(reason){
      this.modalService.reject(reason);
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