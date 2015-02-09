angular
.module "forumApp"
.controller "HomeCtrl", ["$scope", "FirebaseFactory",($scope, FirebaseFactory) ->
  topics = FirebaseFactory.getFbRef "topics"
  .$asArray()
  $scope.topics = topics
]
.controller "CreateCtrl", ["$scope", "FirebaseFactory", ($scope, FirebaseFactory) ->
  $scope.postTopic = ->
    $scope.post.likes = 0
    $scope.post.dislikes = 0
    topics = FirebaseFactory.insertToFb $scope.post, "topics"
    .then (data) ->
      alert "The topic has been saved"
      $scope.post = ''
]