'use strict';

/**
 * @ngdoc function
 * @name kodemonViewApp.controller:KeyCtrl
 * @description
 * # KeyCtrl
 * Controller of the kodemonViewApp
 */
angular.module('kodemonViewApp')
  .controller('KeyCtrl', function ($scope, $routeParams, KodemonFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.name = $routeParams.name;
    console.log($scope.name);


      KodemonFactory.getKey($scope.name).then(function(data) {
        console.log(data);

        $scope.key = data;
      });
  
  });
