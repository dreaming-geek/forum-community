// Generated by CoffeeScript 1.9.0
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
