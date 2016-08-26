(function() {
  angular.module('ngBlog')
        .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'PostService', 'AuthService'];

  function ProfileController($scope, PostService, AuthService){
    $scope.posts = []; //posts data
    $scope.deletePost = deletePost;
    $scope.user = AuthService.currentUser(); //link the current user to the user
                                            // user must be linked in

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


    /**
     * deletePost - deletes the post from the front end without requesting an update
     *              the splice from the DOM for performance
     *
     * @param  {object} post  post object
     * @param  {number} index position of the post in the collection
     * @return {none}       none
     */
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
