'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/view'
  });
}]);