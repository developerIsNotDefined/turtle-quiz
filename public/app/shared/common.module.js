import angular from 'angular';

/* third party libraries */
import angularAnimate from 'angular-animate';
import angularToastr from 'angular-toastr';
import angularTouch from 'angular-touch';
/* !third party libraries */

/* shared configs */
import toastrConfig from './configs/toastr.config';
/* !shared configs */

/* shared directives */
import customCarouselDirective from './directives/custom-carousel.directive';
import customLoadingDirective from './directives/custom-loading.directive';
/* !shared directives */

/* shared services */
import dataService from './services/data-service';
import modalService from './services/modal-service';
/* !shared services */

/* shared components */
import customLoadingComponent from './stateless-components/custom-loading/custom-loading.component';
import customModalComponent from './stateless-components/custom-modal/custom-modal.component';
import progressButtonToolbarComponent from './stateless-components/progress-button-toolbar/progress-button-toolbar.component';
import progressUiBarComponent from './stateless-components/progress-ui-bar/progress-ui-bar.component';
import questionBarComponent from './stateless-components/question-bar/question-bar.component';
/* !shared components */

const commonModule = angular
  .module('commonModule', [angularAnimate, angularToastr, angularTouch])
  .config(toastrConfig)
  .directive('customCarousel', customCarouselDirective)
  .directive('customLoading', customLoadingDirective)
  .service('dataService', dataService)
  .service('modalService', modalService)
  .component('customLoading', customLoadingComponent)
  .component('customModal', customModalComponent)
  .component('progressButtonToolbar', progressButtonToolbarComponent)
  .component('progressUiBar', progressUiBarComponent)
  .component('questionBar', questionBarComponent)
  .name;

export default commonModule;