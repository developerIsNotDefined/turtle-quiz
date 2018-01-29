const config = $stateProvider => {
  $stateProvider.state('facts', {
    url: '/facts',
    component: 'factsComponent'
  });
};

config.$inject = ['$stateProvider'];

export default config