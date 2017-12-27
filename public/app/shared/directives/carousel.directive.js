(function(){
  angular
    .module('turtleApp')
    .directive('customCarousel', function ($interval, $timeout) {

      const link = (scope, element, attrs) => {
        const carouselScope = scope;
        scope.carouselInterval = parseInt(attrs.carouselInterval) || false;
        scope.carouselItemsNum = parseInt(attrs.carouselItemsNum) || 0;
        scope.carouselControls = attrs.carouselControls || false;
        scope.carouselCurrentSlide = 0;

        if (scope.carouselControls === 'true'){
          element.on("click", (event) => {
            const carouselControlsType = event.target.getAttribute('carousel-controls');

            if (carouselControlsType === 'next'){
              carouselScope.carouselCurrentSlide++;
              carouselScope.changeSlide(carouselScope.carouselCurrentSlide);
            } else if (carouselControlsType === 'prev'){
              carouselScope.carouselCurrentSlide--;
              carouselScope.changeSlide(carouselScope.carouselCurrentSlide);
            }

          });
        }

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
