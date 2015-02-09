angular
.module "forumApp"
.factory "FirebaseFactory", ["$firebase", "$firebaseUtils", "FBUrl", ($firebase, $firebaseUtils ,FBUrl) ->
  FB =
    getFbRef: (child) ->
      if child?
        ref = new Firebase "#{FBUrl}/#{child}"
        return $firebase ref
      else
        ref = new Firebase FBUrl
        return $firebase ref
    insertToFb: (data, child) ->
      cleanData = $firebaseUtils.toJSON data
      sync = @getFbRef child
      sync.$push cleanData
  return FB
]


