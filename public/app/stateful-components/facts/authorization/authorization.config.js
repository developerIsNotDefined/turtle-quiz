const config = ($httpProvider, jwtOptionsProvider, $stateProvider) => {
    $stateProvider.state('facts.authorization', {
      url: '/authorization',
      component: 'authorizationComponent'
    });

    jwtOptionsProvider.config({
      authPrefix: '',
      unauthenticatedRedirectPath: '/facts/authorization',
      tokenGetter: () => localStorage.getItem('jwt_auth'),
      whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
};

config.$inject = ['$httpProvider', 'jwtOptionsProvider', '$stateProvider'];

export default config;