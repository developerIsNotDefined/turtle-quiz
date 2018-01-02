(function(){
  const controller = class {
    constructor($state){
      this.$state = $state;
    }
  };

  controller.$inject = ['$state'];

  angular
    .module('turtleApp')
    .component('httpErrorsComponent', {
      controller,
      templateUrl: ($element, $attrs, httpResponseErrorService) => httpResponseErrorService.errorTemplateUrl()
    });
})();

