(function(){
  const controller = class {
    constructor($rootScope, modalService) {
      this.$rootScope = $rootScope;
      this.modalService = modalService;
    }

    $onInit(){
      this.templateUrl = this.modalService.modalConfig().templateUrl;
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
      template: '<ng-include src="$ctrl.templateUrl"></ng-include>'
    });
})();
// (function(){
//   const controller = class {
//     constructor($rootScope, modalService) {
//       this.$rootScope = $rootScope;
//       this.modalService = modalService;
//     }
//
//     $onInit(){
//       console.log('init');
//       this.modalData = this.modalService.modalConfig().data;
//     }
//
//     ok(data){
//       this.modalService.resolve(data);
//     }
//
//     cancel(reason){
//       this.modalService.reject(reason);
//     }
//   };
//
//   controller.$inject = ['$rootScope', 'modalService'];
//
//   angular
//     .module('turtleApp')
//     .component('customModal', {
//       bindings:{},
//       controller,
//       templateUrl: ($element, $attrs, modalService) => modalService.modalConfig().templateUrl
//     });
// })();