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

      $scope.from = undefined;
      $scope.to = undefined;

      $scope.onFromSet = function (newDate) {
        console.log(newDate);
        $scope.from = newDate;
      };

      $scope.onToSet = function (newDate) {
        console.log(newDate);
        $scope.to = newDate;
      };

      $scope.search = function() {
        if ($scope.from !== undefined && $scope.to !== undefined) {
          console.log('GET');
          KodemonFactory.getKeyByDate($scope.from, $scope.to, $scope.name).then(function(data) {
            console.log(data);
            $scope.key = data;
          });

        }
      };



  });
