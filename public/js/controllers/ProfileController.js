(function() {
  angular.module('ngBlog')
        .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'PostService', 'AuthService'];

  function ProfileController($scope, PostService, AuthService){
    $scope.posts = [];
    $scope.deletePost = deletePost;
    $scope.user = AuthService.currentUser();

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

    function deletePost(post, index){
      PostService.deletePost(post._id)
              .then(function(response){
                $scope.posts.splice(index, 1);
              })
              .catch(function(err){
                console.log(err);
              });
    }

  }
}());
