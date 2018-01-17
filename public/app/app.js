import angular from 'angular';

/* third party libraries */
import uiRouter from '@uirouter/angularjs';
import angularAnimate from 'angular-animate';
import angularJwt from 'angular-jwt';
import angularMessages from 'angular-messages';
import angularToastr from 'angular-toastr';
import angularTouch from 'angular-touch';
/* !third party libraries */

/* facts */
import factsComponent from './stateful-components/facts/facts.component';
import factsConfig from './stateful-components/facts/facts.config';
import factsService from './stateful-components/facts/facts.service';
/* !facts */

/* authorization */
import authorizationComponent from './stateful-components/facts/authorization/authorization.component';
import authorizationConfig from './stateful-components/facts/authorization/authorization.config';
import authService from './stateful-components/facts/authorization/authorization.service';
/* !authorization */

/* facts carousel turtles */
import carouselTurtlesComponent from './stateful-components/facts/carousel.turtles/carousel.turtles.component';
/* !facts carousel turtles */

/* facts turtle info modal */
import factsTurtleInfoModalComponent from './stateful-components/facts/modal.turtle-info/modal.turtle-info.component';
import factsTurtleInfoModalConfig from './stateful-components/facts/modal.turtle-info/modal.turtle-info.config';
/* !facts turtle info modal */

/* quiz */
import quizComponent from './stateful-components/quiz/quiz.component';
import quizConfig from './stateful-components/quiz/quiz.config';
import quizService from './stateful-components/quiz/quiz.service';
/* !quiz */

/* results */
import resultsComponent from './stateful-components/results/results.component';
import resultsConfig from './stateful-components/results/results.config';
import resultsService from './stateful-components/results/results.service';
/* !results */

/* httpErrors */
import httpErrorsComponent from './stateful-components/http-errors/http-errors.component';
import httpErrorsConfig from './stateful-components/http-errors/http-errors.config';
import httpResponseErrorInterceptor from './stateful-components/http-errors/http-response-error-interceptor';
import httpResponseErrorService from './stateful-components/http-errors/http-response-error-service';
/* !httpErrors */

/* shared configs */
import {appRun, appConfig} from './shared/configs/app.run.config';
import toastrConfig from './shared/configs/toastr.config';
/* !shared configs */

/* shared directives */
import customCarouselDirective from './shared/directives/custom-carousel.directive';
import customModalDirective from './shared/directives/custom-modal.directive';
/* !shared directives */

/* shared services */
import dataService from './shared/services/data-service';
import modalService from './shared/services/modal-service';
/* !shared services */

/* shared components */
import customLoadingComponent from './shared/stateless-components/custom-loading/custom-loading.component';
import customModalComponent from './shared/stateless-components/custom-modal/custom-modal.component';
import progressButtonToolbarComponent from './shared/stateless-components/progress-button-toolbar/progress-button-toolbar.component';
import progressUiBarComponent from './shared/stateless-components/progress-ui-bar/progress-ui-bar.component';
import questionBarComponent from './shared/stateless-components/question-bar/question-bar.component';
/* !shared components */

  angular
    .module('turtleApp', [uiRouter, angularAnimate, angularJwt, angularMessages, angularToastr, angularTouch])
    .component('factsComponent', factsComponent)
    .config(factsConfig)
    .service('factsService', factsService)
    .component('authorizationComponent', authorizationComponent)
    .config(authorizationConfig)
    .service('authService', authService)
    .component('carouselTurtles', carouselTurtlesComponent)
    .component('factsTurtleInfoModal', factsTurtleInfoModalComponent)
    .config(factsTurtleInfoModalConfig)
    .component('quizComponent', quizComponent)
    .config(quizConfig)
    .service('quizService', quizService)
    .component('resultsComponent', resultsComponent)
    .config(resultsConfig)
    .service('resultsService', resultsService)
    .component('httpErrorsComponent', httpErrorsComponent)
    .config(httpErrorsConfig)
    .service('httpResponseErrorInterceptor', httpResponseErrorInterceptor)
    .service('httpResponseErrorService', httpResponseErrorService)
    .run(appRun)
    .config(appConfig)
    .config(toastrConfig)
    .directive('customCarousel', customCarouselDirective)
    .directive('customModal', customModalDirective)
    .service('dataService', dataService)
    .service('modalService', modalService)
    .component('customLoading', customLoadingComponent)
    .component('customModal', customModalComponent)
    .component('progressButtonToolbar', progressButtonToolbarComponent)
    .component('progressUiBar', progressUiBarComponent)
    .component('questionBar', questionBarComponent);

//127.0.0.1:8080/#!/facts

// node index.js
// json-server -w db.json -d 2000

// getQuizQuestions() {
//   // return this.$http.get('http://localhost:3000/quizQuestions'); for json-server
// }

// getQuizQuestions() {
//   return this.$http({
//     method: 'GET',
//     url: 'http://localhost:3003/api/quizQuestions'
//     // headers: {
//     //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWNkMjI1OTdkNDQ0NjNmYmNmZTQwYTIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTA2NjE1ODk4fQ.V8PRg2yr5r_jXHsva47Rhb69h5HTXPtxYWx8vNQH9A4'
//     // }
//   });
// }
