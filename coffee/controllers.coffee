angular
.module "forumApp"
.controller "HomeCtrl", ["$scope", "FirebaseFactory",($scope, FirebaseFactory) ->
  topics = FirebaseFactory.getFbRef "topics"
  .$asArray()
  $scope.topics = topics
]
.controller "CreateCtrl", ["$scope", "FirebaseFactory", "$location", ($scope, FirebaseFactory, $location) ->
  $scope.postTopic = ->
    $scope.post.likes = 0
    $scope.post.dislikes = 0
    topics = FirebaseFactory.insertToFb $scope.post, "topics"
    .then (data) ->
      alert "The topic has been saved"
      $scope.post = ''
      $location.path "/"
]
.controller "PostDetailCtrl", ["$scope", "FirebaseFactory", "$routeParams", ($scope, FirebaseFactory, $routeParams) ->
  postId = $routeParams.postId
  post = FirebaseFactory.getFbRef "topics/#{postId}"
  .$asObject()
  $scope.post = post
]