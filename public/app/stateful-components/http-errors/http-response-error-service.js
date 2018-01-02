(function(){
  const service = class {
    constructor($state){
      this.$state = $state;
      this.templateUrl = 'app/stateful-components/http-errors/http-error-404.html';
    }

    errorTemplateUrl(errorCode){
      if (arguments.length === 0){
        return this.templateUrl;
      }

      switch (errorCode) {
        case 404:
          this.templateUrl = 'app/stateful-components/http-errors/http-error-404.html';
          this.$state.go('404');
          break;
        case 503:
          this.templateUrl = 'app/stateful-components/http-errors/http-error-503.html';
          this.$state.go('503');
          break;
      }
    }
  };

  service.$inject = ['$state'];

  angular
    .module('turtleApp')
    .service("httpResponseErrorService", service);
})();