(function(){
  angular
    .module('turtleApp')
    .component('carouselTurtles', {
      bindings: {
        turtlesFacts: '<'
      },
      templateUrl: 'app/stateful-components/facts/carousel.turtles/carousel.turtles.html'
    });
})();