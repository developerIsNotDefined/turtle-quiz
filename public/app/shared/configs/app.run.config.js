const appRun = ($rootScope, authManager, $state) => {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
  $state.defaultErrorHandler(() => {}); //handles ui-router transition errors

  $rootScope.$on("modal.open", $event => $rootScope.__modalShown__ = true);
  $rootScope.$on("modal.close", $event => $rootScope.__modalShown__ = false);
};

appRun.$inject = ['$rootScope', 'authManager', '$state'];

const appConfig = ($urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/facts');
  $locationProvider.hashPrefix('!');
};

appConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

export {
  appRun,
  appConfig
}