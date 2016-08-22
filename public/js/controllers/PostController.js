(function() {
  angular.module('ngBlog')
        .controller('PostController', PostController);

  PostController.$inject = ['$scope',
                            'PostService',
                            'AuthService',
                            '$location',
                            '$routeParams',
                            'UserService'
                          ];

  function PostController($scope, PostService, AuthService, $location, $routeParams, UserService){
    $scope.createPost = createPost;
    $scope.updatePost = updatePost;
    $scope.getAuthor = getAuthor;
    $scope.posts = []

    getEditPost($routeParams.postId);
    getReadPost($routeParams.postId);
    getPosts();
    function getPosts(){
      PostService.getAllPosts()
                .then(function(response){
                  $scope.posts = response.data.posts;
                })
                .catch(function(err){
                  console.log(err);
                });
    }
    function createPost(post){
      post.author = AuthService.currentUser().id;
      PostService.createPost(post)
                  .then(function(response){
                    $location.path('/profile/'+post.author);
                  })
                  .catch(function(err){
                    console.log(err);
                  });
    }
    function updatePost(post){
      PostService.updatePost(post._id, post)
                  .then(function(response){
                    $location.path('/profile/'+post.author);
                  })
                  .catch(function(err){
                    console.log(err);
                  })
    }
    function getEditPost(postId){
      if(!postId){
        return;
      }
      PostService.getOnePost(postId)
                .then(function(response){
                  $scope.editPost = response.data.post;
                  console.log($scope)
                })
                .catch(function(err){
                  console.log(err);
                });
    }
    function getReadPost(postId){
      if(!postId){
        return;
      }
      PostService.getOnePost(postId)
                .then(function(response){
                  $scope.readPost = response.data.post;
                })
                .catch(function(err){
                  console.log(err);
                });
    }
    function getAuthor(post){
      UserService.getOneUser(post._id)
            .then(function(response){
              return response.data.firstName + ' ' + response.data.lastName;
            })
            .catch(function(err){
              console.log(err);
            });
    }
  }
}());
