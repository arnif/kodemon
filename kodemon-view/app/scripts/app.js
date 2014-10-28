'use strict';

/**
 * @ngdoc overview
 * @name kodemonViewApp
 * @description
 * # kodemonViewApp
 *
 * Main module of the application.
 */
angular
  .module('kodemonViewApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/key/:name', {
        templateUrl: 'views/key.html',
        controller: 'KeyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
