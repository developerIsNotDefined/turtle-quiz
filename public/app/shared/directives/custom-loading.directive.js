const directive = ($compile, $templateCache, $http) => {
  const link = ($scope, $element, $attrs, $controller, $transclude) => {
    // let loadingSpinner = `<div class="loader">
    //                         <div class="loader__item--1 loader__item"></div>
    //                         <div class="loader__item--2 loader__item"></div>
    //                         <div class="loader__item--3 loader__item"></div>
    //                         <div class="loader__item--4 loader__item"></div>
    //                         <div class="loader__item--5 loader__item"></div>
    //                         <div class="loader__item--6 loader__item"></div>
    //                         <div class="loader__item--7 loader__item"></div>
    //                         <div class="loader__item--8 loader__item"></div>
    //                         <div class="loader__item--9 loader__item"></div>
    //                         <div class="loader__item--10 loader__item"></div>
    //                         <div class="loader__item--11 loader__item"></div>
    //                         <div class="loader__item--12 loader__item"></div>
    //                       </div>`;
    let loadingSpinner = null;
    let originalContent = null;
    let transcludedScope = null;

    $http.get('app/shared/stateless-components/custom-loading/custom-loading.html', {cache: $templateCache})
      .then(response => loadingSpinner = response.data);

    const customLoadingWatcher = $scope.$watch(() => {
      return $attrs.customLoading;
    }, value => {
      if (transcludedScope) {
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
          });
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

  return {
    restrict: "A",
    transclude: true,
    scope: {},
    link
  };
};

directive.$inject = ['$compile', '$templateCache', '$http'];

export default directive;