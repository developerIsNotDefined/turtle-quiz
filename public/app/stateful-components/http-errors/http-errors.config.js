const config = function($stateProvider, $httpProvider) {
  $httpProvider.interceptors.push('httpResponseErrorInterceptor');

  $stateProvider
    .state('404', {
      url: '/404',
      component: 'httpErrorsComponent'
    })
    .state('503', {
      url: '/503',
      component: 'httpErrorsComponent'
    });
};

config.$inject = ['$stateProvider', '$httpProvider'];

export default config;