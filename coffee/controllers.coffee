angular
.module "forumApp"
.controller "HomeCtrl", ["$scope", "FirebaseFactory",($scope, FirebaseFactory) ->
  topics = FirebaseFactory.getFbRef "topics"
  .$asArray()
  $scope.topics = topics
]

.controller "CreateCtrl", ["$scope", "FirebaseFactory", "$location", ($scope, FirebaseFactory, $location) ->
  $scope.postTopic = ->
    if $scope.post is undefined
      alert "Please fill in all the fields"
    else
      if $scope.post.topicName is undefined or $scope.post.body is undefined or $scope.post.personName is undefined
        alert "Please fill in all the fields"
      else
        $scope.post.likes = 0
        $scope.post.dislikes = 0
        $scope.post.created = Date.now()
        topics = FirebaseFactory.insertToFb $scope.post, "topics"
        .then (data) ->
          alert "The topic has been saved"
          $scope.post = ''
          $location.path "/"
]

.controller "PostDetailCtrl", ["$scope", "FirebaseFactory", "$routeParams", ($scope, FirebaseFactory, $routeParams) ->
  postId = $routeParams.postId
  commentRef = "topics/#{postId}/comments"
  post = FirebaseFactory.getFbRef "topics/#{postId}"
  .$asObject()
  postComments = FirebaseFactory.getFbRef commentRef
  .$asArray()
  $scope.post = post
  $scope.postComments = postComments

  $scope.postComment = ->
    if $scope.comments is undefined
      alert "Please fill in the required fields"
    else
      if $scope.comments.comment is undefined and $scope.comments.user is undefined
        alert "Please fill in the required fields"
      else
        $scope.comments.created = Date.now()
        FirebaseFactory.insertToFb $scope.comments, commentRef
        .then () ->
          $scope.comments.comment = ''
]