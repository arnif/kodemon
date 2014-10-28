'use strict';

/**
 * @ngdoc service
 * @name kodemonViewApp.KodemonFactory
 * @description
 * # KodemonFactory
 * Factory in the kodemonViewApp.
 */
angular.module('kodemonViewApp')
  .factory('KodemonFactory', function ($http, $q) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      getList: function() {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/api/keys').success(function(response) {
          deferred.resolve(response);
        }).error(function() {
          deferred.reject();
        });
          return deferred.promise;
      },
      getKey: function(name) {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/api/key/' + name).success(function(response) {
          deferred.resolve(response);
          console.log('response: ' + response);
        }).error(function() {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  });


//  app.route('/api/key/:name')
//    .get(api.getKey);