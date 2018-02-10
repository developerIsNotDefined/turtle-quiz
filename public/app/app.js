import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularJwt from 'angular-jwt';
/* !third party libraries */

/* app modules */
import factsModule from './stateful-components/facts/facts.module';
import authorizationModule from './stateful-components/facts/authorization/authorization.module';
import httpErrorsModule from './stateful-components/http-errors/http-errors.module';
import quizModule from './stateful-components/quiz/quiz.module';
import resultsModule from './stateful-components/results/results.module';
/* !app modules */

import {appRun, appConfig} from './app.run.config';

angular
  .module('turtleApp', [
    uiRouter,
    angularJwt,
    factsModule,
    authorizationModule,
    httpErrorsModule,
    quizModule,
    resultsModule
  ])
  .run(appRun)
  .config(appConfig);