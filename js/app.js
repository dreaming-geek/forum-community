// Generated by CoffeeScript 1.9.0
(function() {
  angular.module("forumApp", ['ngRoute']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'templates/home.html'
    }).when('/create', {
      templateUrl: 'templates/create.html'
    });
  });

}).call(this);