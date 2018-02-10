import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularToastr from 'angular-toastr';
/* !third party libraries */

/* app modules */
import commonModule from './../../shared/common.module';
/* !app modules */

import resultsComponent from './results.component';
import resultsConfig from './results.config';
import resultsService from './results.service';

const resultsModule = angular
  .module('resultsModule', [uiRouter, angularToastr, commonModule])
  .component('resultsComponent', resultsComponent)
  .config(resultsConfig)
  .service('resultsService', resultsService)
  .name;

export default resultsModule;