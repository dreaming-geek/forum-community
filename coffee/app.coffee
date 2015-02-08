angular
.module "forumApp", ['ngRoute']
.config ($routeProvider) ->
  $routeProvider
  .when '/',
    templateUrl: 'templates/home.html'
  .when '/create',
    templateUrl: 'templates/create.html'