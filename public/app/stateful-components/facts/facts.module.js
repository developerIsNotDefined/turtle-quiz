import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularToastr from 'angular-toastr';
/* !third party libraries */

/* app modules */
import commonModule from './../../shared/common.module';
/* !app modules */

import factsComponent from './facts.component';
import factsConfig from './facts.config';
import factsService from './facts.service';
import carouselTurtlesComponent from './carousel.turtles/carousel.turtles.component';
import factsTurtleInfoModalComponent from './modal.turtle-info/modal.turtle-info.component';
import factsTurtleInfoModalConfig from './modal.turtle-info/modal.turtle-info.config';

const factsModule = angular
  .module('factsModule', [uiRouter, angularToastr, commonModule])
  .component('factsComponent', factsComponent)
  .config(factsConfig)
  .service('factsService', factsService)
  .component('carouselTurtles', carouselTurtlesComponent)
  .component('factsTurtleInfoModal', factsTurtleInfoModalComponent)
  .config(factsTurtleInfoModalConfig)
  .name;

export default factsModule;