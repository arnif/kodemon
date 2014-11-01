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
    var execount = 0;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      setExecCount: function(count) {
        execount = count;
      },
      getExecCount: function() {
        return execount;
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
      getKey: function(name, size, from) {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/api/key/' + name +'?size=' + size + '&from=' + from).success(function(response) {
          deferred.resolve(response);
        }).error(function() {
          deferred.reject();
        });
        return deferred.promise;
      },
      getKeyByDate: function(from, to, name) {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/api/key/' + name + '/' + from + '/' + to).success(function(response) {
          deferred.resolve(response);
        }).error(function() {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  });


//  app.route('/api/key/:name')
//    .get(api.getKey);
