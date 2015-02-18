angular
.module "forumApp", ['ngRoute','firebase']
.constant "FBUrl", "FIREBASE-URL"
.config ($routeProvider) ->
  $routeProvider
  .when '/',
    templateUrl: 'templates/home.html'
    controller: 'HomeCtrl'
  .when '/create',
    templateUrl: 'templates/create.html'
    controller: 'CreateCtrl'
  .when '/viewPost/:postId',
    templateUrl: 'templates/postDetail.html'
    controller: 'PostDetailCtrl'
  .otherwise
    redirectTo: '/'