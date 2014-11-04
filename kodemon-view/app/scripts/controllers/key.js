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
    console.log($routeParams);

    $scope.currentFrom = $routeParams.from >= 0 ? parseInt($routeParams.from) : 0;
    $scope.currentSize = $routeParams.size ? parseInt($routeParams.size) : 100;

    $scope.name = $routeParams.name;

    $scope.countLimit = KodemonFactory.getExecCount();
    console.log($scope.countLimit);

      KodemonFactory.getKey($scope.name, $scope.currentSize, $scope.currentFrom).then(function(data) {
        console.log(data);
        setData(data);
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
            setData(data);
          });

        }
      };

  function setData(data) {
    $scope.key = data;
    if ($scope.currentFrom >= 0) {
        $scope.currentFrom += data.length;
    } else {
      $scope.currentFrom = 0;
    }
    console.log($scope.currentFrom);
  }

  });
