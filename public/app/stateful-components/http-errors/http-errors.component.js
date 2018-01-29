const controller = class {
  constructor($state){
    this.$state = $state;
  }
};

let templateUrl = ($element, $attrs, httpResponseErrorService) => httpResponseErrorService.errorTemplateUrl();

controller.$inject = ['$state'];

templateUrl.$inject = ['$element', '$attrs', 'httpResponseErrorService'];

const component = {
  controller,
  templateUrl
}

export default component