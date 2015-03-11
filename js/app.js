// Generated by CoffeeScript 1.9.1
(function() {
  angular.module("forumApp", ['ngRoute', 'firebase']).constant("FBUrl", "https://community-forums.firebaseio.com/").config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    }).when('/create', {
      templateUrl: 'templates/create.html',
      controller: 'CreateCtrl'
    }).when('/viewPost/:postId', {
      templateUrl: 'templates/postDetail.html',
      controller: 'PostDetailCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
