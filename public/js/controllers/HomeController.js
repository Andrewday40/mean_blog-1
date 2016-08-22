(function() {
  angular.module('ngBlog')
        .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'PostService'];

  function HomeController($scope, PostService){
    $scope.posts = []


    getPosts();


    /**
     * getPosts - Sets the posts on the $scope for the landing page.
     *
     * @return {type}  Nothing is returned. This utilizes scope to expose a series
     *                of posts for the landing page of the blog. At current, it is
     *                getting 5 random posts from the database, but could be
     *                changed to the 5 most recent posts by changing the PostService
     *                function call.
     */
    function getPosts(){
      PostService.getRandom(5)
              .then(function(response){
                $scope.posts = response.data.posts;
              })
              .catch(function(err){
                console.log(err);
              });
    }
  }
}());
