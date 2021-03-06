(function() {
  angular.module("forumApp", ['ngRoute', 'firebase']).constant("FBUrl", "FIREBASE-URL").config(function($routeProvider) {
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

(function() {
  angular.module("forumApp").controller("HomeCtrl", [
    "$scope", "FirebaseFactory", function($scope, FirebaseFactory) {
      var topics;
      topics = FirebaseFactory.getFbRef("topics").$asArray();
      return $scope.topics = topics;
    }
  ]).controller("CreateCtrl", [
    "$scope", "FirebaseFactory", "$location", function($scope, FirebaseFactory, $location) {
      return $scope.postTopic = function() {
        var topics;
        if ($scope.post === void 0) {
          return alert("Please fill in all the fields");
        } else {
          if ($scope.post.topicName === void 0 || $scope.post.body === void 0 || $scope.post.personName === void 0) {
            return alert("Please fill in all the fields");
          } else {
            $scope.post.likes = 0;
            $scope.post.dislikes = 0;
            $scope.post.created = Date.now();
            return topics = FirebaseFactory.insertToFb($scope.post, "topics").then(function(data) {
              alert("The topic has been saved");
              $scope.post = '';
              return $location.path("/");
            });
          }
        }
      };
    }
  ]).controller("PostDetailCtrl", [
    "$scope", "FirebaseFactory", "$routeParams", function($scope, FirebaseFactory, $routeParams) {
      var commentRef, post, postComments, postId;
      postId = $routeParams.postId;
      commentRef = "topics/" + postId + "/comments";
      post = FirebaseFactory.getFbRef("topics/" + postId).$asObject();
      postComments = FirebaseFactory.getFbRef(commentRef).$asArray();
      $scope.post = post;
      $scope.postComments = postComments;
      return $scope.postComment = function() {
        if ($scope.comments === void 0) {
          return alert("Please fill in the required fields");
        } else {
          if ($scope.comments.comment === void 0 && $scope.comments.user === void 0) {
            return alert("Please fill in the required fields");
          } else {
            $scope.comments.created = Date.now();
            return FirebaseFactory.insertToFb($scope.comments, commentRef).then(function() {
              return $scope.comments.comment = '';
            });
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("forumApp").factory("FirebaseFactory", [
    "$firebase", "$firebaseUtils", "FBUrl", function($firebase, $firebaseUtils, FBUrl) {
      var FB;
      FB = {
        getFbRef: function(child) {
          var ref;
          if (child != null) {
            ref = new Firebase(FBUrl + "/" + child);
            return $firebase(ref);
          } else {
            ref = new Firebase(FBUrl);
            return $firebase(ref);
          }
        },
        insertToFb: function(data, child) {
          var cleanData, sync;
          cleanData = $firebaseUtils.toJSON(data);
          sync = this.getFbRef(child);
          return sync.$push(cleanData);
        }
      };
      return FB;
    }
  ]);

}).call(this);
