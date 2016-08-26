(function() {
  angular.module('ngBlog')
          .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'AuthService', '$location'];


  /**
   * LoginController - description
   *
   * @param  {object} $scope      Angular Scope object for using data and functions
   *                              within the DOM
   * @param  {object} AuthService Our custom written AuthService that allows for
   *                            Authentication and persistence of a user
   * @param  {object} $location   Angular service that will allow the redirect to a url
   * @return {none}             None
   */
  function LoginController($scope, AuthService, $location){
    $scope.login = login; //exposing the login function to the scope


    /**
     * login - This is a wrapper to the login function of the AuthService
     *          that will login a user based on username and password then
     *          redirect to the home page when that is successful. Currently,
     *          this does not handle the error case... Could you implement that?
     *
     * @param  {object} user This is the user object that contains an email and password
     *                    that is used to login to the backend.
     * @return {None}      None
     */
    function login(user){
      AuthService.login(user)
            .then(function(){
              $location.path('/');
            })
            .catch(function(err){
              console.log(err);
            });
    }
  }
}());
