(function() {
  angular.module('ngBlog')
        .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'PostService'];

  function HomeController($scope, PostService){
    $scope.posts = []


    getPosts();

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
