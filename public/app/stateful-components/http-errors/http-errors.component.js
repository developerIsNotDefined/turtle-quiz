const controller = class {
  constructor($state){
    this.$state = $state;
  }
};

controller.$inject = ['$state'];

export default {
  controller,
  templateUrl: ($element, $attrs, httpResponseErrorService) => httpResponseErrorService.errorTemplateUrl()
}