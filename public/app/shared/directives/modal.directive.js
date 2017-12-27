(function(){
  const directive = ($rootScope, modalService) => {
    const link = (scope, element, attrs) => {
      scope.modalShown = false;

      element.on("click", event => {
        if (element[0] !== event.target){
          return;
        }
        scope.$apply(modalService.reject());
      });

      $rootScope.$on("modal.open", event => scope.modalShown = true);

      $rootScope.$on("modal.close", event => scope.modalShown = false);
    }

    return{
      restrict: "A",
      link
    }
  }

  angular
    .module('turtleApp')
    .directive('customModal', directive);
})();