import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularToastr from 'angular-toastr';
/* !third party libraries */

/* app modules */
import commonModule from './../../shared/common.module';
/* !app modules */

import httpErrorsComponent from './http-errors.component';
import httpErrorsConfig from './http-errors.config';
import httpResponseErrorInterceptor from './http-response-error-interceptor';
import httpResponseErrorService from './http-response-error-service';

const httpErrorsModule = angular
  .module('httpErrorsModule', [uiRouter, angularToastr, commonModule])
  .component('httpErrorsComponent', httpErrorsComponent)
  .config(httpErrorsConfig)
  .service('httpResponseErrorInterceptor', httpResponseErrorInterceptor)
  .service('httpResponseErrorService', httpResponseErrorService)
  .name;

export default httpErrorsModule;