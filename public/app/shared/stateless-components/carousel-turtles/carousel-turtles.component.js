(function(){
  angular
    .module('turtleApp')
    .component('carouselTurtles', {
      bindings: {
        turtlesFacts: '<'
      },
      templateUrl: 'app/shared/stateless-components/carousel-turtles/carousel-turtles.html'
    });
})();