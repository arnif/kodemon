'use strict';

/**
 * @ngdoc function
 * @name kodemonViewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kodemonViewApp
 */
angular.module('kodemonViewApp')
  .controller('MainCtrl', function ($scope, KodemonFactory, $http) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.keyList = [];
    KodemonFactory.getList().then(function(data) {
      console.log(data);
      $scope.keyList = data;
    });

  });
