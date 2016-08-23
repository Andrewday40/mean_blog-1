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


  /**
   * PostController - description
   *
   * @param  {object} $scope      Angular service that exposes functions and data
   *                              to the DOM
   * @param  {type} PostService  custom written service that is an interface to the
   *                              http endpoints for posts that we have created on the
   *                              backend
   * @param  {object} AuthService Our custom written AuthService that allows for
   *                            Authentication and persistence of a user
   * @param  {object} $location   Angular service that will allow the redirect to a url
   * @param  {object} $routeParams Angular router service that allows one to access
   *                                parameters from the url such as /post/:postId
   *                                would have a postId parameter
   * @param  {object} UserService  custom written service that is an interface to
   *                                the user endpoints that we have created on the backend
   * @return {none}              none
   */
  function PostController($scope, PostService, AuthService, $location, $routeParams, UserService){
    $scope.createPost = createPost;
    $scope.updatePost = updatePost;
    $scope.getAuthor = getAuthor;
    $scope.posts = []

    getEditPost($routeParams.postId);//get the editing post if there is one
                                    // only used on the editing page
    getReadPost($routeParams.postId); //get the reading post if there is one
                                      // only used on the post page
    getPosts();//get all of the posts on the backend and set those on the $scope

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
     * createPost - function that POSTS a new post to the backend
     *                only available if the user is logged in
     *
     * @param  {object} post  object that mirrors the backend data model that
     *                           is expected on the backend
     *                  EX: {
     *                        title: 'awesome post',
     *                        body: 'This is an awesome posts',
     *                        create: <created on the backend>,
     *                        updated: <created on the backend>,
     *                        author: <UserId of the current logged in user>
     *                      }
     * @return {none}      none
     */
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


    /**
     * updatePost - function that PUTS the new updated information of the post
     *                        to the backend using the PostService
     *
     * @param  {object} post  object that mirrors the backend data model that
     *                           is expected on the backend
     *                  EX: {
     *                        title: 'awesome post',
     *                        body: 'This is an awesome posts',
     *                        create: <created on the backend>,
     *                        updated: <created on the backend>,
     *                        author: <UserId of the current logged in user>
     *                      }
     * @return {none}      none
     */
    function updatePost(post){
      PostService.updatePost(post._id, post)
                  .then(function(response){
                    $location.path('/profile/'+post.author);
                  })
                  .catch(function(err){
                    console.log(err);
                  })
    }

    /**
     * getEditPost - obtains the currently edited posts from the id in the $routeParams
     *
     * @param  {string} postId the id of the post that is being edited obtained
     *                          from the $routeParams
     * @return {none}        none
     */
    function getEditPost(postId){
      if(!postId){
        return; //if the post doesn't exist then stop
      }
      PostService.getOnePost(postId)
                .then(function(response){
                  $scope.editPost = response.data.post; //set the editPost
                })
                .catch(function(err){
                  console.log(err);
                });
    }
    //Similar to editPost except for the /post/:postId route
    function getReadPost(postId){
      if(!postId){
        return; //if the id is not available then return
      }
      PostService.getOnePost(postId)
                .then(function(response){
                  $scope.readPost = response.data.post;
                })
                .catch(function(err){
                  console.log(err);
                });
    }


    /**
     * getAuthor - takes a post and returns the auther from the user routes
     *            utilizing the UserService
     *
     * @param  {object} post post model with the id of the post for user lookup
     * @return {none}      none
     */
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
