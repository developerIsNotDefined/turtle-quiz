import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularJwt from 'angular-jwt';
import angularMessages from 'angular-messages';
import angularToastr from 'angular-toastr';
/* !third party libraries */

/* app modules */
import commonModule from './../../../shared/common.module';
/* !app modules */

import authorizationComponent from './authorization.component';
import authorizationConfig from './authorization.config';
import authService from './authorization.service';

const authorizationModule = angular
  .module('authorizationModule', [uiRouter, angularJwt, angularMessages, angularToastr, commonModule])
  .component('authorizationComponent', authorizationComponent)
  .config(authorizationConfig)
  .service('authService', authService)
  .name;

export default authorizationModule;