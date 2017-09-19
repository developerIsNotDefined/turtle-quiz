(function(){
  angular
    .module('turtleApp')
    .component('carouselTurtles', {
      bindings: {
        turtles: '<'
      },
      templateUrl: 'app/shared/stateless-components/carousel-turtles/carousel-turtles.html'
    });
})();



