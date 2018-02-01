const directive = $interval => {
  const link = ($scope, $element, $attrs) => {
    let dataCarouselInterval = parseInt($attrs.carouselInterval) || false;
    let dataCarouselItemsNum = parseInt($attrs.carouselItemsNum) || 0;
    let carouselInterval = null;
    let carouselCurrentSlide = 0;

    const slidesList = $element[0].querySelector("ul");
    slidesList.style.width = (dataCarouselItemsNum * 100)+'%';

    const carouselLiElementsReady = $scope.$watch(() => {
      return slidesList.children.length === dataCarouselItemsNum;
    }, () => {
      const slides = slidesList.querySelectorAll("li");
      slides.forEach(li => li.style.width = (100 / dataCarouselItemsNum) + '%');
      if (dataCarouselInterval) {
        carouselInterval = $interval(()=> changeSlide(++carouselCurrentSlide), dataCarouselInterval);
      }
      carouselLiElementsReady();
    });

    const changeSlide = index => {
      carouselCurrentSlide = index;
      if (carouselCurrentSlide === dataCarouselItemsNum) {
        carouselCurrentSlide = 0;
      } else if (carouselCurrentSlide === -1) {
        carouselCurrentSlide = dataCarouselItemsNum-1;
      }

      if (dataCarouselInterval) {
        $interval.cancel(carouselInterval);
        carouselInterval = $interval(()=> changeSlide(++carouselCurrentSlide), dataCarouselInterval);
      }

      slidesList.style.left = carouselCurrentSlide * -100 + '%';
    };

    $scope.nextSlide = () => changeSlide(++carouselCurrentSlide);

    $scope.prevSlide = () => changeSlide(--carouselCurrentSlide);

    $scope.$on('$destroy', () => {
      $interval.cancel(carouselInterval);
      $element.remove();
    });
  };

  return {
    restrict: "A",
    link
  };
};

directive.$inject = ['$interval'];

export default directive;