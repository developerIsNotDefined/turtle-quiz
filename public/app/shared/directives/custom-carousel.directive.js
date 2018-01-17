const directive = ($interval, $timeout) => {
  const link = ($scope, $element, $attrs) => {
    const dataCarouselInterval = parseInt($attrs.carouselInterval) || false;
    const dataCarouselItemsNum = parseInt($attrs.carouselItemsNum) || 0;
    let carouselInterval = null;
    let carouselCurrentSlide = 0;

    const slidesList = $element[0].querySelector("ul");
    slidesList.style.width = (dataCarouselItemsNum * 100)+'%';

    $timeout(() => {
      const slides = slidesList.querySelectorAll("li");
      slides.forEach(li => li.style.width = (100 / dataCarouselItemsNum) + '%');
      if (dataCarouselInterval){carouselInterval = $interval(()=> changeSlide(++carouselCurrentSlide), dataCarouselInterval)}
    }, 0);

    const changeSlide = (index) => {
      carouselCurrentSlide = index;
      if (carouselCurrentSlide === dataCarouselItemsNum){
        carouselCurrentSlide = 0;
      } else if (carouselCurrentSlide === -1){
        carouselCurrentSlide = dataCarouselItemsNum-1;
      }

      if (dataCarouselInterval){
        $interval.cancel(carouselInterval);
        carouselInterval = $interval(()=> changeSlide(++carouselCurrentSlide), dataCarouselInterval);
      }

      slidesList.style.left = carouselCurrentSlide * -100 + '%';
    }

    $scope.nextSlide = () => changeSlide(++carouselCurrentSlide);

    $scope.prevSlide = () => changeSlide(--carouselCurrentSlide);

    $scope.$on('$destroy', () => {
      $interval.cancel(carouselInterval);
      $element.remove();
    });

  };

  return{
    restrict: "A",
    link
  }

};

directive.$inject = ['$interval', '$timeout'];

export default directive