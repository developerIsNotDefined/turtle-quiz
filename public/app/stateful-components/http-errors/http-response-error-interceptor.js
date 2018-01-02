(function(){
  class HttpInterceptor {
    constructor() {
      ['request', 'requestError', 'response', 'responseError']
        .forEach((method) => {
          if(this[method]) {
            this[method] = this[method].bind(this);
          }
        });
    }
  }

  const service = class extends HttpInterceptor{
    constructor($q, httpResponseErrorService){
      super();
      this.$q = $q;
      this.httpResponseErrorService = httpResponseErrorService;
    }

    responseError(rejection) {
      this.httpResponseErrorService.errorTemplateUrl(rejection.status);
      return this.$q.reject(rejection);
    }
  };

  service.$inject = ['$q', 'httpResponseErrorService'];

  angular
    .module('turtleApp')
    .service("httpResponseErrorInterceptor", service);
})();
