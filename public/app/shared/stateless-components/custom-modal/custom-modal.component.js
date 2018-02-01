const controller = class {
  constructor($rootScope, $element, $document, modalService) {
    this.$rootScope = $rootScope;
    this.$element = $element;
    this.$document = $document;
    this.modalService = modalService;

    this.modalClickHandler = $event => {
      if (this.$element[0] === $event.target) {
        this.modalService.reject();
        this.$rootScope.$apply();
      }
    };

    this.modalEscKeyDownHandler = $event => {
      if ($event.keyCode === 27) {
        this.modalService.reject();
        this.$rootScope.$apply();
      }
    };
  }

  $onInit() {
    this.templateUrl = this.modalService.modalConfig().templateUrl;
    this.modalData = this.modalService.modalConfig().data;
  }

  $postLink() {
    this.$element.on('click', this.modalClickHandler);
    this.$document.on('keydown', this.modalEscKeyDownHandler);
  }

  $onDestroy() {
    this.$element.off('click', this.modalClickHandler);
    this.$document.off('keydown', this.modalEscKeyDownHandler);
    this.$element.remove();
  }

  ok(data) {
    this.modalService.resolve(data);
  }

  cancel(reason) {
    this.modalShown = false;
    this.modalService.reject(reason);
  }
};

controller.$inject = ['$rootScope', '$element', '$document', 'modalService'];

const component = {
  controller,
  template: '<ng-include src="$ctrl.templateUrl" class="modal"></ng-include>'
};

export default component;