(function(){
  const directive = ($rootScope, modalService) => {
    const link = ($scope, $element, $attrs) => {
      $scope.__modalShown__ = false;

      const modalContainerClickListener = $element.on("click", $event => {
        if ($element[0] !== $event.target){
          return;
        }
        $scope.$apply(modalService.reject());
      });

      const modalOpenListener = $rootScope.$on("modal.open", $event => $scope.__modalShown__ = true);

      const modalCloseListener = $rootScope.$on("modal.close", $event => $scope.__modalShown__ = false);

      $scope.$on('$destroy', () => {
        modalContainerClickListener();
        modalOpenListener();
        modalCloseListener();
        $element.remove();
      });
    };

    return{
      restrict: "A",
      link
    }

  };

  directive.$inject = ['$rootScope', 'modalService'];

  angular
    .module('turtleApp')
    .directive('customModal', directive);
})();