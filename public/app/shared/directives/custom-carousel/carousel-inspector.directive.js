(function(){
  const directive = ($compile) => {
    const compile = ($element, $attrs) => {

      const carouselControls = $attrs.carouselControls || false;
      const carouselMobile = $attrs.carouselMobile || false;

      if (carouselControls === 'true'){
        const carouselControlsPrev = angular.element($element[0].querySelector('[carousel-controls=prev]'));
        const carouselControlsNext = angular.element($element[0].querySelector('[carousel-controls=next]'));

        angular.element(carouselControlsPrev.attr("ng-click","changeSlide(carouselCurrentSlide = carouselCurrentSlide - 1)"));
        angular.element(carouselControlsNext.attr("ng-click","changeSlide(carouselCurrentSlide = carouselCurrentSlide + 1)"));

        angular.element(carouselControlsPrev.removeAttr("carousel-controls"));
        angular.element(carouselControlsNext.removeAttr("carousel-controls"));

        $element.removeAttr("carousel-controls");
      }

      if (carouselMobile === 'true'){
        $element.attr("ng-swipe-left","changeSlide(carouselCurrentSlide = carouselCurrentSlide + 1)");
        $element.attr("ng-swipe-right","changeSlide(carouselCurrentSlide = carouselCurrentSlide - 1)");

        $element.removeAttr("carousel-mobile");
      }

      $element.removeAttr("carousel-inspector");
      const recompile = $compile($element);

      return ($scope) => {
        recompile($scope);
      }

    };

    return{
      restrict: "A",
      terminal: true,
      priority: 1000,
      compile
    }

  };

  directive.$inject = ['$compile'];

  angular
    .module('turtleApp')
    .directive('carouselInspector', directive);
})();
