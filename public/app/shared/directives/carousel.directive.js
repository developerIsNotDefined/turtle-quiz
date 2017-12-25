(function(){
  angular
    .module('turtleApp')
    .directive('carousel', function ($interval, $timeout) {

      const link = function (scope, element, attrs) {
        scope.carouselInterval = parseInt(attrs.carouselInterval) || false;
        scope.carouselItemsNum = parseInt(attrs.carouselItemsNum) || 0;
        scope.carouselCurrentSlide = 0;

        const slidesList = element[0].querySelector("ul");
        slidesList.style.width = (scope.carouselItemsNum * 100)+'%';

        $timeout(() => {
          const slides = slidesList.querySelectorAll("li");
          slides.forEach(li => li.style.width = (100 / scope.carouselItemsNum) + '%');
          if (scope.carouselInterval){scope.sliderInterval = $interval(()=> scope.changeSlide(++scope.carouselCurrentSlide), scope.carouselInterval)}
        }, 0);

        scope.changeSlide = index => {
          if (index === 8){
            scope.carouselCurrentSlide = 0;
          } else if (index === -1){
            scope.carouselCurrentSlide = 7;
          }

          if (scope.carouselInterval){
            $interval.cancel(scope.sliderInterval);
            scope.sliderInterval = $interval(()=> scope.changeSlide(++scope.carouselCurrentSlide), scope.carouselInterval);
          }

          slidesList.style.left = scope.carouselCurrentSlide * -100 + '%';
        }

        scope.$on('$destroy', function () {
          $interval.cancel(scope.sliderInterval);
          element.remove();
        });

      };

      link.$inject = ['$interval', '$timeout'];

      return{
        restrict: "A",
        link
      }

    });
})();
