import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularToastr from 'angular-toastr';
/* !third party libraries */

/* app modules */
import commonModule from './../../shared/common.module';
/* !app modules */

import quizComponent from './quiz.component';
import quizConfig from './quiz.config';
import quizService from './quiz.service';

const quizModule = angular
  .module('quizModule', [uiRouter, angularToastr, commonModule])
  .component('quizComponent', quizComponent)
  .config(quizConfig)
  .service('quizService', quizService)
  .name;

export default quizModule;