(function(){
  const directive = ($compile, $templateCache, $http) => {
    const link = ($scope, $element, $attrs, $controller, $transclude) => {
      let loadingSpinner = null;
      let originalContent = null;
      let transcludedScope = null;

      $http.get('app/shared/directives/custom-loading/custom-loading.html', {cache: $templateCache})
        .then(response => loadingSpinner = response.data);

      const customLoadingWatcher = $scope.$watch(() => {
        return $attrs.customLoading;
      }, (value) => {

        if (transcludedScope){
          transcludedScope.$destroy();
          transcludedScope = null;
        }

        switch (value) {
          case 'true':
            $element.html(loadingSpinner);
            break;
          case 'false':
            $element.empty();
            $transclude((content, scope) => {
              originalContent = content;
              transcludedScope = scope;
              $element.append(originalContent);
              $compile($element.contents())(transcludedScope);
            })
            break;
          case 'notFound':
            $element.html($attrs.customLoadingNotFound ? $attrs.customLoadingNotFound : "Not found.");
            break;
        }
      });

      $scope.$on('$destroy', () => {
        customLoadingWatcher();
        $element.remove();
      });
    };

    return{
      restrict: "A",
      transclude: true,
      scope:{},
      link
    }

  };

  directive.$inject = ['$compile', '$templateCache', '$http'];

  angular
    .module('turtleApp')
    .directive('customLoading', directive);
})();
