const appRun = (authManager, $state) => {
  authManager.checkAuthOnRefresh();
  authManager.redirectWhenUnauthenticated();
  $state.defaultErrorHandler(() => {}); //handles ui-router transition errors
};

appRun.$inject = ['authManager', '$state'];

const appConfig = $urlRouterProvider => $urlRouterProvider.otherwise('/facts');

appConfig.$inject = ['$urlRouterProvider'];

export {
  appRun,
  appConfig
}